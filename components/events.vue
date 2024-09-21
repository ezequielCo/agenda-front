<template>
     <div class="grid grid-cols-1 gap-4">
          <div v-for="(task, index) in tasks" :key="index" class="bg-gray-50 p-4 rounded-md shadow">
            <h2 class="text-lg font-semibold text-gray-700">{{ task.title }}</h2>
            <p class="text-gray-600">{{ task.description }}</p>
          </div>
        </div>
        
        <div v-if="tasks.length === 0" class="text-center text-gray-500 mt-4">
          No hay tareas pendientes.
        </div>
</template>
<script setup>

import { ref } from 'vue'
  
  const tasks = ref([
    { title: 'Completar proyecto', description: 'Terminar el informe final del proyecto.' },
    { title: 'Reunión de equipo', description: 'Preparar la agenda para la reunión semanal.' },
    { title: 'Ejercicio', description: 'Ir al gimnasio por 1 hora.' },
    { title: 'Leer libro', description: 'Leer el capítulo 5 del libro de desarrollo personal.' },
  ])
</script>
