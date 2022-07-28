const meta = { permission: ["seller"] };

export default [
    {
        path: "/Product",
        name: "Product",
        meta: { permission: false },
        component: () => import(`@pages/View`),
        children: [
            {
                path: ":code",
                name: "ProductDetail",
                meta: { permission: true },
                component: () => import(`@pages/Product/ProductDetail`),
            },
            {
                path: "add",
                name: "ProductAdd",
                meta: meta,
                component: () => import(`@pages/Product/ProductAdd`),
            },
            {
                path: "edit/:code",
                name: "ProductEdit",
                meta: meta,
                component: () => import(`@pages/Product/ProductEdit`),
            },
        ],
    },
];
