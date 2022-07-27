const meta = {
    permission: ["buyer"],
};

export default [
    {
        path: "/buyer",
        name: "Buyer",
        meta: meta,
        children: [
            {
                path: "/order",
                name: "Order",
                component: () => import(`@pages/buyer/Order`),
                meta: meta,
            },
            {
                path: "/cart",
                name: "Cart",
                component: () => import(`@pages/buyer/Cart`),
                meta: meta,
            },
            {
                path: "/dashboard",
                name: "Dashboard",
                component: () => import(`@pages/buyer/Dashboard`),
                meta: meta,
            },
        ],
    },
];
