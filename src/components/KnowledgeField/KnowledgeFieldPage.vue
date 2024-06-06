<template>
  <div class="breadcrumb-header justify-content-between">
    <div class="my-auto">
      <div class="d-flex">
        <h4 class="content-title mb-0 my-auto">
          <router-link
            :to="{ name: 'knowledgefield' }"
            class="content-title mb-0 my-auto"
            >فیلد های دانش</router-link
          >
        </h4>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-lg-12">
      <div class="row pad">
        <router-link
          :to="{ name: 'create_knowledgefield' }"
          class="btn btn-success btn-icon"
          title="ایجاد فیلد دانش"
        >
          <i class="fa fa-plus"></i>
        </router-link>
        <router-link
          v-if="KnowledgeFieldViewList_Value && KnowledgeFieldViewList_Value.id"
          :to="{
            name: 'edit_knowledgefield',
            params: { id: KnowledgeFieldViewList_Value.id },
          }"
          class="btn btn-warning btn-icon mr-2"
          title="ویرایش فیلد دانش"
        >
          <i class="fa fa-pen"></i>
        </router-link>
        <div
          v-if="loadingRemove"
          class="spinner-border text-primary"
          role="status"
        >
          <span class="sr-only"></span>
        </div>
        <template v-else>
          <a
            href="#"
            @click="
              remove(
                KnowledgeFieldViewList_Value.id,
                KnowledgeFieldViewList_Value.persianTitle
              )
            "
            v-if="
              KnowledgeFieldViewList_Value && KnowledgeFieldViewList_Value.id
            "
            class="btn btn-danger btn-icon mr-2"
            title="حذف فیلد دانش"
          >
            <i class="fa fa-trash"></i>
          </a>
        </template>
      </div>
      <KnowledgeFieldTree
        :key="componentKeyKnowledgeFieldTree"
        @ReloadKnowledgeFieldEdit="FReloadKnowledgeFieldEdit"
        :tree_name="tree_name"
      />
    </div>
  </div>
</template>
<script setup>
import { computed, onMounted, ref } from "vue";
import KnowledgeFieldTree from "./KnowledgeFieldTree.vue";
import KnowledgeFieldService from "@/services/KnowledgeFieldService";
import { LocalStorageService } from "@/services/LocalStorageService";
import { useToast } from "vue-toastification";
import Spinner_btn from "../Spinners/Spinner_btn.vue";

const toastService = useToast();
const useLocalStorageService = LocalStorageService();
let componentKeyKnowledgeFieldTree = ref(0);
let tree_name = ref("KnowledgeFieldViewList");
let loadingRemove = ref(false);

function FupdateKnowledgeFieldTree() {
  componentKeyKnowledgeFieldTree.value += 1; // Increment the key to force re-render
}

let KnowledgeFieldViewList_Value = computed(() =>
  useLocalStorageService.getTreeSelectedItem(tree_name.value)
);

async function remove(id, name) {
  let res = confirm("آیا مایل به حذف  (" + name + ")  هستید؟");
  if (!res) {
    return false;
  }

  loadingRemove.value = true;
  try {
    let response = await KnowledgeFieldService.delete(id);

    if (
      response.data.result == 4 &&
      response.data.message == "سرشاخه قابل حذف نیست"
    ) {
      toastService.error(response.data.message, { timeout: 2000 });
      return;
    }

    if (response.data.result == 0) {
      toastService.success('عملیات حذف با موفقیت انجام شد', { timeout: 2000 });
     
      useLocalStorageService.setTreeSelectedItem(tree_name.value, null);

      FupdateKnowledgeFieldTree();
    }
  } catch (err) {
    toastService.error(err.message, { timeout: 2000 });
  } finally {
    loadingRemove.value = false;
  }
}
</script>
<style scoped>
.pad {
  padding-right: 25px;
  padding-bottom: 5px;
}

.mr-2 {
  margin-right: 10px;
}
</style>
