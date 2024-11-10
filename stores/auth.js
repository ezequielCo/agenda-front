import { defineStore } from 'pinia'
import { ref, onMounted, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { useStorage } from '@vueuse/core'

// Configuración del storage local
const storage = useStorage({ namespace: 'auth', storage: localStorage  })

// Función para obtener el token desde el storage
function getTokenFromStorage() {
 /// console.log(localStorage);
  return localStorage.getItem('access_token') || null
//  return storage.getItem('token') || null
}

// Función para guardar el token en el storage
function saveTokenToStorage(token) {
  localStorage.setItem('token', token);
 // storage.setItem('token', token)
}

// Función para eliminar el token del storage
function removeTokenFromStorage() {
  
    localStorage.removeItem('access_token');
  
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('access_token') || null,
    isAuthenticated: false,
  }),
  actions: {
    setUser(user) {
      this.user = user
      this.isAuthenticated = true
      localStorage.setItem('isAuthenticated', this.isAuthenticated);
    },
    loadAuthState() {
      const isAuthenticated = localStorage.getItem('isAuthenticated') == true
      this.isAuthenticated = isAuthenticated
     // this.token = getTokenFromStorage()
    },
    setToken(token) {
      this.token = token
      sessionStorage.setItem('access_token', this.token);
        // saveTokenToStorage(token)
    },
    logout() {
      this.user = null
      this.token =   localStorage.getItem('access_token')
      this.isAuthenticated = false
    
    
      //  console.log(localStorage.getItem('access_token'));

    
    /* localStorage.removeItem('access_token');
     localStorage.removeItem('token');
     localStorage.removeItem('authenticated');
       localStorage.removeItem('isAuthenticated');
     localStorage.removeItem('user');
     router.push("/login");*/


           $fetch('http://127.0.0.1:8000/auth/logout', {
             method: 'POST',
            headers: { Authorization: `Bearer ${this.token}` }
        })
        .then(() => {
            // Handle successful logout, e.g., display a success message
            localStorage.removeItem('access_token');
            localStorage.removeItem('token');
            localStorage.removeItem('authenticated');
            localStorage.removeItem('isAuthenticated');
            localStorage.removeItem('user');
        })
       



     
    },
    async verifyToken() {
      if (!this.token) {
        this.isAuthenticated = false
        return
      }

      try {
       // let tokken = sessionStorage.getItem('access_token');
         // console.log('Verificando token:', this.token)
        const respuesta = await $fetch('http://127.0.0.1:8000/auth/me', {
          headers: { Authorization: `Bearer ${this.token}` }
        }).then(respuesta => {
             // console.log('consolete',respuesta);
          if (respuesta) {

          //  console.log('Respuesta de usario',respuesta);
            this.setUser(respuesta)
          
            //console.log('Datos del usuario cargados:', respuesta.data)
          } else {
            throw new Error('Respuesta inválida')
          }
        });

       
      } catch (error) {
       // console.error('Error al verificar token:', error)
        this.isAuthenticated = false
        this.user = null
      }
    },
  },
})

// Función para inicializar el store
// Función para inicializar el store
async function initAuthStore() {
  const storedToken = getTokenFromStorage();
  const router = useRouter();

  if (storedToken) {
    useAuthStore().setToken(storedToken);
    await useAuthStore().verifyToken();
  } else {
    ///return navigateTo('/login')
     router.push("/login");

   //  console.log('Deberia de salir a y no poder al login del usuario');
  }
}

// Inicializar el store cuando la aplicación inicie
initAuthStore()