<template>
    <li :class="{ branch: item.children.length, 'tree-item': true }" v-for="(item, i) in    trees   " :key="i">
        <div class=" d-flex align-items-center" style="white-space: nowrap;">
            <div :class="{ 'checkbox d-flex': true }">
                <div class="custom-checkbox custom-control">
                    <input type="checkbox" data-checkboxes="mygroup" class="custom-control-input" :id="item.id">
                    <label :for="item.id" class="custom-control-label mt-1"> <span class="pr-4"></span>
                    </label>
                </div>
            </div>
            {{ item.persianTitle }}
        </div>
        <ul v-if="item.children.length">
            <TreeItem :trees="item.children" />
        </ul>
    </li>
</template>
<script setup>
import { defineProps, onMounted } from 'vue';
defineProps(['trees']);
import Tree from '@/components/Tree/Tree.vue'
function a(id, parentId) {
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