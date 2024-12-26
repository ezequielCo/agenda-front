<template>
    <div class="min-h-screen bg-azul-claro flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl w-auto bg-blanco shadow-md  rounded-lg overflow-hidden m-10">
        <div class="flex">
          <!-- Left side image -->
          <div class="hidden lg:block lg:w-1/2">
            <img class="object-cover w-full h-full" src="/assets/img/login-background.jpg" alt="Medical professional" />
          </div>
  
          <!-- Right side form -->
          <div class="w-144 lg:w-1/2 p-8">
            <h2 class="text-3xl font-extrabold text-gray-900 mb-6 text-center">Register</h2>
            

              
            <form v-if="showForm" @submit.prevent="handleSubmit" class="space-y-6">

              <div>
              <button @click="toggleImage"  class="  -full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500w">
                  
                <!--- este botton debe hacer que se cambi la imagen de fondo-->
                {{ buttonText }}
                </button>

                <input v-model="form.userType" id="userType" name="firstName" type="hidden" value="true" required class="" />

            </div>

                <div class="grid grid-cols-2 gap-4">
                <div>
                  <label for="firstName" class="block text-sm font-medium text-gray-700">Nombre</label>
                  <input v-model="form.firstName" id="firstName" name="firstName" type="text" required class="mt-1 block w-48 px-3 py-2  rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                <div>
                  <label for="lastName" class="block text-sm font-medium text-gray-700">Apellido</label>
                  <input v-model="form.lastName" id="lastName" name="lastName" type="text" required class="mt-1 block w-48 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
              </div>
              
              
                <div>
                <label for="name" class="block text-sm font-medium text-gray-700">Full Name</label>
                <input v-model="form.name" id="name" name="name" type="text" required class="mt-1 block w-full px-3 py-2  rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
              </div>
  
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
                <input v-model="form.email" id="email" name="email" type="email" required class="mt-1 block w-full px-3 py-2  rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
              </div>
    <div>
              <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
              <input 
                v-model="form.password" 
                id="password" 
                name="password" 
                type="password" 
                required 
                @input="validatePassword"
                class="mt-1 block w-full px-3 py-2  rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                :class="{'border-red-500': !passwordValid && form.password, 'border-green-500': passwordValid && form.password}"
              />
              <ul v-if="form.password" class="mt-2 text-sm">
                <li v-for="(rule, index) in passwordRules" :key="index" :class="rule.valid ? 'text-verde' : 'text-red-errors'">
                  {{ rule.message }}
                </li>
              </ul>
            </div>

              <div class="block"></div>
       
            
  
              <div>
                <button type="submit" :disabled="!formValid" class="bg-azul w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Register
                </button>
              </div>
            </form>

       
          <div v-else>
              <p>
                El usuario se registro
              </p>
          </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
import { ref, computed } from 'vue'
import axios from 'axios';
import { toast } from 'vue3-toastify';

const showForm   = ref(true)
const isOriginalImage = ref(true)

/*Procesos que se encarga cambiar la imagen hacer que funciones */
const currentImage = computed(() => 
  isOriginalImage.value
    ? '/assets/img/woman-doctor-banner.jpg'
    : '/assets/img/login-background.jpg',
)


const buttonText = computed(() => 
  isOriginalImage.value ? 'Soy medico' : 'Soy Paciente',
 
 
  
)

const toggleImage = () => {
  isOriginalImage.value = !isOriginalImage.value

  form.value.userType = isOriginalImage.value ? '1' : '2'
}



const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  userType: '1',
  dateOfBirth: '',
  specialization: ''
})

const passwordRules = ref([
  { regex: /.{8,}/, message: 'At least 8 characters long', valid: false },
  { regex: /[A-Z]/, message: 'Contains at least one uppercase letter', valid: false },
  { regex: /[a-z]/, message: 'Contains at least one lowercase letter', valid: false },
  { regex: /[0-9]/, message: 'Contains at least one number', valid: false },
  { regex: /[^A-Za-z0-9]/, message: 'Contains at least one special character', valid: false },
])

const passwordValid = computed(() => passwordRules.value.every(rule => rule.valid))

const formValid = computed(() => {
  return form.value.firstName && 
         form.value.lastName && 
         form.value.email && 
         passwordValid.value && 
         form.value.userType
})

const validatePassword = () => {
  passwordRules.value.forEach(rule => {
    rule.valid = rule.regex.test(form.value.password)

    
  })
}

const handleSubmit =  async () => {
  if (formValid.value) {
    console.log('Form submitted:', form.value)

    const username = form.value.firstName +' '+form.value.lastName;

   
    const create_user_request =
    
     {
       username:  form.value.name, 
       password: form.value.password,
       name:username,
       email: form.value.email,
        
      }


      const roles = [form.value.userType];

const dataToSend = {
  create_user_request,
  roles
};

      //await new Promise(resolve => setTimeout(resolve, 2000))
  
      console.log(create_user_request)
   await $fetch('http://127.0.0.1:8000/auth/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      // body : create_user_request
      }).then(response => {
        if(response.status_code  === 400)
        {
            toast.error(response.detail , {
              autoClose: 5000,
              position: toast.POSITION.TOP_RIGHT,
          });

        }
        else if(response.status_code === 200 )
        {

          showForm.value = false;
          toast.success(response.detail, {
            autoClose: 5000,
            position: toast.POSITION.TOP_RIGHT,
        });
        }
        else
        {
          toast.error( 'Se ha presentado un error inesperado.', {
              autoClose: 5000,
              position: toast.POSITION.TOP_RIGHT,
          });
        }
       // console.log('respuesta registro de usuario',response)



      });
    // Aquí iría la lógica para enviar los datos al servidor
    // Resetear el formulario después del envío
    /*form.value = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      userType: '',
      dateOfBirth: '',
      specialization: ''
    }*/
    passwordRules.value.forEach(rule => rule.valid = false)
  } else {
   /// console.log('Form is not valid')
   toast.error( 'Se ha presentado un error inesperado.', {
              autoClose: 5000,
              position: toast.POSITION.TOP_RIGHT,
          });
  }
}
</script>