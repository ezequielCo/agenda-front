


<template>
  <div class="container mx-auto p-4">
    <div class="flex flex-col lg:flex-row gap-8">

      <div class="lg:w-2/3">
        <div class="bg-white shadow-md rounded-lg p-6">
           <Detalles></Detalles>
        </div>
      </div>
      <!-- Lista de invitados (lado izquierdo) -->
      <div class="lg:w-2/3">
        <div class="bg-white shadow-md rounded-lg p-6">
            <listEventos></listEventos>
        </div>
      </div>

      <!-- Detalles del evento (lado derecho) -->
      
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Detalles from '~/components/eventos/details.vue';
import listEventos from '~/components/eventos/listEventos.vue';

const {id} =useRoute().params;

const evento = ref({
  nombre: "Conferencia Anual de Tecnología",
  descripcion: "Una conferencia que reúne a expertos en tecnología para discutir las últimas tendencias e innovaciones en el campo.",
  fechaHora: new Date("2024-06-15T09:00:00"),
  ubicacion: "Centro de Convenciones, Ciudad de México",
  organizador: "TechMex Asociación",
  invitados: [
    { id: 1, nombre: "Ana García", email: "ana@example.com", estado: "Confirmado", fechaRegistro: "2024-05-01" },
    { id: 2, nombre: "Carlos López", email: "carlos@example.com", estado: "Pendiente", fechaRegistro: "2024-05-03" },
    { id: 3, nombre: "María Rodríguez", email: "maria@example.com", estado: "Cancelado", fechaRegistro: "2024-05-02" },
    { id: 4, nombre: "Juan Pérez", email: "juan@example.com", estado: "Confirmado", fechaRegistro: "2024-05-04" },
    { id: 5, nombre: "Laura Sánchez", email: "laura@example.com", estado: "Pendiente", fechaRegistro: "2024-05-05" },
    // Agrega más invitados aquí para probar la paginación...
  ]
});

const headers = [
  { key: 'nombre', label: 'Nombre' },
  { key: 'email', label: 'Email' },
  { key: 'estado', label: 'Estado' },
  { key: 'fechaRegistro', label: 'Fecha de Registro' }
];

const sortKey = ref('nombre');
const sortOrder = ref('asc');
const currentPage = ref(1);
const itemsPerPage = 5;

const sortBy = (key) => {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortKey.value = key;
    sortOrder.value = 'asc';
  }
};

const sortedInvitados = computed(() => {
  return [...evento.value.invitados].sort((a, b) => {
    let modifier = sortOrder.value === 'asc' ? 1 : -1;
    if (a[sortKey.value] < b[sortKey.value]) return -1 * modifier;
    if (a[sortKey.value] > b[sortKey.value]) return 1 * modifier;
    return 0;
  });
});

const paginatedInvitados = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return sortedInvitados.value.slice(start, end);
});

const totalPages = computed(() => Math.ceil(evento.value.invitados.length / itemsPerPage));

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const formatearFechaHora = (fecha) => {
  return new Intl.DateTimeFormat('es', {
    dateStyle: 'long',
    timeStyle: 'short'
  }).format(fecha);
};

const estadoClase = (estado) => {
  switch (estado) {
    case 'Confirmado':
      return 'text-green-600 font-semibold';
    case 'Pendiente':
      return 'text-yellow-600 font-semibold';
    case 'Cancelado':
      return 'text-red-600 font-semibold';
    default:
      return 'text-gray-600';
  }
};
</script>