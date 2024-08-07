import { createRouter, createWebHistory } from "vue-router";
import { isAuth } from '@/services/HelperService'
const routes = [{
    path: '/',
    component: () => { return import('./components/Layout/Master.vue') },
    name: 'master',
    meta: {
        authRequired: true
    },
    children: [{
        path: 'dashboard',
        name: 'dashboard',
        component: () => { return import('./components/Dashboard/Dashboard.vue') }
    }, {
        path: 'profile',
        name: 'profile',
        component: () => { return import('./components/Profile/Profile.vue') }
    },

    {
        path: 'grade',
        name: 'grade',
        component: () => { return import('./components/Grade/GradePage.vue') }
    },
    {
        path: 'organization',
        name: 'organization',
        component: () => { return import('./components/Organization/OrganizationPage.vue') }
    },
    {
        path: 'organization/create',
        name: 'create_organization',
        component: () => { return import('./components/Organization/OrganizationCreate.vue') }
    },
    {
        path: 'organization/:id/edit',
        name: 'edit_organization',
        component: () => { return import('./components/Organization/OrganizationEdit.vue') }
    },
    {
        path: 'charts',
        name: 'charts_index',
        component: () => { return import('./components/Chart/ChartPage.vue') }
    },
    {
        path: 'charts/create',
        name: 'create_charts',
        component: () => { return import('./components/Chart/ChartCreate.vue') }
    },
    {
        path: 'charts/:id/edit',
        name: 'edit_charts',
        component: () => { return import('./components/Chart/ChartEdit.vue') }
    },
    {
        path: 'knowledgefield',
        name: 'knowledgefield',
        component: () => { return import('./components/KnowledgeField/KnowledgeFieldPage.vue') }
    },
    {
        path: 'knowledgefield/create',
        name: 'create_knowledgefield',
        component: () => { return import('./components/KnowledgeField/KnowledgeFieldCreate.vue') }
    },
    {
        path: 'knowledgefield/:id/edit',
        name: 'edit_knowledgefield',
        component: () => { return import('./components/KnowledgeField/KnowledgeFieldEdit.vue') }
    },
    {
        path: 'homepagesetting',
        name: 'homepagesetting',
        component: () => { return import('./components/HomePageSetting/HomePageSetting.vue') }
    },
    {
        path: 'formpage',
        name: 'formpage',
        component: () => { return import('./components/Form/FormPage.vue') }
    },
    {
        path: 'formcreate',
        name: 'formcreate',
        component: () => { return import('./components/Form/FormCreate.vue') }
    },
    {
        path: 'form/:id/edit',
        name: 'formedit',
        component: () => { return import('./components/Form/FormEdit.vue') }
    },
    {
        path: 'specialfieldpage/:id',
        name: 'specialfieldpage',
        component: () => { return import('./components/Form/SpecialFieldPage.vue') }
    },
    {
        path: 'specialfieldcreate/:id',
        name: 'specialfieldcreate',
        component: () => { return import('./components/Form/SpecialFieldCreate.vue') }
    },
    {
        path: 'specialfield/:id/edit',
        name: 'specialfieldedit',
        component: () => { return import('./components/Form/SpecialFieldEdit.vue') }
    }
    ],
    beforeEnter: (to, from, next) => {
        if (isAuth()) {
            next()
        }
        next({ name: 'login' })
    }
},
{
    path: '/:pathMatch(.*)*',
    component: () => { return import('./components/NotFound/NotFound.vue') },
    name: 'notfound'
}, {
    path: '/login',
    component: () => { return import('./components/Login/Login.vue') },
    name: 'login',
    beforeEnter: (to, from, next) => {
        if (!isAuth()) {
            next()
        }
        next({ name: 'dashboard' })
    }
},
{
    path: '/register',
    component: () => { return import('./components/Register/Register.vue') },
    name: 'register',
    beforeEnter: (to, from, next) => {
        if (!isAuth()) {
            next()
        }
        next({ name: 'dashboard' })
    }
}
];

const router = createRouter({
    history: createWebHistory(),
    routes
});



export default router;