const guest = {
    meta: {
        permission: ["guest"],
    },
};

export default [
    {
        path: "/login",
        name: "Login",
        component: () => import("@pages/Login"),
        ...guest,
    },
    {
        path: "/join",
        name: "Join",
        component: () => import("@pages/Join"),
        ...guest,
    },
];
