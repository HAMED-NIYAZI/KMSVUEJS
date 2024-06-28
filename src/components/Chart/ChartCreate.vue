<!-- <template>
    
</template> -->
<template>
    <div class="breadcrumb-header justify-content-between">
        <div class="my-auto">
            <div class="d-flex">
                <h4 class="content-title mb-0 my-auto">
                    <router-link :to="{ name: 'chart' }" class="content-title mb-0 my-auto">چارت
                        ها</router-link>
                </h4>
                <span class="text-muted mt-1 tx-13 ms-2 mb-0">
                    اضافه کردن چارت
                </span>
            </div>
        </div>
    </div>
    <div class="col-xl-12">
        <form @submit.prevent="createChart">
            <div class="card">
                <div class="card-header pb-0">
                    <div class="d-flex justify-content-between">
                        <h4 class="card-title mg-b-0">اضافه کردن چارت</h4>
                        <router-link :to="{ name: 'chart' }" class=" btn btn-primary btn-icon">
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

                        <div class="col-lg-12 mb-3">
                            <label>سرشاخه</label>
                            <div class="row">
                                <div class="col-10">
                                    <input class="form-control" disabled="true"
                                        :value="useLocalStorageService.getTreeSelectedItem('OrganizationChartViewList') != null ? useLocalStorageService.getTreeSelectedItem('OrganizationChartViewList').persianTitle : ''"
                                        type="text" />
                                </div>

                                <div class="col-2">
                                    <ChartTreeModalSingleSelect :id="route.params.id" />
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-12">

                            <label>نام سازمان</label>
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
import { useRouter, useRoute } from "vue-router";
import { LocalStorageService } from "@/services/LocalStorageService";
const useLocalStorageService = LocalStorageService()
import ChartService from "@/services/ChartService";
import { useToast } from "vue-toastification";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength, maxLength } from "@vuelidate/validators";
import ChartTreeModalSingleSelect from '@/components/Chart/ChartTreeModalSingleSelect.vue'
import Spinner_btn from "@/components/Spinners/Spinner_btn.vue";
import OrganizationTreeModalSingleSelect from '@/components/Organization/OrganizationTreeModalSingleSelect.vue'
let tree_name = ref('OrganizationViewList');
let chart_tree_name = ref("OrganizationChartViewList");
const router = useRouter();
const route = useRoute();
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

async function createChart() {
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

        formData.parentId = useLocalStorageService.getTreeSelectedItem('OrganizationChartViewList')?.id || null;
        formData.organizationId = useLocalStorageService.getTreeSelectedItem('OrganizationViewList_ModalCreate')?.id || null;
        const response = await ChartService.create(formData);
        if (response.data.result === 0) {
            formData = {
                persianTitle: '',
                parentId: null,
                sortingNumber: "",
            };
            toastService.success(response.data.message, { timeout: 2000 });
            useLocalStorageService.setTreeSelectedItem('OrganizationViewList_ModalCreate', '')
            useLocalStorageService.setTreeSelectedItem('OrganizationChartViewList', '')
            // router.push({ name: 'chart' });
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

    // useLocalStorageService.setTreeSelectedItem(tree_name.value, null)
})
</script>

<style scoped></style>