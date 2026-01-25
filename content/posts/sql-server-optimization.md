---
title: "SQL Server: Optimización y buenas prácticas"
date: "2025-12-10"
excerpt: "Domina SQL Server con técnicas de optimización, diseño de índices, queries eficientes y patrones avanzados para aplicaciones de alto rendimiento."
category: "Bases de Datos"
tags: ["sqlserver", "database", "optimization", "tsql"]
readTime: "13 min lectura"
---

# SQL Server: Optimización y buenas prácticas

SQL Server es uno de los motores de bases de datos más potentes. Veamos cómo sacarle el máximo provecho.

## Índices: La clave del rendimiento

### Índices clustered vs non-clustered

```sql
-- Índice clustered (solo uno por tabla)
-- Define el orden físico de los datos
CREATE TABLE Orders (
    OrderID INT PRIMARY KEY CLUSTERED,
    CustomerID INT NOT NULL,
    OrderDate DATETIME NOT NULL,
    TotalAmount DECIMAL(18,2)
);

-- Índices non-clustered (múltiples por tabla)
CREATE NONCLUSTERED INDEX IX_Orders_CustomerID 
ON Orders(CustomerID)
INCLUDE (OrderDate, TotalAmount);

-- Índice compuesto para búsquedas específicas
CREATE NONCLUSTERED INDEX IX_Orders_CustomerDate
ON Orders(CustomerID, OrderDate DESC)
INCLUDE (TotalAmount);
```

### Índices filtrados para optimización

```sql
-- Índice solo para órdenes activas
CREATE NONCLUSTERED INDEX IX_Orders_Active
ON Orders(OrderDate)
WHERE Status = 'Active'
INCLUDE (CustomerID, TotalAmount);

-- Útil cuando una columna tiene pocos valores distintos
CREATE NONCLUSTERED INDEX IX_Orders_Premium
ON Orders(CustomerID)
WHERE CustomerType = 'Premium';
```

## Queries optimizados

### SARGABLE queries (Search ARGument ABLE)

```sql
-- ❌ Malo - No usa índices
SELECT * FROM Orders
WHERE YEAR(OrderDate) = 2024;

-- ✅ Bueno - SARGABLE
SELECT * FROM Orders
WHERE OrderDate >= '2024-01-01' 
  AND OrderDate < '2025-01-01';

-- ❌ Malo
SELECT * FROM Products
WHERE Price * Quantity > 1000;

-- ✅ Bueno
SELECT * FROM Products
WHERE Price > 1000 / Quantity;
```

### Evitar SELECT *

```sql
-- ❌ Malo - trae columnas innecesarias
SELECT * FROM Customers
WHERE City = 'Madrid';

-- ✅ Bueno - solo columnas necesarias
SELECT CustomerID, Name, Email
FROM Customers
WHERE City = 'Madrid';
```

### Usar EXISTS en lugar de IN para subqueries

```sql
-- ❌ Menos eficiente
SELECT * FROM Customers c
WHERE c.CustomerID IN (
    SELECT CustomerID FROM Orders
    WHERE OrderDate > '2024-01-01'
);

-- ✅ Más eficiente
SELECT * FROM Customers c
WHERE EXISTS (
    SELECT 1 FROM Orders o
    WHERE o.CustomerID = c.CustomerID
      AND o.OrderDate > '2024-01-01'
);
```

## CTEs y Window Functions

### Common Table Expressions

```sql
-- CTE para queries más legibles
WITH MonthlyOrders AS (
    SELECT 
        CustomerID,
        YEAR(OrderDate) AS Year,
        MONTH(OrderDate) AS Month,
        SUM(TotalAmount) AS MonthlyTotal
    FROM Orders
    GROUP BY CustomerID, YEAR(OrderDate), MONTH(OrderDate)
),
CustomerStats AS (
    SELECT 
        CustomerID,
        AVG(MonthlyTotal) AS AvgMonthlySpend,
        MAX(MonthlyTotal) AS MaxMonthlySpend
    FROM MonthlyOrders
    GROUP BY CustomerID
)
SELECT 
    c.Name,
    cs.AvgMonthlySpend,
    cs.MaxMonthlySpend
FROM Customers c
INNER JOIN CustomerStats cs ON c.CustomerID = cs.CustomerID
WHERE cs.AvgMonthlySpend > 1000;
```

