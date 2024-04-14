import { createApp } from 'vue'
import { createPinia } from 'pinia'
import AppComponent from './App.vue'
import router from './router.js'


// import './assets/plugins/icons/icons.css'
// import 'bootstrap/dist/css/bootstrap.rtl.min.css'
// import './assets/plugins/sidebar/sidebar.css'
// import './assets/plugins/perfect-scrollbar/p-scrollbar.css'
// import './assets/css-rtl/sidemenu.css'
// import './assets/plugins/owl-carousel/owl.carousel.css'
// import './assets/plugins/jqvmap/jqvmap.min.css'
// import './assets/css-rtl/style.css'
// import './assets/css-rtl/style-dark.css'
// import './assets/css-rtl/boxed.css'
// import './assets/css-rtl/dark-boxed.css'
// import './assets/css-rtl/skin-modes.css'
// import './assets/css-rtl/animate.css'
// import './assets/switcher/css/switcher-rtl.css'
// import './assets/switcher/demo.css'




// import jQuery from "jquery";

// global.jQuery = jQuery
// global.$ = jQuery


// import "bootstrap/dist/js/bootstrap.bundle.js"
// import "./assets/plugins/ionicons/ionicons.js"
// import "./assets/plugins/moment/moment.js"
// import "./assets/plugins/perfect-scrollbar/perfect-scrollbar.min-rtl.js"
// import "./assets/plugins/perfect-scrollbar/p-scroll-rtl.js"
// import "./assets/plugins/rating/jquery.rating-stars.js"
// import "./assets/plugins/rating/jquery.barrating.js"
// import "./assets/js/sticky.js"
// import "./assets/plugins/side-menu/sidemenu.js"
// import "./assets/plugins/sidebar/sidebar-rtl.js"
// import "./assets/plugins/sidebar/sidebar-custom.js"
// import "./assets/plugins/eva-icons/eva-icons.min.js"
// import "./assets/plugins/raphael/raphael.min.js"
// import "./assets/plugins/chartjs/Chart.bundle.min.html"
// import "./assets/plugins/jquery-sparkline/jquery.sparkline.min.js"
// import "./assets/js/apexcharts.js"
// import "./assets/plugins/jqvmap/jquery.vmap.min.js"
// import "./assets/plugins/jqvmap/maps/jquery.vmap.usa.js"
// import "./assets/js/index.js"
// import "./assets/js/apexcharts.js"
// import "./assets/js/jquery.vmap.sampledata.js"
// import "./assets/js/custom.js"
// import "./assets/switcher/js/switcher-rtl.js"

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