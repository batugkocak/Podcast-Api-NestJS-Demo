# NestJS Introduction

NestJS is a TypeScript-based Node.js framework for building efficient, scalable server-side applications. It combines concepts from OOP (Object-Oriented Programming), FP (Functional Programming), and FRP (Functional Reactive Programming).

---

## CLI Essentials

### Installation

```bash
npm i -g @nestjs/cli
```

### Commands

- **Create a New Project**
  ```bash
  nest new project-name
  ```
- **Generate Module**
  ```bash
  nest g mo module-name
  ```
- **Generate Controller**
  ```bash
  nest g co controller-name
  ```
- **Generate Service**
  ```bash
  nest g s service-name
  ```

---

## Project Structure

- `app.module.ts` - Root module
- `main.ts` - Entry point
- `modules/` - Feature modules, typically containing:
  - Controllers
  - Services
  - DTOs

---

## Core Concepts

### Controllers

Handle incoming HTTP requests and send responses.

```typescript
@Controller('cats')
export class CatsController {
  @Get()
  findAll(): string {
    return 'All cats';
  }
}
```

### Services

Contain business logic. Typically used by controllers for processing.

```typescript
@Injectable()
export class CatsService {
  private cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }
}
```

### Providers

Broad term for any class that can be injected as a dependency (e.g., services, repositories, helpers).

---

## Key Decorators

- **@Injectable()**  
  Marks a class for dependency injection (used on services, factories, etc.).
- **@Controller()**  
  Defines a controller and handles HTTP routing.

---

## Dependency Injection Example

```typescript
@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }
}
```

- **Controllers**: Handle HTTP requests/responses.
- **Services**: Handle business logic and data processing.
- **Providers**: General term for injectables in NestJS.

---

### Guards

Guards are used to determine whether a particular request is allowed to proceed. They are executed after all middleware and before any interceptors or pipes.

```typescript
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    return request.headers.authorization ? true : false; // Example logic
  }
}
```

- **Use with Controllers or Routes**  
  Apply a guard using the `@UseGuards()` decorator:

  ```typescript
  import { Controller, Get, UseGuards } from '@nestjs/common';

  @Controller('cats')
  export class CatsController {
    @UseGuards(AuthGuard)
    @Get()
    findAll() {
      return 'All cats with auth guard';
    }
  }
  ```

---

### Pipes

Pipes are used to transform input data or validate it before it reaches the handler.

```typescript
import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata): number {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException('Validation failed');
    }
    return val;
  }
}
```

- **Use with Parameters**  
  Apply pipes using the `@UsePipes()` decorator or inline in a route parameter:

  ```typescript
  import { Controller, Get, Param, UsePipes } from '@nestjs/common';

  @Controller('cats')
  export class CatsController {
    @Get(':id')
    getCatById(@Param('id', ParseIntPipe) id: number) {
      return `Cat #${id}`;
    }
  }
  ```

---

### Middleware

Middleware is executed before route handlers and can be used for logging, authentication, etc.

```typescript
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    next();
  }
}
```

- **Apply Middleware**  
  Use middleware in your `main.ts` or in a module:

  ```typescript
  import { Module, MiddlewareConsumer } from '@nestjs/common';

  @Module({})
  export class CatsModule {
    configure(consumer: MiddlewareConsumer) {
      consumer.apply(LoggerMiddleware).forRoutes('cats');
    }
  }
  ```

---

### Interceptors

Interceptors are used to transform or bind extra logic to the request-response cycle. They can also be used for logging and modifying responses.

```typescript
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map((data) => ({ data, success: true })));
  }
}
```

- **Apply Interceptors**  
  Use the `@UseInterceptors()` decorator:

  ```typescript
  import { Controller, Get, UseInterceptors } from '@nestjs/common';

  @Controller('cats')
  export class CatsController {
    @UseInterceptors(TransformInterceptor)
    @Get()
    findAll() {
      return ['cat1', 'cat2'];
    }
  }
  ```

---

### Exception Filters

Exception filters handle errors gracefully and provide a consistent response structure for the application.

```typescript
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      message: exception.message,
    });
  }
}
```

- **Use with Controllers**  
  Apply using the `@UseFilters()` decorator:

  ```typescript
  import { Controller, Get, UseFilters } from '@nestjs/common';

  @Controller('cats')
  export class CatsController {
    @UseFilters(HttpExceptionFilter)
    @Get()
    findAll() {
      throw new HttpException('Forbidden', 403);
    }
  }
  ```
