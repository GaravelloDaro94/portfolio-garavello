---
title: "SQL Server: Optimization and best practices"
date: "2025-12-10"
excerpt: "Master SQL Server with optimization techniques, index design, efficient queries, and advanced patterns for high-performance applications."
category: "Databases"
tags: ["sqlserver", "database", "optimization", "tsql"]
readTime: "13 min read"
---

# SQL Server: Optimization and best practices

SQL Server is one of the most powerful database engines available. Let's see how to get the most out of it.

## Indexes: The key to performance

### Clustered vs non-clustered indexes

```sql
-- Clustered index (only one per table)
-- Defines the physical order of data
CREATE TABLE Orders (
    OrderID INT PRIMARY KEY CLUSTERED,
    CustomerID INT NOT NULL,
    OrderDate DATETIME NOT NULL,
    TotalAmount DECIMAL(18,2)
);

-- Non-clustered indexes (multiple per table)
CREATE NONCLUSTERED INDEX IX_Orders_CustomerID
ON Orders(CustomerID)
INCLUDE (OrderDate, TotalAmount);

-- Composite index for specific searches
CREATE NONCLUSTERED INDEX IX_Orders_CustomerDate
ON Orders(CustomerID, OrderDate DESC)
INCLUDE (TotalAmount);
```

### Filtered indexes for optimization

```sql
-- Index only for active orders
CREATE NONCLUSTERED INDEX IX_Orders_Active
ON Orders(OrderDate)
WHERE Status = 'Active'
INCLUDE (CustomerID, TotalAmount);

-- Useful when a column has few distinct values
CREATE NONCLUSTERED INDEX IX_Orders_Premium
ON Orders(CustomerID)
WHERE CustomerType = 'Premium';
```

## Optimized queries

### SARGABLE queries (Search ARGument ABLE)

```sql
-- ❌ Bad — does not use indexes
SELECT * FROM Orders
WHERE YEAR(OrderDate) = 2024;

-- ✅ Good — SARGABLE
SELECT * FROM Orders
WHERE OrderDate >= '2024-01-01'
  AND OrderDate < '2025-01-01';

-- ❌ Bad
SELECT * FROM Products
WHERE Price * Quantity > 1000;

-- ✅ Good
SELECT * FROM Products
WHERE Price > 1000 / Quantity;
```

### Avoid SELECT \*

```sql
-- ❌ Bad — fetches unnecessary columns
SELECT * FROM Customers
WHERE City = 'Madrid';

-- ✅ Good — only the needed columns
SELECT CustomerID, Name, Email
FROM Customers
WHERE City = 'Madrid';
```

### Use EXISTS instead of IN for subqueries

```sql
-- ❌ Less efficient
SELECT * FROM Customers c
WHERE c.CustomerID IN (
    SELECT CustomerID FROM Orders
    WHERE OrderDate > '2024-01-01'
);

-- ✅ More efficient
SELECT * FROM Customers c
WHERE EXISTS (
    SELECT 1 FROM Orders o
    WHERE o.CustomerID = c.CustomerID
      AND o.OrderDate > '2024-01-01'
);
```

## CTEs and Window Functions

### Common Table Expressions

```sql
WITH MonthlyOrders AS (
    SELECT
        CustomerID,
        YEAR(OrderDate)  AS Year,
        MONTH(OrderDate) AS Month,
        SUM(TotalAmount) AS MonthlyTotal
    FROM Orders
    GROUP BY CustomerID, YEAR(OrderDate), MONTH(OrderDate)
),
CustomerRanking AS (
    SELECT
        CustomerID,
        AVG(MonthlyTotal) AS AvgMonthly,
        MAX(MonthlyTotal) AS BestMonth,
        ROW_NUMBER() OVER (ORDER BY AVG(MonthlyTotal) DESC) AS Rank
    FROM MonthlyOrders
    GROUP BY CustomerID
)
SELECT TOP 10
    c.Name,
    cr.AvgMonthly,
    cr.BestMonth,
    cr.Rank
FROM CustomerRanking cr
JOIN Customers c ON cr.CustomerID = c.CustomerID
ORDER BY cr.Rank;
```

### Window Functions

```sql
SELECT
    CustomerID,
    OrderDate,
    TotalAmount,
    SUM(TotalAmount)  OVER (PARTITION BY CustomerID ORDER BY OrderDate) AS RunningTotal,
    AVG(TotalAmount)  OVER (PARTITION BY CustomerID) AS CustomerAvg,
    ROW_NUMBER()      OVER (PARTITION BY CustomerID ORDER BY TotalAmount DESC) AS OrderRank,
    LAG(TotalAmount)  OVER (PARTITION BY CustomerID ORDER BY OrderDate) AS PreviousOrder,
    LEAD(TotalAmount) OVER (PARTITION BY CustomerID ORDER BY OrderDate) AS NextOrder
FROM Orders;
```

## Best practices

1. **Always analyze execution plans** before deploying queries to production.
2. **Keep statistics up to date** — SQL Server relies on them for optimal execution plans.
3. **Avoid cursors** where set-based operations will do.
4. **Use parameterized queries** to prevent SQL injection and enable plan reuse.
5. **Partition large tables** to improve manageability and query performance.

## Conclusion

SQL Server optimization is an ongoing process. Start with solid index design, write SARGABLE queries, and use execution plans to guide improvements. The investment in getting these foundations right pays dividends in performance and maintainability.
