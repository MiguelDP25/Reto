"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Dashboard } from "@/components/dashboard"
import { OrdersPage } from "@/components/orders-page"
import { ClientsPage } from "@/components/clients" // Importado componente de clientes
import { PaymentsPage } from "@/components/payments-page"
import { StatisticsPage } from "@/components/statistics-page"

export function AssistantDashboard() {
  const [currentPage, setCurrentPage] = useState<"dashboard" | "orders" | "clients" | "payments" | "statistics">(
    // Agregado "clients" al tipo
    "dashboard",
  )

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="flex-1 overflow-auto">
        {currentPage === "dashboard" && <Dashboard />}
        {currentPage === "orders" && <OrdersPage />}
        {currentPage === "clients" && <ClientsPage />} {/* Agregada página de clientes */}
        {currentPage === "payments" && <PaymentsPage />}
        {currentPage === "statistics" && <StatisticsPage />}
      </main>
    </div>
  )
}
