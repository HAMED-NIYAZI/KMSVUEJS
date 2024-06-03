<template>
    <div class="breadcrumb-header justify-content-between">
      <div class="my-auto">
        <div class="d-flex">
          <h4 class="content-title mb-0 my-auto">
            <router-link :to="{ name: 'knowledgefield' }" class="content-title mb-0 my-auto">  فیلدهای دانش</router-link>
          </h4> 
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12">
        <div class="row pad">
           <router-link :to="{ name: 'create_knowledgefield' }" class="btn btn-success btn-icon"  title="ایجاد فیلد دانش"><i class="fa fa-plus"></i></router-link>
       </div>
        <KnowledgeFieldTree :key="componentKeyKnowledgeFieldTree" :tree_name="tree_name" />
      </div>
    </div>
  </template>
  
  <script setup>
  import KnowledgeFieldTree from "./KnowledgeFieldTree.vue";
  import { ref } from 'vue';
  
  let componentKeyKnowledgeFieldTree = ref(0);
  let tree_name = ref('KnowledgeFieldViewList');
    
  </script>
  
  <style scoped>
  .pad{
  padding-right: 25px;
  padding-bottom: 5px;
    }
  </style>
  