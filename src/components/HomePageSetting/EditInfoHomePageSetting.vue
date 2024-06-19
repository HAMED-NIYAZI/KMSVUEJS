<!--  template   -->
<template>
  <div class="row">
    <div class="col-xl-12 col-md-12">
      <div class="card mg-b-20 mg-lg-b-0">
        <div class="card-body p-0">
          <div class="todo-widget-header  pb-2 pd-20">
            <h5 style="padding-top: 10px;padding-bottom: 10px;  display: flex;justify-content: center;align-items: center;  "> اطلاعات صفحه نخست    </h5>
            <form>

              <div class="form-group">
                <div class="row">
                  <div class="col-md-2">
                    <label class="form-label">عنوان </label>
                  </div>
                  <div class="col-md-10">
                    <input
                      type="text"
                      v-model.lazy="formData.title"
                      class="form-control"
                      placeholder="عنوان"
                     />
                  </div>
                </div>
              </div>

              <div class="form-group">
                <div class="row">
                  <div class="col-md-2">
                    <label class="form-label">توضیحات</label>
                  </div>
                  <div class="col-md-10">
                    <textarea
                      class="form-control"
                      v-model.lazy="formData.description"
                      name="example-textarea-input"
                      rows="10"
                      placeholder="توضیحات"
                    >
</textarea
                    >
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        <!--ذخیره-->
        <div class="card-footer">
          <Spinner_btn v-if="loading" />
          <a
          style="width: 120px;"
            class="btn btn-primary"
            href="#"
            data-placement="top"
            data-bs-toggle="tooltip"
            title="ذخیره"
            v-else
            @click.prevent="updateInfoHomePageSetting"
            data-bs-original-title="ذخیره"
            >ذخیره
          </a>

       </div>
      </div>
    </div>
    <!--ذخیره-->

  
  </div>
</template>
<!--  template   -->



<!--  script   -->
<script setup>
import {reactive, ref, onMounted, computed } from "vue";
import Spinner_Gride from "@/components/Spinners/Spinner_Gride.vue";
import Spinner_btn from "@/components/Spinners/Spinner_btn.vue";
import Spinner from "@/components/Spinners/Spinner.vue";

import HomePageSettingService from "@/services/HomePageSettingService";

import { LocalStorageService } from "@/services/LocalStorageService";
const useLocalStorageService = LocalStorageService();

import { useToast } from "vue-toastification";
const toast = useToast();

let loading = ref(false);

let formData = reactive({
	title: '' ,
	description: '',
});
 

async function index() {
  try {
    loading.value = true;
    const response = await HomePageSettingService.GetLoginPageSetting();
    if (response.data.result == 0) {
      formData.title=response.data.data.title;
      formData.description=response.data.data.description;
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

  async function updateInfoHomePageSetting(){
    const response = await HomePageSettingService.updateInfoHomePageSetting(formData);
    if (response.data.result == 0) {
      toast.success(response.data.message, {
        timeout: 2000,
      });
      index();

    } else if (response.data.result == 5) {
      toast.warning(response.data.message, {
        timeout: 2000,
      });
    } else {
      toast.warning(response.data.message, {
        timeout: 2000,
      });
    }
  }
onMounted(() => {
  index();
});

</script>
 <!--  script   -->

 

 <!--  style   -->
  <style scoped>
.card-footer {
  display: flex;
  justify-content: center; 
  align-items: center;  
}
</style>
<!--  style   -->