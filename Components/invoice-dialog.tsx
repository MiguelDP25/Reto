"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Download, Printer } from "lucide-react"
import type { Order } from "@/lib/types"

interface InvoiceDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  order: Order
}

export function InvoiceDialog({ open, onOpenChange, order }: InvoiceDialogProps) {
  const handlePrint = () => {
    window.print()
  }

  const handleDownload = () => {
    const invoiceContent = document.getElementById("invoice-content")
    if (!invoiceContent) return

    const printWindow = window.open("", "", "width=800,height=600")
    if (!printWindow) return

    printWindow.document.write(`
      <html>
        <head>
          <title>Factura ${order.orderNumber}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; }
            .header { text-align: center; margin-bottom: 30px; }
            .info-section { margin-bottom: 20px; }
            .table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            .table th, .table td { border: 1px solid #ddd; padding: 12px; text-align: left; }
            .table th { background-color: #f3f4f6; }
            .total { text-align: right; font-size: 18px; font-weight: bold; margin-top: 20px; }
          </style>
        </head>
        <body>
          ${invoiceContent.innerHTML}
        </body>
      </html>
    `)
    printWindow.document.close()
    printWindow.print()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Factura de Venta</DialogTitle>
        </DialogHeader>

        <div id="invoice-content" className="p-6">
          {/* Header */}
          <div className="text-center mb-8 border-b pb-6">
            <h1 className="text-2xl font-bold text-gray-900">Óptica Dr. Mejía</h1>
            <p className="text-gray-600 mt-2">Sistema de Gestión de Órdenes</p>
            <p className="text-sm text-gray-500 mt-1">RUC: 1234567890001</p>
          </div>

          {/* Invoice Info */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Información de la Orden</h3>
              <p className="text-sm text-gray-600">
                Número: <span className="font-medium text-gray-900">{order.orderNumber}</span>
              </p>
              <p className="text-sm text-gray-600">
                Fecha:{" "}
                <span className="font-medium text-gray-900">{new Date(order.createdAt).toLocaleDateString()}</span>
              </p>
              <p className="text-sm text-gray-600">
                Estado: <span className="font-medium text-gray-900 capitalize">{order.status}</span>
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Información del Cliente</h3>
              <p className="text-sm text-gray-600">
                Nombre: <span className="font-medium text-gray-900">{order.clientName}</span>
              </p>
              <p className="text-sm text-gray-600">
                Documento: <span className="font-medium text-gray-900">{order.clientDocument}</span>
              </p>
            </div>
          </div>

          {/* Provider Info */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">Proveedor</h3>
            <p className="text-sm text-gray-600">{order.providerName}</p>
          </div>

          {/* Optical Formula */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Fórmula Óptica</h3>
            <table className="w-full border border-gray-300">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">Ojo</th>
                  <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">Esfera</th>
                  <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">Cilindro</th>
                  <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">Eje</th>
                  <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">Adición</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 text-sm">OD (Derecho)</td>
                  <td className="border border-gray-300 px-4 py-2 text-sm">{order.opticalFormula.od.sphere}</td>
                  <td className="border border-gray-300 px-4 py-2 text-sm">{order.opticalFormula.od.cylinder}</td>
                  <td className="border border-gray-300 px-4 py-2 text-sm">{order.opticalFormula.od.axis}</td>
                  <td className="border border-gray-300 px-4 py-2 text-sm">{order.opticalFormula.od.addition}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 text-sm">OI (Izquierdo)</td>
                  <td className="border border-gray-300 px-4 py-2 text-sm">{order.opticalFormula.oi.sphere}</td>
                  <td className="border border-gray-300 px-4 py-2 text-sm">{order.opticalFormula.oi.cylinder}</td>
                  <td className="border border-gray-300 px-4 py-2 text-sm">{order.opticalFormula.oi.axis}</td>
                  <td className="border border-gray-300 px-4 py-2 text-sm">{order.opticalFormula.oi.addition}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Product Details */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Detalles del Producto</h3>
            <table className="w-full border border-gray-300">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">Descripción</th>
                  <th className="border border-gray-300 px-4 py-2 text-right text-sm font-semibold">Monto</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 text-sm">
                    <p className="font-medium">Tipo de Lente: {order.lensType}</p>
                    {order.treatment && <p className="text-gray-600 text-xs mt-1">Tratamiento: {order.treatment}</p>}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-sm text-right">
                    ${order.totalAmount.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Observations */}
          {order.observations && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">Observaciones</h3>
              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">{order.observations}</p>
            </div>
          )}

          {/* Total */}
          <div className="border-t pt-4">
            <div className="flex justify-end">
              <div className="w-64">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">Subtotal:</span>
                  <span className="text-sm font-medium">${order.totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">IVA (12%):</span>
                  <span className="text-sm font-medium">${(order.totalAmount * 0.12).toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t">
                  <span className="font-semibold text-gray-900">Total:</span>
                  <span className="font-bold text-lg text-gray-900">${(order.totalAmount * 1.12).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t text-center text-sm text-gray-500">
            <p>Gracias por su preferencia</p>
            <p className="mt-1">Fecha de emisión: {new Date().toLocaleDateString()}</p>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-4 pt-4 border-t">
          <Button onClick={handlePrint} variant="outline" className="gap-2 bg-transparent">
            <Printer className="w-4 h-4" />
            Imprimir
          </Button>
          <Button onClick={handleDownload} className="gap-2 bg-blue-600 hover:bg-blue-700">
            <Download className="w-4 h-4" />
            Descargar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
