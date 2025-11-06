# Reporte Técnico - Sistema de Gestión Óptica Dr. Mejía

## 📋 Resumen Ejecutivo

Sistema de gestión integral para óptica con control de acceso basado en roles (RBAC), desarrollado como aplicación web de escritorio con almacenamiento local.

---

## 🛠️ Stack Tecnológico

### Frontend Framework
- **Next.js 15** (App Router)
  - Framework React para aplicaciones web modernas
  - Renderizado del lado del servidor (SSR) y del cliente (CSR)
  - Enrutamiento basado en archivos
  - Optimización automática de rendimiento

### Lenguajes de Programación
- **TypeScript 5.x**
  - Tipado estático para mayor seguridad y mantenibilidad
  - Autocompletado inteligente en el IDE
  - Detección de errores en tiempo de desarrollo

### Librería de UI
- **React 18**
  - Componentes funcionales con Hooks
  - Context API para gestión de estado global
  - Renderizado eficiente con Virtual DOM

### Sistema de Diseño
- **shadcn/ui**
  - Componentes accesibles y personalizables
  - Basado en Radix UI primitives
  - Incluye: Button, Input, Card, Dialog, Select, Table, Alert, Badge, etc.

### Estilos
- **Tailwind CSS v4**
  - Utility-first CSS framework
  - Diseño responsive con breakpoints
  - Tema personalizado con design tokens
  - Clases optimizadas para producción

### Gráficos y Visualización
- **Recharts**
  - Librería de gráficos para React
  - Gráficos de barras, líneas, áreas
  - Tooltips interactivos
  - Responsive y animados

### Iconos
- **Lucide React**
  - Iconos SVG optimizados
  - Más de 1000 iconos disponibles
  - Totalmente personalizables

---

## 🏗️ Arquitectura del Sistema

### Estructura de Carpetas

