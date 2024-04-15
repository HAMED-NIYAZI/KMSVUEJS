<template>
<!-- 
    <div class="card">
        <div class="card-header">
            <div class="card-title">هیچ گونه نتیجه ای برای نمایش پیدا نشد</div>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-md-6 offset-3">
                    <img src="../assets/img/media/404.png" class="img-fluid" alt="">
                </div>
            </div>
        </div>
        <div class="card-footer text-end">
            <router-link :to="{name:'dashboard'}" class=" btn btn-primary btn-sm">داشبورد</router-link>
        </div>
    </div> -->


    <!-- Page -->
			<div class="page" >

				
<!-- Main-error-wrapper -->
<div class="main-error-wrapper page page-h">
    <img src="assets/img/media/404.png" class="error-page" alt="error">
    <h2>صفحه ای که به دنبال آن هستید وجود ندارد.</h2>
      <router-link :to="{name:'dashboard'}"  class="btn btn-outline-danger" >بازگشت به خانه</router-link>
</div>
<!-- /Main-error-wrapper -->


</div>


</template>
<script setup>
</script>


<style scoped>
.page{
 background: rgb(181, 213, 245);
}
</style>