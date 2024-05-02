<template>
    <div class="col-xl-12">
        <div class="card">
            <div class="card-header pb-0">
                <div class="d-flex justify-content-between">
                    <h4 class="card-title mg-b-0">لیست پایه تحصیلی</h4>
                    <button type="button" class="btn btn-success btn-icon" @click="RefreshGridGrade"><i
                            class="mdi mdi-refresh"></i></button>
                </div>
            </div>
            <div class="card-body">
                <div class="text-center" v-if="loading">
                    <span class="spinner-border spinner-border-sm"></span>
                </div>
                <div class="table-responsive" v-else>
                    <table class="table table-striped mg-b-0 text-md-nowrap table-hover" v-if="grades.length">
                        <thead>
                            <tr>
                                <th>ردیف</th>
                                <th>عنوان</th>
                                <th>اولویت نمایش</th>
                                <th>عملیات</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(grade, index) in grades" :key="grade.id">
                                <th scope="row">{{ 1 + index }}</th>
                                <td>{{ grade.gradeName }}</td>
                                <td><span class="badge bg-info">{{ grade.sortingNumber }}</span></td>
                                <td>
                                    <a href="#" @click.prevent="DeleteGrade(grade.id)"><i
                                            class="fa fa-trash text-danger mr-10" ></i></a>
                                    <!-- <router-link :to="{ name: 'grades.edit', params: { id: grade.id } }" class="ms-2"><i
                                            class="fa fa-pen text-warning"></i></router-link> -->
                                            <a href="#" @click="EditGrade" class="ms-2"><i
                                            class="fa fa-pen text-warning" ></i></a>

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
<script setup>
import GradeService from "@/services/GradeService"
import { ref } from 'vue'
import { useToast } from "vue-toastification";
import Swal from 'sweetalert2'
const toast = useToast();
let loading = ref(false)
let State = ref('CreateGrade')
let grades = ref([]);
let errors = {}

const emit = defineEmits(['EditGrade']); // Define emit
 

async function index() {
    loading.value = true;
    errors = {}
    try {
        const response = await GradeService.index();
        if (response.data.result == 0) {
            debugger;

            // Assuming response.data.data is an array of objects with a 'sorthingNumber' field
            const sortedData = response.data.data.sort((a, b) => a.sortingNumber - b.sortingNumber);

 
            // Assign the sorted data to grades.value
            grades.value = sortedData;

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
        loading.value = false
    }
}
async function DeleteGrade(id) {
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
            errors = {}
            try {
                const response = await GradeService.delete(id);
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
function RefreshGridGrade() {
    index();
}
function EditGrade(){
     emit('ReloadEditGrade'); // Use emit instead of this.$emit
}
 

index()
</script>

<style scoped>

.page {
    background: red;
}
.mr-10{
    margin-left: 10px;
}

</style>