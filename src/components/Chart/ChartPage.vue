<template>
    <div class="breadcrumb-header justify-content-between">
        <div class="my-auto">
            <div class="d-flex">
                <h4 class="content-title mb-0 my-auto">
                    <router-link :to="{ name: 'chart' }" class="content-title mb-0 my-auto">
                        چارت سازمانی
                    </router-link>
                </h4>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-6">
            <OrganizationTree :key="componentKeyOrganizationTree" :tree_name="tree_name" />
        </div>
        <div class="col-lg-6">
            <div class="card">
                <div class="card-header pb-0">
                    <div class="d-flex justify-content-between">
                        <h4 class="card-title mg-b-0" style="padding-top: 10px !important;">
                            چارت های سازمانی
                        </h4>
                        <router-link :to="{ name: 'create_chart' }" class="btn btn-success btn-icon" title="ایجاد چارت">
                            <i class="fa fa-plus"></i>
                        </router-link>

                        <router-link v-if="OrganizationChartViewList_Value && OrganizationChartViewList_Value.id"
                            :to="{ name: 'edit_chart', params: { id: OrganizationChartViewList_Value.id } }"
                            class="btn btn-warning btn-icon mr-2" title="ویرایش چارت">
                            <i class="fa fa-pen"></i>
                        </router-link>

                        <a href="#" v-if="OrganizationChartViewList_Value && OrganizationChartViewList_Value.id" @click="remove(
                        OrganizationChartViewList_Value.id,
                        OrganizationChartViewList_Value.persianTitle
                    )" class="btn btn-danger btn-icon mr-2" title="حذف چارت">
                            <i class="fa fa-trash"></i>
                        </a>

                    </div>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-lg-12">
                            <chart-tree v-if="OrganizationChartViewList_Value"
                                :organizationId="OrganizationChartViewList_Value.id" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { computed, ref, watch } from "vue";
import OrganizationTree from "@/components/Organization/OrganizationTree.vue";
import ChartService from "@/services/ChartService";
import { LocalStorageService } from "@/services/LocalStorageService";
import { useToast } from "vue-toastification";
import Spinner_btn from "../Spinners/Spinner_btn.vue";

const toastService = useToast();
const useLocalStorageService = LocalStorageService();

let componentKeyOrganizationTree = ref(0);

let tree_name = ref("OrganizationViewList");
let chart_tree_name = ref("OrganizationChartViewList");

let loadingRemove = ref(false);

function FupdateOrganizationTree() {
    componentKeyOrganizationTree.value += 1; // Increment the key to force re-render
}

let OrganizationViewList_Value = computed(() => {
    return useLocalStorageService.getTreeSelectedItem(tree_name.value)
});

let OrganizationChartViewList_Value = computed(() => {
    return useLocalStorageService.getTreeSelectedItem(chart_tree_name.value)
});


watch(OrganizationViewList_Value, async (n, o) => {
    if(n==null) return;
    const response = await ChartService.getOrganizationChartTree(n.id)
    if (response.data.result == 0) {
        trees.value = response.data.data;

        // زمانی که سازمانی انتخاب میشود در صورت وجود دکمه های حذف و ویرایش برای چارت، این دکمه ها ناپدید میشن
        useLocalStorageService.setTreeSelectedItem(chart_tree_name.value, null)

    } else {
        toast.warning(response.data.message, {
            timeout: 2000,
        });
    }
})

async function remove(id, name) {
    let res = confirm("آیا مایل به حذف  (" + name + ")  هستید؟");
    if (!res) {
        return false;
    }

    // loadingRemove.value = true;
    // try {
    //     let response = await OrganizationService.delete(id);

    //     if (
    //         response.data.result == 4 &&
    //         response.data.message == "سرشاخه قابل حذف نیست"
    //     ) {
    //         toastService.error(response.data.message, { timeout: 2000 });
    //         return;
    //     }

    //     if (response.data.result == 0) {
    //         toastService.success("عملیات حذف با موفقیت انجام شد", { timeout: 2000 });

    //         useLocalStorageService.setTreeSelectedItem(tree_name.value, null);

    //         FupdateOrganizationTree();
    //     }
    // } catch (err) {
    //     toastService.error(err.message, { timeout: 2000 });
    // } finally {
    //     loadingRemove.value = false;
    // }
}
</script>
<style scoped>
.pad {
    padding-right: 25px;
    padding-bottom: 5px;
}

.mr-2 {
    margin-right: 10px;
}
</style>
