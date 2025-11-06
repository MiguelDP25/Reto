# Sistema de Gestión Óptica - Guía para Desarrolladores

## 📋 Tabla de Contenidos
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Arquitectura](#arquitectura)
- [Guía de Modificación](#guía-de-modificación)
- [Convenciones de Código](#convenciones-de-código)

## 📁 Estructura del Proyecto

\`\`\`
optica-gestion/
├── app/                          # Páginas de Next.js
│   ├── layout.tsx               # Layout principal con AuthProvider
│   ├── page.tsx                 # Página principal (router de roles)
│   └── globals.css              # Estilos globales y tokens de diseño
│
├── components/                   # Componentes React
│   ├── ui/                      # Componentes UI base (shadcn/ui)
│   ├── features/                # Componentes de funcionalidades
│   │   ├── orders/             # Componentes relacionados con órdenes
│   │   ├── providers/          # Componentes de proveedores
│   │   ├── payments/           # Componentes de pagos
│   │   └── statistics/         # Componentes de estadísticas
│   ├── dashboard/              # Dashboards por rol
│   └── shared/                 # Componentes compartidos
│
├── lib/                         # Lógica de negocio y utilidades
│   ├── api/                    # Funciones de acceso a datos
│   │   ├── orders.ts          # CRUD de órdenes
│   │   ├── providers.ts       # CRUD de proveedores
│   │   ├── payments.ts        # CRUD de pagos
│   │   ├── users.ts           # CRUD de usuarios
│   │   └── materials.ts       # CRUD de materiales
│   │
│   ├── hooks/                  # Custom React Hooks
│   │   ├── use-orders.ts      # Hook para gestión de órdenes
│   │   ├── use-providers.ts   # Hook para gestión de proveedores
│   │   ├── use-payments.ts    # Hook para gestión de pagos
│   │   └── use-statistics.ts  # Hook para estadísticas
│   │
│   ├── utils/                  # Funciones de utilidad
│   │   ├── format.ts          # Formateo de datos (fechas, moneda)
│   │   ├── validation.ts      # Validaciones
│   │   └── calculations.ts    # Cálculos (totales, estadísticas)
│   │
│   ├── constants/              # Constantes de la aplicación
│   │   ├── roles.ts           # Definición de roles y permisos
│   │   ├── status.ts          # Estados de órdenes, pagos, etc.
│   │   └── config.ts          # Configuración general
│   │
│   ├── types.ts               # Definiciones de tipos TypeScript
│   ├── storage.ts             # Capa de persistencia (localStorage)
│   └── auth-context.tsx       # Contexto de autenticación
│
└── REPORTE_TECNICO.md          # Documentación técnica completa
\`\`\`

## 🏗️ Arquitectura

### Flujo de Datos
\`\`\`
Usuario → Componente → Hook → API Layer → Storage → localStorage
                ↓
            UI Update
\`\`\`

### Capas de la Aplicación

1. **Capa de Presentación** (`components/`)
   - Componentes React puros
   - Solo manejo de UI y eventos
   - No contienen lógica de negocio

2. **Capa de Lógica** (`lib/hooks/`)
   - Custom hooks para estado y efectos
   - Orquestación de llamadas a API
   - Gestión de estado local

3. **Capa de Acceso a Datos** (`lib/api/`)
   - Funciones CRUD
   - Validaciones de datos
   - Transformaciones

4. **Capa de Persistencia** (`lib/storage.ts`)
   - Abstracción de localStorage
   - Inicialización de datos
   - Gestión de claves

## 🔧 Guía de Modificación

### Agregar una Nueva Funcionalidad

#### 1. Definir Tipos
\`\`\`typescript
// lib/types.ts
export interface NuevaEntidad {
  id: string
  nombre: string
  // ... otros campos
}
\`\`\`

#### 2. Crear API Layer
\`\`\`typescript
// lib/api/nueva-entidad.ts
/**
 * Obtiene todas las entidades
 * @returns Array de entidades
 */
export function getNuevasEntidades(): NuevaEntidad[] {
  // Implementación
}

/**
 * Crea una nueva entidad
 * @param data - Datos de la entidad
 * @returns Entidad creada
 */
export function createNuevaEntidad(data: Omit<NuevaEntidad, 'id'>): NuevaEntidad {
  // Implementación
}
\`\`\`

#### 3. Crear Custom Hook
\`\`\`typescript
// lib/hooks/use-nueva-entidad.ts
/**
 * Hook para gestionar entidades
 * Proporciona estado y funciones CRUD
 */
export function useNuevaEntidad() {
  const [entidades, setEntidades] = useState<NuevaEntidad[]>([])
  const [loading, setLoading] = useState(false)

  const loadEntidades = useCallback(() => {
    setLoading(true)
    const data = getNuevasEntidades()
    setEntidades(data)
    setLoading(false)
  }, [])

  return { entidades, loading, loadEntidades }
}
\`\`\`

#### 4. Crear Componente
\`\`\`typescript
// components/features/nueva-entidad/nueva-entidad-page.tsx
/**
 * Página de gestión de entidades
 * Muestra lista y permite CRUD
 */
export function NuevaEntidadPage() {
  const { entidades, loading, loadEntidades } = useNuevaEntidad()
  
  // UI implementation
}
\`\`\`

### Modificar Funcionalidad Existente

#### Cambiar Lógica de Negocio
1. Ubicar el archivo en `lib/api/`
2. Modificar la función específica
3. Actualizar JSDoc si cambia el comportamiento
4. Verificar que los tipos sigan siendo correctos

#### Cambiar UI
1. Ubicar el componente en `components/`
2. Modificar solo la parte visual
3. No agregar lógica de negocio aquí
4. Usar hooks existentes para datos

#### Agregar Validación
1. Agregar función en `lib/utils/validation.ts`
2. Usar en el API layer antes de guardar
3. Mostrar errores en el componente

## 📝 Convenciones de Código

### Nomenclatura

- **Archivos**: kebab-case (`nueva-entidad.ts`)
- **Componentes**: PascalCase (`NuevaEntidadPage`)
- **Funciones**: camelCase (`getNuevaEntidad`)
- **Constantes**: UPPER_SNAKE_CASE (`MAX_ITEMS`)
- **Tipos**: PascalCase (`NuevaEntidad`)

### Comentarios

#### JSDoc para Funciones
\`\`\`typescript
/**
 * Descripción breve de la función
 * 
 * @param param1 - Descripción del parámetro
 * @param param2 - Descripción del parámetro
 * @returns Descripción del valor retornado
 * @throws Error si ocurre X condición
 * 
 * @example
 * const resultado = miFuncion('valor1', 'valor2')
 */
\`\`\`

#### Comentarios Inline
\`\`\`typescript
// IMPORTANTE: Explicación de por qué se hace algo no obvio
const valor = calcularAlgo()

// TODO: Funcionalidad pendiente de implementar
// FIXME: Bug conocido que necesita corrección
\`\`\`

### Estructura de Componentes

\`\`\`typescript
"use client" // Si usa hooks de React

// 1. Imports externos
import { useState } from "react"

// 2. Imports de componentes UI
import { Button } from "@/components/ui/button"

// 3. Imports de hooks personalizados
import { useOrders } from "@/lib/hooks/use-orders"

// 4. Imports de tipos
import type { Order } from "@/lib/types"

/**
 * Componente de ejemplo
 * Descripción de qué hace el componente
 */
export function MiComponente() {
  // 1. Hooks de estado
  const [estado, setEstado] = useState()
  
  // 2. Hooks personalizados
  const { data, loading } = useMiHook()
  
  // 3. Funciones de manejo de eventos
  const handleClick = () => {
    // Implementación
  }
  
  // 4. Efectos
  useEffect(() => {
    // Implementación
  }, [])
  
  // 5. Renderizado condicional temprano
  if (loading) return <div>Cargando...</div>
  
  // 6. Render principal
  return (
    <div>
      {/* Contenido */}
    </div>
  )
}
\`\`\`

### Manejo de Errores

\`\`\`typescript
try {
  const resultado = operacionRiesgosa()
  return resultado
} catch (error) {
  console.error('[v0] Error en operacionRiesgosa:', error)
  // Manejo apropiado del error
  throw new Error('Mensaje descriptivo para el usuario')
}
\`\`\`

## 🔐 Sistema de Roles

### Permisos por Rol

\`\`\`typescript
// lib/constants/roles.ts
export const PERMISSIONS = {
  ADMIN: ['*'], // Acceso total
  ASSISTANT: ['orders:create', 'orders:read', 'payments:create'],
  PROVIDER: ['orders:read', 'orders:update', 'materials:manage']
}
\`\`\`

### Verificar Permisos

\`\`\`typescript
import { useAuth } from '@/lib/auth-context'
import { hasPermission } from '@/lib/utils/permissions'

function MiComponente() {
  const { user } = useAuth()
  
  if (!hasPermission(user, 'orders:create')) {
    return <div>No tienes permiso</div>
  }
  
  // Renderizar contenido permitido
}
\`\`\`

## 🧪 Testing (Futuro)

### Estructura de Tests
\`\`\`
__tests__/
├── unit/           # Tests unitarios de funciones
├── integration/    # Tests de integración
└── e2e/           # Tests end-to-end
\`\`\`

## 📊 Debugging

### Console Logs
Usar el prefijo `[v0]` para logs de desarrollo:
\`\`\`typescript
console.log('[v0] Estado actual:', estado)
console.error('[v0] Error en función X:', error)
\`\`\`

### React DevTools
- Instalar extensión de React DevTools
- Inspeccionar componentes y props
- Ver contexto de autenticación

## 🚀 Despliegue

### Variables de Entorno
\`\`\`env
# No hay variables de entorno por ahora
# Todo se maneja con localStorage
\`\`\`

### Build
\`\`\`bash
npm run build
npm run start
\`\`\`

## 📚 Recursos Adicionales

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)

## 🤝 Contribuir

1. Leer esta guía completa
2. Seguir las convenciones establecidas
3. Documentar todo código nuevo
4. Probar cambios antes de commit
5. Actualizar documentación si es necesario

---

**Última actualización**: 2025
**Mantenedor**: Equipo de Desarrollo Óptica Dr. Mejía
