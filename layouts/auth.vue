
<template>
     <div  id="app-layout" class="min-h-screen flex flex-col">
          <!-- Navbar -->
          <nav class="bg-blanco shadow-md">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div class="flex justify-between h-16">
                <div class="flex-shrink-0 flex items-center">
                  <!-- Replace with your logo -->
                  <img class="h-8 w-auto" src="/assets/img/logo.svg" alt="Logo" />
                </div>
                <div class="flex items-center">
            <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
                    <a href="/" class="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium " aria-current="page">Inicio</a>
                    <a href="/dashboard" class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">dashboard</a>
                    <a href="#" class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Projects</a>
                    <a href="#" class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Calendar</a>
                  </div>
                <div class="flex items-center">
                 <!----<div class="relative px-4  ">
                        <button class=" text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-full">
                          <ShoppingCart class="w-6 h-6" />
                        </button>
                        <span class="bg-azul absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                          {{ itemCount }}
                        </span>
                  </div>-->
                  
                <div class="px-4" v-if="authStore.isAuthenticated == false">
                        <button  @click="login" class="bg-azul hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
                          Iniciar Sesión
                        </button>
                      </div>    
                  <div v-else>

                    <Menu>
                      <MenuButton  id="dropdownDefaultButton" data-dropdown-toggle="dropdown" class="text-white bg-azul hover:bg-blue-800   font-medium rounded text-sm px-5 py-4 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button"> 
                      
                        Options  <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                              </svg>
                      </MenuButton>
                      <transition
                      enter-active-class="transition duration-100 ease-out"
                      enter-from-class="transform scale-95 opacity-0"
                      enter-to-class="transform scale-100 opacity-100"
                      leave-active-class="transition duration-75 ease-out"
                      leave-from-class="transform scale-100 opacity-100"
                      leave-to-class="transform scale-95 opacity-0"
                         >
                      <MenuItems  class="bg-blanco  origin-top absolute z-50 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" aria-labelledby="dropdownDefaultButton">
                        <!-- Use the `active` state to conditionally style the active item. -->
                        <MenuItem
                          v-for="link in links"
                          :key="link.href"
                          as="template"
                          v-slot="{ active }"  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600  dark:hover:text-white"
                        >
                          <a
                            :href="link.href"
                            :class="{ 'bg-azul text-white': active, 'bg-blancotext-black': !active }"
                          >
                            {{ link.label }}
                          </a>
                        </MenuItem> 
                         <MenuItem>
                          <button  @click="logout" class="  block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600  dark:hover:text-white">
                             Cerrar
                        </button>
                        </MenuItem>
                      </MenuItems>
                    </transition>
                    </Menu>
                   <!--<button  @click="logout" class="bg-azul hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
                         Desplegable botton 
                        </button> -->
                  </div>
                </div>
                </div>
              </div>
            
          </nav>
          <main class="flex-grow">
            <slot />

          </main>


        </div> 
        
    
    
       <!---< <main>
        <div v-if="!authStore.isAuthenticated">
          <p>Por favor, inicie sesión.</p>
          <button @click="logout">Iniciar sesión</button>
        </div>       
        <div v-else>
          <h1>Contenido protegido</h1>
          <button @click="logout">Cerrar sesión</button>
        </div> -
   
      </main>
    </div>-->

    <footer class="bg-gris-claro">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="md:flex md:items-center md:justify-between">
          <div class="flex justify-center space-x-6 md:order-2">
            <a href="#" class="text-gray-400 hover:text-gray-300">
              <span class="sr-only">Facebook</span>
              <FacebookIcon class="h-6 w-6" />
            </a>
            <a href="#" class="text-gray-400 hover:text-gray-300">
              <span class="sr-only">Instagram</span>
              <InstagramIcon class="h-6 w-6" />
            </a>
            <a href="#" class="text-gray-400 hover:text-gray-300">
              <span class="sr-only">Twitter</span>
              <TwitterIcon class="h-6 w-6" />
            </a>
          </div>
          <div class="mt-8 md:mt-0 md:order-1">
            <p class="text-center text-base text-gray-400">
              &copy; 2024 Medical Management App. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>

  </template>
  
  <script setup>
  import { toast } from 'vue3-toastify';
 import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'

  import { ref, onMounted} from 'vue'
  //import { useRouter } from 'vue'
  import { HomeIcon, UsersIcon, FolderIcon, CalendarIcon, ChartBarIcon, CogIcon ,ShoppingCart} from 'lucide-vue-next'
  
  const authStore = useAuthStore();
  const router = useRouter();
 // console.log('login dashboras',authStore.isAuthenticated);
  
  // muestro mensaje de bienvenidad
  


  const logout = () => {
    authStore.logout();
    router.push('/login');
  };
  

  const login = () => {
    
    router.push('/login');
  };
  
    const links = [
      { href: '/account-settings', label: 'Account settings' },
      { href: '/support', label: 'Support' },
      { href: '/license', label: 'License' },
      { href: '/sign-out', label: 'Sign out' },
    ]


    const itemCount = 3;
  ///console.log('mis valores locales', localStorage)
  // Escuchar cambios en el estado de autenticación
  /*watch(() => authStore.isAuthenticated, () => {
    if (!authStore.isAuthenticated) {
      // Redireccionar al usuario no autenticado
      router.push('/login')
    }
  }, { immediate: true })*/
  
  
 
  //console.log('desde el layout',authStore.isAuthenticated)
  if(authStore.isAuthenticated = true){
    console.log('Se supodene que estoy actuvo y es true')
   let token =localStorage.getItem('access_token');
    
       const respuesta =  $fetch('http://127.0.0.1:8000/auth/me', {
              headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
            }).then(response => {
              toast.success('Bienvenido(a) '+ response.username , {
              autoClose: 5000,
              position: toast.POSITION.TOP_RIGHT,
                });
             });

  }

  /*onMounted( async () => {
    await  authStore.verifyToken();
});*/
 
  onMounted(async () => {
    await authStore.verifyToken();
    await authStore.fetchUserData();
   
  });
  </script>
  