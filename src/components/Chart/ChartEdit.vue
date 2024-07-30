<template>
    <div class="breadcrumb-header justify-content-between">
        <div class="my-auto">
            <div class="d-flex">
                <h4 class="content-title mb-0 my-auto">
                    <router-link :to="{ name: 'charts_index' }" class="content-title mb-0 my-auto">چارتها</router-link>
                </h4>
                <span class="text-muted mt-1 tx-13 ms-2 mb-0">
                    ویرایش چارت
                </span>
            </div>
        </div>
    </div>
    <div class="col-xl-12">
        <Spinner_btn v-if="loading" />
        <form v-else @submit.prevent="updateChart">
            <div class="card">
                <div class="card-header pb-0">
                    <div class="d-flex justify-content-between">
                        <h4 class="card-title mg-b-0">ویرایش چارت</h4>
                        <router-link :to="{ name: 'charts_index' }" class=" btn btn-primary btn-icon">
                            <i class="fa fa-arrow-left"></i>
                        </router-link>
                    </div>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-lg-8">
                            <div class="form-group">
                                <label>نام چارت</label>
                                <input class="form-control" v-model="formData.persianTitle"
                                    placeholder="نام چارت را وارد کنید" type="text" />
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="form-group">
                                <label>اولویت نمایش</label>
                                <input type="text" class="form-control" v-model="formData.sortingNumber">
                            </div>
                        </div>

                        <div class="col-lg-6">
                            <label>نام سازمان</label>
                            <div class="row">
                                <div class="col-10">
                                    <input class="form-control" disabled="true" :value="useLocalStorageService.getTreeSelectedItem('OrganizationViewList_ModalCreate').persianTitle == null
                        ? formData.organizationPersianTitle
                        : useLocalStorageService.getTreeSelectedItem('OrganizationViewList_ModalCreate').persianTitle"
                                        type="text" />
                                </div> <!-- <div class="col-2">
                                    <OrganizationTreeModalSingleSelect />
                                </div>
                                -->
                            </div>
                        </div>
                        <div class="col-lg-6 mb-3">
                            <label>سرشاخه</label>
                            <div class="row">
                                <div class="col-10">
                                    <input class="form-control" disabled="true" :value="useLocalStorageService.getTreeSelectedItem('OrganizationChartViewList')?.persianTitle == null
                        ? formData.parentPersianTitle
                        : useLocalStorageService.getTreeSelectedItem('OrganizationChartViewList').persianTitle"
                                        type="text" />
                                </div>
                                <div class="col-2">
                                    <button class="btn btn-danger btn-sm" @click.prevent="remvoeParent">حذف</button>
                                    <ChartTreeModalSingleSelect :key="formData.organizationId"
                                        :id="formData.organizationId" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-footer text-center">
                    <Spinner_btn v-if="loading" />
                    <template v-else>
                        <button type="submit" class="btn btn-warning">ذخیره</button>
                    </template>
                </div>
            </div>
        </form>
    </div>

</template>
<script setup>
import { reactive, ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { LocalStorageService } from "@/services/LocalStorageService";
const useLocalStorageService = LocalStorageService()
import ChartService from "@/services/ChartService";
import { useToast } from "vue-toastification";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength, maxLength } from "@vuelidate/validators";
import ChartTreeModalSingleSelect from '@/components/Chart/ChartTreeModalSingleSelect.vue'
import Spinner_btn from "@/components/Spinners/Spinner_btn.vue";

const router = useRouter();
const route = useRoute();
const toastService = useToast();
let loading = ref(false);

let formData = reactive({
    persianTitle: '',
    parentId: null,
    sortingNumber: "",
    organizationId: 0,
    parentPersianTitle: ''
});

const rules = {
    persianTitle: {
        required,
        minLength: minLength(1),
        maxLength: maxLength(50),
    },

};

function remvoeParent() {
    useLocalStorageService.setTreeSelectedItem('OrganizationChartViewList', '')
    formData.parentId = null;
    formData.parentPersianTitle = null;
}
const v$ = useVuelidate(rules, formData);

const emit = defineEmits(["updateOrganizationTree"]); // Define emit

async function updateChart() {
    // const isFormCorrect = await v$.value.$validate();
    // if (!isFormCorrect) return;
    loading.value = true;
    try {
        // if (formData.persianTitle == undefined) {
        //     toastService.error("فیلد نام سازمان الزامی می باشد", {
        //         timeout: 2000,
        //     });
        //     return;
        // }

        formData.parentId = useLocalStorageService.getTreeSelectedItem('OrganizationChartViewList')?.id;
        // if (!formData.parentId) {
        //     toastService.warning('انتخاب سازمان سرشاخه الزامیست', { timeout: 2000 });
        //     return;
        // }

        const response = await ChartService.update(formData);
        if (response.data.result === 0) {
            formData = {
                persianTitle: '',
                parentId: null,
                sortingNumber: "",
            };
            toastService.success(response.data.message, { timeout: 2000 });
            useLocalStorageService.setTreeSelectedItem('OrganizationViewList_ModalCreate', '')
            useLocalStorageService.setTreeSelectedItem('OrganizationChartViewList', '')
            router.push({ name: 'charts_index' });
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

onMounted(async () => {
    useLocalStorageService.setTreeSelectedItem('OrganizationViewList_ModalCreate', {});
    useLocalStorageService.setTreeSelectedItem('OrganizationChartViewList', {});
    try {
        loading.value = true;
        const chartResponse = await ChartService.getById(route.params.id);
        formData = chartResponse.data.data;
        console.log(formData);
    } catch (e) {
        console.log(e)
    } finally {
        loading.value = false
    }

})
</script>

<style scoped></style>