---
title: "Tailwind CSS: Responsive and maintainable design"
date: "2025-12-20"
excerpt: "Master Tailwind CSS to build modern, responsive, and maintainable interfaces. Learn patterns, optimizations, and best practices."
category: "Frontend"
tags: ["tailwind", "css", "design", "responsive"]
readTime: "9 min read"
---

# Tailwind CSS: Responsive and maintainable design

Tailwind CSS has revolutionized how we write styles. Let's see how to get the most out of it without falling into common traps.

## Responsive design with breakpoints

```jsx
<div
  className="
  w-full           /* Mobile first */
  md:w-1/2        /* Tablet */
  lg:w-1/3        /* Desktop */
  xl:w-1/4        /* Large desktop */
  2xl:w-1/5       /* Extra large */
"
>
  Responsive content
</div>
```

### Custom breakpoints

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    screens: {
      xs: "475px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1920px",
    },
  },
};
```

## Reusable components

### 1. With @apply (use sparingly)

```css
/* components.css */
.btn-primary {
  @apply px-6 py-3 bg-blue-500 text-white rounded-lg 
         font-medium hover:bg-blue-600 
         focus:ring-2 focus:ring-blue-300 
         transition-colors;
}

.card {
  @apply bg-white dark:bg-gray-800 
         rounded-xl shadow-lg 
         p-6 border border-gray-200 
         dark:border-gray-700;
}
```

### 2. With React components (preferred)

```tsx
// Button.tsx
interface ButtonProps {
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export function Button({ variant = "primary", size = "md", children }: ButtonProps) {
  const baseStyles = "font-medium rounded-lg transition-colors focus:ring-2";

  const variants = {
    primary: "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-300",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-300",
    danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-300",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${sizes[size]}`}>{children}</button>
  );
}
```

## Dark Mode

```tsx
function ThemeCard() {
  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg">
      <h2 className="text-gray-900 dark:text-white text-2xl font-bold">Title</h2>
      <p className="text-gray-600 dark:text-gray-300 mt-2">
        Content that adapts to the active theme
      </p>
    </div>
  );
}

// tailwind.config.js
module.exports = {
  darkMode: "class", // or 'media' to follow OS preferences
};
```

## Performance optimization

```javascript
// tailwind.config.js
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  // PurgeCSS removes unused classes in production
};
```

## Best practices

1. **Mobile first** — always start from the smallest breakpoint.
2. **Avoid arbitrary values** (`w-[347px]`) when a design token exists.
3. **Extract components** for repeated patterns rather than duplicating classes.
4. **Use `clsx` or `cn`** utilities to compose conditional classes cleanly.
5. **Keep the config under version control** as the single source of truth for design tokens.

## Conclusion

Tailwind strikes a great balance between flexibility and consistency. The key is embracing its utility-first philosophy rather than fighting it with custom CSS overrides. Used alongside typed React components, it produces UIs that are easy to iterate on and maintain at scale.
