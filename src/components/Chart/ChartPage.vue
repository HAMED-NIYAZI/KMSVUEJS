<template>
    <div class="breadcrumb-header justify-content-between">
        <div class="my-auto">
            <div class="d-flex">
                <h4 class="content-title mb-0 my-auto">
                    <router-link :to="{ name: 'charts_index' }" class="content-title mb-0 my-auto">
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

                        <div class="d-flex justify-content-between">


                            <a href="#" v-if="OrganizationChartViewList_Value && OrganizationChartViewList_Value.id"
                                @click="remove(
                        OrganizationViewList_Value?.id,
                        OrganizationChartViewList_Value.id,
                        OrganizationChartViewList_Value.persianTitle,
                    )" class="btn btn-danger btn-icon mr-2" title="حذف چارت">
                                <i class="fa fa-trash"></i>
                            </a>

                            <router-link v-if="OrganizationChartViewList_Value && OrganizationChartViewList_Value.id"
                                :to="{ name: 'edit_charts', params: { id: OrganizationChartViewList_Value.id } }"
                                class="btn btn-warning btn-icon mr-2" title="ویرایش چارت">
                                <i class="fa fa-pen"></i>
                            </router-link>
                            <router-link :to="{ name: 'create_charts' }" class="btn btn-success btn-icon mr-2"
                                title="ایجاد چارت">
                                <i class="fa fa-plus"></i>
                            </router-link>

                        </div>


                    </div>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-lg-12" v-if="trees && trees.length">
                            <TreeSingleSelect :tree_name="chart_tree_name" :trees="trees" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import OrganizationTree from "@/components/Organization/OrganizationTree.vue";
import TreeSingleSelect from "@/components/Tree/TreeSingleSelect.vue";
import { LocalStorageService } from "@/services/LocalStorageService";
import { ref, computed, watch } from 'vue'
import ChartService from "@/services/ChartService";
import { useToast } from "vue-toastification";
const toastService = useToast()
const useLocalStorageService = LocalStorageService();
let chart_tree_name = ref("OrganizationChartViewList");
let trees = ref([]);
let tree_name = ref("OrganizationViewList");

let OrganizationViewList_Value = computed(() => {
    return useLocalStorageService.getTreeSelectedItem(tree_name.value)
});

watch(OrganizationViewList_Value, (n, o) => {
    if (n == null) return;
    ChartService.getOrganizationChartTree(n.id).then(response => {
        if (response.data.result == 0) {
            trees.value = response.data.data;

            // زمانی که سازمانی انتخاب میشود در صورت وجود دکمه های حذف و ویرایش برای چارت، این دکمه ها ناپدید میشن
            useLocalStorageService.setTreeSelectedItem(chart_tree_name.value, null)

        } else {
            toastService.warning(response.data.message, {
                timeout: 2000,
            });
        }
    })

})



let componentKeyOrganizationTree = ref(0);

let OrganizationChartViewList_Value = computed(() => {
    return useLocalStorageService.getTreeSelectedItem(chart_tree_name.value)
});

async function remove(organizationId, id, name) {
    let res = confirm("آیا مایل به حذف  (" + name + ")  هستید؟");
    if (!res) {
        return false;
    }

    // loadingRemove.value = true;
    try {
        let response = await ChartService.delete(id);

        // if (
        //     response.data.result == 4 &&
        //     response.data.message == "سرشاخه قابل حذف نیست"
        // ) {
        //     toastService.error(response.data.message, { timeout: 2000 });
        //     return;
        // }

        if (response.data.result == 0) {
            toastService.success("عملیات حذف با موفقیت انجام شد", { timeout: 2000 });

            $(`#${id}${chart_tree_name.value}`).prop('checked', false)

            const res = await ChartService.getOrganizationChartTree(organizationId)
            if (res.data.result == 0) {
                trees.value = res.data.data;

                // زمانی که سازمانی انتخاب میشود در صورت وجود دکمه های حذف و ویرایش برای چارت، این دکمه ها ناپدید میشن
                useLocalStorageService.setTreeSelectedItem(chart_tree_name.value, null)

            } else {
                toastService.warning(res.data.message, {
                    timeout: 2000,
                });
            }

        }
    } catch (err) {
        toastService.error(err.message, { timeout: 2000 });
    } finally {
        // loadingRemove.value = false;
    }
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
