<template>
  <!-- <div class="text-center mt-5" v-if="loading">
    <span class="spinner-border spinner-border-sm"></span>
  </div> -->

  <!-- Loader -->
  <!-- <div id="global-loader"  v-if="loading">
			<img src="assets/img/loader.svg" class="loader-img" alt="Loader">
		</div> -->

  <Spinner v-if="loading" />
  <!-- /Loader -->

  <div class="row no-gutter" v-else>
    <!-- The image half -->
    <div
      class="col-md-6 col-lg-6 col-xl-7 d-none d-md-flex bg-primary-transparent"
    >
      <div class="row wd-100p mr-center text-center">
        <div class="col-md-12 col-lg-12 col-xl-12 my-auto mr-center wd-100p">
          <img
            src="assets/img/media/login.png"
            class="my-auto ht-xl-80p wd-md-100p wd-xl-80p mr-center"
            alt="logo"
          />
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
                    <a href="#"
                      ><img
                        :src="logoPath"
                        class="sign-favicon-a ht-90"
                        alt="logo"
                      />
                    </a>
                    <h1 class="main-logo1 ms-1 me-0 my-auto tx-20 ps-1 mt-44">
                      {{ loginPageInfo.title }}
                    </h1>
                  </div>
                  <div class="card-sigin">
                    <div class="main-signup-header">
                      <!-- <h5 class="fw-semibold mb-4">{{ loginPageInfo.description }}</h5> -->
                      <form action="#">
                        <div class="form-group">
                          <label>نام کاربری</label>
                          <input
                            class="form-control"
                            v-model.lazy="formData.userName"
                            placeholder="نام کاربری خود را وارد کنید"
                            type="text"
                          />
                          <div
                            style="font-size: 11px"
                            v-if="Object.hasOwn(errors, 'userName')"
                            class="text-danger"
                          >
                            {{ errors.userName.shift() }}
                          </div>
                        </div>
                        <div class="form-group">
                          <label>کلمه عبور</label>
                          <input
                            class="form-control"
                            v-model.lazy="formData.password"
                            placeholder="رمز عبور خود را وارد کنید"
                            type="password"
                          />
                          <div
                            style="font-size: 11px"
                            v-if="Object.hasOwn(errors, 'password')"
                            class="text-danger"
                          >
                            {{ errors.password.shift() }}
                          </div>
                        </div>

                        <Spinner_btn v-if="signInLoading" />

                        <button
                          type=" button"
                          v-else
                          @click="doLogin($event)"
                          class="btn btn-main-primary btn-block"
                        >
                          ورود
                        </button>
                      </form>
                      <div class="main-signin-footer mt-5">
                        <p>
                          <a href="forgot.html">رمز عبور را فراموش کرده اید؟</a>
                        </p>
                        <p>
                          حساب کاربری ندارید؟<router-link
                            :to="{ name: 'register' }"
                          >
                            ایجاد یک حساب کاربری
                          </router-link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- End -->
        </div>
      </div>
      <!-- End -->
    </div>
  </div>
</template>
<script setup>
import { reactive, ref, computed } from "vue";
import AuthService from "../../services/AuthService";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import { LocalStorageService } from "../../services/LocalStorageService";
import Spinner from "@/components/Spinners/Spinner.vue";
import Spinner_btn from "@/components/Spinners/Spinner_btn.vue";

const localStorageService = LocalStorageService();
const router = useRouter();
const toast = useToast();
let signInLoading = ref(false);
let loading = ref(false);
let formData = reactive({
  userName: "2669929826",
  password: "555",
});
let loginPageInfo = reactive({ imagePath: "", title: "", description: "" });
let errors = {};

async function doLogin(e) {
  signInLoading.value = true;
  errors = {};
  try {
    const response = await AuthService.login(formData);
    if (response.data.result == 0) {
      //success
      localStorageService.setUser(response.data.data.user);
      localStorageService.setToken(response.data.data.token);
      localStorageService.setExpiresAt(response.data.data.expires_at);
      router.push({ name: "dashboard" });
    } else if (response.data.result == 5) {
      // user not found
      toast.warning(response.data.message, {
        timeout: 3000,
      });
    } else if (response.data.result == 4) {
      // exeption error
      toast.error(response.data.message, {
        timeout: 3000,
      });
    } else {
      // other unhandled errors
      toast.error("خطای ناشناخته رخ داده است", {
        timeout: 3000,
      });
    }
  } catch (err) {
    console.log(err);

    if (err.code == "ERR_BAD_REQUEST") {
      if (
        err.response.status == 404 &&
        err.message == "Request failed with status code 404"
      ) {
        toast.error(err.response.data.message, {
          timeout: 4000,
        });
      }
    }
    //server is down
    if (err.code == "ERR_NETWORK") {
      toast.error("سرور در دسترس نیست", {
        timeout: 4000,
      });
      return;
    }

    //validation errors occurred
    if (
      err.response.data.status == 400 &&
      err.response.data.title == "One or more validation errors occurred."
    ) {
      var myerrors = err.response.data.errors;
      for (const key in myerrors) {
        if (myerrors.hasOwnProperty(key)) {
          myerrors[key].forEach((error) => {
            toast.error(error, {
              timeout: 4000,
            });
          });
        }
      }
    }
  } finally {
    signInLoading.value = false;
  }
}
async function getLoginPageInfo() {
  loading.value = true;
  errors = {};
  try {
    const response = await AuthService.getInfoForLoginPage();
    if (response.data.result == 0) {
      loginPageInfo = response.data.data;
    } else if (response.data.result == 5) {
      toast.warning(response.data.message, {
        timeout: 2000,
      });
    } else {
      toast.warning(response.data.message, {
        timeout: 2000,
      });
    }
  } catch (err) {
    console.log(err);
    if (err.message == "timeout of 60000ms exceeded") {
      toast.error("سرور در دسترس نیست", {
        timeout: 10000,
      });
    } else if (err.message == "Network Error") {
      toast.error("سرور در دسترس نیست", {
        timeout: 10000,
      });
    } else {
      toast.error("پاسخی از سرور دریافت نشد", {
        timeout: 10000,
      });
    }
  } finally {
    loading.value = false;
  }
}
getLoginPageInfo();

const logoPath = computed(
  () => process.env.VUE_APP_BASE_URL + loginPageInfo.imagePath
);
</script>





<style scoped>
.mt-44 {
  margin-top: 44px !important;
}
</style>