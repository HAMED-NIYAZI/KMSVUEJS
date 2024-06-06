<template>
    <Spinner_btn v-if="loadingPage" class="mt-4" />
    <template v-else>
        <div class="breadcrumb-header justify-content-between">
            <div class="my-auto">
                <div class="d-flex">
                    <h4 class="content-title mb-0 my-auto">
                        <router-link :to="{ name: 'organization' }" class="content-title mb-0 my-auto">سازمانها</router-link>
                    </h4>
                    <span class="text-muted mt-1 tx-13 ms-2 mb-0">ویرایش سازمان</span>
                </div>
            </div>
        </div>
        <div class="col-xl-12">
            <form @submit.prevent="updateOrganization">
                <div class="card">
                    <div class="card-header pb-0">
                        <div class="d-flex justify-content-between">
                            <h4 class="card-title mg-b-0">ویرایش سازمان</h4>
                            <router-link :to="{ name: 'organization' }" class=" btn btn-primary btn-icon">
                                <i class="fa  fa-arrow-left"></i>
                            </router-link>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-lg-8">
                                <div class="form-group">
                                    <label>نام سازمان</label>
                                    <input class="form-control" v-model="formData.persianTitle"
                                        placeholder="نام سازمان را وارد کنید" type="text" />
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div class="form-group">
                                    <label>اولویت نمایش</label>
                                    <select class="form-control" v-model="formData.sortingNumber">
                                        <option :value="grade" v-for="grade in grades" :key="grade">{{ grade }}</option>
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
                        <Spinner_btn v-if="loadingUpdate" />
                        <template v-else>
                            <button type="submit" class="btn btn-success">ذخیره</button>
                        </template>
                    </div>
                </div>
            </form>
        </div>
    </template>
</template>
<script setup>
import { reactive, ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import OrganizationTreeModalSingleSelect from './OrganizationTreeModalSingleSelect.vue'
import { LocalStorageService } from "@/services/LocalStorageService";
import OrganizationService from "@/services/OrganizationService";
import Spinner_btn from "../Spinners/Spinner_btn.vue";
import { useToast } from "vue-toastification";

const useLocalStorageService = LocalStorageService()
const router = useRouter();
const route = useRoute();
const toastService = useToast();

let loadingPage = ref(false);
let loadingUpdate = ref(false);
let formData = reactive({
    persianTitle: '',
    parentId: null,
    sortingNumber: "",
});
let grades = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
let tree_name = ref('OrganizationViewList');

async function updateOrganization() {
    loadingUpdate.value = true;
    try {
        if (formData.persianTitle == undefined) {
            toastService.error("فیلد نام سازمان الزامی می باشد", {
                timeout: 2000,
            });
            return;
        }

        formData.parentId = useLocalStorageService.getTreeSelectedItem('OrganizationViewList_ModalCreate').id || null;

        const response = await OrganizationService.update(formData);
        if (response.data.result === 0) {
            toastService.success(response.data.message, { timeout: 2000 });

            useLocalStorageService.setTreeSelectedItem(tree_name.value, null)
            router.push({ name: 'organization' });
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
        const response = await OrganizationService.getById(route.params.id);
        formData = response.data.data
        if (formData.parentId) {
            const _response = await OrganizationService.getById(formData.parentId);
            useLocalStorageService.setTreeSelectedItem('OrganizationViewList_ModalCreate', _response.data.data)
        }
    } catch (err) {
    } finally {
        loadingPage.value = false;
    }
})
</script>

<style scoped></style>