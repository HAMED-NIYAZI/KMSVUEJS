<template>
 
    <div class="col-xl-12">
        <div class="card">
            <div class="card-header pb-0">
                <div class="d-flex justify-content-between">
                    <h4 class="card-title mg-b-0">سازمان ها </h4>
                    <button type="button" class="btn btn-success btn-icon"  ><i
                            class="mdi mdi-refresh"></i></button>
                </div>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-lg-4">
                        <div v-if="loading">
                            <span class=" spinner-border spinner-border-sm"></span>
                        </div>
                        <ul id="treeview1" v-else class="tree">
                            <Tree :trees="trees" />
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import OrganizationService from "@/services/OrganizationService"
import { ref, onMounted } from 'vue'
import { useToast } from "vue-toastification";
import Swal from 'sweetalert2'
import Tree from "@/components/Tree/Tree.vue";
const toast = useToast();
let loading = ref(false)
let trees = ref();
let errors = {}

async function index() {
    loading.value = true;
    errors = {}
    try {
        const response = await OrganizationService.GetOrganizationTree();
        if (response.data.result == 0) {
            trees.value = response.data.data;
            setTimeout(() => {
                $.fn.extend({
                    treed: function (o) {
                        var closedClass = 'si si-plus';
                        var openedClass = 'si si-minus';

                        if (typeof o != 'undefined') {
                            if (typeof o.openedClass != 'undefined') {
                                openedClass = o.openedClass;
                            }
                            if (typeof o.closedClass != 'undefined') {
                                closedClass = o.closedClass;
                            }
                        };

                        //initialize each of the top levels
                        var tree = $(this);
                        tree.addClass("tree");
                        tree.find('li').has("ul").each(function () {
                            var branch = $(this); //li with children ul
                            branch.prepend("<i class='si " + closedClass + "'></i>");
                            branch.addClass('branch');
                            branch.on('click', function (e) {
                                if (this == e.target) {
                                    var icon = $(this).children('i:first');
                                    icon.toggleClass(openedClass + " " + closedClass);
                                    $(this).children().children().toggle();
                                }
                            })
                            branch.children().children().toggle();
                        });
                        tree.find('.branch i').each(function () {

                            $(this).on('click', function (e) {
                                $(this).closest('li').click();
                                e.preventDefault();
                            });
                        });
                        //fire event from the dynamically added icon
                        tree.find('.branch .indicator').each(function () {

                            $(this).on('click', function () {
                                $(this).closest('li').click();
                            });
                        });
                        //fire event to open branch if the li contains an anchor instead of text
                        tree.find('.branch>a').each(function () {
                            $(this).on('click', function (e) {
                                $(this).closest('li').click();
                                e.preventDefault();
                            });
                        });
                        //fire event to open branch if the li contains a button instead of text
                        tree.find('.branch>button').each(function () {

                            $(this).on('click', function (e) {
                                $(this).closest('li').click();
                                e.preventDefault();
                            });
                        });
                    }
                });

                //Initialization of treeviews

                $('#treeview1').treed();


            }, 10);
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
</script>