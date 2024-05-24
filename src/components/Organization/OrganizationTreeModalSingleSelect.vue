<template>
  <div> 
          <a
            class="btn ripple btn-primary"
            data-bs-target="#modal1"
            data-bs-toggle="modal"

            href="#"
            >...</a
          >
     </div>

    
     <div class="modal" id="modal1" style="display: none" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content modal-content-demo">
          <div class="modal-header">
            <h6 class="modal-title">پایه اصلی</h6>
            <button
              aria-label="بستن"
              class="close"
              data-bs-dismiss="modal"
              type="button"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">
            <OrganizationTree :key="componentKeyOrganizationTree" @ReloadOrganizationEdit="FReloadOrganizationEdit" :tree_name="tree_name"/>
          </div>
          <div class="modal-footer">
            <button class="btn ripple btn-primary" type="button">
              ذخیره تغییرات
            </button>
            <button
              class="btn ripple btn-secondary"
              data-bs-dismiss="modal"
              type="button"
            >
              بستن
            </button>
          </div>
        </div>
      </div>
    </div> 
 </template>
 


<script setup>
 import OrganizationTree from "./OrganizationTree.vue";
 import { ref, onMounted } from 'vue'

 let componentKeyOrganizationTree = ref(0);
 let tree_name = ref('OrganizationViewList_ModalCreate'); 

 const treeKey="ModalForCreateOrganization";
onMounted(() => {
 
})


function FupdateOrganizationTree() {
  componentKeyOrganizationTree.value += 1; // Increment the key to force re-render
 }


 </script>
