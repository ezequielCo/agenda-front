<template>
    <div class="">
        <button @click="isOpen = true" 
        class="bg-azul hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
          Abrir Modal
        </button>
    <TransitionRoot appear :show="isOpen" as="template">
      <Dialog as="div" @close="isOpen = false" class="relative z-10">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black " />
        </TransitionChild>
  
        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-2xl bg-gris-claro p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle as="h3" class="text-lg font-bold leading-6 text-gray-900">
                  <h2 class="text-2xl font-bold text-gray-800 mb-4">Crear Nuevo Evento</h2>
                  
                </DialogTitle>
               
                <form @submit.prevent="submitForm" class="p-6 space-y-6">
                 
                  <div>
                    <label for="eventName" class="block text-sm font-medium text-gray-700">Nombre del Evento</label>
                    <input
                      v-model="eventName"
                      type="text"
                      id="eventName"
                      name="eventName"
                      required
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      placeholder="Ej: Conferencia de Vue.js"
                    >
                  </div>

                  <div>
                    <label for="description" class="block text-sm font-medium text-gray-700">Descripción Corta</label>
                    <textarea
                      v-model="description"
                      id="description"
                      name="description"
                      rows="3"
                      required
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      placeholder="Breve descripción del evento"
                    ></textarea>
                  </div>

                  <div>
                    <label for="eventDate" class="block text-sm font-medium text-gray-700">Fecha del Evento</label>
                    <div class="mt-1 relative rounded-md shadow-sm">
                      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <CalendarIcon class="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        v-model="eventDate"
                        type="date"
                        id="eventDate"
                        name="eventDate"
                        required
                        class="block w-full pl-10 rounded-md border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      >
                    </div>
                  </div>

                  <div>
                    <label for="eventTime" class="block text-sm font-medium text-gray-700">Hora del Evento</label>
                    <div class="mt-1 relative rounded-md shadow-sm">
                      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <ClockIcon class="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        v-model="eventTime"
                        type="time"
                        id="eventTime"
                        name="eventTime"
                        required
                        class="block w-full pl-10 rounded-md border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      >
                    </div>
                  </div>

                  <div>
                    
                    <button
                      :disabled="isLoading"
                      type="submit"
                      class="bg-azul w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                     <span v-if="!isLoading">Crear Evento</span> 
                     <div v-else class="flex items-center">
                      <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creando...
                     </div>
                    </button>
                  </div>
                </form>
                
  
                <div class="mt-4 flex justify-end space-x-2">
                  <button
                    
                    type="button"
                    class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    @click="isOpen = false"
                  >
                    Cancelar
                  </button>
                 
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
</div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
  
  const isOpen = ref(false)
  const isLoading = ref(false)
  
  // Corregir los nombres de las variables del formulario para que coincidan con el template
  const eventName = ref('')
  const description = ref('')
  const eventDate = ref('')
  const eventTime = ref('')
  
  const submitForm = async () => {
    try {
      isLoading.value = true
      console.log(isLoading.value)
      
      // Simular una operación asíncrona
      await new Promise(resolve => setTimeout(resolve, 2000))
  
      console.log({
        eventName: eventName.value,
        description: description.value,
        eventDate: eventDate.value,
        eventTime: eventTime.value
      })
  
      // Limpiar el formulario
      eventName.value = ''
      description.value = ''
      eventDate.value = ''
      eventTime.value = ''
  
      console.log('Evento registrado con éxito')
      //isOpen.value = false // Cerrar el modal después de un envío exitoso
    } catch (error) {
      console.error('Error al crear el evento:', error)
      alert('Hubo un error al crear el evento. Por favor, intenta de nuevo.')
    } finally {
      isLoading.value = false
    }
  }
  </script>