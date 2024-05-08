<template>
  <div class="col-xl-12">
    <div class="text-center" v-if="loading">
      <span class="spinner-border spinner-border-sm"></span>
    </div>
    <form v-else action="#">
      <div class="card">
        <div class="card-header pb-0">
          <div class="d-flex justify-content-between">
            <h4 class="card-title mg-b-0">ویرایش پایه تحصیلی</h4>
          </div>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-6">
              <div class="form-group">
                <label>عنوان پایه تحصیلی</label>
                <input
                  class="form-control"
                  v-model.lazy="formData.gradeName"
                  placeholder="عنوان پایه تحصیلی را وارد کنید"
                  type="text"
                />
                <div
                  style="font-size: 11px"
                  v-if="Object.hasOwn(errors, 'gradeName')"
                  class="text-danger"
                >
                  {{ errors.gradeName.shift() }}
                </div>
              </div>
            </div>
            <div class="col-6">
              <div class="form-group">
                <label>اولویت نمایش</label>
                <select
                  class="form-control"
                  v-model.lazy="formData.sortingNumber"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
                <div
                  style="font-size: 11px"
                  v-if="Object.hasOwn(errors, 'sortingNumber')"
                  class="text-danger"
                  :v-text="errors.sortingNumber.shift()"
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div class="card-footer text-center">
          <div class="text-center" v-if="updateLoading">
            <span class="spinner-border spinner-border-sm"></span>
          </div>
          <button
            type="button"
            v-else
            @click="updateGrade($event)"
            class="btn btn-primary"
          >
            ثبت
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
<script setup>
import GradeService from "@/services/GradeService";
import { reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";
let errors = {};
const route = useRoute();
const router = useRouter();
const toast = useToast();
let loading = ref(false);
let updateLoading = ref(false);
let formData = reactive({
  gradeName: "",
  sortingNumber: "",
  id: route.params.id,
});

// Declare the prop
const props = defineProps({
  id: String, // Specify the type of the prop
});
const emit = defineEmits(['updateGradeList']); // Define emit

async function getById() {
  loading.value = true;
  errors = {};
  try {
    const response = await GradeService.getById(props.id);
    if (response.data.result == 0) {
      formData = response.data.data;
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
async function updateGrade() {
  updateLoading.value = true;
  errors = {};
  try {
    const response = await GradeService.update(formData);
    if (response.data.result == 0) {
      toast.success(response.data.message, {
        timeout: 2000,
      });

      emit("updateGradeList"); // Use emit instead of this.$emit
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
    updateLoading.value = false;
  }
}
getById();
</script>