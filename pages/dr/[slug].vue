<template>
    <div class="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl w-full bg-white rounded-xl shadow-2xl overflow-hidden">
        <div class="flex flex-col md:flex-row">
          <!-- Doctor's photo -->
          <div class="md:w-1/3">
            <img class="h-full w-full object-cover" src="/assets/img/login-background.jpg" :alt="doctor.name">
          </div>
          
          <!-- Doctor's information -->
          <div class="md:w-2/3 p-8">
            <h2 class="text-3xl font-bold text-gray-900 mb-2">{{ doctor.name }}</h2>
            <p class="text-xl text-indigo-600 mb-4">{{ doctor.specialty }}</p>
            
            <div class="flex items-center mb-4">
              <div class="flex">
                <StarIcon v-for="i in 5" :key="i" 
                  :class="[i <= doctor.rating ? 'text-yellow-400' : 'text-gray-300', 'h-5 w-5']"
                />
              </div>
              <p class="ml-2 text-sm text-gray-600">{{ doctor.reviewCount }} reviews</p>
            </div>
            
            <p class="text-gray-600 mb-6">{{ doctor.description }}</p>
            
            <div class="mb-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Specializations</h3>
              <div class="flex flex-wrap gap-2">
                <span v-for="(specialization, index) in doctor.specializations" :key="index"
                  class="bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-1 rounded-full">
                  {{ specialization }}
                </span>
              </div>
            </div>
            
            <div class="flex items-center justify-between">
              <p class="text-2xl font-bold text-gray-900">${{ doctor.consultationFee }}/hour</p>
              <button class="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 transition-colors duration-200">
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { StarIcon } from 'lucide-vue-next'
  definePageMeta({
   middleware: 'auth',
   layout: 'auth'
});
  
  const {slug} =useRoute().params;
  const doctor = ref({
    name: 'Dr. Jane Smith',
    specialty: 'Cardiologist',
    imageUrl: '',
    rating: 4,
    reviewCount: 127,
    description: 'Dr. Jane Smith is a board-certified cardiologist with over 15 years of experience in treating various heart conditions. She is known for her patient-centered approach and expertise in preventive cardiology.',
    specializations: ['Preventive Cardiology', 'Echocardiography', 'Cardiac Rehabilitation'],
    consultationFee: 150
  })
  </script>