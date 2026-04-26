---
title: "TypeScript in real projects: Patterns and anti-patterns"
date: "2026-01-10"
excerpt: "A practical guide on using TypeScript effectively in production applications, covering recommended patterns and common mistakes to avoid."
category: "TypeScript"
tags: ["typescript", "javascript", "best-practices", "types"]
readTime: "10 min read"
---

# TypeScript in real projects: Patterns and anti-patterns

TypeScript has become the de facto standard for enterprise JavaScript applications. Let's look at how to get the most out of it.

## Recommended Patterns

### 1. Discriminated Unions

```typescript
type Success<T> = {
  status: "success";
  data: T;
};

type Error = {
  status: "error";
  message: string;
};

type Result<T> = Success<T> | Error;

function handleResult<T>(result: Result<T>) {
  if (result.status === "success") {
    // TypeScript knows result.data exists here
    console.log(result.data);
  } else {
    // TypeScript knows result.message exists here
    console.error(result.message);
  }
}
```

### 2. Custom Utility Types

```typescript
// Make all properties optional except specific ones
type RequireFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

interface User {
  id: string;
  name?: string;
  email?: string;
  age?: number;
}

// id and email are required, name and age remain optional
type UserWithRequired = RequireFields<User, "id" | "email">;
```

### 3. Custom Type Guards

```typescript
interface Dog {
  type: "dog";
  bark: () => void;
}

interface Cat {
  type: "cat";
  meow: () => void;
}

type Pet = Dog | Cat;

function isDog(pet: Pet): pet is Dog {
  return pet.type === "dog";
}

function handlePet(pet: Pet) {
  if (isDog(pet)) {
    pet.bark(); // TypeScript knows this is a Dog
  } else {
    pet.meow(); // TypeScript knows this is a Cat
  }
}
```

## Anti-patterns to avoid

### ❌ Overusing `any`

```typescript
// Bad
function processData(data: any): any {
  return data.value;
}

// Good
function processData<T extends { value: unknown }>(data: T): T["value"] {
  return data.value;
}
```

### ❌ Unnecessary type assertions

```typescript
// Bad
const value = JSON.parse(jsonString) as MyType;

// Good
function parseAs<T>(json: string, validator: (obj: unknown) => obj is T): T {
  const parsed = JSON.parse(json);
  if (!validator(parsed)) {
    throw new Error("Invalid data");
  }
  return parsed;
}
```

### ❌ Overly generic interfaces

```typescript
// Bad
interface Data {
  [key: string]: any;
}

// Good — explicit, precise types
interface UserData {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}
```

## Advanced Generics

```typescript
// Generic Repository pattern
interface Repository<T, ID> {
  findById(id: ID): Promise<T | null>;
  findAll(): Promise<T[]>;
  save(entity: T): Promise<T>;
  delete(id: ID): Promise<void>;
}

// Conditional types
type NonNullable<T> = T extends null | undefined ? never : T;
type ArrayElement<T> = T extends (infer E)[] ? E : never;

// Template literal types
type EventName = "click" | "focus" | "blur";
type EventHandler = `on${Capitalize<EventName>}`;
// Result: "onClick" | "onFocus" | "onBlur"
```

## Strict configuration

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "exactOptionalPropertyTypes": true
  }
}
```

## Conclusion

TypeScript is a powerful tool when used correctly. The patterns shown here help build robust, maintainable, and scalable code. The key is finding the right balance between strictness and developer ergonomics.

Start with strict mode enabled — it's much easier to relax rules than to add them later on a large codebase.
