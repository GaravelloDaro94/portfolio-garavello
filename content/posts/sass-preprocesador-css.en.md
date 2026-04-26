---
title: "SASS: CSS preprocessor for scalable projects"
date: "2025-12-15"
excerpt: "Learn SASS to write more maintainable CSS with variables, mixins, functions, and a modular architecture. A complete guide to features and best practices."
category: "Frontend"
tags: ["sass", "scss", "css", "preprocessor"]
readTime: "11 min read"
---

# SASS: CSS preprocessor for scalable projects

SASS (Syntactically Awesome Style Sheets) takes CSS to the next level. Let's see how to structure large projects and write maintainable styles.

## Variables and operations

```scss
// _variables.scss
$primary-color: #3b82f6;
$secondary-color: #8b5cf6;
$text-color: #1f2937;
$background-color: #f9fafb;

$spacing-unit: 8px;
$border-radius: 8px;

// Maps for themes
$theme-colors: (
  "primary": $primary-color,
  "secondary": $secondary-color,
  "success": #10b981,
  "danger": #ef4444,
  "warning": #f59e0b,
);

// Operations
$column-width: 60px;
$gutter-width: 20px;
$container-width: ($column-width * 12) + ($gutter-width * 11);

.container {
  width: $container-width;
  padding: $spacing-unit * 2; // 16px
  border-radius: $border-radius * 1.5; // 12px
}
```

## Structured nesting

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

  &--highlighted {
    border: 2px solid $primary-color;
    box-shadow: 0 4px 6px rgba($primary-color, 0.1);
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    padding: $spacing-unit * 2;

    &__header {
      flex-direction: column;
    }
  }
}
```

## Powerful mixins

```scss
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

@mixin button($bg-color, $text-color: white, $size: medium) {
  background-color: $bg-color;
  color: $text-color;
  border: none;
  border-radius: $border-radius;
  cursor: pointer;

  @if $size == small {
    padding: 8px 16px;
    font-size: 0.875rem;
  } @else if $size == large {
    padding: 16px 32px;
    font-size: 1.125rem;
  } @else {
    padding: 12px 24px;
    font-size: 1rem;
  }

  &:hover {
    background-color: darken($bg-color, 10%);
  }
}

// Usage
.btn-primary {
  @include button(#3b82f6);
}

.btn-large {
  @include button(#8b5cf6, white, large);
}
```

## 7-1 Architecture

```
sass/
├── abstracts/
│   ├── _variables.scss
│   ├── _functions.scss
│   └── _mixins.scss
├── base/
│   ├── _reset.scss
│   └── _typography.scss
├── components/
│   ├── _buttons.scss
│   └── _cards.scss
├── layout/
│   ├── _header.scss
│   └── _footer.scss
├── pages/
│   └── _home.scss
├── themes/
│   └── _dark.scss
├── vendors/
│   └── _normalize.scss
└── main.scss
```

## Conclusion

SASS significantly improves CSS maintainability in large-scale projects. The key is choosing a consistent architecture from the start and respecting the nesting depth (no more than 3 levels) to keep generated CSS readable.

With the rise of CSS custom properties and utility frameworks like Tailwind, SASS is used more selectively today — but its power in design systems and component libraries remains unmatched.
