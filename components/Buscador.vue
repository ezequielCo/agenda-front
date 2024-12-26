<template>
 <form @submit.prevent="" class="space-y-6">
                <div class="grid grid-cols-4 gap-4">
                <div>
                  <label for="firstName" class="block text-sm font-medium text-gray-700">Medico</label>
                  <Combobox v-model="selectedPerson">
                        <ComboboxInput @change="query = $event.target.value"  class="mt-1  block w-full px-3 py-2  rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                        <ComboboxOptions>
                            <div v-if="filteredPeople.length === 0 && query !== ''" class="bg-white px-3  py-2 block truncate text-sm shadow-sm">
                                No se encontraron resultados.
                            </div>
                        <ComboboxOption class=""
                            v-for="person in filteredPeople"
                            :key="person"
                            :value="person"
                            v-slot="{ active, selected }"
                            placeholder="Buscar médico"
                        >
                        <li  class=" px-3 py-2 block truncate text-sm shadow-sm "
                        :class="{
                            'bg-azul': active,
                            'bg-white text-black': !active, }" >
                            <CheckIcon v-show="selected" />
                                {{ person }}
                            </li>
                        </ComboboxOption>
                        </ComboboxOptions>
                    </Combobox>
                  <!----<v-select
                    class="mt-1 block w-full px-3 py-2  rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" 
                        v-model="searchParams.city"
                        :options="cities"
                        :searchable="true"
                        placeholder="Seleccione o busque una ciudad"
                   /> -->
                 
                </div>
                <div>
                  <label for="lastName" class="block text-sm font-medium text-gray-700">Especialidad</label>
                  <input v-model="w" id="lastName" name="lastName" type="text" required class="mt-1 block w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                </div>

                <div>
                  <label for="lastName" class="block text-sm font-medium text-gray-700">Ciudad</label>
                  <input v-model="w" id="lastName" name="lastName" type="text" required class="mt-1 block w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                <div>
                <button type="submit"  class="block  mt-1 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Register
                </button>
              </div>
              
            
            </div>

    </form>


</template>

<script setup>
import { ref, computed } from 'vue'



const searchParams = ref({
  city: null,
  specialty: null,
  other: null
})

import {
    Combobox,
    ComboboxInput,
    ComboboxOptions,
    ComboboxOption,
  } from '@headlessui/vue'

  const people = [
    'Durward Reynolds',
    'Kenton Towne',
    'Therese Wunsch',
    'Benedict Kessler',
    'Katelyn Rohan',
  ]

  /*const selectedPerson = ref(people[0])*/
  const selectedPerson = ref()
  const query = ref('')

  const filteredPeople = computed(() =>
    query.value === ''
      ? people
      : people.filter((person) => {
          return person.toLowerCase().includes(query.value.toLowerCase())
        })
  )
</script>