\`\`\`
optica-gestion/
├── app/
│   ├── layout.tsx          # Layout principal con AuthProvider
│   ├── page.tsx            # Página principal con enrutamiento por roles
│   └── globals.css         # Estilos globales y design tokens
├── components/
│   ├── ui/                 # Componentes base de shadcn/ui
│   ├── login-page.tsx      # Página de autenticación
│   ├── sidebar.tsx         # Navegación lateral con permisos por rol
│   ├── dashboard.tsx       # Dashboard general (sin roles)
│   ├── admin-dashboard.tsx # Dashboard del administrador
│   ├── assistant-dashboard.tsx # Dashboard del asistente
│   ├── provider-dashboard.tsx  # Dashboard del proveedor
│   ├── orders-page.tsx     # Gestión de órdenes
│   ├── providers-page.tsx  # Gestión de proveedores
│   ├── payments-page.tsx   # Gestión de pagos
│   ├── statistics-page.tsx # Estadísticas y reportes
│   ├── user-management-page.tsx # Gestión de usuarios (admin)
│   ├── audit-logs-page.tsx # Registro de auditoría (admin)
│   ├── provider-orders-page.tsx # Órdenes del proveedor
│   ├── materials-page.tsx  # Gestión de materiales (proveedor)
│   ├── provider-statistics-page.tsx # Estadísticas del proveedor
│   ├── new-order-dialog.tsx # Modal para crear órdenes
│   ├── new-provider-dialog.tsx # Modal para crear proveedores
│   ├── new-payment-dialog.tsx # Modal para registrar pagos
│   └── invoice-dialog.tsx  # Generación de facturas
├── lib/
│   ├── types.ts            # Definiciones de tipos TypeScript
│   ├── storage.ts          # Funciones de almacenamiento local
│   ├── auth-context.tsx    # Context de autenticación
│   └── utils.ts            # Utilidades (cn para clases)
└── hooks/
    ├── use-mobile.tsx      # Hook para detectar dispositivos móviles
    └── use-toast.ts        # Hook para notificaciones toast
\`\`\`

### Patrones de Diseño Implementados

#### 1. Context API Pattern
- **AuthContext**: Gestión global del estado de autenticación
- Provee: `user`, `login()`, `logout()`, `hasPermission()`
- Persiste sesión en localStorage

#### 2. Component Composition
- Componentes reutilizables y modulares
- Separación de lógica y presentación
- Props tipadas con TypeScript

#### 3. Custom Hooks
- `useAuth()`: Acceso al contexto de autenticación
- `useMobile()`: Detección de dispositivos móviles
- `useToast()`: Sistema de notificaciones

#### 4. Repository Pattern (Storage)
- Abstracción del almacenamiento de datos
- Funciones CRUD para cada entidad
- Inicialización automática de datos de prueba

---

## 🔐 Sistema de Autenticación y Autorización

### Roles de Usuario

#### 1. Administrador
**Permisos:**
- Gestión completa de usuarios (crear, editar, eliminar)
- Gestión de proveedores
- Visualización de registros de auditoría
- Acceso a todas las estadísticas
- Configuración del sistema

**Páginas accesibles:**
- Dashboard de administrador
- Gestión de usuarios
- Gestión de proveedores
- Órdenes (solo lectura)
- Pagos (solo lectura)
- Estadísticas globales
- Registro de auditoría

#### 2. Asistente Óptico
**Permisos:**
- Crear y gestionar órdenes de trabajo
- Registrar pagos
- Generar facturas
- Ver historial de clientes
- Enviar órdenes a proveedores

**Páginas accesibles:**
- Dashboard de asistente
- Gestión de órdenes (completa)
- Gestión de pagos (completa)
- Estadísticas de ventas

#### 3. Proveedor
**Permisos:**
- Ver órdenes asignadas
- Actualizar estado de órdenes
- Gestionar inventario de materiales
- Ver estadísticas propias
- Notificar órdenes completadas

**Páginas accesibles:**
- Dashboard de proveedor
- Órdenes recibidas
- Gestión de materiales
- Estadísticas de desempeño

### Flujo de Autenticación

\`\`\`
1. Usuario ingresa credenciales
2. Sistema valida contra localStorage
3. Si es válido, crea sesión y guarda en localStorage
4. Actualiza lastLogin del usuario
5. Registra evento en audit log
6. Redirige al dashboard según rol
\`\`\`

---

## 💾 Modelo de Datos

### Entidades Principales

#### User (Usuario)
\`\`\`typescript
{
  id: string
  name: string
  email: string
  password: string
  role: "administrador" | "asistente" | "proveedor"
  active: boolean
  createdAt: string
  lastLogin: string | null
}
\`\`\`

#### Provider (Proveedor)
\`\`\`typescript
{
  id: string
  name: string
  contact: string
  phone: string
  email: string
  serviceType: string
  status: "activo" | "inactivo"
  createdAt: string
}
\`\`\`

#### Order (Orden)
\`\`\`typescript
{
  id: string
  clientName: string
  clientDocument: string
  provider: string
  formulaOD: { esfera, cilindro, eje, adicion }
  formulaOI: { esfera, cilindro, eje, adicion }
  lensType: string
  treatment: string
  amount: number
  estimatedDate: string
  observations: string
  status: "pendiente" | "en_proceso" | "completada" | "cancelada"
  createdAt: string
  updatedAt: string
}
\`\`\`

#### Payment (Pago)
\`\`\`typescript
{
  id: string
  orderId: string
  orderNumber: string
  provider: string
  amount: number
  method: string
  reference: string
  date: string
  receipt: string | null
  createdAt: string
}
\`\`\`

#### Material (Material)
\`\`\`typescript
{
  id: string
  name: string
  type: string
  stock: number
  price: number
  providerId: string
  createdAt: string
}
\`\`\`

#### AuditLog (Registro de Auditoría)
\`\`\`typescript
{
  id: string
  userId: string
  userName: string
  action: string
  entity: string
  entityId: string
  details: string
  timestamp: string
}
\`\`\`

---

## 📊 Funcionalidades Principales

### 1. Gestión de Órdenes
- Creación de órdenes con fórmula óptica completa
- Selección de proveedor
- Cálculo automático de montos
- Estados: Pendiente, En Proceso, Completada, Cancelada
- Filtrado por estado
- Búsqueda por cliente o número de orden

### 2. Gestión de Proveedores
- CRUD completo de proveedores
- Estados: Activo/Inactivo
- Información de contacto
- Tipo de servicio
- Estadísticas por proveedor

### 3. Gestión de Pagos
- Registro de pagos por orden
- Múltiples métodos de pago
- Adjuntar comprobantes
- Generación de facturas en PDF
- Estadísticas de pagos (hoy, mes, total)

### 4. Estadísticas y Reportes
- Comparación de períodos
- Gráficos de órdenes por día
- Métricas clave:
  - Total de órdenes
  - Órdenes por día
  - Órdenes completadas
  - Valor promedio
- Indicadores de cambio porcentual
- Exportación de datos

### 5. Gestión de Usuarios (Admin)
- Crear, editar, eliminar usuarios
- Asignar roles
- Activar/desactivar usuarios
- Ver último acceso

### 6. Registro de Auditoría (Admin)
- Registro automático de acciones críticas
- Filtrado por usuario, acción, fecha
- Búsqueda en detalles
- Historial completo de cambios

### 7. Gestión de Materiales (Proveedor)
- CRUD de materiales
- Control de inventario
- Precios
- Alertas de stock bajo

---

## 🎨 Sistema de Diseño

### Paleta de Colores

**Colores Principales:**
- Primary: `#2563eb` (Azul)
- Secondary: `#64748b` (Gris azulado)
- Success: `#10b981` (Verde)
- Warning: `#f59e0b` (Naranja)
- Danger: `#ef4444` (Rojo)
- Info: `#06b6d4` (Cyan)

