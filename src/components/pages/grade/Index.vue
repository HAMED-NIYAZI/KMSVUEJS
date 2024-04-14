<template>
    <div class="breadcrumb-header justify-content-between">
        <div class="my-auto">
            <div class="d-flex">
                <router-link :to="{ name: 'dashboard' }" class="content-title mb-0 my-auto">داشبورد</router-link>
                <span class="text-muted mt-1 tx-13 ms-2 mb-0">/</span>
                <span class="text-muted">لیست پایه تحصیلی</span>
            </div>
        </div>
    </div>
    <div class="col-xl-12">
        <div class="card">
            <div class="card-header pb-0">
                <div class="d-flex justify-content-between">
                    <h4 class="card-title mg-b-0">لیست پایه تحصیلی</h4>
                    <router-link :to="{name:'grades.create'}"
                        class="btn btn-outline-success btn-sm d-flex align-items-center">
                        <i class="ms-2 fa fa-plus"></i>جدید
                    </router-link>
                </div>
            </div>
            <div class="card-body">
                <div class="text-center" v-if="loading">
                    <span class="spinner-border spinner-border-sm"></span>
                </div>
                <div class="table-responsive" v-else>
                    <table class="table table-striped mg-b-0 text-md-nowrap table-hover" v-if="grades.length">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>عنوان</th>
                                <th>اولویت نمایش</th>
                                <th>عملیات</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(grade, index) in grades" :key="grade.id">
                                <th scope="row">{{ 1 + index }}</th>
                                <td>{{ grade.gradeName }}</td>
                                <td><span class="badge bg-info">{{ grade.sortingNumber }}</span></td>
                                <td>
                                    <a href="#" @click.prevent="destroy(grade.id)"><i
                                            class=" fa fa-trash text-danger"></i></a>
                                    <router-link :to="{name:'grades.edit', params:{id:grade.id}}" class="ms-2"><i
                                            class=" fa fa-pen text-warning"></i></router-link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="alert alert-info" v-else>
                        هیچ گونه دیتایی برای نمایش پیدا نشد
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import Grade from "@/services/Grade"
import { ref, computed } from 'vue'
import { useToast } from "vue-toastification";
import { useHead } from '@vueuse/head'
import Swal from 'sweetalert2'
useHead({
    title: computed(() => 'لیست پایه تحصیلی'),
})
const toast = useToast();
let loading = ref(false)
let grades = ref([]);
let errors = {}

async function index() {
    loading.value = true;
    errors = {}
    try {
        const response = await Grade.index();
        if (response.data.result == 0) {
            grades.value = response.data.data;
            console.log(grades.value)
        } else if (response.data.result == 5) {
            toast.warning(response.data.message, {
                timeout: 2000
            });
        } else {
            toast.warning(response.data.message, {
                timeout: 2000
            });
        }
    } catch (err) {

    } finally {
        loading.value = false
    }
}
async function destroy(id) {
    Swal.fire({
        title: "آیا مایل به حذف کردن هستید؟",
        text: "آیتم حذف شده قابل بازیابی نمی باشد",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "بله، حذف کن!",
        cancelButtonText: "انصراف"
    }).then(async (result) => {
        if (result.isConfirmed) {
            errors = {}
            try {
                const response = await Grade.delete(id);
                if (response.data.result == 0) {
                    toast.success(response.data.message);
                    index()
                } else if (response.data.result == 5) {
                    toast.warning(response.data.message, {
                        timeout: 2000
                    });
                } else {
                    toast.warning(response.data.message, {
                        timeout: 2000
                    });
                }
            } catch (err) {
        
            } finally {
            }
        }
    });
}
index()
</script>