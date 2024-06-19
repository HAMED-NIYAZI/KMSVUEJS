<template>
    <div class="row">
      <div class="col-xl-12 col-md-12">
        <div class="card mg-b-20 mg-lg-b-0">
          <div class="card-body p-0">
            <div class="todo-widget-header  pb-2 pd-20">
              <h5 style="padding-top: 10px;padding-bottom: 10px;  display: flex;justify-content: center;align-items: center;  ">  لوگو سازمان   </h5>
              <form>
   
                <div class="form-group">
    <div class="bd pd-20 clearfix">
        <img alt="Your Image Description" class="rounded" src="assets/img/photos/1.jpg" style="float:left; margin-right:10px;" width="100px" height="100px">
    <div class="buttons-container">
  
        <button type="button" class="btn btn-primary mt-1 mb-1" style="width: 120px;">جدید  </button>
        <button type="button" class="btn btn-warning mt-1 mb-1" style="width: 120px;">جایگزین کردن  </button>
    </div>
    </div>
</div>


              </form>
            </div>
          </div>
  
      
        </div>
      </div>
   
    
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
  .rounded {
    border-radius: 5px !important;
}
.buttons-container {
    display: flex;
    flex-direction: column; /* Stack buttons vertically */
    align-items: flex-start; /* Align buttons to the start of the container */
    margin-left: -25px; /* Adjust based on the width of the.bd pd-20 clearfix div */
}

.right-button {
    padding: 5px 10px; /* Example padding */
    background-color: #007bff; /* Example background color */
    color: white; /* Text color */
    border: none;
    cursor: pointer;
    border-radius: 5px; /* Rounded corners */
    margin-top: 5px; /* Space between buttons */
}

  </style>