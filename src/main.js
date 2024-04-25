import { createApp } from 'vue'
import { createPinia } from 'pinia'
import AppComponent from './App.vue'
import router from './router.js'

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import { useToast } from "vue-toastification";
import { createHead } from '@vueuse/head'
const toast = useToast()
const head = createHead()
window.toast = toast


const app = createApp(AppComponent)
const options = {
    // You can set your default options here
};
app.use(Toast, options);
app.use(createPinia())
app.use(router)
app.use(head)
app.mount('#app')