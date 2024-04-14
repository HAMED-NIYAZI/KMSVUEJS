<template>
    <div class="card">
        <div class="card-header">
            <div class="card-title">ورود</div>
        </div>
        <div class="card-body">
            <div class="text-center mt-5" v-if="loading"><span class=" spinner-border spinner-border-sm"></span></div>
            <div class="row no-gutter" v-else>
                <!-- The image half -->
                <div class="col-md-6 col-lg-6 col-xl-7 d-none d-md-flex bg-primary-transparent">
                    <div class="row wd-100p mr-center text-center">
                        <div class="col-md-12 col-lg-12 col-xl-12 my-auto mr-center wd-100p">
                            <img :src="'https://freelancework.ir/' + loginPageInfo.imagePath"
                                class="my-auto ht-xl-80p wd-md-100p wd-xl-80p mr-center" alt="logo">
                        </div>
                    </div>
                </div>
                <!-- The content half -->
                <div class="col-md-6 col-lg-6 col-xl-5 bg-white">
                    <div class="login d-flex align-items-center py-2">
                        <!-- Demo content-->
                        <div class="container p-0">
                            <div class="row">
                                <div class="col-md-10 col-lg-10 col-xl-9 mr-center">
                                    <div class="card-sigin">
                                        <div class="card-sigin">
                                            <div class="card-sigin d-flex mb-5">
                                                <a href="#"><img
                                                        :src="'https://freelancework.ir/' + loginPageInfo.imagePath"
                                                        class="sign-favicon-a ht-40" alt="logo">
                                                </a>
                                                <h1 class="main-logo1 ms-1 me-0 my-auto tx-28 ps-1">{{ loginPageInfo.title }}
                                                </h1>
                                            </div>
                                            <div class="card-sigin">
                                                <div class="main-signup-header">
                                                    <h5 class="fw-semibold mb-4">{{ loginPageInfo.description }}</h5>
                                                    <form action="#">
                                                        <div class="form-group">
                                                            <label>نام کاربری</label>
                                                            <input class="form-control" v-model.lazy="formData.userName"
                                                                placeholder="نام کاربری خود را وارد کنید" type="text">
                                                            <div style="font-size: 11px;"
                                                                v-if="Object.hasOwn(errors, 'userName')" class="text-danger">{{
                                                                errors.userName.shift() }}</div>
                                                        </div>
                                                        <div class="form-group">
                                                            <label>کلمه عبور</label>
                                                            <input class="form-control" v-model.lazy="formData.password"
                                                                placeholder="رمز عبور خود را وارد کنید" type="password">
                                                            <div style="font-size: 11px;"
                                                                v-if="Object.hasOwn(errors, 'password')" class="text-danger">{{
                                                                errors.password.shift() }}</div>
                                                        </div>
                                                        <div class="text-center" v-if="signInLoading">
                                                            <span class="spinner-border spinner-border-sm"></span>
                                                        </div>
                                                        <button type=" button" v-else @click="doLogin($event)"
                                                            class="btn btn-main-primary btn-block">ورود</button>
                                                    </form>
                                                    <div class="main-signin-footer mt-5">
                                                        <p><a href="forgot.html">رمز عبور را فراموش کرده اید؟</a></p>
                                                        <p>حساب کاربری ندارید؟<router-link :to="{name:'register'}"> ایجاد یک
                                                                حساب کاربری </router-link>
                                                        </p>
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
import { useRouter } from "vue-router";
import { useUserStore } from '../store/user'
import { useHead } from '@vueuse/head'
useHead({
    // Can be static or computed
    title: computed(() => 'صفحه ورود'),
})
const userStore = useUserStore()
const router = useRouter()
const toast = useToast();
let signInLoading = ref(false)
let loading = ref(false)
let formData = reactive({
    userName: '2669929826',
    password: '555',
})
let loginPageInfo = reactive({ imagePath :'',title:'', description:''});
let errors = {}

async function doLogin(e) {
    signInLoading.value = true;
    errors = {}
    try {
        const response = await Auth.login(formData);
        if (response.data.result == 0 ) {
            userStore.setUser(response.data.data);
            router.push({ name: 'dashboard' })
        } else if (response.data.result == 5) {
            toast.warning(response.data.message, {
                timeout: 2000
            });
        } else  {
            toast.warning(response.data.message, {
                timeout: 2000
            });
        }
    } catch (err) {
        
        // if (err.response.status == 400) {
        //     errors = err.response.errors
        // } else {
        //     toast.error(err.response.data.message, {
        //         timeout: 2000
        //     });
        // }
    } finally {
        signInLoading.value = false
    }
}
async function getLoginPageInfo() {
    loading.value = true;
    errors = {}
    try {
        const response = await Auth.getInfoForLoginPage();
        if (response.data.result == 0 ) {
            loginPageInfo = response.data.data;
            console.log(loginPageInfo)
        } else if (response.data.result == 5) {
            toast.warning(response.data.message, {
                timeout: 2000
            });
        } else  {
            toast.warning(response.data.message, {
                timeout: 2000
            });
        }
    } catch (err) {
    } finally {
        loading.value = false
    }
}
getLoginPageInfo()
</script>