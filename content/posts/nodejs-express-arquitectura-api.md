---
title: "Node.js y Express: Arquitectura escalable para APIs REST"
date: "2025-12-28"
excerpt: "Diseña APIs REST robustas y escalables usando Node.js y Express con patrones de arquitectura limpia y mejores prácticas de la industria."
category: "Backend"
tags: ["nodejs", "express", "api", "arquitectura", "backend"]
readTime: "15 min lectura"
---

# Node.js y Express: Arquitectura escalable para APIs REST

Construir una API REST bien arquitecturada es fundamental para aplicaciones que escalan. Veamos cómo hacerlo correctamente.

## Estructura del proyecto

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

## Separación de responsabilidades

### 1. Controllers - Manejo de requests

```typescript
// user.controller.ts
import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service';
import { ApiError } from '../utils/ApiError';

export class UserController {
  constructor(private userService: UserService) {}

  async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = await this.userService.getUserById(id);
      
      if (!user) {
        throw new ApiError(404, 'Usuario no encontrado');
      }

      res.json({
        success: true,
        data: user
      });
    } catch (error) {
      next(error);
    }
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.userService.createUser(req.body);
      
      res.status(201).json({
        success: true,
        data: user
      });
    } catch (error) {
      next(error);
    }
  }
}
```

### 2. Services - Lógica de negocio

```typescript
// user.service.ts
import { User, IUser } from '../models/user.model';
import { ApiError } from '../utils/ApiError';
import bcrypt from 'bcryptjs';

export class UserService {
  async getUserById(id: string): Promise<IUser | null> {
    return await User.findById(id).select('-password');
  }

  async createUser(userData: Partial<IUser>): Promise<IUser> {
    // Validar datos
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      throw new ApiError(400, 'Email ya registrado');
    }

    // Hash password
    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 10);
    }

    // Crear usuario
    const user = await User.create(userData);
    
    // Remover password del response
    user.password = undefined;
    
    return user;
  }

  async updateUser(id: string, updates: Partial<IUser>): Promise<IUser | null> {
    // No permitir actualizar email o password directamente
    delete updates.email;
    delete updates.password;

    const user = await User.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-password');

    return user;
  }
}
```

### 3. Middlewares - Validación y autenticación

```typescript
// validation.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { ApiError } from '../utils/ApiError';

export const validate = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new ApiError(400, 'Datos de validación incorrectos', error.errors);
      }
      next(error);
    }
  };
};

// auth.middleware.ts
import jwt from 'jsonwebtoken';

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      throw new ApiError(401, 'Token no proporcionado');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded;
    
    next();
  } catch (error) {
    next(new ApiError(401, 'Token inválido'));
  }
};
```

### 4. Error Handling centralizado

```typescript
// error.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';
import { logger } from '../utils/logger';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(err);

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors,
    });
  }

  // Error genérico
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor',
  });
};

// ApiError.ts
export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public errors?: any[]
  ) {
    super(message);
    this.name = 'ApiError';
  }
}
```

## Rate Limiting

```typescript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // máximo 100 requests
  message: 'Demasiadas peticiones, intenta más tarde',
});

app.use('/api/', limiter);
```

## Logging estructurado

```typescript
import winston from 'winston';

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}
```

## Testing

```typescript
import request from 'supertest';
import { app } from '../app';

describe('User API', () => {
  it('should create a new user', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty('id');
  });
});
```

## Conclusión

Una arquitectura bien diseñada facilita el mantenimiento, testing y escalabilidad de tu API. Invierte tiempo en la estructura inicial y cosecharás los beneficios a largo plazo.
