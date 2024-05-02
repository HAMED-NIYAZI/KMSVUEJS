import { createRouter, createWebHistory } from "vue-router";
import { isAuth } from '@/utils/helpers'
const routes = [{
        path: '/',
        component: () => { return import ('./layouts/Master.vue') },
        name: 'master',
        meta: {
            authRequired: true
        },
        children: [{
            path: 'dashboard',
            name: 'dashboard',
            component: () => { return import ('./components/pages/Dashboard.vue') }
        }, {
            path: 'profile',
            name: 'profile',
            component: () => { return import ('./components/pages/Profile.vue') }
        },
        
        {
            path: 'grades',
            name: 'grades.index',
            component: () => { return import ('./components/pages/grade/Index.vue') }
        }, {
            path: 'grades/:id/edit',
            name: 'grades.edit',
            component: () => { return import ('./components/pages/grade/Edit.vue') }
        }, {
            path: 'grades/create',
            name: 'grades.create',
            component: () => { return import ('./components/pages/grade/Create.vue') }
        }, 
        {
            path: 'gradenew',
            name: 'gradenew',
            component: () => { return import ('./components/GradeNew/GradePage.vue') }
        },
        {
            path: 'tree',
            name: 'tree.index',
            component: () => { return import ('./components/pages/tree/Index.vue') }
        }, ],
        beforeEnter: (to, from, next) => {
            if (isAuth()) {
                next()
            }
            next({ name: 'login' })
        }
    },
    {
        path: '/:pathMatch(.*)*',
        component: () => { return import ('./components/NotFound.vue') },
        name: 'notfound'
    }, {
        path: '/login',
        component: () => { return import ('./components/Login.vue') },
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
        component: () => { return import ('./components/Register.vue') },
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