# 🧪 Testing Guide - Portfolio Garavello

Este proyecto incluye una suite completa de testing con **Jest + React Testing Library** para unit testing y **Playwright** para testing e2e.

## 📦 Dependencias Instaladas

### Unit Testing

- `@testing-library/react` - Testing library para React
- `@testing-library/jest-dom` - Matchers personalizados para Jest
- `@testing-library/user-event` - Simulación de eventos de usuario
- `jest` - Framework de testing
- `jest-environment-jsdom` - Entorno de DOM para Jest
- `@types/jest` - Tipos TypeScript para Jest

### E2E Testing

- `@playwright/test` - Framework de testing e2e

## 🚀 Scripts Disponibles

### Unit Testing (Jest)

```bash
# Ejecutar todos los tests unitarios
pnpm test

# Ejecutar tests en modo watch (desarrollo)
pnpm test:watch

# Ejecutar tests con cobertura
pnpm test:coverage
```

### E2E Testing (Playwright)

```bash
# Ejecutar todos los tests e2e
pnpm test:e2e

# Ejecutar tests en modo UI interactivo
pnpm test:e2e:ui

# Ejecutar tests en modo debug
pnpm test:e2e:debug

# Ejecutar tests en un navegador específico
pnpm exec playwright test --project=chromium
pnpm exec playwright test --project=firefox
pnpm exec playwright test --project=webkit
```

### Ejecutar todos los tests

```bash
pnpm test:all
```

## 📁 Estructura de Testing

```
portfolio-garavello/
├── app/
│   ├── components/
│   │   └── __tests__/           # Tests unitarios de componentes
│   │       ├── TypewriterTitle.test.tsx
│   │       ├── ContactForm.test.tsx
│   │       └── FadeInCard.test.tsx
│   └── hooks/
│       └── __tests__/           # Tests unitarios de hooks
│           └── useHeader.test.ts
├── tests/                       # Tests e2e con Playwright
│   ├── navigation.spec.ts       # Tests de navegación
│   ├── contact-form.spec.ts     # Tests del formulario
│   ├── theme-toggle.spec.ts     # Tests del tema
│   └── chatbot.spec.ts         # Tests del chatbot
├── jest.config.ts              # Configuración de Jest
├── jest.setup.ts               # Setup global de Jest
└── playwright.config.ts        # Configuración de Playwright
```

## ✅ Tests Implementados

### Unit Tests

#### Componentes

- **TypewriterTitle** - Verifica renderizado, clases CSS y cursor parpadeante
- **FadeInCard** - Prueba animaciones, clases personalizadas y delays
- **ContactForm** - Valida estructura del formulario y campos requeridos

#### Hooks

- **useHeader** - Prueba detección de scroll y navegación entre secciones

### E2E Tests

#### Navegación

- ✅ Carga correcta de la página principal
- ✅ Visibilidad del header y navegación
- ✅ Presencia de todas las secciones (About, Projects, Skills, Contact)
- ✅ Navegación correcta usando el menú

#### Formulario de Contacto

- ✅ Visibilidad del formulario completo
- ✅ Validación de campos requeridos
- ✅ Capacidad de llenar el formulario
- ✅ Estilos correctos del botón (border-black, font-bold)

#### Tema Claro/Oscuro

- ✅ Visibilidad del toggle de tema
- ✅ Cambio entre tema claro y oscuro
- ✅ Persistencia del tema seleccionado

#### Chatbot

- ✅ Visibilidad del botón del chatbot
- ✅ Apertura del modal al hacer click
- ✅ Mostrar preguntas sugeridas
- ✅ Cerrar el modal correctamente
- ✅ Permitir escribir mensajes

## 🎯 Coverage Goals

Los objetivos de cobertura están configurados en `jest.config.ts`:

- Componentes en `app/components/`
- Hooks en `app/hooks/`
- Utils en `app/utils/`
- Excluye: APIs, layout.tsx, archivos .d.ts

## 📝 Escribir Nuevos Tests

### Unit Test Example

```typescript
import { render, screen } from '@testing-library/react';
import MyComponent from '../MyComponent';

describe('MyComponent', () => {
  it('should render correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

### E2E Test Example

```typescript
import { test, expect } from "@playwright/test";

test("my feature", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await expect(page.getByText("Hello")).toBeVisible();
});
```

## 🔧 Configuración

### Jest

- **Environment**: jsdom
- **Setup**: Mocks para next-themes, IntersectionObserver, matchMedia
- **Module Mapper**: Alias configurados (@/, @/components/, etc.)

### Playwright

- **Browsers**: Chromium, Firefox, WebKit
- **Base URL**: http://localhost:3000
- **Retries**: Configuradas automáticamente
- **Screenshots**: Solo en fallos

## 🐛 Debugging

### Jest

```bash
# Ejecutar un test específico
pnpm test TypewriterTitle

# Ejecutar con output detallado
pnpm test --verbose
```

### Playwright

```bash
# Modo debug con inspector
pnpm test:e2e:debug

# Ver trace de un test fallido
pnpm exec playwright show-trace trace.zip
```

## 📊 CI/CD

Playwright genera automáticamente un workflow de GitHub Actions en `.github/workflows/playwright.yml` que ejecuta los tests e2e en cada push/PR.

## 🎓 Recursos

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
