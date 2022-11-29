import {createRouter, createWebHistory} from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Products from "../views/Products.vue";
import Login from "../views/Login.vue";
import RequestPassword from "../views/RequestPassword.vue";
import ResetPassword from "../views/ResetPassword.vue";
import NotFound from "../views/NotFound.vue";
import AppLayout from "../components/AppLayout.vue";
import store from "../store";

const routes = [
    {
        path: '/app',
        component: AppLayout,
        name: 'app',
        meta: {requiresAuth: true},
        children: [
            {path: 'dashboard', component: Dashboard, name: 'app.dashboard'},
            {path: 'products', component: Products, name: 'app.products'},
            {path: 'dashboard', component: Dashboard, name: 'app.users'},
            {path: 'dashboard', component: Dashboard, name: 'app.reports'},
        ]
    },
    {
        path: '/login',
        component: Login,
        name: 'login',
        meta: {
            requiresGuest: true
        }
    },
    {
        path: '/request-password',
        component: RequestPassword,
        name: 'requestPassword',
        meta: {
            requiresGuest: true
        }
    },
    {
        path: '/reset-password/:token',
        component: ResetPassword,
        name: 'resetPassword',
        meta: {
            requiresGuest: true
        }
    },
    {
        path: '/:pathMatch(.*)',
        component: NotFound,
        name: 'notfound'
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !store.state.user.token) {
        next({name: 'login'})
    } else if (to.meta.requiresGuest && store.state.user.token) {
        next({name: 'app.dashboard'})
    } else {
        next()
    }
})

export default router
