"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Package, Clock, CheckCircle, AlertCircle, Eye } from "lucide-react"
import type { Order, OrderStatus } from "@/lib/types"
import { getOrders } from "@/lib/storage"
import { useAuth } from "@/lib/auth-context"
import { addAuditLog } from "@/lib/storage"

export function ProviderOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
  const [detailOrder, setDetailOrder] = useState<Order | null>(null)
  const [newStatus, setNewStatus] = useState<OrderStatus>("pendiente")
  const [estimatedDate, setEstimatedDate] = useState("")
  const { user } = useAuth()

  useEffect(() => {
    loadOrders()
  }, [user])

  const loadOrders = () => {
    const allOrders = getOrders()
    const providerOrders = allOrders.filter((order) => order.provider === user?.name)
    setOrders(providerOrders)
  }

  const handleUpdateStatus = () => {
    if (!selectedOrder) return

    const updatedOrder: Order = {
      ...selectedOrder,
      status: newStatus,
      ...(estimatedDate && { estimatedDeliveryDate: estimatedDate }),
    }

    const orders = getOrders()
    const updatedOrders = orders.map((o) => (o.id === selectedOrder.id ? updatedOrder : o))
    if (typeof window !== "undefined") {
      localStorage.setItem("orders", JSON.stringify(updatedOrders))
    }

    addAuditLog({
      userId: user?.id || "",
      userName: user?.name || "",
      action: "Actualizar Estado de Orden",
      details: `Orden ${selectedOrder.orderNumber} actualizada a ${newStatus}`,
    })

    loadOrders()
    setIsDialogOpen(false)
    setSelectedOrder(null)
  }

  const openUpdateDialog = (order: Order) => {
    setSelectedOrder(order)
    setNewStatus(order.status)
    setEstimatedDate(order.estimatedDeliveryDate || "")
    setIsDialogOpen(true)
  }

  const openDetailDialog = (order: Order) => {
    setDetailOrder(order)
    setIsDetailDialogOpen(true)
  }

  const pendingOrders = orders.filter((o) => o.status === "pendiente").length
  const inProgressOrders = orders.filter((o) => o.status === "en_proceso").length
  const completedOrders = orders.filter((o) => o.status === "completada").length

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case "pendiente":
        return "bg-yellow-100 text-yellow-800"
      case "en_proceso":
        return "bg-blue-100 text-blue-800"
      case "completada":
        return "bg-green-100 text-green-800"
      case "entregada":
        return "bg-purple-100 text-purple-800"
      case "cancelada":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusLabel = (status: OrderStatus) => {
    const labels: Record<OrderStatus, string> = {
      pendiente: "Pendiente",
      en_proceso: "En Proceso",
      completada: "Completada",
      entregada: "Entregada",
      cancelada: "Cancelada",
    }
    return labels[status]
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Mis Órdenes</h1>
        <p className="text-gray-600 mt-2">Gestiona las órdenes asignadas a tu laboratorio</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Órdenes</CardTitle>
            <Package className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{orders.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Pendientes</CardTitle>
            <Clock className="h-5 w-5 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{pendingOrders}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">En Proceso</CardTitle>
            <AlertCircle className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{inProgressOrders}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Completadas</CardTitle>
            <CheckCircle className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{completedOrders}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Órdenes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">NÚMERO</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">CLIENTE</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">TELÉFONO</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">TIPO LENTE</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">MONTO</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">ESTADO</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">FECHA ESTIMADA</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">ACCIONES</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{order.orderNumber}</td>
                    <td className="py-3 px-4">{order.clientName}</td>
                    <td className="py-3 px-4">{order.clientPhone || "-"}</td>
                    <td className="py-3 px-4">{order.lensType}</td>
                    <td className="py-3 px-4">${order.totalAmount.toFixed(2)}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                        {getStatusLabel(order.status)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {order.estimatedDeliveryDate
                        ? new Date(order.estimatedDeliveryDate).toLocaleDateString("es-ES")
                        : "No definida"}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => openDetailDialog(order)}>
                          <Eye className="w-4 h-4 mr-1" />
                          Ver
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => openUpdateDialog(order)}>
                          Actualizar
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Actualizar Estado de Orden</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div>
                <Label>Orden: {selectedOrder.orderNumber}</Label>
                <p className="text-sm text-gray-600">Cliente: {selectedOrder.clientName}</p>
              </div>

              <div>
                <Label htmlFor="status">Nuevo Estado</Label>
                <Select value={newStatus} onValueChange={(value: OrderStatus) => setNewStatus(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pendiente">Pendiente</SelectItem>
                    <SelectItem value="en_proceso">En Proceso</SelectItem>
                    <SelectItem value="completada">Completada</SelectItem>
                    <SelectItem value="entregada">Entregada</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="estimatedDate">Fecha de Entrega Estimada</Label>
                <Input
                  id="estimatedDate"
                  type="date"
                  value={estimatedDate}
                  onChange={(e) => setEstimatedDate(e.target.value)}
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleUpdateStatus}>Actualizar</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalles Completos de la Orden</DialogTitle>
          </DialogHeader>
          {detailOrder && (
            <div className="space-y-6">
              {/* Información General */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-3">Información General</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Número de Orden</p>
                    <p className="font-medium">{detailOrder.orderNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Estado</p>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(detailOrder.status)}`}>
                      {getStatusLabel(detailOrder.status)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Fecha de Creación</p>
                    <p className="font-medium">{new Date(detailOrder.createdAt).toLocaleDateString("es-ES")}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Fecha Estimada de Entrega</p>
                    <p className="font-medium">
                      {detailOrder.estimatedDeliveryDate
                        ? new Date(detailOrder.estimatedDeliveryDate).toLocaleDateString("es-ES")
                        : "No definida"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Información del Cliente */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-3">Información del Cliente</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Nombre</p>
                    <p className="font-medium">{detailOrder.clientName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Documento</p>
                    <p className="font-medium">{detailOrder.clientDocument}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-gray-600">Teléfono</p>
                    <p className="font-medium">{detailOrder.clientPhone || "No proporcionado"}</p>
                  </div>
                </div>
              </div>

              {/* Fórmula Óptica */}
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-3">Fórmula Óptica</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium mb-2">Ojo Derecho (OD)</p>
                    <div className="grid grid-cols-4 gap-3">
                      <div>
                        <p className="text-xs text-gray-600">Esfera</p>
                        <p className="font-medium">{detailOrder.opticalFormula.od.sphere || "-"}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Cilindro</p>
                        <p className="font-medium">{detailOrder.opticalFormula.od.cylinder || "-"}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Eje</p>
                        <p className="font-medium">{detailOrder.opticalFormula.od.axis || "-"}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Adición</p>
                        <p className="font-medium">{detailOrder.opticalFormula.od.addition || "-"}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium mb-2">Ojo Izquierdo (OI)</p>
                    <div className="grid grid-cols-4 gap-3">
                      <div>
                        <p className="text-xs text-gray-600">Esfera</p>
                        <p className="font-medium">{detailOrder.opticalFormula.oi.sphere || "-"}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Cilindro</p>
                        <p className="font-medium">{detailOrder.opticalFormula.oi.cylinder || "-"}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Eje</p>
                        <p className="font-medium">{detailOrder.opticalFormula.oi.axis || "-"}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Adición</p>
                        <p className="font-medium">{detailOrder.opticalFormula.oi.addition || "-"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Detalles del Producto */}
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-3">Detalles del Producto</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Tipo de Lente</p>
                    <p className="font-medium capitalize">{detailOrder.lensType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Tratamiento</p>
                    <p className="font-medium">{detailOrder.treatment || "Sin tratamiento"}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-gray-600">Monto Total</p>
                    <p className="text-2xl font-bold text-blue-600">${detailOrder.totalAmount.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              {/* Observaciones */}
              {detailOrder.observations && (
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Observaciones</h3>
                  <p className="text-gray-700">{detailOrder.observations}</p>
                </div>
              )}

              <div className="flex justify-end">
                <Button onClick={() => setIsDetailDialogOpen(false)}>Cerrar</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
