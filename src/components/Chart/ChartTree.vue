<template>
    <TreeSingleSelect :tree_name="chart_tree_name" :trees="trees" :key="componentKeyChartTree" />
</template>
<script setup>
import { ref, defineProps } from 'vue'
import ChartService from "@/services/ChartService";
import { LocalStorageService } from "@/services/LocalStorageService";
import TreeSingleSelect from "@/components/Tree/TreeSingleSelect.vue";
import { useToast } from "vue-toastification";

let chart_tree_name = ref("OrganizationChartViewList");
let componentKeyChartTree = ref(0);
let trees = ref([]);
const props = defineProps(['organizationId'])
const toastService = useToast();

watch(organizationId, async (n, o) => {
    const response = await ChartService.getOrganizationChartTree(n)
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
</script>