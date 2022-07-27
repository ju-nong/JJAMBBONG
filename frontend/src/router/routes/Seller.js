const meta = {
    permission: ["seller"],
};

export default [
    {
        path: "/seller",
        name: "Seller",
        meta: meta,
        children: [
            {
                path: "/dashboard",
                name: "Dashboard",
                component: () => import(`@pages/seller/Dashboard`),
                meta: meta,
            },
            {
                path: "/add",
                name: "Add",
                component: () => import(`@pages/seller/Add`),
                meta: meta,
            },
            {
                path: "/edit",
                name: "Edit",
                component: () => import(`@pages/seller/Edit`),
                meta: meta,
            },
        ],
    },
];
