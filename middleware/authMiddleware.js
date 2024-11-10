// middleware/authMiddleware.js
import { useAuthStore } from '@/stores/auth'

export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore()
  
    if (!authStore.isAuthenticated && to.path !== '/login') {
      return navigateTo('/login')
    }
  
    // Si el usuario está autenticado, establece el estado de autenticación
    authStore.isAuthenticated = true
    //console.log(authStore)
  })
  