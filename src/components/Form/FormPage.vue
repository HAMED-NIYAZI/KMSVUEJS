<template>    <div class="breadcrumb-header justify-content-between">
  <div class="my-auto" >
    <div class="d-flex">
      <h4 class="content-title mb-0 my-auto">
        <router-link :to="{ name: 'formpage' }" class="content-title mb-0 my-auto" style="margin-right: 12px;">فرمها   </router-link>
      </h4>
    </div>
  </div>
</div>

  <div class="col-xl-12 col-12">
    <div class="card">
      <div class="card-header pb-0">
        <div class="d-flex justify-content-between">
          <h4 class="card-title mg-b-0">لیست فرمها</h4>
          <div class="d-flex">
          <router-link
          :to="{
            name: 'formcreate'          }"
          class="btn btn-success btn-icon mr-2"
          title="ایجاد فرم جدید"
        >
        <i class="fa fa-plus"></i>
        </router-link>
          
          <button
            type="button"
            class="btn btn-success btn-icon mr-2"          title=" رفرش گرید  "

            @click="RefreshGridForm"
          >
            <i class="mdi mdi-refresh"></i>
          </button>



          </div>


        </div>
      </div>
      <div class="card-body">
        <div class="text-center" v-if="loading">
          <Spinner_Gride />
        </div>
        <div class="table-responsive table-scrollable" v-else>
            <table
            class="table table-striped mg-b-0   table-hover "
            v-if="forms.length"
          >
            <thead>
              <tr>
                <th>ردیف</th>
                <th>عنوان</th>
                <th>توضیحات</th>
                <th>نوع فرم</th>
                <th>اولویت نمایش</th>
                <th>عملیات</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(form, index) in forms" :key="form.id">
                <th scope="row">{{ 1 + index }}</th>
                <td>{{ form.name }}</td>
                <td>{{ form.description.substring(0, 50) }}</td>
                <td>{{  getFormName(form.formType)
                
                }}</td>
                <td>
                  <span class="badge bg-info" title="ترتیب نمایش" >{{ form.sortingNumber }}</span>
                </td>
                <td>
                  <a href="#" @click.prevent="DeleteForm(form.id)" title="حذف فرم"
                    ><i class="fa fa-trash text-danger mr-10"></i
                  ></a>
                  <!-- <router-link :to="{ name: 'grades.edit', params: { id: grade.id } }" class="ms-2"><i
                                            class="fa fa-pen text-warning"></i></router-link> -->
                  <a href="#" @click="EditForm(form.id)" class="ms-2 mr-10" title="ویرایش فرم"
                    ><i class="fa fa-pen text-warning"></i
                  ></a>


                               <router-link :to="{ name: '', params: { id: form.id } }" class="btn btn-success btn-sm ms-2">
                              اضافه کردن فیلد های خاص  
                              </router-link>  

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
import FormService from "@/services/FormService"

 import { ref } from 'vue'
import { useToast } from "vue-toastification";
import Swal from 'sweetalert2'
import Spinner_Gride from '@/components/Spinners/Spinner_Gride.vue'
const toast = useToast();
let loading = ref(false)
 let forms = ref([]);
 
const emit = defineEmits(['EditGrade']); // Define emit
  

async function index() {
    loading.value = true;
     try {
        const response = await FormService.getAll();
        if (response.data.result == 0) {
          forms.value =  response.data.data;
         } else if (response.data.result == 5) {
            toast.warning(response.data.message, {
                timeout: 2000
            });
        }
    } catch (err) {

    } finally {
        loading.value = false
    }
}
async function DeleteForm(id) {
    Swal.fire({
        title: "آیا مایل به حذف کردن هستید؟",
        text: "آیتم حذف شده قابل بازیابی نمی باشد",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "بله، حذف کن!",
        cancelButtonText: "انصراف"
    }).then(async (result) => {
        if (result.isConfirmed) {
             try {
                const response = await FormService.delete(id);
                if (response.data.result == 0) {
                    toast.success(response.data.message);
                    index()
                } else if (response.data.result == 5) {
                    toast.warning(response.data.message, {
                        timeout: 2000
                    });
                } else {
                    toast.warning(response.data.message, {
                        timeout: 2000
                    });
                }
            } catch (err) {

            } finally {
            }
        }
    });
}
function RefreshGridForm() {
    index();
}
function EditForm( id){
   //  emit('ReloadEditGrade'); // Use emit instead of this.$emit
var emitid=id
   emit('ReloadEditGrade', emitid);
}
 

function getFormName(formId){


  switch (formId) {
    case 1:
      return "فرم دانش"
      break;
      case 2:
      return "فرم مستند"
      break;
  
      case 3:
      return "فرم استفاده از دانش"
      break;
  
    default:
      return "نامشخص";
      break;
  }

}

index()
</script>
<!-- -----------------------------script ------------------------->


<style scoped>
.mr-2{
  margin-right: 5px;
  margin-left: 5px;
}
.mr-10{
  margin-right: 10px;
  margin-left: 10px;
}

.table-scrollable {
    max-height: 500px; /* Adjust based on your needs */
    overflow-y: auto;
    width: 100%; /* Adjust based on your needs */
    overflow-x: auto;
 }
</style>
