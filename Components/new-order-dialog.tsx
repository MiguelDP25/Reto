"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { saveOrder, getProviders } from "@/lib/storage"
import type { Provider } from "@/lib/types"

interface NewOrderDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onOrderCreated: () => void
}

export function NewOrderDialog({ open, onOpenChange, onOrderCreated }: NewOrderDialogProps) {
  const [providers, setProviders] = useState<Provider[]>([])
  const [formData, setFormData] = useState({
    providerId: "",
    clientName: "",
    clientDocument: "",
    odSphere: "",
    odCylinder: "",
    odAxis: "",
    odAddition: "",
    oiSphere: "",
    oiCylinder: "",
    oiAxis: "",
    oiAddition: "",
    lensType: "monofocal",
    treatment: "",
    totalAmount: "",
    estimatedDate: "",
    observations: "",
  })

  useEffect(() => {
    if (open) {
      const allProviders = getProviders()
      setProviders(allProviders.filter((p) => p.status === "active"))
    }
  }, [open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const provider = providers.find((p) => p.id === formData.providerId)
    if (!provider) return

    const order = {
      id: crypto.randomUUID(),
      orderNumber: `ORD-${String(Date.now()).slice(-5)}`,
      providerId: formData.providerId,
      providerName: provider.name,
      clientName: formData.clientName,
      clientDocument: formData.clientDocument,
      opticalFormula: {
        od: {
          sphere: formData.odSphere,
          cylinder: formData.odCylinder,
          axis: formData.odAxis,
          addition: formData.odAddition,
        },
        oi: {
          sphere: formData.oiSphere,
          cylinder: formData.oiCylinder,
          axis: formData.oiAxis,
          addition: formData.oiAddition,
        },
      },
      lensType: formData.lensType,
      treatment: formData.treatment,
      totalAmount: Number.parseFloat(formData.totalAmount) || 0,
      estimatedDate: formData.estimatedDate,
      observations: formData.observations,
      status: "pendiente",
      createdAt: new Date().toISOString(),
    }

    saveOrder(order)
    onOrderCreated()
    onOpenChange(false)

    // Reset form
    setFormData({
      providerId: "",
      clientName: "",
      clientDocument: "",
      odSphere: "",
      odCylinder: "",
      odAxis: "",
      odAddition: "",
      oiSphere: "",
      oiCylinder: "",
      oiAxis: "",
      oiAddition: "",
      lensType: "monofocal",
      treatment: "",
      totalAmount: "",
      estimatedDate: "",
      observations: "",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Nueva Orden de Trabajo</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="provider">Seleccione un proveedor *</Label>
            <Select
              value={formData.providerId}
              onValueChange={(value) => setFormData({ ...formData, providerId: value })}
              required
            >
              <SelectTrigger id="provider">
                <SelectValue placeholder="Seleccione un proveedor" />
              </SelectTrigger>
              <SelectContent>
                {providers.map((provider) => (
                  <SelectItem key={provider.id} value={provider.id}>
                    {provider.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="clientName">Nombre del Cliente *</Label>
              <Input
                id="clientName"
                value={formData.clientName}
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="clientDocument">Documento *</Label>
              <Input
                id="clientDocument"
                value={formData.clientDocument}
                onChange={(e) => setFormData({ ...formData, clientDocument: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Fórmula - Ojo Derecho (OD)</h3>
            <div className="grid grid-cols-4 gap-3">
              <div>
                <Label htmlFor="odSphere">Esfera</Label>
                <Input
                  id="odSphere"
                  placeholder="-2.00"
                  value={formData.odSphere}
                  onChange={(e) => setFormData({ ...formData, odSphere: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="odCylinder">Cilindro</Label>
                <Input
                  id="odCylinder"
                  placeholder="-0.50"
                  value={formData.odCylinder}
                  onChange={(e) => setFormData({ ...formData, odCylinder: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="odAxis">Eje</Label>
                <Input
                  id="odAxis"
                  placeholder="90"
                  value={formData.odAxis}
                  onChange={(e) => setFormData({ ...formData, odAxis: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="odAddition">Adición</Label>
                <Input
                  id="odAddition"
                  placeholder="+2.00"
                  value={formData.odAddition}
                  onChange={(e) => setFormData({ ...formData, odAddition: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Fórmula - Ojo Izquierdo (OI)</h3>
            <div className="grid grid-cols-4 gap-3">
              <div>
                <Label htmlFor="oiSphere">Esfera</Label>
                <Input
                  id="oiSphere"
                  placeholder="-2.25"
                  value={formData.oiSphere}
                  onChange={(e) => setFormData({ ...formData, oiSphere: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="oiCylinder">Cilindro</Label>
                <Input
                  id="oiCylinder"
                  placeholder="-0.75"
                  value={formData.oiCylinder}
                  onChange={(e) => setFormData({ ...formData, oiCylinder: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="oiAxis">Eje</Label>
                <Input
                  id="oiAxis"
                  placeholder="85"
                  value={formData.oiAxis}
                  onChange={(e) => setFormData({ ...formData, oiAxis: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="oiAddition">Adición</Label>
                <Input
                  id="oiAddition"
                  placeholder="+2.00"
                  value={formData.oiAddition}
                  onChange={(e) => setFormData({ ...formData, oiAddition: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="lensType">Tipo de Lente *</Label>
              <Select
                value={formData.lensType}
                onValueChange={(value) => setFormData({ ...formData, lensType: value })}
              >
                <SelectTrigger id="lensType">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monofocal">Monofocal</SelectItem>
                  <SelectItem value="bifocal">Bifocal</SelectItem>
                  <SelectItem value="progresivo">Progresivo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="treatment">Tratamiento</Label>
              <Input
                id="treatment"
                placeholder="Antirreflejo, Fotocromático, etc."
                value={formData.treatment}
                onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="totalAmount">Monto Total *</Label>
              <Input
                id="totalAmount"
                type="number"
                step="0.01"
                placeholder="150.00"
                value={formData.totalAmount}
                onChange={(e) => setFormData({ ...formData, totalAmount: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="estimatedDate">Fecha Recepción Estimada *</Label>
              <Input
                id="estimatedDate"
                type="date"
                value={formData.estimatedDate}
                onChange={(e) => setFormData({ ...formData, estimatedDate: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="observations">Observaciones</Label>
            <Textarea
              id="observations"
              placeholder="Notas adicionales sobre la orden..."
              rows={3}
              value={formData.observations}
              onChange={(e) => setFormData({ ...formData, observations: e.target.value })}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Crear Orden
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
