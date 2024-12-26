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
    login() {
      this.token = token;
      this.user = user;
      this.isAuthenticated = true;
      localStorage.setItem('access_token', token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('isAuthenticated', 'true');
    },
    loadAuthState() {
      const isAuthenticated = localStorage.getItem('isAuthenticated') == true
      this.isAuthenticated = isAuthenticated
     // this.token = getTokenFromStorage()
    },
    setToken(token) {
      this.token = token
      this.isAuthenticated = true;
      sessionStorage.setItem('access_token', this.token);
        // saveTokenToStorage(token)
    },
    logout() {
      this.user = null
      this.token =   localStorage.getItem('access_token')
      this.isAuthenticated = false
      
    
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
      const token = localStorage.getItem('access_token');
      if (!token) {
        this.isAuthenticated = false;
        return;
      }

      try {
       // let tokken = sessionStorage.getItem('access_token');
         // console.log('Verificando token:', this.token)
        const respuesta = await $fetch('http://127.0.0.1:8000/auth/me', {
          headers: { Authorization: `Bearer ${this.token}` }
        }).then(respuesta => {
             // console.log('consolete',respuesta);
          if (respuesta) {

            console.log('Aquuuuiiiiiiiiiiiiiiii');
            this.setUser(respuesta);
            this.isAuthenticated = true;
            //console.log('Datos del usuario cargados:', respuesta.data)
          } else {
            this.isAuthenticated = false;
            localStorage.removeItem('token');
          }
        });

       
      } catch (error) {
       // console.error('Error al verificar token:', error)
        this.isAuthenticated = false
        this.user = null
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        localStorage.removeItem('isAuthenticated');
      }
    },


    async fetchUserData()
    {
      //obtengo el ide del usuario
      const userData = localStorage.getItem('user');
      if (userData) {
         const user = JSON.parse(userData);
         this.setUser(user);
         this.user = user;
         this.userId = user.id;
          this.isAuthenticated = true;
          await this.fetchUserPermissions();
      }else
      {
        this.isAuthenticated = false;
      }
    },
      async fetchUserPermissions() {
        ///obtenga los permisos del usuario
          console.log('Cargando permisos del usuario:', this.userId);
        try {

          const response = await $fetch(`http://127.0.0.1:8000/auth/get_role_user?user_id=${this.userId}`, {
            method: 'GET',
          });
          this.permissions = response.permissions;

          console.log('Permisos del usuario cargados:', this.permissions);
        } catch (error) {
          console.error('Error fetching user permissions:', error);
        }
      },

    setUser(user) {
      this.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
  },
})

// Función para inicializar el store
async function initAuthStore() {
  const authStore = useAuthStore();
  const storedToken = localStorage.getItem('access_token');

  if (storedToken) {
    authStore.token = storedToken;
    await authStore.verifyToken();
  } else {
    authStore.isAuthenticated = false;
  }
}

// Inicializar el store cuando la aplicación inicie
initAuthStore();