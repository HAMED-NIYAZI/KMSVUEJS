<template>
    <div class="breadcrumb-header justify-content-between">
        <div class="my-auto">
            <div class="d-flex">
                <router-link :to="{ name: 'dashboard' }" class="content-title mb-0 my-auto">داشبورد</router-link>
                <span class="text-muted mt-1 tx-13 ms-2 mb-0">/</span>
                <span class="text-muted">نمای درختی</span>
            </div>
        </div>
    </div>
    <div class="col-xl-12">
        <div class="card">
            <div class="card-header pb-0">
                <div class="d-flex justify-content-between">
                    <h4 class="card-title mg-b-0">نمای درختی</h4>
                </div>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-lg-6">
                        <div v-if="loading">
                            <span class=" spinner-border spinner-border-sm"></span>
                        </div>
                        <template v-else>
                            <div>
                                <div>
                                    <p>oneTree</p>
                                    <div v-if="oneTreeItemValue.id">
                                        <p>آدی : {{ oneTreeItemValue.id }}</p>
                                        <p>عنوان : {{ oneTreeItemValue.persianTitle }}</p>
                                    </div>
                                    <Tree tree_name="oneTree" :trees="trees" />
                                </div>
                            </div>
                        </template>
                    </div>
                    <div class="col-lg-6">
                        <div v-if="loading">
                            <span class="spinner-border spinner-border-sm"></span>
                        </div>
                        <template v-else>
                            <div>
                                <div>
                                    <p>towTree</p>
                                    <div v-if="towTreeItemValue.id">
                                        <p> آدی : {{ towTreeItemValue.id }}</p>
                                        <p>عنوان : {{ towTreeItemValue.persianTitle }}</p>
                                    </div>
                                    <Tree tree_name="towTree" :trees="towTree" />
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import TreeService from "@/services/TreeService"
import { ref, onMounted, computed } from 'vue'
import { useToast } from "vue-toastification";
import Tree from "@/components/pages/tree/Tree.vue";
import { LocalStorageService } from "@/services/LocalStorageService";
const useLocalStorageService = LocalStorageService()
const toast = useToast();
let loading = ref(false)
let trees = ref();
let towTree = ref([
    {
        "id": "0068a6ec-04ea-4170-acc4-1b94asdaa67e1759",
        "sortingNumber": 0,
        "persianTitle": "تری دوم شرکت ملی نفت ایران",
        "isSelected": false,
        "parentId": null,
        "children": [
            {
                "id": "5568a6ec-04ea-41ewew70-acc4-1b94a67e1755",
                "sortingNumber": 0,
                "persianTitle": "تری دوم شرکت ملی نفت تهران",
                "isSelected": false,
                "parentId": "0068a6ec-04ea-4170-acc4-1b94a67e1759",
                "children": [
                    {
                        "id": "4768asdsd6ec-04ea-4170-acc4-1b94a67e1752",
                        "sortingNumber": 0,
                        "persianTitle": "تری دوم شرکت ملی نفت تهران-پالایشگاه-دوم",
                        "isSelected": false,
                        "parentId": "5568a6ec-04ea-4170-acc4-1b94a67e1755",
                        "children": [
                            {
                                "id": "b3879545-dbf1-43dx-bfde-975sdsd8f77f5f17",
                                "sortingNumber": 3,
                                "persianTitle": "تری دوم ساب منوی یک",
                                "isSelected": false,
                                "parentId": "4768a6ec-04ea-4170-acc4-1b94a67e1752",
                                "children": [
                                    {
                                        "id": "41bf6cee-9abx-4126-86e4-7d6sdfs04048a6bc",
                                        "sortingNumber": 3,
                                        "persianTitle": "تری دوم ساب منوی دو",
                                        "isSelected": false,
                                        "parentId": "b3879545-dbf1-43d3-bfde-9758f77f5f17",
                                        "children": [
                                            {
                                                "id": "933639e0-6b89-4031-8f4x-12c69868sdfsd469d",
                                                "sortingNumber": 3,
                                                "persianTitle": "تری دوم ساب منوی سه",
                                                "isSelected": false,
                                                "parentId": "41bf6cee-9ab9-4126-86e4-7d604048a6bc",
                                                "children": []
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "id": "6968a6ec-04ea-4170-acc4-1b94a67esds1753",
                        "sortingNumber": 0,
                        "persianTitle": "تری دوم شرکت ملی نفت تهران-پالایشگاه-اول",
                        "isSelected": false,
                        "parentId": "5568a6ec-04ea-4170-acc4-1b94a67e1755",
                        "children": []
                    },
                    {
                        "id": "7dc0bf53sdsd-8812-426c-b41f-35f4c4603v6e",
                        "sortingNumber": 3,
                        "persianTitle": "تری دوم ساب منوی یک",
                        "isSelected": false,
                        "parentId": "5568a6ec-04ea-4170-acc4-1b94a67e1755",
                        "children": []
                    }
                ]
            },
            {
                "id": "8568a6ec-04ea-4170-accsdsd4-1b94a67e17a3",
                "sortingNumber": 0,
                "persianTitle": "تری دوم شرکت ملی نفت اراک",
                "isSelected": false,
                "parentId": "0068a6ec-04ea-4170-acc4-1b94a67e1759",
                "children": []
            }
        ]
    },
    {
        "id": "31568e0a-808f-4871-86a9-7216sdsdrthcccd14d8",
        "sortingNumber": 1,
        "persianTitle": "تری دوم وزارت بهداشت",
        "isSelected": false,
        "parentId": null,
        "children": [
            {
                "id": "51568e0a-808f-4871-86a9-dfgdgd",
                "sortingNumber": 0,
                "persianTitle": "تری دوم سازمان انتقال خون",
                "isSelected": false,
                "parentId": "31568e0a-sdsd",
                "children": [
                    {
                        "id": "77568e0a-808f-4871-86a9-7216ccsdsdfd1",
                        "sortingNumber": 0,
                        "persianTitle": "تری دوم سازمان انتقال خون تهران",
                        "isSelected": false,
                        "parentId": "51568e0a-808f-4871-86a9-7216cccd14d3",
                        "children": []
                    },
                    {
                        "id": "88568e0a-80sdfsda9-7216cccd14d9",
                        "sortingNumber": 0,
                        "persianTitle": "تری دوم سازمان انتقال خون گیلان",
                        "isSelected": false,
                        "parentId": "51568e0a-808f-4871-86a9-7216cccd14d3",
                        "children": [
                            {
                                "id": "00sdfsd-7216cccd14d1",
                                "sortingNumber": 0,
                                "persianTitle": "تری دوم سازمان انتقال خون فومن",
                                "isSelected": false,
                                "parentId": "88568e0a-808sdfccd14d9",
                                "children": []
                            },
                            {
                                "id": "99568e0a-8ddddddd7216cccd14d1",
                                "sortingNumber": 0,
                                "persianTitle": "تری دوم سازمان انتقال خون رشت",
                                "isSelected": false,
                                "parentId": "88568e0a-808f-4871-86a9-7216cccd14d9",
                                "children": []
                            }
                        ]
                    }
                ]
            },
            {
                "id": "66568e0a-808f-4871-86sdfsdf16cccd14d9",
                "sortingNumber": 0,
                "persianTitle": "تری دوم پزشکی قانونی",
                "isSelected": false,
                "parentId": "31568e0a-808f-4871-86a9-7sdfs216cccd14d8",
                "children": [
                    {
                        "id": "74568e0a-8sdfsdf08f-4871-86a9-7216cccd14d1",
                        "sortingNumber": 1,
                        "persianTitle": "تری دوم پزشکی قانونی تهران",
                        "isSelected": false,
                        "parentId": "66568e0a-80dddd8f-4871-86a9-7216cccd14d9",
                        "children": []
                    }
                ]
            },
            {
                "id": "f45f4ec6-6bb9-4e66-84tjyuty43-175e5f2acafa",
                "sortingNumber": 1,
                "persianTitle": "تری دوم ارژانس",
                "isSelected": false,
                "parentId": "31568e0a-808f-4871-86a9-7216cccd14d8",
                "children": []
            }
        ]
    },
    {
        "id": "60568e0a-808f-4871-86a9-sdsdqwe",
        "sortingNumber": 1,
        "persianTitle": "تری دوم  وزارت خانه",
        "isSelected": false,
        "parentId": null,
        "children": []
    }
])
async function index() {
    loading.value = true;
    try {
        const response = await TreeService.tree();
        if (response.data.result == 0) {
            trees.value = response.data.data;
        } else if (response.data.result == 5) {
            toast.warning(response.data.message, {
                timeout: 2000
            });
        } else {
            toast.warning(response.data.message, {
                timeout: 2000
            });
        }
    } catch (err) {

    } finally {
        loading.value = false
    }
}
onMounted(() => {
    index()
})
const oneTreeItemValue = computed(() => useLocalStorageService.getTreeSelectedItem('oneTree'))
const towTreeItemValue = computed(() => useLocalStorageService.getTreeSelectedItem('towTree'))
</script>