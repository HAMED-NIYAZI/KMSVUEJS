<template>
  <div class="breadcrumb-header justify-content-between">
    <div class="my-auto">
      <div class="d-flex">
        <h4 class="content-title mb-0 my-auto">
          <router-link :to="{ name: 'dashboard' }" class="content-title mb-0 my-auto">داشبورد</router-link>
        </h4>
        <span class="text-muted mt-1 tx-13 ms-2 mb-0">
          <router-link :to="{ name: 'profile' }"> /&nbsp; پروفایل</router-link>
        </span>
      </div>
    </div>
  </div>
  <div class="row row-sm">
    <div class="col-lg-4">
      <div class="card mg-b-20">
        <div class="card-body">
          <div class="pl-0">
            <div class="main-profile-overview">
              <div class="main-img-user profile-user">
                <img :alt="localStorageService.getUser.firstName +
            ' ' +
            localStorageService.getUser.lastName
            " :src="avatarPath" />
                <a class="fas fa-camera profile-edit curser-hand" title=" آپلود تصویر جدید"
                  @click.prevent="selectAvatar($event)">
                </a>
                <input type="file" ref="avatar" @change="loadAvatar($event)" id="avatar" class="d-none" />
              </div>
              <div class="d-flex justify-content-between mg-b-20">
                <div>
                  <h5 class="main-profile-name">
                    {{
            localStorageService.getUser.firstName +
            " " +
            localStorageService.getUser.lastName
          }}
                  </h5>
                </div>
              </div>
              <h6>بیوگرافی</h6>
              <div class="main-profile-bio">
                <p>
                  {{ localStorageService.getUser.about }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-8">
      <div class="card">
        <div class="card-body">
          <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
              <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button"
                role="tab" aria-controls="home" aria-selected="true">
                مشخصات
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button"
                role="tab" aria-controls="profile" aria-selected="false">
                کلمه عبور
              </button>
            </li>
          </ul>
          <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
              <div class="card">
                <div class="card-body">
                  <div class="mb-4 main-content-label">اطلاعات شخصی</div>
                  <form class="form-horizontal">
                    <div class="form-group">
                      <div class="row">
                        <div class="col-md-3">
                          <label class="form-label">نام</label>
                        </div>
                        <div class="col-md-9">
                          <input type="text" v-model.lazy="formData.firstName" class="form-control"
                            placeholder="نام کوچک" />
                        </div>
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="row">
                        <div class="col-md-3">
                          <label class="form-label">نام خانوادگی</label>
                        </div>
                        <div class="col-md-9">
                          <input type="text" v-model.lazy="formData.lastName" class="form-control"
                            placeholder="نام خانوادگی" />
                        </div>
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="row">
                        <div class="col-md-3">
                          <label class="form-label">شماره موبایل</label>
                        </div>
                        <div class="col-md-9">
                          <input class="form-control" v-model.lazy="formData.phone"
                            placeholder="شماره موبایل خود را وارد کنید" type="text" />
                        </div>
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="row">
                        <div class="col-md-3">
                          <label class="form-label">آدرس ایمیل</label>
                        </div>
                        <div class="col-md-9">
                          <input class="form-control" v-model.lazy="formData.email"
                            placeholder="آدرس ایمیل خود را وارد کنید" type="text" />
                        </div>
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="row">
                        <div class="col-md-3">
                          <label class="form-label">نشانی</label>
                        </div>
                        <div class="col-md-9">
                          <textarea class="form-control" style="resize: none" v-model.lazy="formData.address" rows="4"
                            placeholder="نشانی"></textarea>
                        </div>
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="row">
                        <div class="col-md-3">
                          <label class="form-label">درباره من </label>
                        </div>
                        <div class="col-md-9">
                          <textarea class="form-control" style="resize: none" v-model.lazy="formData.about" rows="8"
                            placeholder=""></textarea>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div class="card-footer text-center">
                  <Spinner_btn v-if="loading" />

									<button type="submit" v-else @click.prevent="updateProfile"
										class="btn btn-main-primary">
										بروزرسانی پروفایل
									</button>
								</div>
							</div>
						</div>
						<div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
							<div class="card">
								<div class="card-body">
									<form class="form-horizontal">
										<div class="form-group">
											<div class="row">
												<div class="col-md-3">
													<label class="form-label">کلمه عبور جاری</label>
												</div>
												<div class="col-md-9">
													<input class="form-control"
														v-model.lazy="formPasswordData.oldPassword"
														placeholder="کلمه عبور خود را وارد کنید" type="password" />
												</div>
											</div>
										</div>
										<div class="form-group">
											<div class="row">
												<div class="col-md-3">
													<label class="form-label">کلمه عبور جدید</label>
												</div>
												<div class="col-md-9">
													<input class="form-control"
														v-model.lazy="formPasswordData.newPassword"
														placeholder="کلمه عبور جدید خود را وارد کنید" type="password" />
												</div>
											</div>
										</div>
										<div class="form-group">
											<div class="row">
												<div class="col-md-3">
													<label class="form-label">تکرار کلمه عبور جدید</label>
												</div>
												<div class="col-md-9">
													<input class="form-control"
														v-model.lazy="formPasswordData.confirmPassword"
														placeholder="تکرار کلمه عبور جدید خود را وارد کنید"
														type="password" />
												</div>
											</div>
										</div>
									</form>
								</div>
								<div class="card-footer text-center">

									<Spinner_btn v-if="loading" />

									<button type="submit" v-else @click.prevent="updatePassword"
										class="btn btn-main-primary">
										بروزرسانی کلمه عبور
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup>
import { LocalStorageService } from "@/services/LocalStorageService";
const localStorageService = LocalStorageService();
import UserService from "@/services/UserService";
import { reactive, ref ,computed} from "vue";
import { useToast } from "vue-toastification";
import Spinner_btn from "../Spinners/Spinner_btn.vue";
const toast = useToast();
let loading = ref(false);
let formPasswordData = reactive({
	id: localStorageService.getUser.userId,
	oldPassword: "",
	newPassword: "",
	confirmPassword: "",
});
let formData = reactive({
	id: localStorageService.getUser.userId,
	firstName: localStorageService.getUser.firstName,
	lastName: localStorageService.getUser.lastName,
	phone: localStorageService.getUser.phone,
	email: localStorageService.getUser.email,
	address: localStorageService.getUser.address,
	about: localStorageService.getUser.about,
});

async function updateProfile() {
	loading.value = true;
	try {
		const response = await UserService.updateProfile(formData);
		if (response.data.result == 0) {
			localStorageService.setUser(response.data.data);

			toast.success(response.data.message, { timeout: 2000 });
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
	} finally {
		loading.value = false;
	}
}
async function updatePassword() {
	loading.value = true;
	errors = {};
	try {
		const response = await UserService.updatePassword(formPasswordData);
		if (response.data.result == 0) {
			toast.success(response.data.message, {
				timeout: 20000,
			});
			formPasswordData = {};
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
	} finally {
		loading.value = false;
	}
}

function selectAvatar(e) {
	$("#avatar").click();
}
let avatar = ref(null);
async function loadAvatar(e) {
	const target = e.target;
	if (target && target.files) {
		avatar.value = target.files[0];
	}
	if (!avatar.value) {
		return false;
	}
	let fd = new FormData();
	fd.append("file", avatar.value);
	try {
		const response = await UserService.uploadAvatar(
			fd,
			localStorageService.getUser.userId
		);
		if (response.data.result == 0) {
			toast.success(response.data.message, {
				timeout: 2000,
			});
			console.log(response.data);
			localStorageService.setUser(response.data.data)
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
	} finally {
	}
}

let avatarPath = computed(() => process.env.VUE_APP_BASE_URL + localStorageService.getUser.imagePath);

</script>

<style scoped>
.curser-hand {
	cursor: pointer;
}
</style>