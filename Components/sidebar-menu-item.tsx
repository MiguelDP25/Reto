"use client"

import type React from "react"

/**
 * COMPONENTE: SIDEBAR MENU ITEM
 * ==============================
 * Elemento de menú colapsible que muestra solo icono normalmente,
 * y se expande para mostrar el icono + nombre al pasar el cursor o seleccionar.
 *
 * PROPS:
 * - icon: Componente del icono de Lucide
 * - label: Texto del elemento del menú
 * - isActive: Si el elemento está activo/seleccionado
 * - onClick: Función al hacer clic
 */

import { cn } from "@/lib/utils"

interface SidebarMenuItemProps {
  icon: React.ComponentType<{ className?: string }>
  label: string
  isActive: boolean
  onClick: () => void
}

export function SidebarMenuItem({ icon: Icon, label, isActive, onClick }: SidebarMenuItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300 w-12 hover:w-full",
        isActive ? "bg-blue-500 text-white shadow-lg" : "text-blue-100 hover:bg-blue-500/50 hover:text-white",
      )}
      title={label}
    >
      <Icon className="w-5 h-5 flex-shrink-0" />
      <span
        className={cn(
          "whitespace-nowrap font-medium text-sm transition-opacity duration-300 overflow-hidden",
          isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100",
        )}
      >
        {label}
      </span>
    </button>
  )
}
