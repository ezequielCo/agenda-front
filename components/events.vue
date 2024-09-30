<template>
     <div class="grid grid-cols-1 gap-4">
          <div v-for="(eventos, index) in the_eventos" :key="index" class="bg-gray-50 p-4 rounded-md shadow">
            <h2 class="text-lg font-semibold text-gray-700">{{ eventos.evento }}</h2>
            <p class="text-gray-600">{{ eventos.description }}</p>
          </div>
        </div>
        
       
</template>
<script setup>


import { ref, onMounted } from 'vue';
import { useFetch } from '#app'; 
const the_eventos = await $fetch('http://127.0.0.1:8000/get/eventos')
console.log('data',the_eventos)
try{


} catch (error) {
  console.error('Error al obtener los eventos:', error);
  // Mostrar un mensaje de error al usuario
  ///this.$router.push('/error'); // Redirigir a la página de error
}

  

 
  /*const tasks = ref([
    { title: 'Completar proyecto', description: 'Terminar el informe final del proyecto.' },
    { title: 'Reunión de equipo', description: 'Preparar la agenda para la reunión semanal.' },
    { title: 'Ejercicio', description: 'Ir al gimnasio por 1 hora.' },
    { title: 'Leer libro', description: 'Leer el capítulo 5 del libro de desarrollo personal.' },
  ])*/
</script>
