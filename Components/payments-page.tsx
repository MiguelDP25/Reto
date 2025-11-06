"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Plus, DollarSign, Briefcase, Tag, Trash2, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { NewPaymentDialog } from "@/components/new-payment-dialog"
import { getPayments, deletePayment, addAuditLog } from "@/lib/storage"
import type { Payment } from "@/lib/types"
import { useAuth } from "@/lib/auth-context"

export function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const { user } = useAuth()

  useEffect(() => {
    loadPayments()
  }, [])

  const loadPayments = () => {
    const allPayments = getPayments()
    setPayments(allPayments)
  }

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.provider.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0)
  const today = new Date().toDateString()
  const paidToday = payments
    .filter((p) => new Date(p.paymentDate).toDateString() === today)
    .reduce((sum, p) => sum + p.amount, 0)
  const thisMonth = new Date().getMonth()
  const paidThisMonth = payments
    .filter((p) => new Date(p.paymentDate).getMonth() === thisMonth)
    .reduce((sum, p) => sum + p.amount, 0)

  const handleDeletePayment = (paymentId: string, paymentInfo: string) => {
    if (!confirm("¿Está seguro de que desea eliminar este pago? Esta acción no se puede deshacer.")) {
      return
    }

    deletePayment(paymentId)

    // Registrar en auditoría
    addAuditLog({
      userId: user?.id || "",
      userName: user?.name || "",
      action: "Eliminar Pago",
      details: `Pago ${paymentInfo} eliminado`,
    })

    loadPayments()
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Pagos</h1>
          <p className="text-gray-600 mt-1">Registra los pagos de las órdenes completadas</p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Registrar Pago
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Pagado</p>
                <p className="text-2xl font-bold text-gray-900">${totalPaid.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Pagos Hoy</p>
                <p className="text-2xl font-bold text-gray-900">${paidToday.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-yellow-100 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Este Mes</p>
                <p className="text-2xl font-bold text-gray-900">${paidThisMonth.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                <Tag className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Cantidad de Pagos</p>
                <p className="text-2xl font-bold text-gray-900">{payments.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex gap-4 mb-6">
          <Input
            placeholder="Buscar por orden, proveedor o referencia..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filtrar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-200">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Orden
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Proveedor
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Monto
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Método
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Referencia
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Comprobante
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPayments.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                    No hay pagos registrados
                  </td>
                </tr>
              ) : (
                filteredPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">{payment.orderNumber}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{payment.provider}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 font-semibold">${payment.amount.toFixed(2)}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{payment.paymentMethod}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{payment.reference || "-"}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {new Date(payment.paymentDate).toLocaleDateString("es-ES")}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {payment.receiptUrl ? (
                        <span className="text-blue-600">Adjunto</span>
                      ) : (
                        <span className="text-gray-400">Sin adjunto</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeletePayment(payment.id, payment.orderNumber)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        title="Eliminar pago"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <NewPaymentDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} onPaymentCreated={loadPayments} />
    </div>
  )
}
