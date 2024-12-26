<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-800 mb-6">Mi Dashboard</h1>

      
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="(module, index) in modules" :key="index" 
             class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
          <div class="p-6 flex flex-col items-center">
            <component :is="module.icon" class="w-12 h-12 text-blue-500 mb-4" />
            <h2 class="text-xl font-semibold text-gray-800 mb-2">{{ module.name }}</h2>
            <p class="text-gray-600 text-center">{{ module.description }}</p>
            <button class=" bg-azul mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300 ease-in-out">
              Acceder
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import { useAuthStore } from '@/stores/auth';
import { ref, watch} from 'vue'
//import { useRouter } from 'vue'
import { HomeIcon, UsersIcon, FolderIcon, CalendarIcon, ChartBarIcon, CogIcon } from 'lucide-vue-next'

const authStore = useAuthStore();
const router = useRouter();

definePageMeta({
   middleware: 'auth',
   layout: 'auth'

});


//console.log('mis valores locales', localStorage)
// Escuchar cambios en el estado de autenticación
/*watch(() => authStore.isAuthenticated, () => {
  if (!authStore.isAuthenticated) {
    // Redireccionar al usuario no autenticado
    router.push('/login')
  }
}, { immediate: true })*/



const logout = () => {
  authStore.logout();
  router.push('/login');
};


if(authStore.isAuthenticated = true){ 

  console.log('Usuario id autenticad',localStorage.user);
 
 

} 
const modules = ref([
  { name: 'Inicio', icon: HomeIcon, description: 'Resumen general del sistema' },
  { name: 'Usuarios', icon: UsersIcon, description: 'Gestión de usuarios y permisos' },
  { name: 'Archivos', icon: FolderIcon, description: 'Administración de documentos' },
  { name: 'Calendario', icon: CalendarIcon, description: 'Agenda y eventos' },
  { name: 'Estadísticas', icon: ChartBarIcon, description: 'Reportes y análisis' },
  { name: 'Configuración', icon: CogIcon, description: 'Ajustes del sistema' }
])

// Ejecutar initAuthStore cuando el componente se monte
onMounted(async () => {
  await authStore.verifyToken()
 
})
</script>
