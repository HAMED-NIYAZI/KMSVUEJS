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
        path: 'tree',
        name: 'tree.index',
        component: () => { return import('./components/pages/tree/Index.vue') }
    },],
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