const meta = {
    permission: true,
};

export default [
    {
        path: "/store",
        name: "StoreMain",
        meta: meta,
        component: () => import(`@pages/Store/StoreMain`),
        children: [
            {
                path: ":id",
                name: "StoreDetail",
                component: () => import(`@pages/Store/StoreDetail`),
                meta: meta,
            },
        ],
    },
];
