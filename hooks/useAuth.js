// hooks/useAuth.ts
import { useAuthStore } from '~/stores/auth'

export function useAuth() {
  const authStore = useAuthStore()

  // Escucha cambios en el estado de autenticación
  watch(() => authStore.isAuthenticated, (newValue) => {
    if (!newValue) {
      window.location.href = '/'
    }
  })

  return authStore
}
