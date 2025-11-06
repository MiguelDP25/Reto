"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { getOrders } from "@/lib/storage"
import type { Order } from "@/lib/types"

export function Dashboard() {
  const [recentOrders, setRecentOrders] = useState<Order[]>([])

  useEffect(() => {
    const orders = getOrders()
    setRecentOrders(orders.slice(0, 5))
  }, [])

  const getStatusBadge = (status: string) => {
    const colors = {
      pendiente: "bg-yellow-100 text-yellow-800",
      "en-proceso": "bg-blue-100 text-blue-800",
      completada: "bg-green-100 text-green-800",
      cancelada: "bg-red-100 text-red-800",
    }
    return colors[status as keyof typeof colors] || colors.pendiente
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Resumen general del sistema</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Órdenes Recientes</h2>
          <Button variant="outline" size="sm">
            Ver todas
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">Número</th>
                <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">Cliente</th>
                <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">Proveedor</th>
                <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">Monto</th>
                <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentOrders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                    No hay órdenes registradas
                  </td>
                </tr>
              ) : (
                recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">{order.orderNumber}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{order.clientName}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{order.providerName}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">${order.totalAmount.toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(order.status)}`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
