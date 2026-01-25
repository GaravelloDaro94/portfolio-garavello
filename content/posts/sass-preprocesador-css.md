---
title: "SASS: Preprocesador CSS para proyectos escalables"
date: "2025-12-15"
excerpt: "Aprende SASS para escribir CSS más mantenible con variables, mixins, funciones y una arquitectura modular. Guía completa de características y mejores prácticas."
category: "Frontend"
tags: ["sass", "scss", "css", "preprocessor"]
readTime: "11 min lectura"
---

# SASS: Preprocesador CSS para proyectos escalables

SASS (Syntactically Awesome Style Sheets) eleva CSS a otro nivel. Veamos cómo estructurar proyectos grandes y escribir estilos mantenibles.

## Variables y operaciones

```scss
// _variables.scss
$primary-color: #3b82f6;
$secondary-color: #8b5cf6;
$text-color: #1f2937;
$background-color: #f9fafb;

$spacing-unit: 8px;
$border-radius: 8px;

// Mapas para temas
$theme-colors: (
  'primary': $primary-color,
  'secondary': $secondary-color,
  'success': #10b981,
  'danger': #ef4444,
  'warning': #f59e0b,
);

// Operaciones
$column-width: 60px;
$gutter-width: 20px;
$container-width: ($column-width * 12) + ($gutter-width * 11);

.container {
  width: $container-width;
  padding: $spacing-unit * 2; // 16px
  border-radius: $border-radius * 1.5; // 12px
}
```

## Nesting estructurado

```scss
.card {
  background: white;
  border-radius: $border-radius;
  padding: $spacing-unit * 3;
  
  &__header {
    display: flex;
    justify-content: space-between;
    margin-bottom: $spacing-unit * 2;
  }
  
  &__title {
    font-size: 1.5rem;
    font-weight: bold;
    color: $text-color;
  }
  
  &__body {
    color: lighten($text-color, 20%);
    line-height: 1.6;
  }
  
  // Estados
  &--highlighted {
    border: 2px solid $primary-color;
    box-shadow: 0 4px 6px rgba($primary-color, 0.1);
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
  
  // Media queries anidados
  @media (max-width: 768px) {
    padding: $spacing-unit * 2;
    
    &__header {
      flex-direction: column;
    }
  }
}
```

## Mixins poderosos

```scss
// Mixins básicos
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

@mixin card-shadow($elevation: 1) {
  @if $elevation == 1 {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  } @else if $elevation == 2 {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  } @else {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  }
}

// Mixin con parámetros
@mixin button($bg-color, $text-color: white, $size: medium) {
  background-color: $bg-color;
  color: $text-color;
  border: none;
  border-radius: $border-radius;
  cursor: pointer;
  transition: all 0.3s ease;
  
  @if $size == small {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  } @else if $size == medium {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  } @else {
    padding: 1rem 2rem;
    font-size: 1.125rem;
  }
  
  &:hover {
    background-color: darken($bg-color, 10%);
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
}

// Uso
.btn-primary {
  @include button($primary-color);
}

.btn-secondary {
  @include button($secondary-color, white, large);
}
```

## Funciones personalizadas

```scss
// Función para calcular contraste
@function contrast-color($color) {
  $lightness: lightness($color);
  
  @if $lightness > 50% {
    @return #000;
  } @else {
    @return #fff;
  }
}

// Función para espaciado
@function spacing($multiplier) {
  @return $spacing-unit * $multiplier;
}

// Función para rem
@function rem($pixels) {
  @return #{$pixels / 16}rem;
}

// Uso
.alert {
  background-color: $primary-color;
  color: contrast-color($primary-color);
  padding: spacing(2);
  font-size: rem(14);
}
```

## Extends y placeholders

```scss
// Placeholder (no se compila si no se usa)
%button-base {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border-radius: $border-radius;
  font-weight: 500;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
}

.btn-primary {
  @extend %button-base;
  background-color: $primary-color;
  color: white;
}

.btn-outline {
  @extend %button-base;
  background-color: transparent;
  border: 2px solid $primary-color;
  color: $primary-color;
}
```

