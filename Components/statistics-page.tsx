"use client"

import { useState, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Download, FileText } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import type { Order, Payment } from "@/lib/types"
import { InvoiceDialog } from "@/components/invoice-dialog"

export function StatisticsPage() {
  const [period1, setPeriod1] = useState({ month: new Date().getMonth(), year: new Date().getFullYear() })
  const [period2, setPeriod2] = useState({
    month: new Date().getMonth() - 1 < 0 ? 11 : new Date().getMonth() - 1,
    year: new Date().getMonth() - 1 < 0 ? new Date().getFullYear() - 1 : new Date().getFullYear(),
  })
  const [showInvoiceDialog, setShowInvoiceDialog] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  // Load data from localStorage
  const orders: Order[] = useMemo(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("orders") || "[]")
    }
    return []
  }, [])

  const payments: Payment[] = useMemo(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("payments") || "[]")
    }
    return []
  }, [])

  // Calculate statistics for a period
  const calculatePeriodStats = (month: number, year: number) => {
    const periodOrders = orders.filter((order) => {
      const orderDate = new Date(order.createdAt)
      return orderDate.getMonth() === month && orderDate.getFullYear() === year
    })

    const periodPayments = payments.filter((payment) => {
      const paymentDate = new Date(payment.paymentDate)
      return paymentDate.getMonth() === month && paymentDate.getFullYear() === year
    })

    const totalSales = periodPayments.reduce((sum, payment) => sum + payment.amount, 0)
    const totalOrders = periodOrders.length
    const completedOrders = periodOrders.filter((o) => o.status === "completada").length
    const avgOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0

    // Sales by day
    const salesByDay: { [key: string]: number } = {}
    periodOrders.forEach((order) => {
      const day = new Date(order.createdAt).getDate()
      salesByDay[day] = (salesByDay[day] || 0) + 1
    })

    const chartData = Array.from({ length: 31 }, (_, i) => ({
      day: `${i + 1}`,
      sales: salesByDay[i + 1] || 0,
    }))

    return {
      totalSales,
      totalOrders,
      completedOrders,
      avgOrderValue,
      chartData,
      ordersPerDay: totalOrders / 30,
    }
  }

  const stats1 = calculatePeriodStats(period1.month, period1.year)
  const stats2 = calculatePeriodStats(period2.month, period2.year)

  // Calculate percentage changes
  const calculateChange = (current: number, previous: number) => {
    if (previous === 0) return current > 0 ? 100 : 0
    return Math.round(((current - previous) / previous) * 100)
  }

  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ]

  const exportReport = () => {
    const report = {
      period1: {
        month: monthNames[period1.month],
        year: period1.year,
        stats: stats1,
      },
      period2: {
        month: monthNames[period2.month],
        year: period2.year,
        stats: stats2,
      },
      generatedAt: new Date().toISOString(),
    }

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `reporte-estadisticas-${new Date().toISOString().split("T")[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Estadísticas</h1>
          <p className="text-gray-600 mt-1">Análisis y reportes del sistema</p>
        </div>
        <div className="flex gap-3">
          <Button onClick={exportReport} variant="outline" className="gap-2 bg-transparent">
            <Download className="w-4 h-4" />
            Exportar Datos
          </Button>
          <Button
            onClick={() => {
              if (orders.length > 0) {
                setSelectedOrder(orders[0])
                setShowInvoiceDialog(true)
              }
            }}
            className="gap-2 bg-blue-600 hover:bg-blue-700"
          >
            <FileText className="w-4 h-4" />
            Generar Factura
          </Button>
        </div>
      </div>

      {/* Period Selectors */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <Card className="p-6 bg-gradient-to-br from-cyan-50 to-white border-cyan-200">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-5 h-5 text-cyan-600" />
            <h3 className="font-semibold text-gray-900">Período 1</h3>
          </div>
          <div className="flex gap-3">
            <select
              value={period1.month}
              onChange={(e) => setPeriod1({ ...period1, month: Number.parseInt(e.target.value) })}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              {monthNames.map((month, index) => (
                <option key={index} value={index}>
                  {month}
                </option>
              ))}
            </select>
            <select
              value={period1.year}
              onChange={(e) => setPeriod1({ ...period1, year: Number.parseInt(e.target.value) })}
              className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-cyan-50 to-white border-cyan-200">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-5 h-5 text-cyan-600" />
            <h3 className="font-semibold text-gray-900">Período 2</h3>
          </div>
          <div className="flex gap-3">
            <select
              value={period2.month}
              onChange={(e) => setPeriod2({ ...period2, month: Number.parseInt(e.target.value) })}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              {monthNames.map((month, index) => (
                <option key={index} value={index}>
                  {month}
                </option>
              ))}
            </select>
            <select
              value={period2.year}
              onChange={(e) => setPeriod2({ ...period2, year: Number.parseInt(e.target.value) })}
              className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-gray-900">Órdenes por día</h3>
            <span className="text-sm text-gray-600">
              {monthNames[period1.month]} {period1.year}
            </span>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats1.chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="day" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip
                contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px" }}
                labelStyle={{ color: "#374151", fontWeight: 600 }}
              />
              <Bar dataKey="sales" fill="#06b6d4" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-gray-900">Órdenes por día</h3>
            <span className="text-sm text-gray-600">
              {monthNames[period2.month]} {period2.year}
            </span>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats2.chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="day" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip
                contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px" }}
                labelStyle={{ color: "#374151", fontWeight: 600 }}
              />
              <Bar dataKey="sales" fill="#06b6d4" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Resumen del período</h3>
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-6 bg-gradient-to-br from-cyan-50 to-white border-cyan-200">
              <div className="flex items-start justify-between mb-2">
                <span className="text-sm text-gray-600">Órdenes totales</span>
                {calculateChange(stats1.totalOrders, stats2.totalOrders) !== 0 && (
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded ${
                      calculateChange(stats1.totalOrders, stats2.totalOrders) > 0
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {calculateChange(stats1.totalOrders, stats2.totalOrders) > 0 ? "+" : ""}
                    {calculateChange(stats1.totalOrders, stats2.totalOrders)}%
                  </span>
                )}
              </div>
              <p className="text-3xl font-bold text-gray-900">{stats1.totalOrders}</p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-cyan-50 to-white border-cyan-200">
              <div className="flex items-start justify-between mb-2">
                <span className="text-sm text-gray-600">Órdenes por día</span>
                {calculateChange(stats1.ordersPerDay, stats2.ordersPerDay) !== 0 && (
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded ${
                      calculateChange(stats1.ordersPerDay, stats2.ordersPerDay) > 0
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {calculateChange(stats1.ordersPerDay, stats2.ordersPerDay) > 0 ? "+" : ""}
                    {calculateChange(stats1.ordersPerDay, stats2.ordersPerDay)}%
                  </span>
                )}
              </div>
              <p className="text-3xl font-bold text-gray-900">{stats1.ordersPerDay.toFixed(1)}</p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-cyan-50 to-white border-cyan-200">
              <div className="flex items-start justify-between mb-2">
                <span className="text-sm text-gray-600">Órdenes completadas</span>
                {calculateChange(stats1.completedOrders, stats2.completedOrders) !== 0 && (
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded ${
                      calculateChange(stats1.completedOrders, stats2.completedOrders) > 0
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {calculateChange(stats1.completedOrders, stats2.completedOrders) > 0 ? "+" : ""}
                    {calculateChange(stats1.completedOrders, stats2.completedOrders)}%
                  </span>
                )}
              </div>
              <p className="text-3xl font-bold text-gray-900">{stats1.completedOrders}</p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-cyan-50 to-white border-cyan-200">
              <div className="flex items-start justify-between mb-2">
                <span className="text-sm text-gray-600">Valor promedio</span>
                {calculateChange(stats1.avgOrderValue, stats2.avgOrderValue) !== 0 && (
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded ${
                      calculateChange(stats1.avgOrderValue, stats2.avgOrderValue) > 0
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {calculateChange(stats1.avgOrderValue, stats2.avgOrderValue) > 0 ? "+" : ""}
                    {calculateChange(stats1.avgOrderValue, stats2.avgOrderValue)}%
                  </span>
                )}
              </div>
              <p className="text-3xl font-bold text-gray-900">${stats1.avgOrderValue.toFixed(2)}</p>
            </Card>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Resumen del período</h3>
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-6 bg-gradient-to-br from-cyan-50 to-white border-cyan-200">
              <span className="text-sm text-gray-600 block mb-2">Órdenes totales</span>
              <p className="text-3xl font-bold text-gray-900">{stats2.totalOrders}</p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-cyan-50 to-white border-cyan-200">
              <span className="text-sm text-gray-600 block mb-2">Órdenes por día</span>
              <p className="text-3xl font-bold text-gray-900">{stats2.ordersPerDay.toFixed(1)}</p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-cyan-50 to-white border-cyan-200">
              <span className="text-sm text-gray-600 block mb-2">Órdenes completadas</span>
              <p className="text-3xl font-bold text-gray-900">{stats2.completedOrders}</p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-cyan-50 to-white border-cyan-200">
              <span className="text-sm text-gray-600 block mb-2">Valor promedio</span>
              <p className="text-3xl font-bold text-gray-900">${stats2.avgOrderValue.toFixed(2)}</p>
            </Card>
          </div>
        </div>
      </div>

      {selectedOrder && (
        <InvoiceDialog open={showInvoiceDialog} onOpenChange={setShowInvoiceDialog} order={selectedOrder} />
      )}
    </div>
  )
}
