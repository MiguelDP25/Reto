# 🎨 Guía de Estilos - Sistema de Gestión Óptica

## 📋 Índice
1. [Introducción](#introducción)
2. [Estructura de Archivos](#estructura-de-archivos)
3. [Cómo Modificar Estilos](#cómo-modificar-estilos)
4. [Sistema de Colores](#sistema-de-colores)
5. [Componentes Visuales](#componentes-visuales)
6. [Ejemplos Prácticos](#ejemplos-prácticos)

---

## 🎯 Introducción

Esta guía te ayudará a modificar los estilos visuales del sistema sin tocar la lógica de negocio. Todos los estilos están centralizados en archivos específicos para facilitar las modificaciones.

### ¿Por qué esta estructura?

✅ **Fácil de encontrar**: Todos los estilos en un solo lugar
✅ **Fácil de modificar**: Cambias un valor y se aplica en toda la app
✅ **Sin romper código**: Los estilos están separados de la lógica
✅ **Consistencia**: Todos los componentes usan los mismos estilos

---

## 📁 Estructura de Archivos

\`\`\`
lib/styles/
├── theme.ts          # Colores, espaciados, tipografía (EMPIEZA AQUÍ)
├── components.ts     # Estilos de botones, cards, forms, etc.
└── layouts.ts        # Estructuras de página y grids

app/
└── globals.css       # Estilos CSS globales y Tailwind
\`\`\`

### ¿Qué archivo modificar?

| Quiero cambiar... | Archivo a modificar |
|-------------------|---------------------|
| Colores del sistema | `lib/styles/theme.ts` |
| Aspecto de botones | `lib/styles/components.ts` → `buttonStyles` |
| Aspecto de formularios | `lib/styles/components.ts` → `formStyles` |
| Aspecto de tablas | `lib/styles/components.ts` → `tableStyles` |
| Aspecto de tarjetas | `lib/styles/components.ts` → `cardStyles` |
| Layout de páginas | `lib/styles/layouts.ts` |
| Estilos CSS personalizados | `app/globals.css` |

---

## 🎨 Sistema de Colores

### Cambiar el color principal (azul)

**Archivo**: `lib/styles/theme.ts`

\`\`\`typescript
export const colors = {
  primary: {
    500: '#3b82f6',  // ← Cambia este valor
    // Ejemplo: '#8b5cf6' para morado
    // Ejemplo: '#10b981' para verde
  }
}
\`\`\`

### Cambiar el color de acento (cyan/turquesa)

\`\`\`typescript
export const colors = {
  accent: {
    500: '#06b6d4',  // ← Cambia este valor
  }
}
\`\`\`

### Colores de estado

\`\`\`typescript
export const colors = {
  success: {
    DEFAULT: '#10b981',  // Verde para éxito
  },
  error: {
    DEFAULT: '#ef4444',  // Rojo para errores
  },
  warning: {
    DEFAULT: '#f59e0b',  // Amarillo para advertencias
  }
}
\`\`\`

---

## 🔘 Componentes Visuales

### Botones

**Archivo**: `lib/styles/components.ts` → `buttonStyles`

#### Cambiar el aspecto del botón principal

\`\`\`typescript
export const buttonStyles = {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white ...',
  //        ↑ Color de fondo    ↑ Color al pasar el mouse
}
\`\`\`

#### Ejemplo: Hacer botones más redondeados

\`\`\`typescript
export const buttonStyles = {
  primary: '... rounded-lg',  // Cambiar a rounded-xl o rounded-full
}
\`\`\`

#### Ejemplo: Hacer botones más grandes

\`\`\`typescript
export const buttonStyles = {
  primary: '... px-4 py-2',  // Cambiar a px-6 py-3
}
\`\`\`

### Formularios

**Archivo**: `lib/styles/components.ts` → `formStyles`

#### Cambiar el aspecto de los inputs

\`\`\`typescript
export const formStyles = {
  input: 'w-full px-3 py-2 border border-gray-300 rounded-lg ...',
  //                                    ↑ Color del borde
  //                                                ↑ Redondeo
}
\`\`\`

### Tarjetas (Cards)

**Archivo**: `lib/styles/components.ts` → `cardStyles`

#### Cambiar el aspecto de las tarjetas

\`\`\`typescript
export const cardStyles = {
  base: 'bg-white rounded-lg border border-gray-200 shadow-sm',
  //     ↑ Fondo    ↑ Redondeo  ↑ Borde              ↑ Sombra
}
\`\`\`

#### Ejemplo: Tarjetas con más sombra

\`\`\`typescript
export const cardStyles = {
  base: '... shadow-sm',  // Cambiar a shadow-md o shadow-lg
}
\`\`\`

### Tablas

**Archivo**: `lib/styles/components.ts` → `tableStyles`

#### Cambiar colores de la tabla

\`\`\`typescript
export const tableStyles = {
  thead: 'bg-gray-50 border-b border-gray-200',
  //      ↑ Color de fondo del header
  
  tr: 'hover:bg-gray-50 transition-colors',
  //   ↑ Color al pasar el mouse sobre una fila
}
\`\`\`

---

## 📐 Layouts y Estructuras

**Archivo**: `lib/styles/layouts.ts`

### Cambiar el espaciado entre elementos

\`\`\`typescript
export const grids = {
  cards: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
  //                                                        ↑ Espacio entre tarjetas
  // Cambiar a gap-4 (menos espacio) o gap-8 (más espacio)
}
\`\`\`

### Cambiar el número de columnas

\`\`\`typescript
export const grids = {
  stats: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6',
  //                                        ↑ 4 columnas en pantallas grandes
  // Cambiar a lg:grid-cols-3 para 3 columnas
}
\`\`\`

---

## 💡 Ejemplos Prácticos

### Ejemplo 1: Cambiar el tema a verde

**Paso 1**: Abre `lib/styles/theme.ts`

**Paso 2**: Cambia el color principal

\`\`\`typescript
export const colors = {
  primary: {
    500: '#10b981',  // Verde
    600: '#059669',
    700: '#047857',
  }
}
\`\`\`

**Resultado**: Todos los botones, enlaces y elementos principales serán verdes.

---

### Ejemplo 2: Hacer los botones más grandes y redondeados

**Paso 1**: Abre `lib/styles/components.ts`

**Paso 2**: Modifica `buttonStyles`

\`\`\`typescript
export const buttonStyles = {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-full ...',
  //                                                                ↑ Más padding  ↑ Totalmente redondeado
}
\`\`\`

---

### Ejemplo 3: Cambiar el espaciado general

**Paso 1**: Abre `lib/styles/theme.ts`

**Paso 2**: Modifica los valores de `spacing`

\`\`\`typescript
export const spacing = {
  md: '1.5rem',  // Cambiar de 1rem a 1.5rem para más espacio
  lg: '2rem',    // Cambiar de 1.5rem a 2rem
}
\`\`\`

---

### Ejemplo 4: Personalizar las tarjetas de estadísticas

**Paso 1**: Abre `lib/styles/components.ts`

**Paso 2**: Modifica `statsStyles`

\`\`\`typescript
export const statsStyles = {
  card: 'bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200 shadow-lg p-8',
  //     ↑ Gradiente de fondo                        ↑ Más redondeado  ↑ Más sombra  ↑ Más padding
}
\`\`\`

---

## 🎓 Consejos para Modificar Estilos

### ✅ Buenas Prácticas

1. **Empieza por `theme.ts`**: Los cambios aquí afectan todo el sistema
2. **Usa los valores del tema**: No uses colores directos como `#ff0000`
3. **Prueba en diferentes pantallas**: Verifica móvil, tablet y desktop
4. **Mantén la consistencia**: Usa los mismos espaciados y colores

### ❌ Evita

1. **No modifiques estilos directamente en los componentes**: Usa los archivos de estilos
2. **No uses valores arbitrarios**: Usa los valores del sistema de diseño
3. **No mezcles unidades**: Usa rem para espaciados, no px

---

## 🔍 Referencia Rápida de Tailwind

### Colores
- `bg-blue-500` = Fondo azul
- `text-gray-900` = Texto gris oscuro
- `border-red-300` = Borde rojo claro

### Espaciado
- `p-4` = Padding de 1rem (16px)
- `m-6` = Margin de 1.5rem (24px)
- `gap-4` = Espacio entre elementos de 1rem

### Redondeo
- `rounded` = Bordes ligeramente redondeados
- `rounded-lg` = Bordes más redondeados
- `rounded-full` = Bordes completamente redondeados

### Sombras
- `shadow-sm` = Sombra pequeña
- `shadow-md` = Sombra mediana
- `shadow-lg` = Sombra grande

---

## 📞 ¿Necesitas Ayuda?

Si tienes dudas sobre cómo modificar algo específico:

1. Busca el componente en `lib/styles/components.ts`
2. Lee los comentarios en el código
3. Consulta esta guía
4. Experimenta con los valores (¡no tengas miedo de probar!)

---

## 🚀 Próximos Pasos

1. Abre `lib/styles/theme.ts` y familiarízate con los colores
2. Prueba cambiar el color principal
3. Modifica el aspecto de un botón en `components.ts`
4. Experimenta con los layouts en `layouts.ts`

**¡Recuerda!** Todos los cambios en estos archivos se aplicarán automáticamente en toda la aplicación. No necesitas modificar cada componente individual.
