<template>
  <div class="breadcrumb-header justify-content-between">
    <!-- Other elements -->
  </div>
  <div class="row">
    <div class="col-lg-5">
      <GradeCreate @updateGradeList="FupdateGradeList" />
    </div>
    <div class="col-lg-7">
      <GradeList :key="componentKey" />
    </div>
  </div>
</template>
<script setup>
import GradeList from "./GradeList.vue";
import GradeCreate from "./GradeCreate.vue";
import { ref } from 'vue';


let componentKey =ref(0);

function FupdateGradeList() {
  console.log('componentKey++');
  componentKey.value += 1; // Increment the key to force re-render
}




</script>
