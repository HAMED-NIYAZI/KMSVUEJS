<template>
    <div class="col-xl-12">
      <div class="card">
        <div class="card-header pb-0">
          <div class="d-flex justify-content-between">
            <h4 class="card-title mg-b-0" style="padding-top: 10px !important;">
              فیلدهای دانش
              <span v-if="KnowledgeFieldViewList_Value" class="badg_select">
                {{ KnowledgeFieldViewList_Value.persianTitle }}
              </span>
            </h4>
            <div class="d-flex gap-1">
              <button type="button" class="btn btn-success btn-icon" @click="ReloadTreeInside">
                <i class="mdi mdi-refresh"></i>
              </button>
  
            </div>
          </div>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-lg-12">
              <Spinner_Gride v-if="loading" />
  
              <template v-else>
                <div>
                  <TreeSingleSelect :tree_name="tree_name" :trees="trees" />
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import KnowledgeFieldService from "@/services/KnowledgeFieldService";
  import { ref, onMounted, computed } from "vue";
  import { useToast } from "vue-toastification";
  import TreeSingleSelect from "@/components/Tree/TreeSingleSelect.vue";
  import Spinner_Gride from "@/components/Spinners/Spinner_Gride.vue";
  import { LocalStorageService } from "@/services/LocalStorageService";
  const useLocalStorageService = LocalStorageService();
  
  const toast = useToast();
  let loading = ref(false);
  let trees = ref([]);
  const props = defineProps(["tree_name"]);
  
  async function index() {
    loading.value = true;
    try {
      const response = await KnowledgeFieldService.getKnowledgeFieldTree();
      if (response.data.result == 0) {
        trees.value = response.data.data;
  
      } else if (response.data.result == 5) {
        toast.warning(response.data.message, {
          timeout: 2000,
        });
      } else {
        toast.warning(response.data.message, {
          timeout: 2000,
        });
      }
    } catch (err) {
    } finally {
      loading.value = false;
    }
  }
  onMounted(() => {
    index();
  });
  
  async function ReloadTreeInside() {
    index();
    useLocalStorageService.setTreeSelectedItem(props.tree_name, null);
  }
  const KnowledgeFieldViewList_Value = computed(() =>
    useLocalStorageService.getTreeSelectedItem(props.tree_name)
  );
  </script>
  
  <style scoped>
  .badg_select {
    background-color: orange;
    padding-left: 15px;
    padding-right: 15px;
    padding-top: 0px;
    border-radius: 7px;
    font-size: 12px;
    font-weight: 400;
    color: black;
  }
  </style>