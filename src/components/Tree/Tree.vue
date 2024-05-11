<template>
    <li :class="{ branch: item.children.length, 'tree-item': true }" v-for="(item, i) in    trees   " :key="i">
        <div class=" d-flex align-items-center" style="white-space: nowrap;">
            <div :class="{ 'checkbox d-flex': true }">
                <div
                :class="{ 'leaf': item.children.length==0, 'custom-checkbox custom-control': true }"
                >
                    <input type="checkbox" data-checkboxes="mygroup" class="custom-control-input" :id="item.id+treeKey">
 
                    <label :for="item.id+treeKey" class="custom-control-label mt-1"> <span class="pr-4"></span>
                    </label>
                </div>
            </div>
            {{ item.persianTitle }}
        </div>
        <ul  v-if="item.children.length">
            <Tree :trees="item.children" :treeKey="treeKey"/>
        </ul>
    </li>
</template>
<script setup>
import { defineProps, onMounted } from 'vue';
defineProps(['trees','treeKey']);
import Tree from '@/components/Tree/Tree.vue'
function a(id, parentId) {
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
    padding-right: 23px;}
    
 
</style>