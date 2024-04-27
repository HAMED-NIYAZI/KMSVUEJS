<template>
      <div class="breadcrumb-header justify-content-between">
    <div class="my-auto">
						<div class="d-flex">
							<h4 class="content-title mb-0 my-auto">
                                اطلاعات پایه
                            </h4>
                            <span class="text-muted mt-1 tx-13 ms-2 mb-0">
                                <router-link :to="{ name: 'gradenew' }"> /&nbsp; پایه تحصیلی</router-link>
                            </span>
						</div>
					</div>
  </div>
  <div class="row">
    <div class="col-lg-5">
      <GradeCreate />
    </div>
    <div class="col-lg-7">
      <GradeList />
    </div>
  </div>
</template>
<script setup>
import GradeList from "./GradeList.vue";
import GradeCreate from "./GradeCreate.vue";
</script>

<style scoped>
</style>