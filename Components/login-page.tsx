"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, AlertCircle } from "lucide-react"
import Image from "next/image"

export function LoginPage() {
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showTestUsers, setShowTestUsers] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const success = await login(email, password)
      if (!success) {
        setError("Credenciales inválidas. Por favor, intente nuevamente.")
      }
    } catch (err) {
      setError("Error al iniciar sesión. Por favor, intente nuevamente.")
    } finally {
      setIsLoading(false)
    }
  }

  const quickLogin = (testEmail: string, testPassword: string) => {
    setEmail(testEmail)
    setPassword(testPassword)
    setTimeout(() => {
      login(testEmail, testPassword)
    }, 100)
  }

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden">
        {/* Logo de fondo difuminado */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-JDQQA4og8C8q98zuWbRNYWCxkaTu9r.png"
            alt="Background"
            width={600}
            height={600}
            className="object-contain"
          />
        </div>

        {/* Contenido del panel izquierdo */}
        <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
          {/* Logo principal */}
          <div className="flex items-center gap-3">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-JDQQA4og8C8q98zuWbRNYWCxkaTu9r.png"
                alt="Ópticas Dr. Mejía"
                width={120}
                height={120}
                className="object-contain"
              />
            </div>
          </div>

          {/* Texto descriptivo */}
          <div className="space-y-6">
            <h1 className="text-5xl font-bold leading-tight">Gestiona tu óptica de manera eficiente</h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Accede a tu panel de control para administrar órdenes, clientes, inventario y más.
            </p>
          </div>

          {/* Footer */}
          <div className="text-sm text-blue-200">Copyright © 2025 Ópticas Dr. Mejía</div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          {/* Logo móvil */}
          <div className="lg:hidden flex justify-center mb-8">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-JDQQA4og8C8q98zuWbRNYWCxkaTu9r.png"
              alt="Ópticas Dr. Mejía"
              width={150}
              height={150}
              className="object-contain"
            />
          </div>

          {/* Encabezado */}
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-gray-900">Bienvenido de nuevo</h2>
            <p className="text-gray-600">Ingresa tu correo y contraseña para acceder a tu cuenta.</p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 font-medium">
                Correo Electrónico
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="usuario@optica.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="h-12 text-base"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-gray-700 font-medium">
                  Contraseña
                </Label>
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  onClick={() => setShowTestUsers(!showTestUsers)}
                >
                  {showTestUsers ? "Ocultar usuarios de prueba" : "¿Olvidaste tu contraseña?"}
                </button>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Ingresa tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="h-12 text-base pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              className="w-full h-12 text-base font-semibold bg-blue-600 hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </Button>
          </form>

          {/* Usuarios de prueba */}
          {showTestUsers && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-3">
              <p className="text-sm font-semibold text-gray-900 mb-3">Usuarios de prueba:</p>

              <button
                onClick={() => quickLogin("admin@optica.com", "admin123")}
                className="w-full text-left p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
              >
                <p className="text-sm font-semibold text-gray-900">👨‍💼 Administrador</p>
                <p className="text-xs text-gray-600 mt-1">admin@optica.com / admin123</p>
              </button>

              <button
                onClick={() => quickLogin("asistente@optica.com", "asistente123")}
                className="w-full text-left p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
              >
                <p className="text-sm font-semibold text-gray-900">👩‍⚕️ Asistente Óptico</p>
                <p className="text-xs text-gray-600 mt-1">asistente@optica.com / asistente123</p>
              </button>

              <button
                onClick={() => quickLogin("proveedor@optica.com", "proveedor123")}
                className="w-full text-left p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
              >
                <p className="text-sm font-semibold text-gray-900">🏭 Proveedor</p>
                <p className="text-xs text-gray-600 mt-1">proveedor@optica.com / proveedor123</p>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
