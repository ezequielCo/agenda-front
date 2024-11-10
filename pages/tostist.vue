<template>
   <!-- <div>
      <button @click="testToastify"> s</button>
    </div>
-->
 <div class="p-36 max-w-32  max-h-24 bg-blue-success">

    
      <button @click="testToastify">Success </button>
 
 </div>
 <div class="p-36  max-w-32 max-h-24 bg-yellow-warnnig">
    <button @click="alerWarnnig">warnnig </button>
 </div>

  </template>
  
  <script setup>
  import { toast } from 'vue3-toastify';
//import { _backgroundColor, _fontFamily } from '#tailwind-config/theme';
///is here the documentaction 
//https://vue3-toastify.js-bridge.com/usage/how-to-style.html#how-to-style  
  const  testToastify = () => {


    let msg = 'Mi mensaje del Back';
    useToastify(msg, {
      icon:"🚀",
      autoClose: 5000,
      position: ToastifyOption.POSITION.TOP_RIGHT,
      toastClassName: 'toast-classssssss2222',
      bodyClassName: 'toast-body-Ccccct-size222',
      progressClassName: 'fancy-progress-bar222',
      toastStyle: {
        color:'#000000',
        fontSize: '15px',
        background:'#d2fcff',
        fontFamily : 'sans-serif',
        shadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px'
        }
    });
  }
  

  const alerWarnnig = () =>{
    let msg = 'Mi mensaje del Back';
   /* useToastify(msg, {
      icon:"🚀",
      autoClose: 5000,
      position: ToastifyOption.POSITION.TOP_RIGHT,
      toastClassName: 'toast-classssssss2222',
      bodyClassName: 'toast-body-Ccccct-size222',
      progressClassName: 'fancy-progress-bar222',
      toastStyle: {
        color:'#000000',
        fontSize: '15px',
        background:'#fffd83',
        fontFamily : 'sans-serif',
        shadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px'
        }
    });*/
    toast.success(msg, {
    position: toast.POSITION.TOP_RIGHT,
     });
    toast.error("Error Notification !", {
    autoClose: 5000,
    position: toast.POSITION.TOP_RIGHT,
  });

  toast.warn("Warning Notification !", {
    position: toast.POSITION.BOTTOM_LEFT,
  });

  toast.info("Info Notification !", {
    position: toast.POSITION.BOTTOM_CENTER,
  });
  }
  
  </script>