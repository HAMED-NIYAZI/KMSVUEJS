<template>
  <div class="breadcrumb-header justify-content-between">
    <div class="my-auto">
      <div class="d-flex">
        <h4 class="content-title mb-0 my-auto">
          <router-link
            :to="{ name: 'organization' }"
            class="content-title mb-0 my-auto"
            >سازمان ها</router-link
          >
        </h4>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-lg-12">
      <div class="row pad">
        <router-link
          :to="{ name: 'create_organization' }"
          class="btn btn-success btn-icon"
          title="ایجاد سازمان"
        >
          <i class="fa fa-plus"></i>
        </router-link>
        <router-link
          v-if="OrganizationViewList_Value && OrganizationViewList_Value.id"
          :to="{
            name: 'edit_organization',
            params: { id: OrganizationViewList_Value.id },
          }"
          class="btn btn-warning btn-icon mr-2"
          title="ویرایش سازمان"
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
                OrganizationViewList_Value.id,
                OrganizationViewList_Value.persianTitle
              )
            "
            v-if="OrganizationViewList_Value && OrganizationViewList_Value.id"
            class="btn btn-danger btn-icon mr-2"
            title="حذف سازمان"
          >
            <i class="fa fa-trash"></i>
          </a>
        </template>
      </div>
      <OrganizationTree
        :key="componentKeyOrganizationTree"
        @ReloadOrganizationEdit="FReloadOrganizationEdit"
        :tree_name="tree_name"
      />
    </div>
  </div>
</template>
<script setup>
import { computed, ref } from "vue";
import OrganizationTree from "./OrganizationTree.vue";
import OrganizationService from "@/services/OrganizationService";
import { LocalStorageService } from "@/services/LocalStorageService";
import { useToast } from "vue-toastification";
import Spinner_btn from "../Spinners/Spinner_btn.vue";
import Swal from 'sweetalert2'

const toastService = useToast();
const useLocalStorageService = LocalStorageService();
let componentKeyOrganizationTree = ref(0);
let tree_name = ref("OrganizationViewList");
let loadingRemove = ref(false);

function FupdateOrganizationTree() {
  componentKeyOrganizationTree.value += 1; // Increment the key to force re-render
}

let OrganizationViewList_Value = computed(() =>
  useLocalStorageService.getTreeSelectedItem(tree_name.value)
);

async function remove(id,name) {
    Swal.fire({
        title: "آیا مایل به حذف  (" + name + ")  هستید؟",
        text: "آیتم حذف شده قابل بازیابی نمی باشد",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "بله، حذف کن!",
        cancelButtonText: "انصراف"
    }).then(async (result) => {
        if (result.isConfirmed) {
          loadingRemove.value = true;
  try {
    let response = await OrganizationService.delete(id);

    if (
      response.data.result == 4 ) {
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
    });
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
