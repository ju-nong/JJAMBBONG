import { createWebHistory, createRouter } from "vue-router";
import { useUserStore } from "@store/user";

import { Main, Store, Product } from "./routes";

const router = createRouter({
    history: createWebHistory(),
    routes: [...Main, ...Store, ...Product],
});

router.beforeEach((to, from, next) => {
    const { permission } = to.meta;

    if (permission === true) {
        next();
    } else {
        const user = useUserStore();

        if (permission.includes(user._type)) {
            next();
        } else {
            alert("접근 권한이 없습니다.");
            next("/");
        }
    }
});

export default router;
