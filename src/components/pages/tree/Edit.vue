<template>
    <div class="breadcrumb-header justify-content-between">
        <div class="my-auto">
            <div class="d-flex">
                <router-link :to="{ name: 'dashboard' }" class="content-title mb-0 my-auto">داشبورد</router-link>
                <span class="text-muted mt-1 tx-13 ms-2 mb-0">/</span>
                <router-link :to="{ name: 'grades.index' }" class="content-title mb-0 my-auto">لیست پایه
                    تحصیلی</router-link>
                <span class="text-muted mt-1 tx-13 ms-2 mb-0">/</span>
                <span class="text-muted">ویرایش</span>
            </div>
        </div>
    </div>
    <div class="col-xl-12">
        <div class="text-center" v-if="loading">
            <span class="spinner-border spinner-border-sm"></span>
        </div>
        <form v-else action="#">
            <div class="card">
                <div class="card-header pb-0">
                    <div class="d-flex justify-content-between">
                        <h4 class="card-title mg-b-0">ویرایش پایه تحصیلی</h4>
                        <i class="mdi mdi-dots-horizontal text-gray"></i>
                    </div>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-6">
                            <div class="form-group">
                                <label>عنوان پایه تحصیلی</label>
                                <input class="form-control" v-model.lazy="formData.gradeName"
                                    placeholder="عنوان پایه تحصیلی را وارد کنید" type="text">
                                <div style="font-size: 11px;" v-if="Object.hasOwn(errors, 'gradeName')"
                                    class="text-danger">{{
                                    errors.gradeName.shift() }}</div>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-group">
                                <label>اولویت نمایش</label>
                                <select class="form-control" v-model.lazy="formData.sortingNumber">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                </select>
                                <div style="font-size: 11px;" v-if="Object.hasOwn(errors, 'sortingNumber')"
                                    class="text-danger" :v-text="errors.sortingNumber.shift()"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-footer text-center">
                    <div class="text-center" v-if="updateLoading">
                        <span class="spinner-border spinner-border-sm"></span>
                    </div>
                    <button type="button" v-else @click="updateGrade($event)"
                        class="btn btn-outline-warning btn-sm">ویرایش</button>
                </div>
            </div>
        </form>
    </div>
</template>
<script setup>
import Grade from "@/services/GradeService"
import { reactive, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from "vue-toastification";
import { useHead } from '@vueuse/head'
const route = useRoute()
const router = useRouter()
const toast = useToast();
let loading = ref(false)
let updateLoading = ref(false)
let formData = reactive({
    gradeName: '',
    sortingNumber: '',
    id: route.params.id
});
let errors = {}
async function getById() {
    loading.value = true;
    errors = {}
    try {
        const response = await Grade.getById(route.params.id);
        if (response.data.result == 0) {
            formData = response.data.data
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
async function updateGrade() {
    updateLoading.value = true;
    errors = {}
    try {
        const response = await Grade.update(formData);
        if (response.data.result == 0) {
            toast.success(response.data.message, {
                timeout: 2000
            });
            router.push({name:'grades.index'})
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
        updateLoading.value = false
    }
}
getById()
</script>