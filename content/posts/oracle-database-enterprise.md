---
title: "Oracle Database: Arquitectura y optimización empresarial"
date: "2025-12-05"
excerpt: "Explora Oracle Database con enfoque en PL/SQL, optimización de queries, gestión de particiones y características empresariales para sistemas críticos."
category: "Bases de Datos"
tags: ["oracle", "plsql", "database", "enterprise"]
readTime: "14 min lectura"
---

# Oracle Database: Arquitectura y optimización empresarial

Oracle es la base de datos empresarial por excelencia. Domina PL/SQL y optimización para sistemas críticos.

## PL/SQL: Fundamentos avanzados

### Procedimientos con manejo de excepciones

```sql
CREATE OR REPLACE PROCEDURE process_order (
    p_customer_id IN NUMBER,
    p_product_id IN NUMBER,
    p_quantity IN NUMBER,
    p_order_id OUT NUMBER
) AS
    v_available_stock NUMBER;
    v_unit_price NUMBER(10,2);
    e_insufficient_stock EXCEPTION;
    e_invalid_product EXCEPTION;
BEGIN
    -- Validar producto
    BEGIN
        SELECT stock, price
        INTO v_available_stock, v_unit_price
        FROM products
        WHERE product_id = p_product_id
        FOR UPDATE NOWAIT;
    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            RAISE e_invalid_product;
    END;
    
    -- Verificar stock
    IF v_available_stock < p_quantity THEN
        RAISE e_insufficient_stock;
    END IF;
    
    -- Crear orden
    INSERT INTO orders (customer_id, order_date, status)
    VALUES (p_customer_id, SYSDATE, 'PENDING')
    RETURNING order_id INTO p_order_id;
    
    -- Insertar detalles
    INSERT INTO order_details (order_id, product_id, quantity, unit_price)
    VALUES (p_order_id, p_product_id, p_quantity, v_unit_price);
    
    -- Actualizar stock
    UPDATE products
    SET stock = stock - p_quantity,
        last_updated = SYSDATE
    WHERE product_id = p_product_id;
    
    COMMIT;
    
EXCEPTION
    WHEN e_insufficient_stock THEN
        ROLLBACK;
        RAISE_APPLICATION_ERROR(-20001, 
            'Stock insuficiente. Disponible: ' || v_available_stock);
    
    WHEN e_invalid_product THEN
        ROLLBACK;
        RAISE_APPLICATION_ERROR(-20002, 
            'Producto no encontrado: ' || p_product_id);
    
    WHEN OTHERS THEN
        ROLLBACK;
        RAISE_APPLICATION_ERROR(-20999, 
            'Error procesando orden: ' || SQLERRM);
END process_order;
/
```

### Funciones y packages

