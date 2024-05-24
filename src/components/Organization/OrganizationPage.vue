<template>
    <div class="breadcrumb-header justify-content-between">
      <!-- Other elements -->
    </div>
    <div class="row">
      <div class="col-lg-5" v-if="WhichCreateOrEdit == 'OrganizationCreate'">
        <OrganizationCreate :key="componentKey" @updateOrganizationTree="FupdateOrganizationTree" />
      </div>
      <div class="col-lg-5" v-else-if="WhichCreateOrEdit == 'EditOrganization'">
        <OrganizationEdit :id="selectedId" :key="selectedId" @updateOrganizationTree="FupdateOrganizationTree"/>
      </div>
  
      <div class="col-lg-7">
        <OrganizationTree :key="componentKeyOrganizationTree" @ReloadOrganizationEdit="FReloadOrganizationEdit" :tree_name="tree_name"/>
      </div>
    </div>
  </template>

<script setup>
import OrganizationTree from "./OrganizationTree.vue";
import OrganizationCreate from "./OrganizationCreate.vue";
import OrganizationEdit from "./OrganizationEdit.vue";


import { ref } from 'vue';


let componentKeyOrganizationTree = ref(0);
let WhichCreateOrEdit = ref('OrganizationCreate')
let selectedId = ref(null); // Initialize it with the ID you want to pass
let tree_name = ref('OrganizationViewList'); 
function FWhichCreateOrEdit(id) {
  WhichCreateOrEdit = 'OrganizationEdit';  
  selectedId.value = id;
}

function FupdateOrganizationTree() {
  componentKeyOrganizationTree.value += 1; // Increment the key to force re-render
  WhichCreateOrEdit = 'OrganizationCreate';  
}


 

</script>

