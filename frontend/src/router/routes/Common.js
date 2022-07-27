const meta = {
    permission: true,
};

export default [
    {
        path: "/",
        alias: ["/main"],
        name: "Main",
        component: () => import(`@pages/Main`),
        meta: meta,
    },
    {
        path: "/store",
        name: "Store",
        component: () => import(`@pages/Store`),
        meta: meta,
        children: [
            {
                path: "/detail",
                name: "Detail",
                component: () => import(`@pages/Detail`),
                meta: meta,
            },
        ],
    },
];