```sql
-- Package specification
CREATE OR REPLACE PACKAGE sales_analytics AS
    -- Constantes
    c_premium_threshold CONSTANT NUMBER := 10000;
    c_vip_threshold CONSTANT NUMBER := 50000;
    
    -- Funciones
    FUNCTION get_customer_tier(
        p_customer_id IN NUMBER
    ) RETURN VARCHAR2;
    
    FUNCTION calculate_discount(
        p_customer_id IN NUMBER,
        p_amount IN NUMBER
    ) RETURN NUMBER;
    
    -- Procedimientos
    PROCEDURE update_customer_stats(
        p_customer_id IN NUMBER
    );
    
END sales_analytics;
/

-- Package body
CREATE OR REPLACE PACKAGE BODY sales_analytics AS
    
    FUNCTION get_customer_tier(
        p_customer_id IN NUMBER
    ) RETURN VARCHAR2 IS
        v_total_purchases NUMBER;
    BEGIN
        SELECT NVL(SUM(total_amount), 0)
        INTO v_total_purchases
        FROM orders
        WHERE customer_id = p_customer_id
          AND order_date >= ADD_MONTHS(SYSDATE, -12);
        
        RETURN CASE
            WHEN v_total_purchases >= c_vip_threshold THEN 'VIP'
            WHEN v_total_purchases >= c_premium_threshold THEN 'PREMIUM'
            ELSE 'STANDARD'
        END;
    END get_customer_tier;
    
    FUNCTION calculate_discount(
        p_customer_id IN NUMBER,
        p_amount IN NUMBER
    ) RETURN NUMBER IS
        v_tier VARCHAR2(20);
        v_discount NUMBER := 0;
    BEGIN
        v_tier := get_customer_tier(p_customer_id);
        
        v_discount := CASE v_tier
            WHEN 'VIP' THEN p_amount * 0.15
            WHEN 'PREMIUM' THEN p_amount * 0.10
            ELSE 0
        END;
        
        RETURN v_discount;
    END calculate_discount;
    
    PROCEDURE update_customer_stats(
        p_customer_id IN NUMBER
    ) IS
    BEGIN
        MERGE INTO customer_stats cs
        USING (
            SELECT 
                customer_id,
                COUNT(*) AS order_count,
                SUM(total_amount) AS total_spent,
                AVG(total_amount) AS avg_order_value,
                MAX(order_date) AS last_order_date
            FROM orders
            WHERE customer_id = p_customer_id
            GROUP BY customer_id
        ) o
        ON (cs.customer_id = o.customer_id)
        WHEN MATCHED THEN
            UPDATE SET
                cs.order_count = o.order_count,
                cs.total_spent = o.total_spent,
                cs.avg_order_value = o.avg_order_value,
                cs.last_order_date = o.last_order_date,
                cs.tier = get_customer_tier(p_customer_id),
                cs.updated_at = SYSDATE
        WHEN NOT MATCHED THEN
            INSERT (customer_id, order_count, total_spent, 
                    avg_order_value, last_order_date, tier, updated_at)
            VALUES (o.customer_id, o.order_count, o.total_spent,
                    o.avg_order_value, o.last_order_date,
                    get_customer_tier(p_customer_id), SYSDATE);
        
        COMMIT;
    END update_customer_stats;
    
END sales_analytics;
/
```

## Optimización de queries

### Hints para el optimizador

```sql
-- Forzar uso de índice
SELECT /*+ INDEX(o idx_orders_customer_date) */
    o.order_id, o.order_date, o.total_amount
FROM orders o
WHERE o.customer_id = 123
  AND o.order_date >= TRUNC(SYSDATE) - 30;

-- Forzar full table scan cuando es más eficiente
SELECT /*+ FULL(c) */
    customer_id, name, email
FROM customers c
WHERE UPPER(name) LIKE '%GARCIA%';

-- Parallel query para grandes volúmenes
SELECT /*+ PARALLEL(o, 4) */
    EXTRACT(YEAR FROM order_date) AS year,
    EXTRACT(MONTH FROM order_date) AS month,
    SUM(total_amount) AS monthly_total
FROM orders o
WHERE order_date >= ADD_MONTHS(SYSDATE, -24)
GROUP BY EXTRACT(YEAR FROM order_date), 
         EXTRACT(MONTH FROM order_date);
```

### Analíticas con window functions

```sql
-- Ranking y percentiles
SELECT 
    customer_id,
    total_spent,
    RANK() OVER (ORDER BY total_spent DESC) AS rank,
    DENSE_RANK() OVER (ORDER BY total_spent DESC) AS dense_rank,
    PERCENT_RANK() OVER (ORDER BY total_spent DESC) AS percentile,
    NTILE(10) OVER (ORDER BY total_spent DESC) AS decile
FROM (
    SELECT customer_id, SUM(total_amount) AS total_spent
    FROM orders
    GROUP BY customer_id
);

-- Moving averages y lag/lead
SELECT 
    order_date,
    total_amount,
    AVG(total_amount) OVER (
        ORDER BY order_date
        ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
    ) AS moving_7day_avg,
    LAG(total_amount, 1) OVER (ORDER BY order_date) AS prev_day,
    LEAD(total_amount, 1) OVER (ORDER BY order_date) AS next_day,
    total_amount - LAG(total_amount, 1) OVER (ORDER BY order_date) AS daily_change
FROM daily_sales
ORDER BY order_date;
```

