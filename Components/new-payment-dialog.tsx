"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { savePayment, getOrders } from "@/lib/storage"
import type { Order } from "@/lib/types"

interface NewPaymentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onPaymentCreated: () => void
}

export function NewPaymentDialog({ open, onOpenChange, onPaymentCreated }: NewPaymentDialogProps) {
  const [orders, setOrders] = useState<Order[]>([])
  const [formData, setFormData] = useState({
    orderId: "",
    amount: "",
    paymentMethod: "transferencia",
    reference: "",
    paymentDate: new Date().toISOString().split("T")[0],
  })

  useEffect(() => {
    if (open) {
      const allOrders = getOrders()
      // Only show completed orders
      setOrders(allOrders.filter((o) => o.status === "completada"))
    }
  }, [open])

  const selectedOrder = orders.find((o) => o.id === formData.orderId)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedOrder) return

    const payment = {
      id: crypto.randomUUID(),
      orderId: formData.orderId,
      orderNumber: selectedOrder.orderNumber,
      providerName: selectedOrder.providerName,
      amount: Number.parseFloat(formData.amount) || 0,
      paymentMethod: formData.paymentMethod,
      reference: formData.reference,
      paymentDate: formData.paymentDate,
      receiptUrl: null,
      createdAt: new Date().toISOString(),
    }

    savePayment(payment)
    onPaymentCreated()
    onOpenChange(false)

    // Reset form
    setFormData({
      orderId: "",
      amount: "",
      paymentMethod: "transferencia",
      reference: "",
      paymentDate: new Date().toISOString().split("T")[0],
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Registrar Pago</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="order">Seleccionar Orden *</Label>
            <Select
              value={formData.orderId}
              onValueChange={(value) => {
                const order = orders.find((o) => o.id === value)
                setFormData({
                  ...formData,
                  orderId: value,
                  amount: order ? order.totalAmount.toString() : "",
                })
              }}
              required
            >
              <SelectTrigger id="order">
                <SelectValue placeholder="Seleccione una orden" />
              </SelectTrigger>
              <SelectContent>
                {orders.map((order) => (
                  <SelectItem key={order.id} value={order.id}>
                    {order.orderNumber} - {order.clientName} - ${order.totalAmount.toFixed(2)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedOrder && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                Proveedor: <span className="font-medium text-gray-900">{selectedOrder.providerName}</span>
              </p>
              <p className="text-sm text-gray-600">
                Cliente: <span className="font-medium text-gray-900">{selectedOrder.clientName}</span>
              </p>
              <p className="text-sm text-gray-600">
                Monto Total: <span className="font-medium text-gray-900">${selectedOrder.totalAmount.toFixed(2)}</span>
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="amount">Monto a Pagar *</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="paymentDate">Fecha de Pago *</Label>
              <Input
                id="paymentDate"
                type="date"
                value={formData.paymentDate}
                onChange={(e) => setFormData({ ...formData, paymentDate: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="paymentMethod">Método de Pago *</Label>
              <Select
                value={formData.paymentMethod}
                onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
              >
                <SelectTrigger id="paymentMethod">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="transferencia">Transferencia</SelectItem>
                  <SelectItem value="efectivo">Efectivo</SelectItem>
                  <SelectItem value="cheque">Cheque</SelectItem>
                  <SelectItem value="tarjeta">Tarjeta</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="reference">Referencia</Label>
              <Input
                id="reference"
                placeholder="Número de referencia"
                value={formData.reference}
                onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Registrar Pago
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
