<template>
    <div>
        <a class="btn btn-primary btn-icon" :data-bs-target="'#modal1' + chart_tree_name" data-bs-toggle="modal"
            href="#">
            <i class="fa fa-ellipsis-h"></i>
        </a>
    </div>

    <div class="modal" :id="'modal1' + chart_tree_name" style="display: none" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content modal-content-demo">
                <div class="modal-header">
                    <h6 class="modal-title"> </h6>
                    <button aria-label="بستن" class="close" data-bs-dismiss="modal" type="button">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <TreeSingleSelect :tree_name="chart_tree_name" :trees="trees" />
                </div>
                <div class="modal-footer">
                    <button class="btn ripple btn-secondary" data-bs-dismiss="modal" type="button">
                        تایید
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>



<script setup>
import { ref, onMounted, defineProps } from 'vue'

import TreeSingleSelect from "@/components/Tree/TreeSingleSelect.vue";
import { LocalStorageService } from "@/services/LocalStorageService";
const useLocalStorageService = LocalStorageService()
let componentKeyOrganizationTree = ref(0);
let tree_name = ref('OrganizationViewList_ModalCreate');
const props = defineProps(['id'])
const treeKey = "ModalForCreateOrganization";
import ChartService from "@/services/ChartService";
onMounted(() => {
    ChartService.getOrganizationChartTree(props.id).then(response => {
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

let chart_tree_name = ref("OrganizationChartViewList");
let trees = ref([]);


function FupdateOrganizationTree() {
    componentKeyOrganizationTree.value += 1; // Increment the key to force re-render
}


</script>
