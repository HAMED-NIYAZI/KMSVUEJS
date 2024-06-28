<template>
    <TreeSingleSelect :tree_name="chart_tree_name" :trees="trees" :key="componentKeyChartTree" />
</template>
<script setup>
import { ref, computed, watch } from 'vue'
import ChartService from "@/services/ChartService";
import { LocalStorageService } from "@/services/LocalStorageService";
import TreeSingleSelect from "@/components/Tree/TreeSingleSelect.vue";
import { useToast } from "vue-toastification";

const useLocalStorageService = LocalStorageService();
const toastService = useToast();
let chart_tree_name = ref("OrganizationChartViewList");
let componentKeyChartTree = ref(0);
let trees = ref([]);
let tree_name = ref("OrganizationViewList");

let OrganizationViewList_Value = computed(() => {
    return useLocalStorageService.getTreeSelectedItem(tree_name.value)
});

watch(OrganizationViewList_Value, (n, o) => {
    if(n==null) return;
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
</script>