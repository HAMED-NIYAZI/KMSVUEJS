<template>
    <li :class="{ branch: item.children.length, 'tree-item': true }" v-for="(item, i) in trees" :key="i">
        <div class="d-flex align-items-center" style="white-space: nowrap;">
            <div :class="{ 'checkbox d-flex': true }">
                <div class="custom-checkbox custom-control">
                    <input type="checkbox" @change="checkboxClick(item)" :class="['custom-control-input', tree_name]"
                        :id="item.id">
                    <label :for="item.id" class="custom-control-label mt-1"> <span class="pr-4"></span>
                    </label>
                </div>
            </div>
            {{ item.persianTitle }}
        </div>
        <ul v-if="item.children.length">
            <TreeItem :tree_name="tree_name" :trees="item.children" />
        </ul>
    </li>
</template>
<script setup>
import { defineProps } from 'vue';
import { LocalStorageService } from '@/services/LocalStorageService';
const useLocalStorageService = LocalStorageService()
const props = defineProps({ trees: Array, tree_name: String });
import TreeItem from '@/components/pages/tree/TreeItem.vue'
function checkboxClick(item) {
    $('.' + props.tree_name).prop('checked', false);
    $('#' + item.id).prop('checked', true);
    useLocalStorageService.setTreeSelectedItem(props.tree_name, item);
}
</script>
<style>
.tree li i {
    margin-left: 5px;
    font-weight: bold;
    color: #0162e8;
    float: right;
    margin-top: 5px;
    cursor: pointer;
}

.mr_18 {
    margin-right: 18px;
}
</style>