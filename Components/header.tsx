"use client"

/**
 * COMPONENTE: HEADER (BARRA SUPERIOR)
 * ====================================
 * Barra superior con logo, título de página y notificaciones.
 *
 * CARACTERÍSTICAS:
 * - Logo de la óptica
 * - Título dinámico según la página actual
 * - Centro de notificaciones
 * - Información del usuario
 *
 * PARA MODIFICAR:
 * - Cambiar logo → Actualizar imagen en el div del logo
 * - Agregar más acciones → Agregar botones junto a notificaciones
 * - Estilos → Modificar clases Tailwind
 */

import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"

interface HeaderProps {
  /** Título de la página actual */
  title: string
  /** Subtítulo o descripción de la página */
  subtitle?: string
}

export function Header({ title, subtitle }: HeaderProps) {
  // Estado para las notificaciones (simuladas)
  const [notifications] = useState([
    {
      id: 1,
      title: "Nueva orden recibida",
      message: "Orden #ORD-00003 de Juan Pérez",
      time: "Hace 5 min",
      unread: true,
    },
    { id: 2, title: "Pago registrado", message: "Pago de $150.00 confirmado", time: "Hace 1 hora", unread: true },
    {
      id: 3,
      title: "Orden completada",
      message: "Orden #ORD-00001 lista para entrega",
      time: "Hace 2 horas",
      unread: false,
    },
  ])

  const unreadCount = notifications.filter((n) => n.unread).length

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo y título */}
        <div className="flex items-center gap-4">
          {/* Logo de Ópticas Dr. Mejía */}
          <div className="relative w-12 h-12 flex-shrink-0">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-JDQQA4og8C8q98zuWbRNYWCxkaTu9r.png"
              alt="Ópticas Dr. Mejía"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Título de la página */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
          </div>
        </div>

        {/* Notificaciones */}
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500">
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel className="flex items-center justify-between">
                <span>Notificaciones</span>
                {unreadCount > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {unreadCount} nuevas
                  </Badge>
                )}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notification) => (
                  <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-3 cursor-pointer">
                    <div className="flex items-start justify-between w-full">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{notification.title}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.message}</p>
                        <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                      </div>
                      {notification.unread && <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-1" />}
                    </div>
                  </DropdownMenuItem>
                ))}
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-center text-sm text-blue-600 cursor-pointer justify-center">
                Ver todas las notificaciones
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
