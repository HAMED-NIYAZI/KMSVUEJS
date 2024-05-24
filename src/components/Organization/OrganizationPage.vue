<template>
  <div class="breadcrumb-header justify-content-between">
    <!-- Other elements -->
  </div>
  <div class="row">
    <div class="col-lg-12">
      <router-link :to="{ name: 'create_organization' }" class="btn btn-success btn-sm" title="ایجاد سازمان"><i
          class="fa fa-plus"></i></router-link>
      <OrganizationTree :key="componentKeyOrganizationTree" @ReloadOrganizationEdit="FReloadOrganizationEdit"
        :tree_name="tree_name" />
    </div>
  </div>
</template>

<script setup>
import OrganizationTree from "./OrganizationTree.vue";

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
