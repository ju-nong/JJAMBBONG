const meta = {
    permission: ["seller", "buyer"],
};

export default [
    {
        path: "/service",
        name: "Service",
        meta: meta,
        children: [
            {
                path: "/my",
                name: "My",
                component: () => import(`@pages/Service/My`),
                meta: meta,
            },
        ],
    },
];
