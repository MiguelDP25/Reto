"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Plus, Pencil, Trash2 } from "lucide-react"
import type { Material } from "@/lib/types"
import { getMaterials, saveMaterial, deleteMaterial } from "@/lib/storage"
import { useAuth } from "@/lib/auth-context"

export function MaterialsPage() {
  const [materials, setMaterials] = useState<Material[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingMaterial, setEditingMaterial] = useState<Material | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const { user } = useAuth()

  const [formData, setFormData] = useState({
    name: "",
    type: "lente" as "lente" | "tratamiento" | "armazon",
    price: "",
    stock: "",
    description: "",
  })

  useEffect(() => {
    loadMaterials()
  }, [user])

  const loadMaterials = () => {
    const allMaterials = getMaterials()
    // Filter materials for this provider
    const providerMaterials = allMaterials.filter((m) => m.providerId === user?.id)
    setMaterials(providerMaterials)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingMaterial) {
      const updatedMaterial: Material = {
        ...editingMaterial,
        name: formData.name,
        type: formData.type,
        price: Number.parseFloat(formData.price),
        stock: Number.parseInt(formData.stock),
        description: formData.description,
      }
      saveMaterial(updatedMaterial)
    } else {
      const newMaterial: Material = {
        id: `material-${Date.now()}`,
        name: formData.name,
        type: formData.type,
        price: Number.parseFloat(formData.price),
        stock: Number.parseInt(formData.stock),
        description: formData.description,
        providerId: user?.id || "",
        providerName: user?.name || "",
        createdAt: new Date().toISOString(),
      }
      saveMaterial(newMaterial)
    }

    loadMaterials()
    resetForm()
    setIsDialogOpen(false)
  }

  const handleEdit = (material: Material) => {
    setEditingMaterial(material)
    setFormData({
      name: material.name,
      type: material.type,
      price: material.price.toString(),
      stock: material.stock.toString(),
      description: material.description,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (materialId: string) => {
    if (confirm("¿Estás seguro de eliminar este material?")) {
      deleteMaterial(materialId)
      loadMaterials()
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      type: "lente",
      price: "",
      stock: "",
      description: "",
    })
    setEditingMaterial(null)
  }

  const filteredMaterials = materials.filter((material) =>
    material.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalValue = materials.reduce((sum, m) => sum + m.price * m.stock, 0)
  const lowStockItems = materials.filter((m) => m.stock < 10).length

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Gestión de Materiales</h1>
        <p className="text-gray-600 mt-2">Administra tu inventario de materiales</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Materiales</CardTitle>
            <Package className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{materials.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Valor Total</CardTitle>
            <Package className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">${totalValue.toFixed(2)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Stock Bajo</CardTitle>
            <Package className="h-5 w-5 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{lowStockItems}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex-1 mr-4">
              <Input
                placeholder="Buscar materiales..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={resetForm}>
                  <Plus className="h-4 w-4 mr-2" />
                  Nuevo Material
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>{editingMaterial ? "Editar Material" : "Nuevo Material"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nombre del Material *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="type">Tipo *</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value: "lente" | "tratamiento" | "armazon") =>
                        setFormData({ ...formData, type: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lente">Lente</SelectItem>
                        <SelectItem value="tratamiento">Tratamiento</SelectItem>
                        <SelectItem value="armazon">Armazón</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="price">Precio *</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="stock">Stock *</Label>
                    <Input
                      id="stock"
                      type="number"
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Descripción</Label>
                    <Input
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancelar
                    </Button>
                    <Button type="submit">{editingMaterial ? "Actualizar" : "Crear"}</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">NOMBRE</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">TIPO</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">PRECIO</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">STOCK</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">DESCRIPCIÓN</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">ACCIONES</th>
                </tr>
              </thead>
              <tbody>
                {filteredMaterials.map((material) => (
                  <tr key={material.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{material.name}</td>
                    <td className="py-3 px-4 capitalize">{material.type}</td>
                    <td className="py-3 px-4">${material.price.toFixed(2)}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded ${
                          material.stock < 10 ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
                        }`}
                      >
                        {material.stock}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{material.description}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(material)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(material.id)}>
                          <Trash2 className="h-4 w-4" />
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
    </div>
  )
}
