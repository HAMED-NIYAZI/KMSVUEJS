<template>
    <li :class="{ branch: item.children.length, 'tree-item': true }" v-for="(item, i) in trees" :key="i">
        <div class="d-flex align-items-center" style="white-space: nowrap;">
            <div :class="{ 'checkbox d-flex': true }">
                <div :class="{ 'leaf': item.children.length==0, 'custom-checkbox custom-control': true }">
                    <input type="checkbox" @change="checkboxClick(item)" :class="['custom-control-input', tree_name]"
                        :id="item.id+tree_name">
                    <label :for="item.id+tree_name" class="custom-control-label mt-1"> <span class="pr-4"></span>
                    </label>
                </div>
            </div>
            {{ item.persianTitle }}
        </div>
        <ul v-if="item.children.length">
            <TreeSingleSelectItem :tree_name="tree_name" :trees="item.children" />
        </ul>
    </li>
</template>
<script setup>
import { defineProps } from 'vue';
import { LocalStorageService } from '@/services/LocalStorageService';
const useLocalStorageService = LocalStorageService()
const props = defineProps({ trees: Array, tree_name: String });
import TreeSingleSelectItem from "@/components/Tree/TreeSingleSelectItem.vue";
function checkboxClick(item) {
    $('.' + props.tree_name).prop('checked', false);
    $('#' + item.id+props.tree_name).prop('checked', true);
    useLocalStorageService.setTreeSelectedItem(props.tree_name, item);
}
</script>
<style>
.tree li i {
    margin-left: 2px;
    font-weight: bold;
    color: #0162e8;
    float: right;
    margin-top: 5px;
    cursor: pointer;
    margin-right: 1px !important;
}
.mr_18 {
    margin-right: 18px;
}
.tree li i{
    margin-top: 8px !important;
}
.leaf{
    padding-right: 40px !important;
}
.tree ul li {
    padding-right: 9px !important;
}
.custom-control {
    padding-right: 23px;
} 
</style>