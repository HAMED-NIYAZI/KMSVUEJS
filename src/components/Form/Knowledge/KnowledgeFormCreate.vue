<template>
  <div
    class="my-auto"
    style="
      margin-top: 20px !important;
      margin-bottom: 20px !important;
      margin-right: 15px !important;
    "
  >
    <div class="d-flex">
      <h4 class="content-title mb-0 my-auto">
        <router-link
          :to="{ name: 'knowledgeformpage' }"
          class="content-title mb-0 my-auto"
          >فرمها
        </router-link>
      </h4>
      <span class="text-muted mt-1 tx-13 ms-2 mb-0">
        <router-link :to="{ name: 'Knowledgeformcreate' }">
          /&nbsp; اضافه کردن فرم جدید
        </router-link>
      </span>
    </div>
  </div>

  <div class="col-lg-12 col-xl-12 col-md-12 col-sm-12">
    <div class="card box-shadow-0">
      <div class="card-header">
        <h4 class="card-title mb-1">ایجاد فرم جدید</h4>
      </div>
      <div class="card-body pt-0">
        <form>
          <div class="row">
            <div class="col-lg-4 col-12"> 
            <div class="form-group">
              <label for="exampleInputEmail1">نام فرم </label>
              <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                placeholder="نام فرم را وارد کنید"
              />
            </div>
            </div>


            <div class="col-lg-4 col-12"> 
											<p class="mg-b-10">   نوع فرم</p><select class="form-control select2-no-search">
											<option label="نوع فرم را انتخاب کنید">
											</option>
											<option value="1">
												دانش
											</option>
											<option value="2">
												مستند
											</option>
											<option value="3">
												استفاده از دانش
											</option>
											 
										</select>
										</div>

                                        <div class="col-lg-4 col-12">
                <div class="form-group">
                  <label>اولویت نمایش</label>
                  <input class="form-control"  type="number"/>
        
                  
  
                </div>
              </div>

            <div class="col-12"> 

            <div class="form-group">
              <label for="exampleInputPassword1">توضیحات</label>
              <textarea
                type="text"
                class="form-control"
                id="exampleInputPassword1"
                placeholder="توضیحات را وارد کنید"
                rows="8"
              ></textarea>
            </div>
            </div>
           
          </div>
          <div class="card-footer text-center">

          <button type="submit" class="btn btn-primary mt-3 mb-0">ذخیره</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>



<!-------------------------- script ------------------------->
<script setup>
</script>
<!-------------------------- script ------------------------->




<style scoped>
</style>