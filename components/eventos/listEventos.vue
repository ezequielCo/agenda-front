<template>
     <h2 class="text-2xl font-bold mb-4 text-gray-800">Invitados al Evento {{ id }}</h2>
          <div class="overflow-x-auto">
            <table class="min-w-full">
              <thead>
                <tr class="bg-gray-100">
                  <th v-for="header in headers" :key="header.key" 
                      class="px-4 py-2 text-left text-gray-600 cursor-pointer"
                      @click="sortBy(header.key)">
                    {{ header.label }}
                    <span v-if="sortKey === header.key">
                      {{ sortOrder === 'asc' ? '▲' : '▼' }}
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="invitado in sortedInvitados" :key="invitado.id" class="border-b hover:bg-gray-50">
                  <td class="px-4 py-2 text-gray-800">{{ invitado.nombre }}</td>
                  <td class="px-4 py-2 text-gray-600">{{ invitado.email }}</td>
                  <td class="px-4 py-2">
                    <span :class="estadoClase(invitado.estado)">
                      {{ invitado.estado }}
                    </span>
                  </td>
                  <td class="px-4 py-2 text-gray-600">{{ invitado.fechaRegistro }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="mt-4 flex justify-between items-center">
            <div>
              <span class="text-gray-600">Mostrando {{ paginatedInvitados.length }} de {{ evento.invitados.length }} invitados</span>
            </div>
            <div class="flex space-x-2">
              <button @click="prevPage" :disabled="currentPage === 1" 
                      class="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50">
                Anterior
              </button>
              <button @click="nextPage" :disabled="currentPage === totalPages" 
                      class="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50">
                Siguiente
              </button>
            </div>
          </div>
</template>
<script setup>
const { id } =  useRoute().params;
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