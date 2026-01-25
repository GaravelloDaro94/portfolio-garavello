---
title: "TypeScript en proyectos reales: Patrones y anti-patrones"
date: "2026-01-10"
excerpt: "Guía práctica sobre cómo usar TypeScript efectivamente en aplicaciones de producción, incluyendo patrones recomendados y errores comunes a evitar."
category: "TypeScript"
tags: ["typescript", "javascript", "best-practices", "types"]
readTime: "10 min lectura"
---

# TypeScript en proyectos reales: Patrones y anti-patrones

TypeScript se ha convertido en el estándar de facto para aplicaciones JavaScript empresariales. Veamos cómo aprovecharlo al máximo.

## Patrones Recomendados

### 1. Tipos discriminados (Discriminated Unions)

```typescript
type Success<T> = {
  status: 'success';
  data: T;
};

type Error = {
  status: 'error';
  message: string;
};

type Result<T> = Success<T> | Error;

function handleResult<T>(result: Result<T>) {
  if (result.status === 'success') {
    // TypeScript sabe que result.data existe aquí
    console.log(result.data);
  } else {
    // TypeScript sabe que result.message existe aquí
    console.error(result.message);
  }
}
```

### 2. Utility Types personalizados

```typescript
// Hacer todas las propiedades opcionales excepto algunas
type RequireFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

interface User {
  id: string;
  name?: string;
  email?: string;
  age?: number;
}

// id y email son requeridos, name y age opcionales
type UserWithRequired = RequireFields<User, 'id' | 'email'>;
```

### 3. Type Guards personalizados

```typescript
interface Dog {
  type: 'dog';
  bark: () => void;
}

interface Cat {
  type: 'cat';
  meow: () => void;
}

type Pet = Dog | Cat;

function isDog(pet: Pet): pet is Dog {
  return pet.type === 'dog';
}

function handlePet(pet: Pet) {
  if (isDog(pet)) {
    pet.bark(); // TypeScript sabe que es Dog
  } else {
    pet.meow(); // TypeScript sabe que es Cat
  }
}
```

## Anti-patrones a evitar

### ❌ Uso excesivo de `any`

```typescript
// Mal
function processData(data: any): any {
  return data.value;
}

// Bien
function processData<T extends { value: unknown }>(data: T): T['value'] {
  return data.value;
}
```

### ❌ Type assertions innecesarios

```typescript
// Mal
const value = JSON.parse(jsonString) as MyType;

// Bien
function parseAs<T>(json: string, validator: (obj: unknown) => obj is T): T {
  const parsed = JSON.parse(json);
  if (!validator(parsed)) {
    throw new Error('Invalid data');
  }
  return parsed;
}
```

### ❌ Interfaces demasiado genéricas

```typescript
// Mal
interface Props {
  data?: any;
  config?: any;
  handlers?: any;
}

// Bien
interface Props<T> {
  data: T;
  config: Config;
  handlers: EventHandlers;
}
```

## Configuración recomendada de tsconfig.json

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

## Conclusión

TypeScript es una herramienta poderosa cuando se usa correctamente. La clave está en aprovechar su sistema de tipos sin caer en sobre-ingeniería o bypass de la seguridad de tipos.

Recuerda: **TypeScript es tu aliado, no tu enemigo**.
