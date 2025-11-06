"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Package, DollarSign, TrendingUp, Clock } from "lucide-react"
import type { Order, Material } from "@/lib/types"
import { getOrders, getMaterials } from "@/lib/storage"
import { useAuth } from "@/lib/auth-context"

export function ProviderStatisticsPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [materials, setMaterials] = useState<Material[]>([])
  const { user } = useAuth()

  useEffect(() => {
    loadData()
  }, [user])

  const loadData = () => {
    const allOrders = getOrders()
    const providerOrders = allOrders.filter((order) => order.provider === user?.name)
    setOrders(providerOrders)

    const allMaterials = getMaterials()
    const providerMaterials = allMaterials.filter((m) => m.providerId === user?.id)
    setMaterials(providerMaterials)
  }

  // Calculate statistics
  const totalOrders = orders.length
  const completedOrders = orders.filter((o) => o.status === "completada" || o.status === "entregada").length
  const totalRevenue = orders
    .filter((o) => o.status === "completada" || o.status === "entregada")
    .reduce((sum, o) => sum + o.totalAmount, 0)
  const averageOrderValue = totalOrders > 0 ? totalRevenue / completedOrders : 0
  const pendingOrders = orders.filter((o) => o.status === "pendiente" || o.status === "en_proceso").length

  // Orders by month
  const ordersByMonth = orders.reduce(
    (acc, order) => {
      const month = new Date(order.createdAt).toLocaleDateString("es-ES", { month: "short" })
      const existing = acc.find((item) => item.month === month)
      if (existing) {
        existing.orders += 1
      } else {
        acc.push({ month, orders: 1 })
      }
      return acc
    },
    [] as { month: string; orders: number }[],
  )

  // Materials by type
  const materialsByType = materials.reduce(
    (acc, material) => {
      const existing = acc.find((item) => item.type === material.type)
      if (existing) {
        existing.count += 1
        existing.value += material.price * material.stock
      } else {
        acc.push({
          type: material.type,
          count: 1,
          value: material.price * material.stock,
        })
      }
      return acc
    },
    [] as { type: string; count: number; value: number }[],
  )

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Estadísticas del Proveedor</h1>
        <p className="text-gray-600 mt-2">Análisis de tu desempeño y materiales</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Órdenes</CardTitle>
            <Package className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{totalOrders}</div>
            <p className="text-xs text-gray-600 mt-1">{completedOrders} completadas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Ingresos Totales</CardTitle>
            <DollarSign className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">${totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-gray-600 mt-1">De órdenes completadas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Valor Promedio</CardTitle>
            <TrendingUp className="h-5 w-5 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">${averageOrderValue.toFixed(2)}</div>
            <p className="text-xs text-gray-600 mt-1">Por orden</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Órdenes Pendientes</CardTitle>
            <Clock className="h-5 w-5 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{pendingOrders}</div>
            <p className="text-xs text-gray-600 mt-1">En proceso o pendientes</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Órdenes por Mes</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ordersByMonth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="orders" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Materiales por Tipo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {materialsByType.map((item) => (
                <div key={item.type} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium capitalize">{item.type}</p>
                    <p className="text-sm text-gray-600">{item.count} materiales</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">${item.value.toFixed(2)}</p>
                    <p className="text-xs text-gray-600">Valor total</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Resumen de Materiales</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">MATERIAL</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">TIPO</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">STOCK</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">PRECIO</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">VALOR TOTAL</th>
                </tr>
              </thead>
              <tbody>
                {materials.map((material) => (
                  <tr key={material.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{material.name}</td>
                    <td className="py-3 px-4 capitalize">{material.type}</td>
                    <td className="py-3 px-4">{material.stock}</td>
                    <td className="py-3 px-4">${material.price.toFixed(2)}</td>
                    <td className="py-3 px-4 font-medium">${(material.price * material.stock).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
