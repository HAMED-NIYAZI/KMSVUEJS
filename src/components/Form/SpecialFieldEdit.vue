<template>
  <div
    class="my-auto"
    style="
      margin-top: 20px !important;
      margin-bottom: 20px !important;
      margin-right: 15px !important;
    "
  >
    <div class="d-flex">
      <h4 class="content-title mb-0 my-auto">
        <router-link
          :to="{ name: 'formpage' }"
          class="content-title mb-0 my-auto"
          >فرمها
        </router-link>
      </h4>
      <span class="text-muted mt-1 tx-13 ms-2 mb-0">
        <router-link :to="{ name: 'specialfieldcreate' }">
          /&nbsp; ویرایش فیلد خاص
        </router-link>
      </span>
    </div>
  </div>

  <div class="col-lg-12 col-xl-12 col-md-12 col-sm-12">
    <div class="card box-shadow-0">
      <div class="card-header d-flex justify-content-between">
        <h4 class="card-title mb-1">ویرایش فیلد خاص</h4>
        <router-link
          :to="{ name: 'specialfieldpage', params: { id: formData.formId } }"
          class="btn btn-primary btn-icon"
        >
          <i class="fa fa-arrow-left"></i>
        </router-link>
      </div>
      <div class="card-body pt-0">
        <form @submit.prevent="updateSpecialField">
          <div class="row">
            <div class="col-lg-4 col-12">
              <div class="form-group">
                <label for="exampleInputEmail1">نام فیلد </label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                  v-model="formData.name"
                  placeholder="نام فیلد را وارد کنید"
                />
              </div>
            </div>

            <div class="col-lg-4 col-12">
              <p class="mg-b-10">نوع فیلد</p>
              <select
                class="form-control select2-no-search"
                v-model="formData.dataTypeId"
                disabled
              >
                <option
                  label="نوع فیلد را انتخاب کنید"
                  value="0"
                  style="color: red"
                ></option>

                <option value="1">رشته کوتاه</option>
                <option value="2">رشته طولانی</option>
                <option value="3">تاریخ</option>
                <option value="4">عددی</option>
                <option value="5">بله خیر با رادیو باتن</option>
                <option value="6">
                  مثل سوال چهار جوابی --- رادیو باتن 4 گزینه ای که یکی باید
                  انتخاب شود
                </option>
                <option value="7">چک باکس تکی</option>
                <option value="8">
                  چک باکس چند گزینه ای که هرکدام لازم بود را باید انتخاب کند
                </option>
                <option value="9">دراپ داون با دیتای ثابت</option>
                <option value="10">دراپ داون با دیتای دینامیک</option>
              </select>
            </div>

            <div class="col-lg-4 col-12">
              <div class="form-group">
                <label>اولویت نمایش</label>
                <input
                  class="form-control"
                  type="number"
                  title="ترتیب نمایش را وارد نمایید"
                  v-model="formData.sortingNumber"
                />
              </div>
            </div>

            <div class="col-lg-4 col-12">
              <div class="form-group">
                <label> حداقل کاراکتر</label>
                <input
                  class="form-control"
                  type="number"
                  title=" حداقل کاراکتر را وارد نمایید"
                  v-model="formData.minLength"
                  :disabled="!(formData.dataTypeId === 1 || formData.dataTypeId === 2)"
          />
              </div>
            </div>

            <div class="col-lg-4 col-12">
              <div class="form-group">
                <label> اجباری باشد؟</label>
                <input
                  class="form-check-input"
                  type="checkbox"
                  v-model="formData.isMandatory"
                />
              </div>
            </div>

            <div class="col-12">
              <div class="form-group">
                <label for="exampleInputPassword1">توضیحات</label>
                <textarea
                  v-model="formData.description"
                  type="text"
                  class="form-control"
                  id="exampleInputPassword1"
                  placeholder="توضیحات را وارد کنید"
                  rows="8"
                ></textarea>
              </div>
            </div>
          </div>

          <div class="card-footer text-center">
            <Spinner_btn v-if="loading" />
            <template v-else>
              <button type="submit" class="btn btn-primary mt-3 mb-0">
                ذخیره
              </button>
            </template>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
    
    
    
    <!-------------------------- script ------------------------->
    <script setup>
import { reactive, ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import FormService from "@/services/FormService";
import { useToast } from "vue-toastification";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength, maxLength } from "@vuelidate/validators";
import Spinner_btn from "@/components/Spinners/Spinner_btn.vue";

const router = useRouter();
const route = useRoute();

const toastService = useToast();
let loading = ref(false);
let loadingPage = ref(false);
let loadingUpdate = ref(false);

let formData = reactive({
  id: null,
  name: "",
  description: "",
  fromName: "",
  minLength: 0,
  sortingNumber: 0,
  isMandatory: false,
  formId: route.params.id,
  dataTypeId: 0,
  dataTypeName: null,
});

const rules = {
  name: {
    required,
  },
  dataTypeId: {
    required,
  },
};

const v$ = useVuelidate(rules, formData);

async function updateSpecialField() {
  loadingUpdate.value = true;
  try {
    if (formData.name == undefined) {
      toastService.error("فیلد نام فیلد خاص الزامی می باشد", {
        timeout: 2000,
      });
      return;
    }

    const response = await FormService.updateSpecialField(formData);
    if (response.data.result === 0) {
      toastService.success(response.data.message, { timeout: 2000 });
      router.push({
        name: "specialfieldedit",
        params: { id: route.params.id },
      }); //TODO got to add special page for a form
    } else {
      toastService.warning(response.data.message, { timeout: 2000 });
    }
  } catch (err) {
    toastService.error(err.message, { timeout: 2000 });
  } finally {
    loadingUpdate.value = false;
  }
}

onMounted(async () => {
  loadingPage.value = true;
  try {
    const response = await FormService.getSpecialField(route.params.id);
    formData.description = response.data.data.description;
    formData.name = response.data.data.name;
    formData.formType = response.data.data.formType;
    formData.id = response.data.data.id;
    formData.dataTypeName = response.data.data.dataTypeName;
    formData.dataTypeId = response.data.data.dataTypeId;
    formData.formId = response.data.data.formId;
    formData.fromName = response.data.data.fromName;
    formData.minLength = response.data.data.minLength;
    formData.isMandatory = response.data.data.isMandatory;
  } catch (err) {
    toastService.error(err.message, { timeout: 2000 });
  } finally {
    loadingPage.value = false;
  }
});

async function disabledMinLength() {
    // alert(formData.dataTypeId );
    // if (this.formData.dataTypeId === 0) return true;

    // if (this.formData.dataTypeId === 1 )  return true;
 return true;
}
</script>
    <!-------------------------- script ------------------------->
    
    
    
    
    <style scoped>
</style>