### Window Functions para análisis

```sql
-- Ranking de productos por ventas
SELECT 
    ProductID,
    ProductName,
    TotalSales,
    RANK() OVER (ORDER BY TotalSales DESC) AS SalesRank,
    DENSE_RANK() OVER (ORDER BY TotalSales DESC) AS DenseSalesRank,
    ROW_NUMBER() OVER (ORDER BY TotalSales DESC) AS RowNum
FROM (
    SELECT 
        p.ProductID,
        p.ProductName,
        SUM(od.Quantity * od.UnitPrice) AS TotalSales
    FROM Products p
    INNER JOIN OrderDetails od ON p.ProductID = od.ProductID
    GROUP BY p.ProductID, p.ProductName
) AS ProductSales;

-- Running total
SELECT 
    OrderDate,
    TotalAmount,
    SUM(TotalAmount) OVER (
        ORDER BY OrderDate 
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS RunningTotal
FROM Orders;

-- Moving average
SELECT 
    OrderDate,
    TotalAmount,
    AVG(TotalAmount) OVER (
        ORDER BY OrderDate 
        ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
    ) AS Moving7DayAvg
FROM Orders;
```

## Stored Procedures con mejores prácticas

```sql
CREATE PROCEDURE sp_GetCustomerOrders
    @CustomerID INT,
    @StartDate DATE = NULL,
    @EndDate DATE = NULL
AS
BEGIN
    SET NOCOUNT ON; -- Importante para performance
    
    -- Validación de parámetros
    IF @CustomerID IS NULL
    BEGIN
        RAISERROR('CustomerID es requerido', 16, 1);
        RETURN;
    END
    
    -- Valores default
    SET @StartDate = COALESCE(@StartDate, DATEADD(MONTH, -1, GETDATE()));
    SET @EndDate = COALESCE(@EndDate, GETDATE());
    
    -- Query principal
    SELECT 
        o.OrderID,
        o.OrderDate,
        o.TotalAmount,
        COUNT(od.OrderDetailID) AS ItemCount
    FROM Orders o
    LEFT JOIN OrderDetails od ON o.OrderID = od.OrderID
    WHERE o.CustomerID = @CustomerID
      AND o.OrderDate BETWEEN @StartDate AND @EndDate
    GROUP BY o.OrderID, o.OrderDate, o.TotalAmount
    ORDER BY o.OrderDate DESC;
    
    -- Retornar código de éxito
    RETURN 0;
END;
GO

-- Uso
EXEC sp_GetCustomerOrders 
    @CustomerID = 123,
    @StartDate = '2024-01-01',
    @EndDate = '2024-12-31';
```

## Transacciones y manejo de errores

```sql
CREATE PROCEDURE sp_ProcessOrder
    @CustomerID INT,
    @ProductID INT,
    @Quantity INT
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        BEGIN TRANSACTION;
        
        -- Verificar stock
        DECLARE @AvailableStock INT;
        SELECT @AvailableStock = Stock 
        FROM Products 
        WHERE ProductID = @ProductID;
        
        IF @AvailableStock < @Quantity
        BEGIN
            RAISERROR('Stock insuficiente', 16, 1);
        END
        
        -- Crear orden
        DECLARE @OrderID INT;
        INSERT INTO Orders (CustomerID, OrderDate, Status)
        VALUES (@CustomerID, GETDATE(), 'Pending');
        
        SET @OrderID = SCOPE_IDENTITY();
        
        -- Agregar detalles
        INSERT INTO OrderDetails (OrderID, ProductID, Quantity, UnitPrice)
        SELECT @OrderID, @ProductID, @Quantity, Price
        FROM Products
        WHERE ProductID = @ProductID;
        
        -- Actualizar stock
        UPDATE Products
        SET Stock = Stock - @Quantity
        WHERE ProductID = @ProductID;
        
        COMMIT TRANSACTION;
        
        -- Retornar OrderID
        SELECT @OrderID AS NewOrderID;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;
        
        -- Log del error
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        DECLARE @ErrorSeverity INT = ERROR_SEVERITY();
        DECLARE @ErrorState INT = ERROR_STATE();
        
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);
    END CATCH
END;
GO
```

## Particionamiento de tablas

