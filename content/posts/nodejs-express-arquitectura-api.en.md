---
title: "Node.js and Express: Scalable architecture for REST APIs"
date: "2025-12-28"
excerpt: "Design robust and scalable REST APIs using Node.js and Express with clean architecture patterns and industry best practices."
category: "Backend"
tags: ["nodejs", "express", "api", "architecture", "backend"]
readTime: "15 min read"
---

# Node.js and Express: Scalable architecture for REST APIs

Building a well-architected REST API is fundamental for applications that need to scale. Let's look at how to do it right.

## Project structure

```
src/
├── config/
│   ├── database.ts
│   └── environment.ts
├── controllers/
│   └── user.controller.ts
├── middlewares/
│   ├── auth.middleware.ts
│   ├── error.middleware.ts
│   └── validation.middleware.ts
├── models/
│   └── user.model.ts
├── routes/
│   └── user.routes.ts
├── services/
│   └── user.service.ts
├── utils/
│   ├── ApiError.ts
│   └── logger.ts
└── app.ts
```

## Separation of concerns

### 1. Controllers — Request handling

```typescript
// user.controller.ts
import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user.service";
import { ApiError } from "../utils/ApiError";

export class UserController {
  constructor(private userService: UserService) {}

  async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = await this.userService.getUserById(id);

      if (!user) {
        throw new ApiError(404, "User not found");
      }

      res.json({ success: true, data: user });
    } catch (error) {
      next(error);
    }
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.userService.createUser(req.body);
      res.status(201).json({ success: true, data: user });
    } catch (error) {
      next(error);
    }
  }
}
```

### 2. Services — Business logic

```typescript
// user.service.ts
import { User, IUser } from "../models/user.model";
import { ApiError } from "../utils/ApiError";
import bcrypt from "bcryptjs";

export class UserService {
  async getUserById(id: string): Promise<IUser | null> {
    return User.findById(id).select("-password");
  }

  async createUser(userData: Partial<IUser>): Promise<IUser> {
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      throw new ApiError(400, "Email already registered");
    }

    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 10);
    }

    const user = await User.create(userData);
    user.password = undefined;
    return user;
  }
}
```

### 3. Middleware — Cross-cutting concerns

```typescript
// error.middleware.ts
import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";

export function errorMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      error: err.message,
    });
  }

  console.error("Unhandled error:", err);
  res.status(500).json({
    success: false,
    error: "Internal server error",
  });
}
```

## Input validation with Zod

```typescript
import { z } from "zod";

const CreateUserSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .regex(/(?=.*[A-Z])(?=.*[0-9])/),
  role: z.enum(["user", "admin"]).default("user"),
});

export function validateBody<T>(schema: z.ZodType<T>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        success: false,
        errors: result.error.flatten(),
      });
    }
    req.body = result.data;
    next();
  };
}
```

## Best practices

1. **Never mix business logic with routing** — controllers only delegate, services decide.
2. **Validate at the boundary** — trust nothing from the request body.
3. **Use a centralized error handler** to keep error responses consistent.
4. **Prefer dependency injection** over direct imports for testability.
5. **Log at the right level** — info for operations, warn for recoverable issues, error for failures.

## Conclusion

A well-structured Node.js API is much easier to test, extend, and hand off to a team. The layered architecture shown here maps cleanly to typical microservice boundaries and scales naturally as the application grows.
