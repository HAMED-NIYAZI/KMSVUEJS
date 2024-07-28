<template>
  <div class="breadcrumb-header justify-content-between">
    <div class="my-auto"  style="
      margin-top: 20px !important;
      margin-bottom: 20px !important;
      margin-right: 15px !important;
    ">
      <div class="d-flex">
      <h4 class="content-title mb-0 my-auto">
        <router-link
           :to="{ name: 'specialfieldpage', params: { id: route.params.id } }"

          class="content-title mb-0 my-auto"
          >فیلد های خاص فرم
        </router-link> 
      </h4>
      
    </div>
    </div>
  </div>

  <div class="col-xl-12 col-12">
    <div class="card">
      <div class="card-header pb-0">
        <div class="d-flex justify-content-between">
          <h4 class="card-title mg-b-0"> لیست فیلد های خاص فرم {{  }}</h4>
          <div class="d-flex">
            <router-link
              :to="{
                name: 'specialfieldcreate',
              }"
              class="btn btn-success btn-icon mr-2"
              title="ایجاد فیلد جدید"
            >
              <i class="fa fa-plus"></i>
            </router-link>

            <button
              type="button"
              class="btn btn-success btn-icon mr-2"
              title=" رفرش گرید  "
              @click="RefreshGrid"
            >
              <i class="mdi mdi-refresh"></i>
            </button>

            <router-link
            :to="{ name: 'formpage' }"

          class="btn btn-primary btn-icon"
        >
          <i class="fa fa-arrow-left"></i>
        </router-link>

          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="text-center" v-if="loading">
          <Spinner_Gride />
        </div>
        <div class="table-responsive table-scrollable" v-else>
          <table
            class="table table-striped mg-b-0 table-hover"
            v-if="specialFields.length"
          >
            <thead>
              <tr>
                <th>ردیف</th>
                <th>عنوان</th>
                <th>توضیحات</th>
                <th>نوع فیلد</th>
                <th> حداقل طول به کاراکتر </th>
                <th>اجباری باشد</th>
                <th>   اولویت نمایش در فرم</th>
                <th>عملیات</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(field, index) in specialFields" :key="field.id">
                <th scope="row">{{ 1 + index }}</th>
                <td>{{ field.name }}</td>
                <td>{{ field.description.substring(0, 50) }}</td>
                <td>{{ getSpecialFieldType(field.dataTypeId) }}</td>
                <td>{{ field.minLength}}</td>
                <td>{{ getIsMandatory(field.isMandatory) }}</td>
                <td>
                  <span class="badge bg-info" title="ترتیب نمایش">{{
                    field.sortingNumber
                  }}</span>
                </td>
                <td>
                  <a
                    href="#"
                    @click.prevent="DeleteSpecialField(field.id)"
                    title="حذف فیلد خاص"
                    ><i class="fa fa-trash text-danger mr-10"></i
                  ></a>
                  <router-link
                    :to="{ name: 'specialfieldedit', params: { id: field.id } }"
                    class="ms-2"
                 ><i class="fa fa-pen text-warning"></i
                  ></router-link>
                  <!-- <a href="#" @click="EditForm(form.id)" class="ms-2 mr-10" title="ویرایش فرم"
                      ><i class="fa fa-pen text-warning"></i
                    ></a> -->
                  <!--   
  
                                 <router-link :to="{ name: 'specialfieldpage', params: { id: field.id } }" class="btn btn-success btn-sm ms-2">
                                اضافه کردن فیلد های خاص  
                                </router-link>   -->
                </td>
              </tr>
            </tbody>
          </table>
          <div class="alert alert-info" v-else>
            هیچ گونه دیتایی برای نمایش پیدا نشد
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  
  <!-- -----------------------------script ------------------------->
  <script setup>
import FormService from "@/services/FormService";
import { useRouter, useRoute } from "vue-router";

import { ref } from "vue";
import { useToast } from "vue-toastification";
import Swal from "sweetalert2";
import Spinner_Gride from "@/components/Spinners/Spinner_Gride.vue";
const toast = useToast();
const router = useRouter();
const route = useRoute();

let loading = ref(false);
let specialFields = ref([]);


async function index() {
  loading.value = true;
  try {
    const response = await FormService.getAllSpecialFildsOfForm(
      route.params.id
    );
    if (response.data.result == 0) {
      specialFields.value = response.data.data;
    } else if (response.data.result == 5) {
      toast.warning(response.data.message, {
        timeout: 2000,
      });
    }
  } catch (err) {
  } finally {
    loading.value = false;
  }
}
async function DeleteSpecialField(id) {
  Swal.fire({
    title: "آیا مایل به حذف کردن هستید؟",
    text: "آیتم حذف شده قابل بازیابی نمی باشد",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "بله، حذف کن!",
    cancelButtonText: "انصراف",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const response = await FormService.deleteSpecialFild(id); //todo
        if (response.data.result == 0) {
          toast.success(response.data.message);
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
      } catch (err) {
      } finally {
      }
    }
  });
}
function RefreshGrid() {
  index();
}


function getSpecialFieldType(dataTypeId) {
  switch (dataTypeId) {
    case 1:
      return "رشته کوتاه";
      break;
    case 2:
      return "رشته طولانی";
      break;
    case 3:
      return "تاریخ";
      break;
    case 4:
      return "عددی";
      break;
    case 5:
      return "بله خیر با رادیو باتن";
      break;
    case 6:
      return "مثل سوال چهار جوابی ---  رادیو باتن 4 گزینه ای که یکی باید انتخاب شود";
      break;
    case 7:
      return "چک باکس تکی";
      break;
    case 8:
      return "چک باکس چند گزینه ای که هرکدام لازم بود را باید انتخاب کند";
      break;
    case 9:
      return "دراپ داون با دیتای ثابت";
      break;
    case 10:
      return "دراپ داون با دیتای دینامیک";
      break;
    default:
      return "نامشخص";
      break;
  }
}
function getIsMandatory(isMandatory) {

  return isMandatory===true? 'بله' : 'خیر';
}

index();
</script>
  <!-- -----------------------------script ------------------------->
  
  
  <style scoped>
.mr-2 {
  margin-right: 5px;
  margin-left: 5px;
}
.mr-10 {
  margin-right: 15px;
  margin-left: 15px;
}

.table-scrollable {
  max-height: 500px; /* Adjust based on your needs */
  overflow-y: auto;
  width: 100%; /* Adjust based on your needs */
  overflow-x: auto;
}
</style>
  