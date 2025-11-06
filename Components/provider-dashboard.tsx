"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { ProviderOrdersPage } from "@/components/provider-orders-page"
import { MaterialsPage } from "@/components/materials-page"
import { ProviderStatisticsPage } from "@/components/provider-statistics-page"

export function ProviderDashboard() {
  const [currentPage, setCurrentPage] = useState<"orders" | "materials" | "statistics">("orders")

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="flex-1 overflow-auto">
        {currentPage === "orders" && <ProviderOrdersPage />}
        {currentPage === "materials" && <MaterialsPage />}
        {currentPage === "statistics" && <ProviderStatisticsPage />}
      </main>
    </div>
  )
}
