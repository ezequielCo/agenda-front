<template>
    <div  class="flotar">
     
    <button  @click="openDialog(id)"   class='bg-azul rounded-full p-2 shadow-xl'> 
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
  <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
  <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
</svg>


    </button >
 </div>
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
          <div class="flex min-h-full items-center justify-center p-4 text-center border-blue">
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-2xl bg-gris-claro-100 border-azul p-6 text-left align-middle shadow-xl transition-all">
                
                <!--v-if="isSaved" -->
                <div   v-if="isSaved" class=" inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                  <div class="bg-white rounded-lg shadow-xl p-8 max-w-sm w-full mx-4 transform transition-all duration-300 ease-in-out">
                  <div class="flex flex-col items-center">
                    <div class="check-icon">
                      <span class="icon-line line-tip"></span>
                      <span class="icon-line line-long"></span>
                      <div class="icon-circle"></div>
                      <div class="icon-fix"></div>
                    </div>
                    <h2 class="text-2xl font-bold text-gray-800 mb-4">¡Éxito!</h2>
                    <p class="text-center text-gray-600">{{ msga }}</p>
                  </div>
                </div>
              </div>
              <div  v-if="FormDisamble" class="">
              <DialogTitle as="h3" class="text-lg font-bold leading-6 text-gray-900">
                  <h4 class="text-2xl font-bold text-gray-800 mb-4">Editar Evento </h4>
                  
                </DialogTitle>
                <form   @submit.prevent="submitForm" class="p-6 space-y-6">
                 

                
                  <div  >
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
                      :class="{ 'disabled': isLoading }"
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
              </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
</TransitionRoot>

  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
  
  defineProps({
  id: {
    type: Number,
    required: true
  }
})
  
  const isOpen = ref(false)
  const FormDisamble = ref(true)
  const isLoading = ref(false)
  const isSaved = ref(false)
  // Corregir los nombres de las variables del formulario para que coincidan con el template
  const eventName = ref('')
  const description = ref('')
  const eventDate = ref('')
  const eventTime = ref('')
  const msga = ref('')
  const Id ='';
  const router =useRouter()

  async function openDialog(id) {
  isOpen.value = true;

  try {
    const response = await fetch(`http://127.0.0.1:8000/evento/${id}`);
    
    if(response.status == '200')
    {
      const data = await response.json();
      //obtendo los valores que corresponden al campo
      eventName.value = data.evento;
      description.value =data.description
      eventDate.value = data.fecha_evento
      eventTime.value = data.hora_evento

    }else
    {
      console.error('Se ha presentado un error , por favor verifique', error);
    }
    
    
   // console.log(data)
  } catch (error) {
    console.error('Error al obtener el evento:', error);
    // Mostrar un mensaje de error al usuario
  }
}
  
    
  const submitForm = async () => {
    try {
      isLoading.value = true
      console.log(isLoading.value)
      
      // Simular una operación asíncrona
   
     //aplico validaciones de lo formulario
      const data = {
        evento: eventName.value,
        description: description.value,
        fecha_evento: eventDate.value,
        hora_evento: eventTime.value
      }
      //await new Promise(resolve => setTimeout(resolve, 2000))
    
   await $fetch('http://127.0.0.1:8000/eventos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(response => {
        console.log('Respuesta del servidor:', response);
        console.log('e',response.status_code)
        console.log('detalle',response.detail)
         if(response.status_code ===200){
            let  Id = response.id;
            FormDisamble.value = false; //oculto el formulario 
            isSaved.value = true;  // muestro gif de registro
            msga.value = response.detail;
            ///estableco la ruta que el ultimo registro
            console.log('error objeto',Id);
            //redirecciono todo 
            setTimeout(() => {
            router.push({ path: `/events/${Id}` });
            },5000);
          } else {
            // Manejar errores
            console.error('Error al guardar los datos');
          }
      })
      .catch(error => {
        console.error('Error al enviar el POST:', error);
      });
      //console.log('body:',body)
  
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
  <style  scoped>

.success-checkmark {
  width: 80px;
  height: 80px;
  margin: 0 auto;
}
.check-icon {
  width: 80px;
  height: 80px;
  position: relative;
  border-radius: 50%;
  box-sizing: content-box;
  border: 4px solid #4CAF50;
}
.check-icon::before {
  top: 3px;
  left: -2px;
  width: 30px;
  transform-origin: 100% 50%;
  border-radius: 100px 0 0 100px;
}
.check-icon::after {
  top: 0;
  left: 30px;
  width: 60px;
  transform-origin: 0 50%;
  border-radius: 0 100px 100px 0;
  animation: rotate-circle 4.25s ease-in;
}
.check-icon::before, .check-icon::after {
  content: '';
  height: 100px;
  position: absolute;
  background: #FFFFFF;
  transform: rotate(-45deg);
}
.icon-line {
  height: 5px;
  background-color: #4CAF50;
  display: block;
  border-radius: 2px;
  position: absolute;
  z-index: 10;
}
.icon-line.line-tip {
  top: 46px;
  left: 14px;
  width: 25px;
  transform: rotate(45deg);
  animation: icon-line-tip 0.75s;
}
.icon-line.line-long {
  top: 38px;
  right: 8px;
  width: 47px;
  transform: rotate(-45deg);
  animation: icon-line-long 0.75s;
}
.icon-circle {
  top: -4px;
  left: -4px;
  z-index: 10;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  position: absolute;
  box-sizing: content-box;
  border: 4px solid rgba(76, 175, 80, .5);
}
.icon-fix {
  top: 8px;
  width: 5px;
  left: 26px;
  z-index: 1;
  height: 85px;
  position: absolute;
  transform: rotate(-45deg);
  background-color: #FFFFFF;
}
@keyframes rotate-circle {
  0% {
    transform: rotate(-45deg);
  }
  5% {
    transform: rotate(-45deg);
  }
  12% {
    transform: rotate(-405deg);
  }
  100% {
    transform: rotate(-405deg);
  }
}
@keyframes icon-line-tip {
  0% {
    width: 0;
    left: 1px;
    top: 19px;
  }
  54% {
    width: 0;
    left: 1px;
    top: 19px;
  }
  70% {
    width: 50px;
    left: -8px;
    top: 37px;
  }
  84% {
    width: 17px;
    left: 21px;
    top: 48px;
  }
  100% {
    width: 25px;
    left: 14px;
    top: 45px;
  }
}
@keyframes icon-line-long {
  0% {
    width: 0;
    right: 46px;
    top: 54px;
  }
  65% {
    width: 0;
    right: 46px;
    top: 54px;
  }
  84% {
    width: 55px;
    right: 0px;
    top: 35px;
  }
  100% {
    width: 47px;
    right: 8px;
    top: 38px;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>