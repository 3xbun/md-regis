import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import Login from '../views/Login.vue';
import Scores from '../views/Scores.vue';


const routes = [
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard
    },
    {
        path: '/',
        redirect: '/dashboard'
    },
    {
        path: '/scoring',
        name: 'score',
        component: Scores
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router