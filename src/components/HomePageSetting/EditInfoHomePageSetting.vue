<template>
  <div class="row">
    <div class="col-xl-12 col-md-12">
      <div class="card mg-b-20 mg-lg-b-0">
        <div class="card-body p-0">
          <div class="todo-widget-header  pb-2 pd-20">
            <h5 style="padding-top: 10px;padding-bottom: 10px;  display: flex;justify-content: center;align-items: center;  ">ویرایش اطلاعات صفحه نخست    </h5>
            <form>

              <div class="form-group">
                <div class="row">
                  <div class="col-md-2">
                    <label class="form-label">نام کاربری</label>
                  </div>
                  <div class="col-md-10">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="نام کاربری"
                      value="پتی کرایسر"
                    />
                  </div>
                </div>
              </div>

              <div class="form-group">
                <div class="row">
                  <div class="col-md-2">
                    <label class="form-label">نشانی</label>
                  </div>
                  <div class="col-md-10">
                    <textarea
                      class="form-control"
                      name="example-textarea-input"
                      rows="10"
                      placeholder="نشانی"
                    >
San Francisco, CA</textarea
                    >
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        <!--ذخیره-->
        <div class="card-footer">
          <a
            class="btn btn-primary"
            href="#"
            data-placement="top"
            data-bs-toggle="tooltip"
            title=""
            data-bs-original-title="اختصاص کار"
            >ذخیره
          </a>
        </div>
      </div>
    </div>
    <!--ذخیره-->

  
  </div>
</template>
 <script>
</script>
 
  
  <style scoped>
.card-footer {
  display: flex;
  justify-content: center; 
  align-items: center;  
}
</style>