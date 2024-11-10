// middleware/auth.ts
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

export default defineNuxtRouteMiddleware((to, from) => {
  console.log('Por alguna razon este midlewere no funciona del todo ,debo revisar');

})