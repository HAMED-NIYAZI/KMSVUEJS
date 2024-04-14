<template>
    <div class="card">
        <div class="card-header">
            <div class="card-title">درخواست عضویت</div>
        </div>
        <div class="card-body">
            <div class="text-center" v-if="getLoginPageInfoLoading"><span
                    class=" spinner-border spinner-border-sm"></span>
            </div>
            <div class="row no-gutter" v-else>
                <div class="col-md-6 col-lg-6 col-xl-7 d-none d-md-flex bg-primary-transparent">
                    <div class="row wd-100p mr-center text-center">
                        <div class="col-md-12 col-lg-12 col-xl-12 my-auto mr-center wd-100p">
                            <img :src="'https://freelancework.ir/' + loginPageInfo.imagePath"
                                class="my-auto ht-xl-80p wd-md-100p wd-xl-80p mr-center" alt="logo">
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-lg-6 col-xl-5 bg-white">
                    <div class="login d-flex align-items-center py-2">
                        <div class="container p-0">
                            <div class="row">
                                <div class="col-md-10 col-lg-10 col-xl-9 mr-center">
                                    <div class="card-sigin">
                                        <div class="card-sigin">
                                            <div class="card-sigin d-flex mb-5">
                                                <a href="index.html"><img
                                                        :src="'https://freelancework.ir/' + loginPageInfo.imagePath"
                                                        class="sign-favicon-a ht-40" alt="logo">
                                                </a>
                                                <h1 class="main-logo1 ms-1 me-0 my-auto tx-28 ps-1">{{
                                                    loginPageInfo.title }}
                                                </h1>
                                            </div>
                                            <div class="card-sigin">
                                                <div class="main-signup-header">
                                                    <h5 class="fw-semibold mb-4">{{ loginPageInfo.description }}</h5>
                                                    <form action="#">
                                                        <div class="form-group">
                                                            <label>نام</label>
                                                            <input class="form-control"
                                                                v-model.lazy="formData.firstName"
                                                                placeholder="نام خود را وارد کنید" type="text">
                                                            <div style="font-size: 11px;"
                                                                v-if="Object.hasOwn(errors, 'firstName')"
                                                                class="text-danger">{{
                                                                errors.firstName.shift() }}</div>
                                                        </div>
                                                        <div class="form-group">
                                                            <label>نام خانوادگی</label>
                                                            <input class="form-control" v-model.lazy="formData.lastName"
                                                                placeholder="نام خانوادگی خود را وارد کنید" type="text">
                                                            <div style="font-size: 11px;"
                                                                v-if="Object.hasOwn(errors, 'lastName')"
                                                                class="text-danger">{{
                                                                errors.lastName.shift() }}</div>
                                                        </div>
                                                        <div class="form-group">
                                                            <label>شماره موبایل</label>
                                                            <input class="form-control" v-model.lazy="formData.phone"
                                                                placeholder="شماره موبایل خود را وارد کنید" type="text">
                                                            <div style="font-size: 11px;"
                                                                v-if="Object.hasOwn(errors, 'phone')"
                                                                class="text-danger">{{ errors.phone.shift() }}</div>
                                                        </div>
                                                        <div class="form-group">
                                                            <label>آدرس ایمیل</label>
                                                            <input class="form-control" v-model.lazy="formData.email"
                                                                placeholder="آدرس ایمیل خود را وارد کنید" type="text">
                                                            <div style="font-size: 11px;"
                                                                v-if="Object.hasOwn(errors, 'email')"
                                                                class="text-danger">{{ errors.email.shift() }}</div>
                                                        </div>
                                                        <div class="form-group">
                                                            <label>کد ملی</label>
                                                            <input class="form-control" v-model.lazy="formData.codeMeli"
                                                                placeholder="کد ملی خود را وارد کنید" type="text">
                                                            <div style="font-size: 11px;"
                                                                v-if="Object.hasOwn(errors, 'codeMeli')"
                                                                class="text-danger">{{
                                                                errors.codeMeli.shift() }}</div>
                                                        </div>
                                                        <div class="form-group">
                                                            <label>شماره پرسنلی</label>
                                                            <input class="form-control"
                                                                v-model.lazy="formData.personnelNumber"
                                                                placeholder="شماره پرسنلی خود را وارد کنید" type="text">
                                                            <div style="font-size: 11px;"
                                                                v-if="Object.hasOwn(errors, 'personnelNumber')"
                                                                class="text-danger">{{ errors.personnelNumber.shift() }}
                                                            </div>
                                                        </div>
                                                        <div class="form-group">
                                                            <label>شناسه نمودار</label>
                                                            <input class="form-control" v-model.lazy="formData.chartId"
                                                                placeholder="شناسه نمودار خود را وارد کنید" type="text">
                                                            <div style="font-size: 11px;"
                                                                v-if="Object.hasOwn(errors, 'chartId')"
                                                                class="text-danger">{{
                                                                errors.chartId.shift() }}</div>
                                                        </div>
                                                        <div class="form-group">
                                                            <label>کلمه عبور</label>
                                                            <input class="form-control" v-model.lazy="formData.password"
                                                                placeholder="رمز عبور خود را وارد کنید" type="password">
                                                            <div style="font-size: 11px;"
                                                                v-if="Object.hasOwn(errors, 'password')"
                                                                class="text-danger">{{
                                                                errors.password.shift() }}</div>
                                                        </div>
                                                        <div class="form-group">
                                                            <label>تکرار کلمه عبور</label>
                                                            <input class="form-control"
                                                                v-model.lazy="formData.confirmPassword"
                                                                placeholder="تکرار رمز عبور خود را وارد کنید"
                                                                type="confirmPassword">
                                                            <div style="font-size: 11px;"
                                                                v-if="Object.hasOwn(errors, 'confirmPassword')"
                                                                class="text-danger">{{ errors.password.shift() }}</div>
                                                        </div>
                                                        <div class="text-center" v-if="loading">
                                                            <span class="spinner-border spinner-border-sm"></span>
                                                        </div>
                                                        <button type="button" v-else @click="doRegister($event)"
                                                            class="btn btn-main-primary btn-block">ثبت درخواست</button>
                                                    </form>
                                                    <div class="main-signin-footer mt-5">
                                                        <router-link :to="{name:'login'}">ورود</router-link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div><!-- End -->
                        </div>
                    </div><!-- End -->
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { reactive, ref, computed } from 'vue'
import Auth from '../services/Auth'
import { useToast } from "vue-toastification";
import { useHead } from '@vueuse/head'
useHead({
    // Can be static or computed
    title: computed(() => 'صفحه درخواست عضویت'),
})
const toast = useToast();
let loading = ref(false)
let getLoginPageInfoLoading = ref(false)
let loginPageInfo = reactive({ imagePath: '', title: '', description: '' });
let formData = reactive({
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    phone: "",
    email: "",
    codeMeli: "",
    personnelNumber: "",
    chartId: ""
})
let errors = {}

async function doRegister(e) {
    loading.value = true;
    errors = {}
    try {
        const response = await Auth.register(formData);
        if (response.data.result == 0) {
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
        if (err.response.status == 422) {
            errors = err.response.data.errors
        } else {
            toast.error(err.response.data.message, {
                timeout: 2000
            });
        }
    } finally {
        loading.value = false
    }
}
async function getLoginPageInfo() {
    getLoginPageInfoLoading.value = true;
    errors = {}
    try {
        const response = await Auth.getInfoForLoginPage();
        if (response.data.result == 0) {
            loginPageInfo = response.data.data;
            console.log(loginPageInfo)
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
        getLoginPageInfoLoading.value = false
    }
}
getLoginPageInfo()
</script>