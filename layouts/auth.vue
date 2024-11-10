
<template>
     <div  id="app-layout" class="min-h-screen flex flex-col">
          <!-- Navbar -->
          <nav class="bg-white shadow-md">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div class="flex justify-between h-16">
                <div class="flex-shrink-0 flex items-center">
                  <!-- Replace with your logo -->
                  <img class="h-8 w-auto" src="/assets/img/logo.svg" alt="Logo" />
                </div>
                <div class="flex items-center">
                <div v-if="!authStore.isAuthenticated">
                        <button  @click="login" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
                          Iniciar Sesión
                        </button>
                      </div>    
                  <div v-else>
                    <button  @click="logout" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
                         Desplegable botton 
                        </button>
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

  import { useAuthStore } from '@/stores/auth';
  import { ref, watch} from 'vue'
  //import { useRouter } from 'vue'
  import { HomeIcon, UsersIcon, FolderIcon, CalendarIcon, ChartBarIcon, CogIcon } from 'lucide-vue-next'
  
  const authStore = useAuthStore();
  const router = useRouter();
 // console.log('login dashboras',authStore.isAuthenticated);
  definePageMeta({
     middleware: ['auth'],
     
  });
  // muestro mensaje de bienvenidad
  


  const logout = () => {
    authStore.logout();
    router.push('/login');
  };
  

  const login = () => {
    //authStore.logout();
    router.push('/login');
  };
  


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
  
  // Ejecutar initAuthStore cuando el componente se monte
  onMounted(async () => {
    await authStore.verifyToken()
   
  })
  </script>
  