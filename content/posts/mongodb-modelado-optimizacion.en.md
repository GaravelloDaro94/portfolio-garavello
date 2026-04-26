---
title: "MongoDB: Data modeling and query optimization"
date: "2026-01-05"
excerpt: "Learn how to design efficient schemas in MongoDB, optimize queries, and apply best practices for NoSQL databases."
category: "Databases"
tags: ["mongodb", "nosql", "database", "performance"]
readTime: "12 min read"
---

# MongoDB: Data modeling and query optimization

MongoDB offers flexibility in data modeling, but this freedom requires important architectural decisions.

## Modeling principles

### Embedding vs Referencing

**Embedding** — Nested documents:

```javascript
// Good when: 1-to-few relationships, data always queried together
{
  _id: ObjectId("..."),
  name: "Jane Doe",
  addresses: [
    { street: "123 Main St", city: "Buenos Aires", type: "home" },
    { street: "456 Work Ave", city: "Buenos Aires", type: "work" }
  ]
}
```

**Referencing** — References between documents:

```javascript
// Good when: many-to-many relationships, unbounded growth
// User
{
  _id: ObjectId("user1"),
  name: "Jane Doe",
  orders: [ ObjectId("order1"), ObjectId("order2") ]
}

// Order
{
  _id: ObjectId("order1"),
  user_id: ObjectId("user1"),
  total: 1500,
  items: [...]
}
```

## Effective indexes

### Compound indexes

```javascript
// Create a compound index for frequent queries
db.users.createIndex({ city: 1, age: -1 });

// Optimized query using the index
db.users.find({ city: "Buenos Aires", age: { $gte: 25 } }).sort({ age: -1 });
```

### Text indexes

```javascript
db.products.createIndex({ name: "text", description: "text" });

db.products.find({ $text: { $search: "gaming laptop" } });
```

## Aggregation Pipeline

```javascript
db.sales.aggregate([
  // Stage 1: Filter by date
  {
    $match: {
      date: {
        $gte: ISODate("2026-01-01"),
        $lt: ISODate("2026-02-01"),
      },
    },
  },
  // Stage 2: Group by product
  {
    $group: {
      _id: "$product_id",
      total_sold: { $sum: "$quantity" },
      revenue: { $sum: "$total" },
      average: { $avg: "$total" },
    },
  },
  // Stage 3: Sort by revenue
  { $sort: { revenue: -1 } },
  // Stage 4: Top 10 only
  { $limit: 10 },
  // Stage 5: Enrich with product details
  {
    $lookup: {
      from: "products",
      localField: "_id",
      foreignField: "_id",
      as: "product_info",
    },
  },
]);
```

## Schema validation

```javascript
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "email", "created_at"],
      properties: {
        name: { bsonType: "string", minLength: 2, maxLength: 100 },
        email: { bsonType: "string", pattern: "^.+@.+$" },
        age: { bsonType: "int", minimum: 0, maximum: 150 },
        created_at: { bsonType: "date" },
      },
    },
  },
  validationLevel: "strict",
  validationAction: "error",
});
```

## Best practices

1. **Model for your queries** — design documents around how data will be read, not how it is stored.
2. **Avoid unbounded arrays** — documents have a 16 MB limit; large arrays become a maintenance problem.
3. **Index selectively** — each index speeds up reads but slows down writes.
4. **Use the aggregation pipeline** instead of multiple round-trips for complex data transformations.
5. **Monitor with explain()** to verify index usage on critical queries.

## Conclusion

MongoDB is a powerful tool when used intentionally. The key is understanding the trade-offs between embedding and referencing, and always modeling data to serve the application's actual read patterns rather than abstract normalization rules.
