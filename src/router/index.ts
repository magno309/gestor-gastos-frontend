import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);
const routes: Array<RouteConfig> = [
    {
        path: "/",
        alias: "/movimientos",
        name: "movimientos",
        component: () => import("../components/MovimientosList.vue")
    },
    {
        path: "/movimientos/:id",
        name: "movimientos-details",
        component: () => import("../components/MovimientosDetails.vue")
    },
    {
        path: "/add",
        name: "add",
        component: () => import("../components/AddMovimiento.vue")
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;