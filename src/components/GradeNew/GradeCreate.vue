<template>
    <div class="col-xl-12">
      <form @submit.prevent="createGrade">
        <div class="card">
          <div class="card-header pb-0">
            <div class="d-flex justify-content-between">
              <h4 class="card-title mg-b-0">ایجاد پایه تحصیلی</h4>
            </div>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-6">
                <div class="form-group">
                  <label>عنوان پایه تحصیلی</label>
                  <input class="form-control" v-model="formData.gradeName" placeholder="عنوان پایه تحصیلی را وارد کنید" type="text">
                  <div class="text-danger" v-if="v$.gradeName.required.$invalid">وارد کردن فیلد عنوان الزمی است</div>
                  <div class="text-danger" v-if="v$.gradeName.minLength.$invalid">طول فیلد نباید کمتر از 3 کاراکتر باشد</div>
                  <div class="text-danger" v-if="v$.gradeName.maxLength.$invalid">طول فیلد نیاید بیشتر از 5 کاراکتر باشد</div>
                </div>
              </div>
              <div class="col-6">
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
                  </select>
                  <div class="text-danger" v-if="v$.sortingNumber.required.$invalid">وارد کردن فیلد عنوان الزمی است</div>
                </div>
              </div>
            </div>
          </div>
          <div class="card-footer text-center">
            <div class="text-center" v-if="loading">
              <span class="spinner-border spinner-border-sm"></span>
            </div>
            <template v-else>
              <button type="submit" class="btn btn-primary">ثبت</button>
            </template>
          </div>
        </div>
      </form>
    </div>
  </template>
 <script setup>
 import { reactive, ref } from 'vue';
 import { useToast } from "vue-toastification";
 import { useVuelidate } from '@vuelidate/core';
 import GradeService from "@/services/GradeService";
 import { required, minLength, maxLength } from '@vuelidate/validators';
 
 const toast = useToast();
 let loading = ref(false);
 let formData = reactive({
   gradeName: '',
   sortingNumber: ''
 });
 
 const rules = {
   gradeName: {
     required,
     minLength: minLength(3),
     maxLength: maxLength(5)
   },
   sortingNumber: {
     required
   }
 };
 
 const v$ = useVuelidate(rules, formData);
 
 const emit = defineEmits(['updateGradeList']); // Define emit
 
 async function createGrade() {
   const isFormCorrect = await v$.value.$validate();
   if (!isFormCorrect) return;
 
   loading.value = true;
   try {
     const response = await GradeService.create(formData);
     if (response.data.result === 0) {
       formData = {};
       toast.success(response.data.message, { timeout: 2000 });
       emit('updateGradeList'); // Use emit instead of this.$emit
     } else {
       toast.warning(response.data.message, { timeout: 2000 });
     }
   } catch (err) {
       debugger;
     toast.error("An error occurred while creating the grade.", { timeout: 2000 });
   } finally {
       debugger;
 
     loading.value = false;
   }
 }
 </script>
 
  