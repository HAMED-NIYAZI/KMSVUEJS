<template>
	<div class="row no-gutter">
		<div class="col-md-5 col-lg-5 col-xl-5 d-none d-md-flex bg-primary-transparent">
			<div class="row wd-100p mr-center text-center">
				<div class="col-md-12 col-lg-12 col-xl-12 my-auto mr-center wd-100p">
					<img src="assets/img/media/login.png" class="my-auto ht-xl-80p wd-md-100p wd-xl-80p mr-center"
						alt="logo" />
				</div>
			</div>
		</div>
		<div class="col-md-7 col-lg-7 col-xl-7 bg-white">
			<div class="login d-flex align-items-center py-2">
				<div class="container p-0">
					<div class="row">
						<div class="col-md-10 col-lg-10 col-xl-9 mr-center">
							<div class="card-sigin">
								<div class="card-sigin">
									<div class="card-sigin d-flex mb-5">
										<h1 class="main-logo1 ms-1 me-0 my-auto tx-28 ps-1"
											style="margin-top: 20px !important">
											درخواست عضویت
										</h1>
									</div>
									<div class="card-sigin">
										<div class="main-signup-header">
											<form class="row" action="#">
												<div class="form-group col-lg-6">
													<label>نام</label>
													<input class="form-control" v-model.lazy="formData.firstName"
														placeholder="نام خود را وارد کنید" type="text" />
													<div style="font-size: 11px"
														v-if="Object.hasOwn(errors, 'firstName')" class="text-danger">
														{{ errors.firstName.shift() }}
													</div>
												</div>
												<div class="form-group col-lg-6">
													<label>نام خانوادگی</label>
													<input class="form-control" v-model.lazy="formData.lastName"
														placeholder="نام خانوادگی خود را وارد کنید" type="text" />
													<div style="font-size: 11px"
														v-if="Object.hasOwn(errors, 'lastName')" class="text-danger">
														{{ errors.lastName.shift() }}
													</div>
												</div>
												<div class="form-group col-lg-6">
													<label>شماره موبایل</label>
													<input class="form-control" v-model.lazy="formData.phone"
														placeholder="شماره موبایل خود را وارد کنید" type="text" />
													<div style="font-size: 11px" v-if="Object.hasOwn(errors, 'phone')"
														class="text-danger">
														{{ errors.phone.shift() }}
													</div>
												</div>
												<div class="form-group col-lg-6">
													<label>آدرس ایمیل</label>
													<input class="form-control" v-model.lazy="formData.email"
														placeholder="آدرس ایمیل خود را وارد کنید" type="text" />
													<div style="font-size: 11px" v-if="Object.hasOwn(errors, 'email')"
														class="text-danger">
														{{ errors.email.shift() }}
													</div>
												</div>
												<div class="form-group col-lg-6">
													<label>کد ملی</label>
													<input class="form-control" v-model.lazy="formData.codeMeli"
														placeholder="کد ملی خود را وارد کنید" type="text" />
													<div style="font-size: 11px"
														v-if="Object.hasOwn(errors, 'codeMeli')" class="text-danger">
														{{ errors.codeMeli.shift() }}
													</div>
												</div>
												<div class="form-group col-lg-6">
													<label>شماره پرسنلی</label>
													<input class="form-control" v-model.lazy="formData.personnelNumber"
														placeholder="شماره پرسنلی خود را وارد کنید" type="text" />
													<div style="font-size: 11px"
														v-if="Object.hasOwn(errors, 'personnelNumber')"
														class="text-danger">
														{{ errors.personnelNumber.shift() }}
													</div>
												</div>
												<div class="form-group col-lg-6">
													<label>سازمان</label>
													<div class="row" style="margin-top: -5px;">
														<div class="col-10">
															<input class="form-control" disabled="true"
																:value="useLocalStorageService.getTreeSelectedItem('OrganizationViewList_ModalCreate') != null ? useLocalStorageService.getTreeSelectedItem('OrganizationViewList_ModalCreate').persianTitle : ''"
																type="text" />
														</div>

														<div class="col-2">
															<OrganizationTreeModalSingleSelect />
														</div>
													</div>
												</div>
												<div class="form-group col-lg-6">
													<label>چارت سازمانی</label>
													<div class="row" style="margin-top: -5px;">
														<div class="col-10">
															<input class="form-control" disabled="true"
																:value="useLocalStorageService.getTreeSelectedItem('OrganizationChartViewList') != null ? useLocalStorageService.getTreeSelectedItem('OrganizationChartViewList').persianTitle : ''"
																type="text" />
														</div>

														<div class="col-2">
															<ChartTreeModalSingleSelect
																:key="useLocalStorageService.getTreeSelectedItem('OrganizationViewList_ModalCreate').id"
																:id="useLocalStorageService.getTreeSelectedItem('OrganizationViewList_ModalCreate').id" />
														</div>
													</div>
												</div>


												<div class="form-group col-lg-6">
													<label>کلمه عبور</label>
													<input class="form-control" v-model.lazy="formData.password"
														placeholder="رمز عبور خود را وارد کنید" type="password" />
													<div style="font-size: 11px"
														v-if="Object.hasOwn(errors, 'password')" class="text-danger">
														{{ errors.password.shift() }}
													</div>
												</div>
												<div class="form-group col-lg-6">
													<label>تکرار کلمه عبور</label>
													<input class="form-control" v-model.lazy="formData.confirmPassword"
														placeholder="تکرار رمز عبور خود را وارد کنید"
														type="confirmPassword" />
													<div style="font-size: 11px"
														v-if="Object.hasOwn(errors, 'confirmPassword')"
														class="text-danger">
														{{ errors.password.shift() }}
													</div>
												</div>

												<div class="form-group col-lg-6" style="margin-top: 40px;">
													<Spinner_btn v-if="loading" />
													<button type="button" v-else @click="doRegister($event)"
														class="btn btn-main-primary btn-block">
														ثبت درخواست
													</button>
												</div>

												<div class="form-group col-lg-6" style="margin-top: 40px;">
													<router-link class="btn btn-main-primary btn-block"
														:to="{ name: 'login' }">
														بازگشت به صفحه لاگین
													</router-link>
												</div>
											</form>
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
import { reactive, ref } from "vue";
import AuthService from "../../services/AuthService";
import { useToast } from "vue-toastification";
import Spinner_btn from '@/components/Spinners/Spinner_btn.vue'
import OrganizationTreeModalSingleSelect from '../Organization/OrganizationTreeModalSingleSelect.vue'
import ChartTreeModalSingleSelect from '@/components/Chart/ChartTreeModalSingleSelect.vue'
import { LocalStorageService } from "@/services/LocalStorageService";
const useLocalStorageService = LocalStorageService()

const toast = useToast();
let loading = ref(false);
let formData = reactive({
	firstName: "",
	lastName: "",
	password: "",
	confirmPassword: "",
	phone: "",
	email: "",
	codeMeli: "",
	personnelNumber: "",
	chartId: "",
	organizationId: "",
});
let errors = {};

async function doRegister(e) {
	formData.organizationId = useLocalStorageService.getTreeSelectedItem('OrganizationViewList_ModalCreate').id;
	formData.chartId = useLocalStorageService.getTreeSelectedItem('OrganizationChartViewList').id;
	console.log(formData)
	loading.value = true;
	errors = {};
	try {
		const response = await AuthService.register(formData);
		if (response.data.result == 0) {
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
		if (err.response.status == 422) {
			errors = err.response.data.errors;
		} else {
			toast.error(err.response.data.message, {
				timeout: 2000,
			});
		}
	} finally {
		loading.value = false;
	}
}
</script>