## Loops y estructuras de control

```scss
// Loop con mapas
@each $name, $color in $theme-colors {
  .text-#{$name} {
    color: $color;
  }
  
  .bg-#{$name} {
    background-color: $color;
  }
  
  .border-#{$name} {
    border-color: $color;
  }
}

// Loop numérico para espaciados
@for $i from 1 through 8 {
  .m-#{$i} {
    margin: spacing($i);
  }
  
  .p-#{$i} {
    padding: spacing($i);
  }
}

// Loop con lista
$sizes: small, medium, large;

@each $size in $sizes {
  .container-#{$size} {
    @if $size == small {
      max-width: 640px;
    } @else if $size == medium {
      max-width: 1024px;
    } @else {
      max-width: 1280px;
    }
    
    margin: 0 auto;
  }
}
```

## Arquitectura 7-1

```scss
// main.scss - archivo principal
@import 'abstracts/variables';
@import 'abstracts/functions';
@import 'abstracts/mixins';

@import 'base/reset';
@import 'base/typography';

@import 'layout/header';
@import 'layout/footer';
@import 'layout/grid';

@import 'components/button';
@import 'components/card';
@import 'components/form';

@import 'pages/home';
@import 'pages/about';

@import 'themes/dark';

@import 'vendors/normalize';
```

### Estructura de carpetas

```
styles/
├── abstracts/
│   ├── _variables.scss
│   ├── _functions.scss
│   └── _mixins.scss
├── base/
│   ├── _reset.scss
│   └── _typography.scss
├── components/
│   ├── _button.scss
│   ├── _card.scss
│   └── _form.scss
├── layout/
│   ├── _header.scss
│   ├── _footer.scss
│   └── _grid.scss
├── pages/
│   ├── _home.scss
│   └── _about.scss
├── themes/
│   └── _dark.scss
└── main.scss
```

## Responsive design con mixins

```scss
// _mixins.scss
$breakpoints: (
  'xs': 475px,
  'sm': 640px,
  'md': 768px,
  'lg': 1024px,
  'xl': 1280px,
  '2xl': 1536px,
);

@mixin respond-to($breakpoint) {
  @if map-has-key($breakpoints, $breakpoint) {
    @media (min-width: map-get($breakpoints, $breakpoint)) {
      @content;
    }
  } @else {
    @warn "Breakpoint #{$breakpoint} no existe.";
  }
}

// Uso
.hero {
  padding: spacing(4);
  
  @include respond-to('md') {
    padding: spacing(8);
  }
  
  @include respond-to('lg') {
    padding: spacing(12);
  }
}
```

## Dark mode con SASS

```scss
// _variables.scss
$light-theme: (
  'background': #ffffff,
  'text': #1f2937,
  'border': #e5e7eb,
);

$dark-theme: (
  'background': #1f2937,
  'text': #f9fafb,
  'border': #374151,
);

// _mixins.scss
@mixin theme($property, $key) {
  #{$property}: map-get($light-theme, $key);
  
  .dark & {
    #{$property}: map-get($dark-theme, $key);
  }
}

// Uso
.card {
  @include theme('background-color', 'background');
  @include theme('color', 'text');
  @include theme('border-color', 'border');
  
  border: 1px solid;
  border-radius: $border-radius;
  padding: spacing(4);
}
```

## Mejores prácticas

1. **No anidar más de 3 niveles**
```scss
// ❌ Malo
.nav {
  .menu {
    .item {
      .link {
        // Demasiado anidado
      }
    }
  }
}

// ✅ Bueno
.nav-item__link {
  // Flat y específico
}
```

2. **Usar funciones sobre mixins cuando sea posible**
```scss
// Funciones retornan valores, mixins inyectan código
```

3. **Organizar imports por especificidad**
```scss
// Variables → Mixins → Base → Componentes → Páginas
```

## Conclusión

SASS es esencial para proyectos CSS grandes. Domina:
- Variables y mapas para mantener consistencia
- Mixins para reutilización de código
- Arquitectura modular (7-1 pattern)
- Funciones para cálculos complejos

¡Tu CSS nunca volverá a ser el mismo!
