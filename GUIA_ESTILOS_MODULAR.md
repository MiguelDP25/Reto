# Guía de Estilos Modular

## 📋 Índice
1. [Introducción](#introducción)
2. [Estructura de Archivos](#estructura-de-archivos)
3. [Cómo Modificar Estilos](#cómo-modificar-estilos)
4. [Convenciones](#convenciones)

---

## Introducción

Los estilos del sistema están organizados en archivos separados por funcionalidad. Cada módulo tiene su propio archivo de estilos independiente, lo que facilita encontrar y modificar la apariencia de cada sección sin afectar otras partes del sistema.

---

## Estructura de Archivos

\`\`\`
components/
├── orders/
│   └── styles.ts          # Estilos del módulo de órdenes
├── providers/
│   └── styles.ts          # Estilos del módulo de proveedores
├── payments/
│   └── styles.ts          # Estilos del módulo de pagos
├── statistics/
│   └── styles.ts          # Estilos del módulo de estadísticas
├── dashboard/
│   └── styles.ts          # Estilos del dashboard principal
├── users/
│   └── styles.ts          # Estilos del módulo de usuarios
└── auth/
    └── styles.ts          # Estilos de autenticación/login
\`\`\`

---

## Cómo Modificar Estilos

### 1. Identificar el Módulo

Primero, identifica qué parte de la interfaz quieres modificar:

- **Órdenes** → `components/orders/styles.ts`
- **Proveedores** → `components/providers/styles.ts`
- **Pagos** → `components/payments/styles.ts`
- **Estadísticas** → `components/statistics/styles.ts`
- **Dashboard** → `components/dashboard/styles.ts`
- **Usuarios** → `components/users/styles.ts`
- **Login** → `components/auth/styles.ts`

### 2. Abrir el Archivo de Estilos

Cada archivo de estilos está documentado con comentarios que explican qué controla cada sección.

### 3. Modificar los Estilos

#### Ejemplo: Cambiar el color de los botones de órdenes

**Archivo:** `components/orders/styles.ts`

\`\`\`typescript
// ANTES
export const newOrderDialog = {
  footer: {
    submitButton: "px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
  }
}

// DESPUÉS (cambiar a verde)
export const newOrderDialog = {
  footer: {
    submitButton: "px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
  }
}
\`\`\`

#### Ejemplo: Cambiar el tamaño de las tarjetas de estadísticas

**Archivo:** `components/statistics/styles.ts`

\`\`\`typescript
// ANTES
export const summaryCards = {
  card: "bg-white rounded-lg border border-gray-200 p-6"
}

// DESPUÉS (hacer más grandes)
export const summaryCards = {
  card: "bg-white rounded-lg border border-gray-200 p-8"
}
\`\`\`

### 4. Cambios Comunes

#### Cambiar Colores

Los colores se definen usando clases de Tailwind:

- `bg-blue-600` → Color de fondo azul
- `text-red-600` → Color de texto rojo
- `border-gray-300` → Color de borde gris

**Paleta de colores disponibles:**
- `blue` - Azul (órdenes, principal)
- `indigo` - Índigo (proveedores)
- `emerald` / `green` - Verde (pagos, éxito)
- `cyan` - Cian (estadísticas)
- `purple` - Púrpura (usuarios)
- `yellow` - Amarillo (advertencias)
- `red` - Rojo (errores, peligro)
- `gray` - Gris (neutral)

**Intensidades:** 50, 100, 200, 300, 400, 500, 600, 700, 800, 900

#### Cambiar Espaciados

- `p-4` → Padding de 1rem (16px)
- `m-6` → Margin de 1.5rem (24px)
- `gap-4` → Espacio entre elementos de 1rem

**Escala:** 0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24

#### Cambiar Tamaños de Texto

- `text-sm` → Texto pequeño (14px)
- `text-base` → Texto normal (16px)
- `text-lg` → Texto grande (18px)
- `text-xl` → Texto extra grande (20px)
- `text-2xl` → Texto 2x grande (24px)

#### Cambiar Bordes Redondeados

- `rounded` → Bordes ligeramente redondeados
- `rounded-lg` → Bordes más redondeados
- `rounded-xl` → Bordes muy redondeados
- `rounded-full` → Bordes completamente circulares

---

## Convenciones

### 1. Nomenclatura

Los estilos se organizan en objetos con nombres descriptivos:

\`\`\`typescript
export const nombreModulo = {
  container: "...",      // Contenedor principal
  header: { ... },       // Encabezado
  body: { ... },         // Cuerpo
  footer: { ... },       // Pie
}
\`\`\`

### 2. Colores por Módulo

Cada módulo tiene un color primario definido:

- **Órdenes:** Azul (`blue`)
- **Proveedores:** Índigo (`indigo`)
- **Pagos:** Esmeralda (`emerald`)
- **Estadísticas:** Cian (`cyan`)
- **Dashboard:** Azul (`blue`)
- **Usuarios:** Púrpura (`purple`)

### 3. Estados Visuales

Los estados tienen colores consistentes:

- **Éxito/Activo:** Verde (`green`)
- **Advertencia/Pendiente:** Amarillo (`yellow`)
- **Error/Inactivo:** Rojo (`red`)
- **En Proceso:** Azul (`blue`)
- **Neutral:** Gris (`gray`)

### 4. Documentación

Cada archivo de estilos incluye:

- Comentarios explicativos al inicio
- Descripción de cada sección
- Ejemplos de uso cuando es necesario

---

## Ejemplos Prácticos

### Cambiar el Tema de Órdenes de Azul a Verde

**Archivo:** `components/orders/styles.ts`

\`\`\`typescript
// Cambiar todos los colores azules a verdes
export const ordersColors = {
  primary: "green",  // Antes: "blue"
  // ... resto sin cambios
}

// Actualizar estilos específicos
export const ordersStats = {
  iconColors: {
    total: "bg-green-100 text-green-600",  // Antes: bg-blue-100 text-blue-600
    // ... resto sin cambios
  }
}
\`\`\`

### Hacer las Tarjetas Más Grandes

**Cualquier archivo de estilos:**

\`\`\`typescript
export const stats = {
  card: "bg-white rounded-lg border border-gray-200 p-8 hover:shadow-lg"
  // Cambios: p-6 → p-8 (más padding)
  //          shadow-md → shadow-lg (sombra más grande)
}
\`\`\`

### Cambiar el Estilo de los Botones

**Archivo:** `components/orders/styles.ts`

\`\`\`typescript
export const newOrderDialog = {
  footer: {
    submitButton: "px-6 py-3 text-white bg-blue-600 rounded-xl hover:bg-blue-700 shadow-lg transition-all"
    // Cambios: px-4 → px-6 (más ancho)
    //          py-2 → py-3 (más alto)
    //          rounded-lg → rounded-xl (más redondeado)
    //          Agregado: shadow-lg (sombra)
    //          transition-colors → transition-all (transición completa)
  }
}
\`\`\`

---

## Soporte

Si necesitas ayuda para modificar estilos:

1. Revisa los comentarios en el archivo de estilos correspondiente
2. Consulta esta guía para ejemplos comunes
3. Busca patrones similares en otros módulos
4. Consulta la documentación de Tailwind CSS: https://tailwindcss.com/docs

---

**Última actualización:** 2025
