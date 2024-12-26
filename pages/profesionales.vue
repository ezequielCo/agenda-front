<template>
    <div class="min-h-screen flex flex-col">
      <!-- Navbar 
      <nav class="bg-white shadow-md">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <div class="flex-shrink-0 flex items-center">
            
              <img class="h-8 w-auto" src="" alt="Logo" />
            </div>
            <div class="flex items-center">
              <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
                Iniciar Sesión
              </button>
            </div>
          </div>
        </div>
      </nav> -->
  
      <!-- Main Content -->
    
      <!-- Banner -->
      <div class="relative bg-gray-900 overflow-hidden">
        <div class="absolute inset-0">
          <img 
            src="/assets/img/login-background.jpg" 
            alt="Doctora sonriente" 
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-gray-900 opacity-60"></div>
        </div>
        <div class="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 class="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
            <span class="block">Profesionales</span>
            <span class="block text-blue-400">Eficiente y Profesional</span>
          </h1>
          <p class="mt-6 max-w-lg text-xl text-gray-300 sm:max-w-3xl">
            Optimiza tu práctica médica con nuestra solución integral de gestión. Simplifica procesos, mejora la atención al paciente y aumenta la eficiencia de tu consultorio.
          </p>
          <div class="mt-10 max-w-sm sm:flex sm:max-w-none">
            <div class="rounded-md shadow">
              <a href="#" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 md:py-4 md:text-lg md:px-10">
                Comenzar
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Features Section -->
      <div class="py-12 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="lg:text-center">
            <h2 class="text-base text-blue-500 font-semibold tracking-wide uppercase">Características</h2>
            <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Una mejor manera de gestionar su práctica médica
            </p>
            </div>
           
        </div>
      </div>
 
      <div class="py-12 bg-blanco">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Buscador></Buscador>
        </div>
     </div>
    <!-- Footer -->
    
  </div>
</template>

<script setup>
definePageMeta({
   layout: 'auth'
});


import { CalendarIcon, ClipboardIcon, FacebookIcon, InstagramIcon, TwitterIcon } from 'lucide-vue-next'
</script>