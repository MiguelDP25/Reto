"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Dashboard } from "@/components/dashboard"
import { OrdersPage } from "@/components/orders-page"
import { ClientsPage } from "@/components/clients" // Importado componente de clientes
import { ProvidersPage } from "@/components/providers-page"
import { PaymentsPage } from "@/components/payments-page"
import { StatisticsPage } from "@/components/statistics-page"
import { UserManagementPage } from "@/components/user-management-page"
import { AuditLogsPage } from "@/components/audit-logs-page"
import { Header } from "@/components/header"

export function AdminDashboard() {
  const [currentPage, setCurrentPage] = useState<
    "dashboard" | "orders" | "clients" | "providers" | "payments" | "statistics" | "users" | "audit" // Agregado "clients" al tipo
  >("dashboard")

  const getPageTitle = () => {
    const titles: Record<string, { title: string; subtitle: string }> = {
      dashboard: { title: "Dashboard", subtitle: "Resumen general del sistema" },
      orders: { title: "Gestión de Órdenes", subtitle: "Administra las órdenes de trabajo" },
      clients: { title: "Gestión de Clientes", subtitle: "Administra el registro de clientes" },
      providers: { title: "Gestión de Proveedores", subtitle: "Administra los proveedores del sistema" },
      payments: { title: "Gestión de Pagos", subtitle: "Registra los pagos de las órdenes completadas" },
      statistics: { title: "Estadísticas", subtitle: "Análisis y reportes del sistema" },
      users: { title: "Gestión de Usuarios", subtitle: "Administra los usuarios del sistema" },
      audit: { title: "Registro de Auditoría", subtitle: "Historial de acciones del sistema" },
    }
    return titles[currentPage] || { title: "Sistema de Gestión", subtitle: "" }
  }

  const { title, subtitle } = getPageTitle()

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={title} subtitle={subtitle} />
        <main className="flex-1 overflow-auto">
          {currentPage === "dashboard" && <Dashboard />}
          {currentPage === "orders" && <OrdersPage />}
          {currentPage === "clients" && <ClientsPage />} {/* Agregada página de clientes */}
          {currentPage === "providers" && <ProvidersPage />}
          {currentPage === "payments" && <PaymentsPage />}
          {currentPage === "statistics" && <StatisticsPage />}
          {currentPage === "users" && <UserManagementPage />}
          {currentPage === "audit" && <AuditLogsPage />}
        </main>
      </div>
    </div>
  )
}
