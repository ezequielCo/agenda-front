<template>
    <div class="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div class="bg-white rounded-lg shadow-md w-full max-w-md p-6">
        
        <h1 class="text-2xl font-bold text-gray-800 mb-4 text-center">Lista de Tareas</h1>
        <Modal></Modal>
        <Events></Events>
      </div>
    </div>
  
   
  </template>
  
  <script setup>
  import { ref } from 'vue'
    import { useAuthStore } from '@/stores/auth';
  const authStore = useAuthStore();
  //console.log('AUTH ES',authStore.isAuthenticated);
 // Escuchar cambios en el estado de autenticación
 const tokenRef = ref(authStore.token)

// Escuchar cambios en el token
watch(tokenRef, () => {
  authStore.verifyToken()
}, { immediate: true })

// Escuchar cambios en el estado de autenticación
watch(() => authStore.isAuthenticated, () => {
  if (!authStore.isAuthenticated) {
    // Redireccionar al usuario no autenticado
    router.push('/login')
  }
})



  //const dataTwice = await $fetch('http://127.0.0.1:8000/get/eventos')
  //console.log(dataTwice)
  </script>