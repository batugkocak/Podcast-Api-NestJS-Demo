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
