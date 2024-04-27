<template>
      <div class="breadcrumb-header justify-content-between">
    <div class="my-auto">
						<div class="d-flex">
							<h4 class="content-title mb-0 my-auto">
                                
                                <router-link
            :to="{ name: 'dashboard' }"
            class="content-title mb-0 my-auto"
            >داشبورد</router-link
          >

                            </h4>
                            <span class="text-muted mt-1 tx-13 ms-2 mb-0">
                                <router-link :to="{ name: 'profile' }"> /&nbsp; پروفایل</router-link>
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