<template>
    <div>
      <a class="btn btn-primary btn-icon" data-bs-target="#modal1" data-bs-toggle="modal" href="#">
        <i class="fa fa-ellipsis-h"></i>
      </a>
    </div>
    <div class="modal" id="modal1" style="display: none" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content modal-content-demo">
          <div class="modal-header">
            <h6 class="modal-title"></h6>
            <button aria-label="بستن" class="close" data-bs-dismiss="modal" type="button">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">
            <KnowledgeFieldTree :key="componentKeyKnowledgeFieldTree" @ReloadKnowledgeFieldEdit="FReloadKnowledgeFieldEdit"
              :tree_name="tree_name" />
          </div>
          <div class="modal-footer">
            <button class="btn ripple btn-secondary" data-bs-dismiss="modal" type="button">
              تایید
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import KnowledgeFieldTree from "./KnowledgeFieldTree.vue";
  import { ref, onMounted } from 'vue'
  
  let componentKeyKnowledgeFieldTree = ref(0);
  let tree_name = ref('KnowledgeFieldViewList_ModalCreate');
  
  const treeKey = "ModalForCreateKnowledgeField";
  onMounted(() => {
  
  })
  
  function FupdateKnowledgeFieldTree() {
    componentKeyKnowledgeFieldTree.value += 1;
  }
  
  </script>