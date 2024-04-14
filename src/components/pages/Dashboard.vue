<template>
    <h4>به داشبورد خود خوش آمدید</h4>


</template>
<script setup>
    // import ConcertList from './ConcertList.vue'
    // import Slider from './Slider.vue'
    // import homeApi from '@/axios/api-home.js'
    // import { useToast } from "vue-toastification";
    // import { useDateStore } from '../../store/date'
    // const dateStore = useDateStore()
    import { onMounted, ref, computed, reactive } from 'vue'
    // let loading = ref(true);
    // const toast = useToast()
    import { useHead } from '@vueuse/head'
    const siteData = reactive({
        title: `خرید بلیت کنسرت`,
        description: `خرید بلیت کنسرت`,
    })
    useHead({
        // Can be static or computed
        title: computed(() => siteData.title),
        meta: [
            {
                name: `description`,
                content: computed(() => siteData.description),
            },
        ],

    })
    // onMounted(async () => {
    //     try {
    //         const response = await homeApi.get('/');
    //         if (response.data.status) {
    //             categories.value = response.data.categories
    //             programs.value = response.data.category_programs
    //             sliders.value = response.data.sliders
    //             dateStore.setDate(response.data.todayDate)
    //         }
    //     } catch (err) {
    //         if (err.response) {
    //             toast.error(err.response.data.message, {
    //                 timeout: 3000
    //             });
    //         }
    //     } finally {
    //         loading.value = false
    //     }
    // })
</script>