---
title: "MongoDB: Modelado de datos y optimización de consultas"
date: "2026-01-05"
excerpt: "Aprende a diseñar esquemas eficientes en MongoDB, optimizar consultas y aplicar mejores prácticas para bases de datos NoSQL."
category: "Bases de Datos"
tags: ["mongodb", "nosql", "database", "performance"]
readTime: "12 min lectura"
---

# MongoDB: Modelado de datos y optimización de consultas

MongoDB ofrece flexibilidad en el modelado de datos, pero esta libertad requiere decisiones arquitectónicas importantes.

## Principios de modelado

### Embedding vs Referencing

**Embedding** - Documentos anidados:

```javascript
// Bueno cuando: Relación 1-a-pocos, datos que se consultan juntos
{
  _id: ObjectId("..."),
  nombre: "Juan Pérez",
  direcciones: [
    {
      calle: "Av. Principal 123",
      ciudad: "Buenos Aires",
      tipo: "casa"
    },
    {
      calle: "Calle Trabajo 456",
      ciudad: "Buenos Aires",
      tipo: "trabajo"
    }
  ]
}
```

**Referencing** - Referencias entre documentos:

```javascript
// Bueno cuando: Relación muchos-a-muchos, datos que crecen sin límite
// Usuario
{
  _id: ObjectId("user1"),
  nombre: "Juan Pérez",
  ordenes: [
    ObjectId("order1"),
    ObjectId("order2")
  ]
}

// Orden
{
  _id: ObjectId("order1"),
  usuario_id: ObjectId("user1"),
  total: 1500,
  items: [...]
}
```

## Índices efectivos

### Índices compuestos

```javascript
// Crear índice compuesto para consultas frecuentes
db.usuarios.createIndex({ ciudad: 1, edad: -1 });

// Consulta optimizada
db.usuarios.find({ ciudad: "Buenos Aires", edad: { $gte: 25 } })
  .sort({ edad: -1 });
```

### Índices de texto

```javascript
// Índice de texto para búsquedas
db.productos.createIndex({ 
  nombre: "text", 
  descripcion: "text" 
});

// Búsqueda de texto
db.productos.find({ 
  $text: { $search: "laptop gaming" } 
});
```

## Aggregation Pipeline

```javascript
// Pipeline complejo para análisis de ventas
db.ventas.aggregate([
  // Stage 1: Filtrar por fecha
  {
    $match: {
      fecha: {
        $gte: ISODate("2026-01-01"),
        $lt: ISODate("2026-02-01")
      }
    }
  },
  // Stage 2: Agrupar por producto
  {
    $group: {
      _id: "$producto_id",
      total_vendido: { $sum: "$cantidad" },
      ingresos: { $sum: "$total" },
      promedio: { $avg: "$total" }
    }
  },
  // Stage 3: Ordenar por ingresos
  {
    $sort: { ingresos: -1 }
  },
  // Stage 4: Limitar a top 10
  {
    $limit: 10
  },
  // Stage 5: Lookup para datos del producto
  {
    $lookup: {
      from: "productos",
      localField: "_id",
      foreignField: "_id",
      as: "producto_info"
    }
  }
]);
```

## Optimización de consultas

### 1. Usa `explain()` para analizar performance

```javascript
db.usuarios.find({ edad: { $gt: 25 } }).explain("executionStats");
```

### 2. Proyección para reducir datos transferidos

```javascript
// Solo traer campos necesarios
db.usuarios.find(
  { ciudad: "Buenos Aires" },
  { nombre: 1, email: 1, _id: 0 }
);
```

### 3. Paginación eficiente

```javascript
// Evitar skip() para grandes datasets
const lastId = ObjectId("...");
db.productos
  .find({ _id: { $gt: lastId } })
  .sort({ _id: 1 })
  .limit(20);
```

## Patrones avanzados

### Bucketing Pattern

```javascript
// Para series temporales
{
  sensor_id: "sensor_1",
  fecha: ISODate("2026-01-20"),
  lecturas: [
    { timestamp: ISODate("2026-01-20T10:00:00Z"), temp: 23.5 },
    { timestamp: ISODate("2026-01-20T10:01:00Z"), temp: 23.6 },
    // ... más lecturas del mismo día
  ],
  estadisticas: {
    min: 22.1,
    max: 24.8,
    avg: 23.4
  }
}
```

### Computed Pattern

```javascript
// Precalcular valores frecuentes
{
  _id: ObjectId("..."),
  titulo: "Producto X",
  precio: 100,
  cantidad_reviews: 50,  // Calculado
  rating_promedio: 4.5,  // Calculado
  ultima_actualizacion: ISODate("...")
}
```

## Mejores prácticas

1. **Desnormaliza con propósito** - Solo cuando mejore performance
2. **Monitorea tamaño de documentos** - Límite de 16MB
3. **Usa esquemas flexibles inteligentemente** - No significa sin estructura
4. **Implementa validación** - JSON Schema validation
5. **Planifica sharding** - Antes de escalar horizontalmente

## Conclusión

MongoDB es poderoso cuando se modela correctamente. La clave está en entender tus patrones de acceso a datos y diseñar el esquema en consecuencia.