**Colores de Fondo:**
- Background: `#ffffff`
- Secondary Background: `#f8fafc`
- Card: `#ffffff`
- Muted: `#f1f5f9`

**Colores de Texto:**
- Foreground: `#0f172a`
- Muted Foreground: `#64748b`

### Tipografía

**Fuentes:**
- Sans: Geist (sistema)
- Mono: Geist Mono (código)

**Escalas:**
- xs: 0.75rem
- sm: 0.875rem
- base: 1rem
- lg: 1.125rem
- xl: 1.25rem
- 2xl: 1.5rem
- 3xl: 1.875rem

### Espaciado

Sistema de espaciado basado en múltiplos de 4px:
- 1: 0.25rem (4px)
- 2: 0.5rem (8px)
- 4: 1rem (16px)
- 6: 1.5rem (24px)
- 8: 2rem (32px)

---

## 🔄 Flujos de Trabajo

### Flujo de Creación de Orden

\`\`\`
1. Asistente crea nueva orden
2. Ingresa datos del cliente
3. Ingresa fórmula óptica (OD y OI)
4. Selecciona tipo de lente y tratamiento
5. Selecciona proveedor
6. Ingresa monto y fecha estimada
7. Sistema guarda orden con estado "pendiente"
8. Registra acción en audit log
9. Proveedor ve la orden en su dashboard
\`\`\`

### Flujo de Pago

\`\`\`
1. Asistente selecciona orden completada
2. Registra pago con método y referencia
3. Opcionalmente adjunta comprobante
4. Sistema actualiza estado de pago
5. Genera factura en PDF
6. Registra en estadísticas
7. Registra acción en audit log
\`\`\`

### Flujo de Actualización de Orden (Proveedor)

\`\`\`
1. Proveedor ve órdenes asignadas
2. Actualiza estado a "en_proceso"
3. Trabaja en la orden
4. Actualiza estado a "completada"
5. Sistema notifica al asistente
6. Registra cambios en audit log
\`\`\`

---

## 📈 Métricas y KPIs

### Dashboard Administrador
- Total de usuarios activos
- Total de proveedores activos
- Órdenes del mes
- Ingresos del mes

### Dashboard Asistente
- Órdenes pendientes
- Órdenes en proceso
- Órdenes completadas hoy
- Pagos pendientes

### Dashboard Proveedor
- Órdenes recibidas
- Órdenes en proceso
- Órdenes completadas
- Materiales con stock bajo

---

## 🔒 Seguridad

### Medidas Implementadas

1. **Autenticación:**
   - Validación de credenciales
   - Sesiones persistentes
   - Cierre de sesión seguro

2. **Autorización:**
   - Control de acceso basado en roles
   - Validación de permisos en cada acción
   - Rutas protegidas

3. **Auditoría:**
   - Registro de todas las acciones críticas
   - Trazabilidad completa
   - Timestamps en todas las operaciones

4. **Validación de Datos:**
   - Validación en formularios
   - Tipos estrictos con TypeScript
   - Sanitización de inputs

### Consideraciones de Seguridad

⚠️ **Nota Importante:** Este sistema utiliza localStorage para almacenamiento de datos, lo cual es adecuado para desarrollo y pruebas, pero NO es seguro para producción. Para un entorno de producción se recomienda:

- Implementar backend con base de datos real
- Usar JWT con refresh tokens
- Hash de contraseñas con bcrypt
- HTTPS obligatorio
- Rate limiting en endpoints
- Validación del lado del servidor

---

## 🚀 Rendimiento

### Optimizaciones Implementadas

1. **Code Splitting:**
   - Carga lazy de componentes
   - Rutas separadas por rol

2. **Memoización:**
   - React.memo en componentes pesados
   - useMemo para cálculos costosos

3. **Optimización de Imágenes:**
   - Next.js Image component
   - Lazy loading automático

4. **CSS Optimizado:**
   - Tailwind purge en producción
   - Clases utility-first

---

## 📱 Responsive Design

El sistema está optimizado para:
- Desktop: 1920x1080 (principal)
- Laptop: 1366x768
- Tablet: 768x1024
- Mobile: 375x667 (funcionalidad limitada)

---

## 🧪 Testing

### Usuarios de Prueba

Ver sección de credenciales al final del documento.

### Datos de Prueba

El sistema inicializa automáticamente con:
- 3 usuarios (uno por rol)
- Datos de ejemplo en todas las entidades
- Registros de auditoría de ejemplo

---

## 🔮 Roadmap Futuro

### Fase 2 (Recomendado)
- [ ] Backend con Node.js/Express
- [ ] Base de datos PostgreSQL/MySQL
- [ ] API REST con autenticación JWT
- [ ] Notificaciones en tiempo real
- [ ] Sistema de mensajería interno

### Fase 3
- [ ] Aplicación móvil (React Native)
- [ ] Integración con WhatsApp
- [ ] Firma digital de documentos
- [ ] Backup automático en la nube
- [ ] Multi-tenancy (múltiples ópticas)

---

## 📞 Soporte y Mantenimiento

### Requisitos del Sistema

- Navegador moderno (Chrome, Firefox, Safari, Edge)
- JavaScript habilitado
- LocalStorage habilitado
- Conexión a internet (para fuentes y CDN)

### Instalación

\`\`\`bash
# Clonar repositorio
git clone [url-del-repo]

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Compilar para producción
npm run build

# Ejecutar en producción
npm start
\`\`\`

---

## 📄 Licencia

Sistema propietario - Óptica Dr. Mejía © 2025

---

## 👥 Créditos

**Desarrollado por:** v0 by Vercel
**Framework:** Next.js 15
**UI Library:** shadcn/ui
**Fecha:** Enero 2025
**Versión:** 1.0.0

---

# 🔑 CREDENCIALES DE ACCESO

## Usuarios de Prueba

### 👨‍💼 Administrador
- **Email:** admin@optica.com
- **Contraseña:** admin123
- **Permisos:** Acceso completo al sistema

### 👩‍⚕️ Asistente Óptico
- **Email:** asistente@optica.com
- **Contraseña:** asistente123
- **Permisos:** Gestión de órdenes y pagos

### 🏭 Proveedor
- **Email:** proveedor@optica.com
- **Contraseña:** proveedor123
- **Permisos:** Gestión de órdenes recibidas y materiales

---

**Nota:** Estas credenciales son solo para pruebas. En producción, cada usuario debe tener credenciales únicas y seguras.
