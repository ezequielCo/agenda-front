
<style>
.flotar
{
  float: right !important;
}

</style>
<template>
    <div class="grid grid-cols-1 gap-4 p-1">
  <div v-for="(eventos, index) in the_eventos" :key="index" class="bg-gray-50 p-4 rounded-md shadow">
    <nuxt-link :to="`/events/${eventos.id}`">
      <div class="link-button hover:bg-blue-700 flotar text-white font-bold py-1 rounded-full" aria-label="View Event Details">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
      </div>
    </nuxt-link>
    <h2 class="text-lg font-semibold text-gray-700">{{ eventos.evento }} </h2>
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
