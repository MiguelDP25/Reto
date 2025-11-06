"use client"

/**
 * COMPONENTE: SIDEBAR (BARRA LATERAL)
 * ====================================
 * Navegación principal del sistema con menú dinámico según rol de usuario.
 *
 * CARACTERÍSTICAS:
 * - Menú adaptativo según rol (Administrador, Asistente, Proveedor)
 * - Información del usuario actual
 * - Botón de cerrar sesión
 * - Navegación entre páginas
 * - Menú colapsible con iconos
 */

import {
  LayoutDashboard,
  FileText,
  Users,
  CreditCard,
  BarChart3,
  Settings,
  FileCheck,
  Package,
  LogOut,
  UserCircle,
} from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { SidebarMenuItem } from "@/components/sidebar-menu-item"

interface SidebarProps {
  currentPage: string
  onNavigate: (page: any) => void
}

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  const { user, logout } = useAuth()

  const getMenuItems = () => {
    if (user?.role === "administrador") {
      return [
        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, section: "PRINCIPAL" },
        { id: "orders", label: "Órdenes", icon: FileText, section: "GESTIÓN" },
        { id: "clients", label: "Clientes", icon: UserCircle, section: "GESTIÓN" },
        { id: "providers", label: "Proveedores", icon: Users, section: "GESTIÓN" },
        { id: "payments", label: "Pagos", icon: CreditCard, section: "GESTIÓN" },
        { id: "statistics", label: "Estadísticas", icon: BarChart3, section: "GESTIÓN" },
        { id: "users", label: "Usuarios", icon: Settings, section: "ADMINISTRACIÓN" },
        { id: "audit", label: "Auditoría", icon: FileCheck, section: "ADMINISTRACIÓN" },
      ]
    }

    if (user?.role === "asistente") {
      return [
        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, section: "PRINCIPAL" },
        { id: "orders", label: "Órdenes", icon: FileText, section: "GESTIÓN" },
        { id: "clients", label: "Clientes", icon: UserCircle, section: "GESTIÓN" },
        { id: "payments", label: "Pagos", icon: CreditCard, section: "GESTIÓN" },
        { id: "statistics", label: "Estadísticas", icon: BarChart3, section: "GESTIÓN" },
      ]
    }

    if (user?.role === "proveedor") {
      return [
        { id: "orders", label: "Órdenes Recibidas", icon: FileText, section: "GESTIÓN" },
        { id: "materials", label: "Materiales", icon: Package, section: "GESTIÓN" },
        { id: "statistics", label: "Estadísticas", icon: BarChart3, section: "GESTIÓN" },
      ]
    }

    return []
  }

  const menuItems = getMenuItems()
  const sections = Array.from(new Set(menuItems.map((item) => item.section)))

  return (
    <aside className="w-16 hover:w-56 bg-blue-600 text-white flex flex-col transition-all duration-300 group">
      <div className="p-3 border-b border-blue-500 flex-shrink-0">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-blue-600" fill="currentColor">
              <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
            </svg>
          </div>
          <h1 className="text-sm font-bold leading-tight opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Sistema de Gestión
          </h1>
        </div>
        {user && (
          <div className="mt-2 pt-2 border-t border-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-xs font-medium text-blue-100 truncate">{user.name}</p>
            <p className="text-xs text-blue-200 capitalize">{user.role}</p>
          </div>
        )}
      </div>

      <nav className="flex-1 p-2 overflow-y-auto">
        {sections.map((section) => (
          <div key={section} className="mb-4">
            <p className="text-xs font-semibold text-blue-200 mb-2 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              {section}
            </p>
            <div className="space-y-1">
              {menuItems
                .filter((item) => item.section === section)
                .map((item) => (
                  <SidebarMenuItem
                    key={item.id}
                    icon={item.icon}
                    label={item.label}
                    isActive={currentPage === item.id}
                    onClick={() => onNavigate(item.id)}
                  />
                ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-2 border-t border-blue-500 space-y-2 flex-shrink-0">
        <Button
          onClick={logout}
          variant="ghost"
          className="w-full justify-start text-blue-100 hover:bg-blue-500/50 hover:text-white h-9 text-sm px-3 overflow-hidden"
        >
          <LogOut className="w-4 h-4 mr-2 flex-shrink-0" />
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Cerrar Sesión
          </span>
        </Button>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="text-xs text-blue-200 text-center">Óptica Dr. Mejía</p>
          <p className="text-xs text-blue-300 text-center">© 2025</p>
        </div>
      </div>
    </aside>
  )
}
