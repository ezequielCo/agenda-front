import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

export default defineNuxtRouteMiddleware( async (to, from) => { ///Debe ser asyncro para que se mantenga ejecutando
  const authStore = useAuthStore();
  const router = useRouter();
  await authStore.verifyToken();

  if (!authStore.isAuthenticated) {
    console.log('User is not authenticated, redirecting to login page');
    return router.push('/login');
  }

 
});