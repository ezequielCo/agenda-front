<template>

          <h2 class="text-2xl font-bold mb-4 text-gray-800">Detalles del Evento</h2>
          <div v-if="evento"  class="space-y-4">
            <div>
              <h3 class="text-lg font-semibold text-gray-700">Nombre del Evento</h3>
              <p class="text-gray-600">{{ evento.evento }}</p>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-700">Descripción</h3>
              <p class="text-gray-600">{{ evento.description }}</p>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-700">Fecha y Hora</h3>
              <p class="text-gray-600">{{ formatearFechaHora(evento.fecha_evento+':00:00') }}</p>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-700">Hora:</h3>
              <p class="text-gray-600">{{ evento.hora_evento }}</p>
            </div>
          
          </div>
          <div v-if="!evento" class="space-y-4">
             <p>Evento no found</p>
          </div>
        
</template>
<script setup>
const { id } =  useRoute().params;


const evento = await $fetch('http://127.0.0.1:8000/evento/'+id)
console.log(evento)

const formatearFechaHora = (fechaString) => {

 const fecha = new Date(fechaString);
  return new Intl.DateTimeFormat('es-ES', {
    timeZone: 'America/Caracas',
    dateStyle: 'long'
  }).format(fecha);
};


</script>