## Particionamiento avanzado

### Range partitioning por fecha

```sql
CREATE TABLE orders (
    order_id NUMBER PRIMARY KEY,
    customer_id NUMBER NOT NULL,
    order_date DATE NOT NULL,
    total_amount NUMBER(10,2),
    status VARCHAR2(20)
)
PARTITION BY RANGE (order_date) (
    PARTITION p_2023_q1 VALUES LESS THAN (TO_DATE('2023-04-01', 'YYYY-MM-DD')),
    PARTITION p_2023_q2 VALUES LESS THAN (TO_DATE('2023-07-01', 'YYYY-MM-DD')),
    PARTITION p_2023_q3 VALUES LESS THAN (TO_DATE('2023-10-01', 'YYYY-MM-DD')),
    PARTITION p_2023_q4 VALUES LESS THAN (TO_DATE('2024-01-01', 'YYYY-MM-DD')),
    PARTITION p_2024_q1 VALUES LESS THAN (TO_DATE('2024-04-01', 'YYYY-MM-DD')),
    PARTITION p_future VALUES LESS THAN (MAXVALUE)
);

-- Índice local particionado
CREATE INDEX idx_orders_customer 
ON orders(customer_id) LOCAL;
```

### Composite partitioning

```sql
-- Particionamiento por rango y luego por hash
CREATE TABLE sales_data (
    sale_id NUMBER,
    sale_date DATE,
    customer_id NUMBER,
    product_id NUMBER,
    amount NUMBER(10,2)
)
PARTITION BY RANGE (sale_date)
SUBPARTITION BY HASH (customer_id)
SUBPARTITIONS 4 (
    PARTITION p_2023 VALUES LESS THAN (TO_DATE('2024-01-01', 'YYYY-MM-DD')),
    PARTITION p_2024 VALUES LESS THAN (TO_DATE('2025-01-01', 'YYYY-MM-DD')),
    PARTITION p_2025 VALUES LESS THAN (MAXVALUE)
);
```

## Materializada Views para performance

```sql
-- Vista materializada con refresh automático
CREATE MATERIALIZED VIEW mv_monthly_sales
BUILD IMMEDIATE
REFRESH FAST ON COMMIT
ENABLE QUERY REWRITE
AS
SELECT 
    TRUNC(order_date, 'MM') AS month,
    customer_id,
    COUNT(*) AS order_count,
    SUM(total_amount) AS total_sales,
    AVG(total_amount) AS avg_order_value
FROM orders
GROUP BY TRUNC(order_date, 'MM'), customer_id;

-- Índice en la vista materializada
CREATE INDEX idx_mv_monthly_customer 
ON mv_monthly_sales(customer_id, month);

-- Refresh manual
BEGIN
    DBMS_MVIEW.REFRESH('MV_MONTHLY_SALES', 'C');
END;
/
```

## Cursores y bulk operations

### Cursor con bulk collect

```sql
DECLARE
    TYPE t_customer_list IS TABLE OF customers%ROWTYPE;
    v_customers t_customer_list;
    
    CURSOR c_inactive_customers IS
        SELECT *
        FROM customers c
        WHERE NOT EXISTS (
            SELECT 1
            FROM orders o
            WHERE o.customer_id = c.customer_id
              AND o.order_date >= ADD_MONTHS(SYSDATE, -12)
        );
BEGIN
    OPEN c_inactive_customers;
    
    LOOP
        FETCH c_inactive_customers 
        BULK COLLECT INTO v_customers 
        LIMIT 1000; -- Procesar en lotes
        
        EXIT WHEN v_customers.COUNT = 0;
        
        -- Procesar lote
        FORALL i IN 1..v_customers.COUNT
            UPDATE customers
            SET status = 'INACTIVE',
                last_updated = SYSDATE
            WHERE customer_id = v_customers(i).customer_id;
        
        COMMIT;
    END LOOP;
    
    CLOSE c_inactive_customers;
END;
/
```

