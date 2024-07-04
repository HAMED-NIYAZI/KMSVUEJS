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
        <router-link :to="{ name: 'formcreate' }">
          /&nbsp; اضافه کردن فرم جدید
        </router-link>
      </span>
    </div>
  </div>

  <div class="col-lg-12 col-xl-12 col-md-12 col-sm-12">
    <div class="card box-shadow-0">
      <div class="card-header d-flex justify-content-between">
 

        <h4 class="card-title mb-1">ایجاد فرم جدید</h4>
        <router-link :to="{ name: 'formpage' }" class=" btn btn-primary btn-icon">
                            <i class="fa fa-arrow-left"></i>
                        </router-link>
      </div>
      <div class="card-body pt-0">
        <form @submit.prevent="createForm">
          <div class="row">
            <div class="col-lg-4 col-12"> 
            <div class="form-group">
              <label for="exampleInputEmail1">نام فرم </label>
              <input
                type="text"
                class="form-control"
                id="exampleInputEmail1" v-model="formData.name" 
                placeholder="نام فرم را وارد کنید"
              />
            </div>
            </div>


            <div class="col-lg-4 col-12"> 
											<p class="mg-b-10">   نوع فرم</p><select class="form-control select2-no-search" v-model="formData.formType" >
											<option label="نوع فرم را انتخاب کنید" value="0" style="color:red;">
											</option>
											<option value="1">
												دانش
											</option>
											<option value="2">
												مستند
											</option>
											<option value="3">
												استفاده از دانش
											</option>
											 
										</select>
										</div>

                                        <div class="col-lg-4 col-12">
                <div class="form-group">
                  <label>اولویت نمایش</label>
                  <input class="form-control"  type="number" title="ترتیب نمایش را وارد نمایید" v-model="formData.sortingNumber"  />
        
                  
  
                </div>
              </div>

            <div class="col-12"> 

            <div class="form-group">
              <label for="exampleInputPassword1">توضیحات</label>
              <textarea v-model="formData.description"
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
              <button type="submit" class="btn btn-primary mt-3 mb-0">ذخیره</button>
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
  import { useRouter } from "vue-router";
  import FormService from "@/services/FormService";
  import { useToast } from "vue-toastification";
  import { useVuelidate } from "@vuelidate/core";
  import { required, minLength, maxLength } from "@vuelidate/validators";
   import Spinner_btn from "@/components/Spinners/Spinner_btn.vue";
  
  const router = useRouter();
  const toastService = useToast();
  let loading = ref(false);
  let formData = reactive({
    name: '',
    description: '',
    formType:0,
    sortingNumber: 0,
  });
  
  const rules = {
    name: {
      required,
      minLength: minLength(1),
      maxLength: maxLength(50),
    },
    formType:{
      required
    }
  
  };
  
  const v$ = useVuelidate(rules, formData);
  
  
  async function createForm() {
    console.log(formData);
    const isFormCorrect = await v$.value.$validate();
    if (!isFormCorrect) return;
  
    loading.value = true;
    try {

      if (formData.name == undefined) {
        toastService.error(" نام فیلد دانش الزامی می باشد", {
          timeout: 2000,
        });
        return;
      }


      const response = await FormService.create(formData);
      if (response.data.result === 0) {
        formData = {
          persianTitle: '',
          parentId: null,
          sortingNumber: "",
        };


        toastService.success(response.data.message, { timeout: 2000 });
        router.push({ name: 'formpage' });
      } else {
        toastService.warning(response.data.message, { timeout: 2000 });
      }
    } catch (err) {
      toastService.error(err.message, { timeout: 2000 });
    } finally {
      loading.value = false;
    }
  }
  
  onMounted(() => {
  })
</script>
<!-------------------------- script ------------------------->




<style scoped>
</style>