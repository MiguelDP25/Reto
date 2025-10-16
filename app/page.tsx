"use client"
import { useAuth } from "@/lib/auth-context"
import { LoginPage } from "@/components/login-page"
import { AdminDashboard } from "@/components/admin-dashboard"
import { AssistantDashboard } from "@/components/assistant-dashboard"
import { ProviderDashboard } from "@/components/provider-dashboard"

export default function Home() {
  const { user, isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <LoginPage />
  }

  if (user?.role === "administrador") {
    return <AdminDashboard />
  }

  if (user?.role === "asistente") {
    return <AssistantDashboard />
  }

  if (user?.role === "proveedor") {
    return <ProviderDashboard />
  }

  return null
}
