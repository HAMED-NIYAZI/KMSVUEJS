<!-- template -->
<template>
  <div class="row">
    <div class="col-xl-12 col-md-12">
      <div class="card mg-b-20 mg-lg-b-0">
        <div class="card-body p-0">
          <div class="todo-widget-header pb-2 pd-20">
            <h5
              style="
                padding-top: 10px;
                padding-bottom: 10px;
                display: flex;
                justify-content: center;
                align-items: center;
              "
            >
              لوگو سازمان
            </h5>
            <form>
              <div class="form-group">
                <div
                  class="bd pd-20 clearfix"
                  style="
                    display: flex;
                    justify-content: center;
                    align-items: center;
                  "
                >
                  <div class="main-img-user profile-user">
                    <img :src="logoPath" />
                    <a
                      class="fas fa-camera profile-edit"
                      style="cursor: pointer"
                      title=" آپلود لوگوی جدید"
                      @click.prevent="selectAvatar($event)"
                    ></a>
                    <input
                      type="file"
                      ref="logo"
                      @change="UpdateLogo($event)"
                      id="logo"
                      class="d-none"
                    />
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
<!-- template -->





  <!-- script -->
   <script setup>
import { reactive, ref, computed } from "vue";
import HomePageSettingService from "@/services/HomePageSettingService";

import { LocalStorageService } from "../../services/LocalStorageService";
const localStorageService = LocalStorageService();

let logoPath = computed(
  () =>
    process.env.VUE_APP_BASE_URL +
    localStorageService.getHomePageSetting.imagePath
);

function selectAvatar(e) {
  console.log('selectAvatar');
  $("#logo").click();
}

let logo = ref(null);

async function UpdateLogo(e) {
debugger;
  const target = e.target;
  console.log('target:   ',target);

  if (target && target.files) {
    logo.value = target.files[0];
    console.log('target.files[0]:   ',target.files[0]);

  }

  if (!logo.value) {
    return false;
  }

  try {
    let fd = new FormData();
    fd.append("id", localStorageService.getHomePageSetting.id);
    fd.append("imagePath",'');
    fd.append("file", logo.value);
    console.log('fd   ',fd);

    const response = await HomePageSettingService.updateLogo(fd);
    console.log('response:   ',response);

    if (response.data.result == 0) {
      toast.success(response.data.message);

      localStorageService.setHomePageSetting(response.data.data);
    } else if (response.data.result == 5) {
      toast.warning(response.data.message);
    } else {
      toast.warning(response.data.message);
    }
  } catch (err) {

    console.log('err:   ',err);

  }

}
</script>
  <!-- script -->
   
    


  <!-- style -->
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
  margin-top: 24px;
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

.main-img-user img {
  border-radius: 0%;
  -o-object-fit: cover;
  object-fit: cover;
}
.main-img-user {
  height: 75px;
  position: relative;
  width: 75px;
}
</style>
<!-- style -->

