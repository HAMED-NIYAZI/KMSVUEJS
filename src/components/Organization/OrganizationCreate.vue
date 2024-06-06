<!-- <template>
    
</template> -->
<template>
  <div class="breadcrumb-header justify-content-between">
    <div class="my-auto">
      <div class="d-flex">
        <h4 class="content-title mb-0 my-auto">
          <router-link :to="{ name: 'organization' }" class="content-title mb-0 my-auto">سازمان ها</router-link>
        </h4>
        <span class="text-muted mt-1 tx-13 ms-2 mb-0">
          <router-link :to="{ name: 'create_organization' }"> /&nbsp; اضافه کردن سازمان </router-link>
        </span>
      </div>
    </div>
  </div>
  <div class="col-xl-12">
    <form @submit.prevent="createOrganization">
      <div class="card">
        <div class="card-header pb-0">
          <div class="d-flex justify-content-between">
            <h4 class="card-title mg-b-0">اضافه کردن سازمان</h4>
            <router-link :to="{ name: 'organization' }" class=" btn btn-primary btn-icon"><i
                class="fa  fa-arrow-left"></i></router-link>
          </div>
        </div>
        <div class="card-body">
          <div class="row">

            <div class="col-lg-8">
              <div class="form-group">
                <label>نام سازمان</label>
                <input class="form-control" v-model="formData.persianTitle" placeholder="نام سازمان را وارد کنید"
                  type="text" />
                <div class="text-danger" v-if="v$.persianTitle.required.$invalid">
                  وارد کردن فیلد نام سازمان الزمی است
                </div>
                <div class="text-danger" v-if="v$.persianTitle.minLength.$invalid">
                  طول فیلد نباید کمتر از 1 کاراکتر باشد
                </div>
                <div class="text-danger" v-if="v$.persianTitle.maxLength.$invalid">
                  طول فیلد نیاید بیشتر از 50 کاراکتر باشد
                </div>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="form-group">
                <label>اولویت نمایش</label>
                <select class="form-control" v-model="formData.sortingNumber">
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
                  <option value="11">11</option>
                  <option value="12">12</option>
                  <option value="13">13</option>
                  <option value="14">14</option>
                  <option value="15">15</option>
                  <option value="16">16</option>
                  <option value="17">17</option>
                  <option value="18">18</option>
                  <option value="19">19</option>
                  <option value="20">20</option>
                </select>

              </div>
            </div>

            <div class="col-lg-12">

              <label>نام سرشاخه</label>
              <div class="row">
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
          </div>
        </div>
        <div class="card-footer text-center">
          <Spinner_btn v-if="loading" />
          <template v-else>
            <button type="submit" class="btn btn-success">ذخیره</button>
          </template>
        </div>
      </div>
    </form>
  </div>
</template>
<script setup>
import { reactive, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { LocalStorageService } from "@/services/LocalStorageService";
const useLocalStorageService = LocalStorageService()
import OrganizationService from "@/services/OrganizationService";
import { useToast } from "vue-toastification";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength, maxLength } from "@vuelidate/validators";
import OrganizationTreeModalSingleSelect from './OrganizationTreeModalSingleSelect.vue'
import Spinner_btn from "../Spinners/Spinner_btn.vue";

let tree_name = ref('OrganizationViewList');
const router = useRouter();
const toastService = useToast();
let loading = ref(false);
let formData = reactive({
  persianTitle: '',
  parentId: null,
  sortingNumber: "",
});

const rules = {
  persianTitle: {
    required,
    minLength: minLength(1),
    maxLength: maxLength(50),
  },

};

const v$ = useVuelidate(rules, formData);

const emit = defineEmits(["updateOrganizationTree"]); // Define emit

async function createOrganization() {
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) return;

  loading.value = true;
  try {
    if (formData.persianTitle == undefined) {
      toastService.error("فیلد نام سازمان الزامی می باشد", {
        timeout: 2000,
      });
      return;
    }

    formData.parentId = useLocalStorageService.getTreeSelectedItem('OrganizationViewList_ModalCreate')?.id || null;
    const response = await OrganizationService.create(formData);
    if (response.data.result === 0) {
      formData = {
        persianTitle: '',
        parentId: null,
        sortingNumber: "",
      };
      toastService.success(response.data.message, { timeout: 2000 });
      emit('updateOrganizationTree');
      useLocalStorageService.setTreeSelectedItem('OrganizationViewList_ModalCreate', '')
      router.push({ name: 'organization' });
    } else {
      toastService.warning(response.data.message, { timeout: 2000 });
    }
  } catch (err) {
    debugger;
    toastService.error(err.message, { timeout: 2000 });
  } finally {
    debugger;

    loading.value = false;
  }
}

onMounted(() => {

  useLocalStorageService.setTreeSelectedItem(tree_name.value, null)
})
</script>

<style scoped></style>