```sql
-- Función de partición por fecha
CREATE PARTITION FUNCTION PF_OrdersByYear (DATETIME)
AS RANGE RIGHT FOR VALUES 
    ('2022-01-01', '2023-01-01', '2024-01-01', '2025-01-01');

-- Esquema de partición
CREATE PARTITION SCHEME PS_OrdersByYear
AS PARTITION PF_OrdersByYear
TO (FG_2021, FG_2022, FG_2023, FG_2024, FG_2025);

-- Crear tabla particionada
CREATE TABLE Orders (
    OrderID INT IDENTITY(1,1),
    CustomerID INT NOT NULL,
    OrderDate DATETIME NOT NULL,
    TotalAmount DECIMAL(18,2),
    CONSTRAINT PK_Orders PRIMARY KEY (OrderID, OrderDate)
) ON PS_OrdersByYear(OrderDate);
```

## Monitoreo y diagnóstico

### Queries lentas

```sql
-- Top 10 queries más costosas
SELECT TOP 10
    qs.execution_count,
    qs.total_worker_time / qs.execution_count AS avg_cpu_time,
    qs.total_elapsed_time / qs.execution_count AS avg_elapsed_time,
    qs.total_logical_reads / qs.execution_count AS avg_logical_reads,
    SUBSTRING(qt.text, (qs.statement_start_offset/2)+1,
        ((CASE qs.statement_end_offset
            WHEN -1 THEN DATALENGTH(qt.text)
            ELSE qs.statement_end_offset
        END - qs.statement_start_offset)/2) + 1) AS query_text
FROM sys.dm_exec_query_stats qs
CROSS APPLY sys.dm_exec_sql_text(qs.sql_handle) qt
ORDER BY avg_cpu_time DESC;

-- Índices faltantes
SELECT 
    mid.statement AS TableName,
    migs.avg_user_impact AS AvgImpact,
    migs.user_seeks + migs.user_scans AS TotalSeeksScans,
    mid.equality_columns,
    mid.inequality_columns,
    mid.included_columns
FROM sys.dm_db_missing_index_details mid
INNER JOIN sys.dm_db_missing_index_groups mig 
    ON mid.index_handle = mig.index_handle
INNER JOIN sys.dm_db_missing_index_group_stats migs 
    ON mig.index_group_handle = migs.group_handle
ORDER BY migs.avg_user_impact DESC;
```

### Estadísticas de índices

```sql
-- Uso de índices
SELECT 
    OBJECT_NAME(s.object_id) AS TableName,
    i.name AS IndexName,
    s.user_seeks,
    s.user_scans,
    s.user_lookups,
    s.user_updates
FROM sys.dm_db_index_usage_stats s
INNER JOIN sys.indexes i 
    ON s.object_id = i.object_id 
    AND s.index_id = i.index_id
WHERE OBJECTPROPERTY(s.object_id, 'IsUserTable') = 1
ORDER BY s.user_seeks + s.user_scans + s.user_lookups DESC;
```

## Temporal Tables para auditoría

```sql
-- Tabla con historial automático
CREATE TABLE Products (
    ProductID INT PRIMARY KEY,
    ProductName NVARCHAR(100) NOT NULL,
    Price DECIMAL(18,2) NOT NULL,
    Stock INT NOT NULL,
    
    ValidFrom DATETIME2 GENERATED ALWAYS AS ROW START NOT NULL,
    ValidTo DATETIME2 GENERATED ALWAYS AS ROW END NOT NULL,
    PERIOD FOR SYSTEM_TIME (ValidFrom, ValidTo)
)
WITH (SYSTEM_VERSIONING = ON (HISTORY_TABLE = dbo.ProductsHistory));

-- Consultar estado en el pasado
SELECT * FROM Products
FOR SYSTEM_TIME AS OF '2024-01-01 00:00:00'
WHERE ProductID = 123;

-- Ver todos los cambios
SELECT * FROM Products
FOR SYSTEM_TIME ALL
WHERE ProductID = 123
ORDER BY ValidFrom DESC;
```

## Conclusión

Para dominar SQL Server:
1. Diseña índices estratégicamente
2. Escribe queries SARGABLE
3. Usa CTEs y window functions para análisis
4. Implementa transacciones correctamente
5. Monitorea y optimiza constantemente

¡El rendimiento de tu aplicación depende de ello!
