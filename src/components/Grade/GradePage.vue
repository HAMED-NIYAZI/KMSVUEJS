<template>
  <div class="breadcrumb-header justify-content-between">
    <!-- Other elements -->
  </div>
  <div class="row">
    <div class="col-lg-5" v-if="WhichCreateOrEdit == 'CreateGrade'">
      <GradeCreate :key="componentKey" @updateGradeList="FupdateGradeList" />
    </div>
    <div class="col-lg-5" v-else-if="WhichCreateOrEdit == 'EditGrade'">
      <GradeEdit :id="selectedId" :key="selectedId" @updateGradeList="FupdateGradeList"/>
    </div>

    <div class="col-lg-7">
      <GradeList :key="componentKey" @ReloadEditGrade="FWhichCreateOrEdit" />
    </div>
  </div>
</template>
<script setup>
import GradeList from "./GradeList.vue";
import GradeCreate from "./GradeCreate.vue";
import GradeEdit from "./GradeEdit.vue";


import { ref } from 'vue';


let componentKey = ref(0);
let WhichCreateOrEdit = ref('CreateGrade')
let selectedId = ref(null); // Initialize it with the ID you want to pass


function FWhichCreateOrEdit(id) {
  WhichCreateOrEdit = 'EditGrade';  
  selectedId.value = id;
}

function FupdateGradeList() {
  componentKey.value += 1; // Increment the key to force re-render
  WhichCreateOrEdit = 'CreateGrade';  

}


 

</script>
