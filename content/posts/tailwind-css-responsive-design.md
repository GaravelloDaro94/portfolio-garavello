---
title: "Tailwind CSS: Diseño responsive y mantenible"
date: "2025-12-20"
excerpt: "Domina Tailwind CSS para crear interfaces modernas, responsive y fáciles de mantener. Aprende patrones, optimizaciones y mejores prácticas."
category: "Frontend"
tags: ["tailwind", "css", "design", "responsive"]
readTime: "9 min lectura"
---

# Tailwind CSS: Diseño responsive y mantenible

Tailwind CSS ha revolucionado cómo escribimos estilos. Veamos cómo aprovecharlo al máximo sin caer en las trampas comunes.

## Diseño responsive con breakpoints

```jsx
<div className="
  w-full           /* Mobile first */
  md:w-1/2        /* Tablet */
  lg:w-1/3        /* Desktop */
  xl:w-1/4        /* Large desktop */
  2xl:w-1/5       /* Extra large */
">
  Contenido responsive
</div>
```

### Custom breakpoints

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    screens: {
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
    }
  }
}
```

## Componentes reutilizables

### 1. Con @apply (usar con moderación)

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

### 2. Con componentes React (preferido)

```tsx
// Button.tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Button({ variant = 'primary', size = 'md', children }: ButtonProps) {
  const baseStyles = 'font-medium rounded-lg transition-colors focus:ring-2';
  
  const variants = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-300',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-300',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-300',
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${sizes[size]}`}>
      {children}
    </button>
  );
}
```

## Dark Mode

```tsx
function ThemeCard() {
  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg">
      <h2 className="text-gray-900 dark:text-white text-2xl font-bold">
        Título
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mt-2">
        Contenido que se adapta al tema
      </p>
    </div>
  );
}

// tailwind.config.js
module.exports = {
  darkMode: 'class', // o 'media' para seguir preferencias del SO
}
```

## Animaciones personalizadas

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
}
```

```jsx
<div className="animate-fade-in">
  Aparece suavemente
</div>

<div className="hover:animate-bounce-slow">
  Rebota al hacer hover
</div>
```

## Grid y Flexbox avanzado

```jsx
// Grid responsive
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map(item => <Card key={item.id} {...item} />)}
</div>

// Flexbox con alineación
<div className="flex flex-col md:flex-row items-center justify-between gap-4">
  <div className="flex-1">Contenido principal</div>
  <div className="flex-shrink-0">Sidebar</div>
</div>

// Grid con áreas nombradas
<div className="grid grid-rows-[auto_1fr_auto] h-screen">
  <header>Header</header>
  <main className="overflow-y-auto">Contenido</main>
  <footer>Footer</footer>
</div>
```

## Optimización de producción

### 1. Purge CSS correctamente

```javascript
// tailwind.config.js
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
}
```

### 2. Clases dinámicas (safelist)

```javascript
// tailwind.config.js
module.exports = {
  safelist: [
    'bg-red-500',
    'bg-blue-500',
    'bg-green-500',
    {
      pattern: /bg-(red|blue|green)-(100|500|900)/,
    },
  ],
}
```

## Plugins útiles

```javascript
// tailwind.config.js
module.exports = {
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/container-queries'),
  ],
}
```

### Typography plugin para contenido markdown

```jsx
<article className="prose prose-lg dark:prose-invert max-w-none
  prose-headings:text-blue-600 
  prose-a:text-pink-500 
  prose-code:text-purple-600">
  {markdownContent}
</article>
```

## Patrones comunes

### Glassmorphism

```jsx
<div className="
  bg-white/10 backdrop-blur-lg 
  border border-white/20 
  shadow-xl rounded-2xl p-6
">
  Efecto de vidrio
</div>
```

### Card con hover effect

```jsx
<div className="
  group relative overflow-hidden
  bg-white dark:bg-gray-800 
  rounded-xl shadow-lg
  transition-all duration-300
  hover:shadow-2xl hover:-translate-y-1
">
  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 
                  opacity-0 group-hover:opacity-10 transition-opacity" />
  <div className="relative p-6">
    Contenido de la tarjeta
  </div>
</div>
```

## Conclusión

Tailwind CSS permite crear interfaces hermosas y mantenibles cuando se usa correctamente. La clave está en:

1. Pensar en componentes reutilizables
2. No abusar de @apply
3. Mantener las clases organizadas y legibles
4. Aprovechar los breakpoints y variantes

¡Experimenta y crea tus propios patrones!
