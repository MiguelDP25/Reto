# 📁 Estructura del Proyecto - Sistema de Gestión Óptica

## 🎯 Organización por Interfaces

Este proyecto está organizado por **características/interfaces** para facilitar la modificación y mantenimiento. Cada sección de la aplicación tiene su propia carpeta con todos sus archivos relacionados.

---

## 📂 Estructura de Carpetas

\`\`\`
optica-gestion/
├── app/                          # Configuración de Next.js
│   ├── layout.tsx               # Layout principal de la app
│   ├── page.tsx                 # Página principal (router)
│   └── globals.css              # Estilos globales
│
├── components/
│   ├── auth/                    # 🔐 INTERFAZ DE AUTENTICACIÓN
│   │   ├── index.tsx           # Página de login
│   │   ├── login-form.tsx      # Formulario de login
│   │   └── quick-access.tsx    # Botones de acceso rápido
│   │
│   ├── dashboard/               # 📊 INTERFAZ DE DASHBOARD
│   │   ├── admin/              # Dashboard de Administrador
│   │   │   ├── index.tsx
│   │   │   ├── stats-cards.tsx
│   │   │   └── recent-activity.tsx
│   │   ├── assistant/          # Dashboard de Asistente
│   │   │   ├── index.tsx
│   │   │   ├── pending-orders.tsx
│   │   │   └── quick-actions.tsx
│   │   └── provider/           # Dashboard de Proveedor
│   │       ├── index.tsx
│   │       ├── order-summary.tsx
│   │       └── inventory-alerts.tsx
│   │
│   ├── orders/                  # 📋 INTERFAZ DE ÓRDENES
│   │   ├── index.tsx           # Página principal de órdenes
│   │   ├── components/
│   │   │   ├── orders-table.tsx
│   │   │   ├── order-filters.tsx
│   │   │   ├── order-stats.tsx
│   │   │   └── order-row.tsx
│   │   ├── dialogs/
│   │   │   ├── new-order-dialog.tsx
│   │   │   ├── edit-order-dialog.tsx
│   │   │   └── order-details-dialog.tsx
│   │   └── hooks/
│   │       ├── use-orders.ts
│   │       └── use-order-filters.ts
│   │
│   ├── providers/               # 👥 INTERFAZ DE PROVEEDORES
│   │   ├── index.tsx           # Página principal de proveedores
│   │   ├── components/
│   │   │   ├── providers-table.tsx
│   │   │   ├── provider-stats.tsx
│   │   │   └── provider-row.tsx
│   │   ├── dialogs/
│   │   │   ├── new-provider-dialog.tsx
│   │   │   └── edit-provider-dialog.tsx
│   │   └── hooks/
│   │       └── use-providers.ts
│   │
│   ├── payments/                # 💰 INTERFAZ DE PAGOS
│   │   ├── index.tsx           # Página principal de pagos
│   │   ├── components/
│   │   │   ├── payments-table.tsx
│   │   │   ├── payment-stats.tsx
│   │   │   └── payment-row.tsx
│   │   ├── dialogs/
│   │   │   ├── new-payment-dialog.tsx
│   │   │   └── invoice-dialog.tsx
│   │   └── hooks/
│   │       └── use-payments.ts
│   │
│   ├── statistics/              # 📈 INTERFAZ DE ESTADÍSTICAS
│   │   ├── index.tsx           # Página principal de estadísticas
│   │   ├── components/
│   │   │   ├── period-selector.tsx
│   │   │   ├── comparison-charts.tsx
│   │   │   ├── summary-cards.tsx
│   │   │   └── export-button.tsx
│   │   └── hooks/
│   │       └── use-statistics.ts
│   │
│   ├── materials/               # 📦 INTERFAZ DE MATERIALES (Proveedor)
│   │   ├── index.tsx
│   │   ├── components/
│   │   │   ├── materials-table.tsx
│   │   │   └── inventory-stats.tsx
│   │   └── dialogs/
│   │       └── new-material-dialog.tsx
│   │
│   ├── users/                   # 👤 INTERFAZ DE USUARIOS (Admin)
│   │   ├── index.tsx
│   │   ├── components/
│   │   │   ├── users-table.tsx
│   │   │   └── user-stats.tsx
│   │   └── dialogs/
│   │       └── user-form-dialog.tsx
│   │
│   ├── audit/                   # 📝 INTERFAZ DE AUDITORÍA (Admin)
│   │   ├── index.tsx
│   │   └── components/
│   │       ├── audit-table.tsx
│   │       └── audit-filters.tsx
│   │
│   ├── shared/                  # 🔄 COMPONENTES COMPARTIDOS
│   │   ├── sidebar.tsx
│   │   ├── header.tsx
│   │   └── loading-spinner.tsx
│   │
│   └── ui/                      # 🎨 COMPONENTES UI BASE (shadcn)
│       ├── button.tsx
│       ├── dialog.tsx
│       ├── input.tsx
│       └── ...
│
├── lib/
│   ├── auth-context.tsx         # Contexto de autenticación
│   ├── storage.ts               # Funciones de almacenamiento
│   ├── types.ts                 # Tipos TypeScript globales
│   │
│   ├── constants/               # Constantes del sistema
│   │   ├── roles.ts
│   │   └── status.ts
│   │
│   ├── utils/                   # Utilidades generales
│   │   ├── format.ts
│   │   ├── validation.ts
│   │   └── calculations.ts
│   │
│   └── styles/                  # Sistema de estilos
│       └── theme.ts
│
└── docs/                        # Documentación
    ├── README_DESARROLLADORES.md
    ├── GUIA_ESTILOS.md
    ├── REPORTE_TECNICO.md
    └── ESTRUCTURA_PROYECTO.md (este archivo)
\`\`\`

---

## 🎯 Cómo Modificar Cada Interfaz

### 1️⃣ Modificar la Interfaz de Login
**Ubicación:** `components/auth/`
- **Formulario:** `login-form.tsx`
- **Botones de acceso rápido:** `quick-access.tsx`
- **Página completa:** `index.tsx`

### 2️⃣ Modificar el Dashboard
**Ubicación:** `components/dashboard/`
- **Admin:** `admin/index.tsx`
- **Asistente:** `assistant/index.tsx`
- **Proveedor:** `provider/index.tsx`

### 3️⃣ Modificar la Gestión de Órdenes
**Ubicación:** `components/orders/`
- **Tabla de órdenes:** `components/orders-table.tsx`
- **Crear nueva orden:** `dialogs/new-order-dialog.tsx`
- **Filtros:** `components/order-filters.tsx`
- **Lógica de datos:** `hooks/use-orders.ts`

### 4️⃣ Modificar la Gestión de Proveedores
**Ubicación:** `components/providers/`
- **Tabla:** `components/providers-table.tsx`
- **Formularios:** `dialogs/new-provider-dialog.tsx`
- **Lógica:** `hooks/use-providers.ts`

### 5️⃣ Modificar la Gestión de Pagos
**Ubicación:** `components/payments/`
- **Tabla:** `components/payments-table.tsx`
- **Registrar pago:** `dialogs/new-payment-dialog.tsx`
- **Generar factura:** `dialogs/invoice-dialog.tsx`

### 6️⃣ Modificar Estadísticas
**Ubicación:** `components/statistics/`
- **Gráficos:** `components/comparison-charts.tsx`
- **Selector de período:** `components/period-selector.tsx`
- **Tarjetas de resumen:** `components/summary-cards.tsx`

### 7️⃣ Modificar Gestión de Usuarios (Admin)
**Ubicación:** `components/users/`
- **Tabla de usuarios:** `components/users-table.tsx`
- **Formulario:** `dialogs/user-form-dialog.tsx`

### 8️⃣ Modificar Auditoría (Admin)
**Ubicación:** `components/audit/`
- **Tabla de logs:** `components/audit-table.tsx`
- **Filtros:** `components/audit-filters.tsx`

### 9️⃣ Modificar Materiales (Proveedor)
**Ubicación:** `components/materials/`
- **Tabla:** `components/materials-table.tsx`
- **Agregar material:** `dialogs/new-material-dialog.tsx`

---

## 🎨 Modificar Estilos Visuales

### Colores y Tema
**Archivo:** `lib/styles/theme.ts`
\`\`\`typescript
// Cambiar colores principales
export const colors = {
  primary: '#1e40af',    // Azul principal
  secondary: '#06b6d4',  // Cyan
  // ... modificar aquí
}
\`\`\`

### Estilos de Componentes
**Archivo:** `lib/styles/theme.ts` (sección componentStyles)
\`\`\`typescript
// Cambiar estilos de botones, inputs, etc.
export const componentStyles = {
  button: {
    primary: '...',
    // ... modificar aquí
  }
}
\`\`\`

---

## 🔧 Modificar Lógica de Negocio

### Funciones de Almacenamiento
**Archivo:** `lib/storage.ts`
- Funciones para guardar/leer datos de localStorage
- Inicialización de datos

### Validaciones
**Archivo:** `lib/utils/validation.ts`
- Validación de emails, teléfonos, etc.

### Cálculos
**Archivo:** `lib/utils/calculations.ts`
- Cálculo de totales, IVA, etc.

### Formateo
**Archivo:** `lib/utils/format.ts`
- Formateo de fechas, moneda, etc.

---

## 📋 Flujo de Trabajo Recomendado

### Para Modificar una Interfaz:

1. **Identifica la interfaz** que quieres modificar
2. **Ve a la carpeta** correspondiente en `components/`
3. **Modifica el archivo** específico:
   - `index.tsx` → Estructura principal
   - `components/` → Componentes visuales
   - `dialogs/` → Modales y formularios
   - `hooks/` → Lógica de datos
4. **Prueba los cambios** en el navegador

### Para Modificar Estilos:

1. **Estilos globales** → `lib/styles/theme.ts`
2. **Estilos específicos** → Archivo del componente
3. **Colores del sistema** → `lib/styles/theme.ts` (colors)

### Para Modificar Lógica:

1. **Validaciones** → `lib/utils/validation.ts`
2. **Cálculos** → `lib/utils/calculations.ts`
3. **Almacenamiento** → `lib/storage.ts`
4. **Autenticación** → `lib/auth-context.tsx`

---

## ⚠️ Reglas Importantes

1. **NO modifiques** archivos en `components/ui/` (son de shadcn)
2. **Siempre documenta** tus cambios con comentarios
3. **Prueba** después de cada modificación
4. **Mantén** la estructura de carpetas
5. **Usa** los hooks personalizados en lugar de duplicar lógica

---

## 🆘 Problemas Comunes

### "No encuentro dónde modificar X"
→ Busca en la carpeta correspondiente a esa interfaz

### "Los cambios no se reflejan"
→ Verifica que estés modificando el archivo correcto
→ Recarga el navegador (Ctrl + R)

### "Rompí algo"
→ Revisa los errores en la consola del navegador
→ Verifica que no hayas eliminado imports necesarios

---

## 📞 Contacto

Para dudas sobre la estructura del proyecto, consulta:
- `README_DESARROLLADORES.md` - Guía completa de desarrollo
- `GUIA_ESTILOS.md` - Guía de estilos visuales
- `REPORTE_TECNICO.md` - Documentación técnica completa
