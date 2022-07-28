const guest = { permission: ["guest"] };
const user = { permission: ["buyer", "seller"] };
const buyer = { permission: ["buyer"] };

export default [
    {
        path: "/",
        alias: ["/main"],
        name: "Main",
        component: () => import(`@pages/Main`),
        meta: { permission: true },
    },
    {
        path: "/login",
        name: "Login",
        component: () => import("@pages/Login"),
        meta: guest,
    },
    {
        path: "/join",
        name: "Join",
        component: () => import("@pages/Join"),
        meta: guest,
    },
    {
        path: "/my",
        name: "My",
        component: () => import("@pages/My"),
        meta: user,
    },
    {
        path: "/dashboard/:type",
        name: "Dashboard",
        component: () => import("@pages/Dashboard"),
        meta: user,
    },
    {
        path: "/cart",
        name: "Cart",
        component: () => import("@pages/Cart"),
        meta: buyer,
    },
    {
        path: "/order",
        name: "Order",
        component: () => import("@pages/Order"),
        meta: buyer,
    },
];
