<template>
  <div class="bg-azul-claro">
    <div class="flex flex-col items-center justify-center min-h-screen">
      <div class="bg-blanco shadow-md rounded-lg w-full max-w-sm p-8">
        <form @submit.prevent="submitForm">
  
        <div class="items-center mb-4">
          <div class="mr-6">
            <img src="/assets/img/logo.svg?color=indigo&shade=600"  alt="Logo" class="w-12 h-12">
          </div>
        </div>
  
    
          <div class="mb-4">
            <label for="email" class="block text-gray-700">Correo electrónico:</label>
            <input type="text" id="email" class="form-input w-full border border-gray-300 rounded-md py-2 px-4" v-model="username">
          </div>
  
          <div class="mb-4">
            <label for="password" class="block text-gray-700">Contraseña:</label>
            <input type="password" id="password" class="form-input w-full border border-gray-300 rounded-md py-2 px-4" v-model="password">
          </div>
          
          <div class="mb-4">
         <NuxtLink to="/register">Registrarme</NuxtLink>

          </div>
          <div class="mb-4">
            <button
                      :class="{ 'disabled': isLoading }"
                      :disabled="isLoading"
                      type="submit"
                      class="bg-azul w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                     <span v-if="!isLoading">Iniciar Sesion</span> 
                     <div v-else class="flex items-center">
                      <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    
                     </div>
                    </button>
          </div>
        
        </form>
      </div>
    </div>
    </div>
  </template>
  <script setup>

import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import axios from 'axios';
import myImage from '~/assets/img/login-background.jpg'; //imag background
import { toast } from 'vue3-toastify';

  definePageMeta({ 
  //layout: '',
  name:'Login',
  });

const isLoading = ref(false)
const router = useRouter();
const authStore = useAuthStore();
let token = '';
const username = ref('');
const password  = ref('');

const submitForm = async () => {
  //  try {
      isLoading.value = true
    
     const formData = new FormData();
      formData.append('username', username.value);
      formData.append('password', password.value);
      //await new Promise(resolve => setTimeout(resolve, 2000))
   // console.log(data)
    await axios.post("http://127.0.0.1:8000/auth/token",formData, {
          headers: {
          "Content-Type": "multipart/form-data"
          
        }
      }).then(response => {
        //console.log('Respuesta:', response);
      if (response.status === 200) {
     
     
        const token = response.data.access_token;
        localStorage.setItem('access_token', token);
        authStore.setToken(token);
        isLoading.value = false
        router.push('/dashboard');
      }
    })
    .catch(error => {
      if (error.response && error.response.status === 401) {
        isLoading.value = false
        toast.error('Usuario o contraseña incorrecta, valide su datos !.', {
            autoClose: 5000,
            position: toast.POSITION.TOP_RIGHT,
        });
    } else {
        // Manejar otros tipos de errores
        isLoading.value = false
        toast.error(error, {
            autoClose: 5000,
            position: toast.POSITION.TOP_RIGHT,
        });
    }

    });
 /* } catch (error) {
    isLoading.value = false
    toast.error(error, {
          autoClose: 5000,
          position: toast.POSITION.TOP_RIGHT,
       });
  }*/
};
</script>