## Auditoría con triggers

```sql
-- Tabla de auditoría
CREATE TABLE audit_log (
    audit_id NUMBER GENERATED ALWAYS AS IDENTITY,
    table_name VARCHAR2(50),
    operation VARCHAR2(10),
    record_id NUMBER,
    old_values CLOB,
    new_values CLOB,
    changed_by VARCHAR2(100),
    changed_at TIMESTAMP,
    CONSTRAINT pk_audit_log PRIMARY KEY (audit_id)
);

-- Trigger de auditoría
CREATE OR REPLACE TRIGGER trg_products_audit
AFTER INSERT OR UPDATE OR DELETE ON products
FOR EACH ROW
DECLARE
    v_operation VARCHAR2(10);
    v_old_values CLOB;
    v_new_values CLOB;
BEGIN
    v_operation := CASE
        WHEN INSERTING THEN 'INSERT'
        WHEN UPDATING THEN 'UPDATE'
        WHEN DELETING THEN 'DELETE'
    END;
    
    IF DELETING OR UPDATING THEN
        v_old_values := JSON_OBJECT(
            'product_id' VALUE :OLD.product_id,
            'name' VALUE :OLD.product_name,
            'price' VALUE :OLD.price,
            'stock' VALUE :OLD.stock
        );
    END IF;
    
    IF INSERTING OR UPDATING THEN
        v_new_values := JSON_OBJECT(
            'product_id' VALUE :NEW.product_id,
            'name' VALUE :NEW.product_name,
            'price' VALUE :NEW.price,
            'stock' VALUE :NEW.stock
        );
    END IF;
    
    INSERT INTO audit_log (
        table_name, operation, record_id,
        old_values, new_values,
        changed_by, changed_at
    ) VALUES (
        'PRODUCTS', v_operation,
        COALESCE(:NEW.product_id, :OLD.product_id),
        v_old_values, v_new_values,
        USER, SYSTIMESTAMP
    );
END;
/
```

## Performance tuning

### Estadísticas y plan de ejecución

```sql
-- Actualizar estadísticas
BEGIN
    DBMS_STATS.GATHER_TABLE_STATS(
        ownname => 'MYSCHEMA',
        tabname => 'ORDERS',
        estimate_percent => DBMS_STATS.AUTO_SAMPLE_SIZE,
        method_opt => 'FOR ALL COLUMNS SIZE AUTO',
        cascade => TRUE
    );
END;
/

-- Ver plan de ejecución
EXPLAIN PLAN FOR
SELECT o.order_id, c.customer_name, SUM(od.quantity * od.unit_price)
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id
JOIN order_details od ON o.order_id = od.order_id
WHERE o.order_date >= TRUNC(SYSDATE) - 30
GROUP BY o.order_id, c.customer_name;

SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY);
```

### AWR Reports para diagnóstico

```sql
-- Generar AWR report
SELECT output
FROM TABLE(DBMS_WORKLOAD_REPOSITORY.AWR_REPORT_TEXT(
    l_dbid => (SELECT dbid FROM v$database),
    l_inst_num => 1,
    l_bid => 100,  -- Begin snapshot
    l_eid => 110   -- End snapshot
));
```

## Conclusión

Oracle Database ofrece características empresariales robustas:
1. PL/SQL para lógica de negocio compleja
2. Particionamiento para escalabilidad
3. Materialized views para performance
4. Auditoría y seguridad avanzada
5. Tuning con hints y estadísticas

¡Domina Oracle para sistemas mission-critical!
