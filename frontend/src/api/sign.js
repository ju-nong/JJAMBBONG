import Send from "./";

export default {
    name: "sign",
    login(id, password) {
        return Send({
            url: "/login",
            method: "post",
            data: {
                id: id,
                password: password,
            },
        });
    },
    join(id, password, name) {
        return Send({
            url: "/join",
            method: "post",
            data: {
                id: id,
                password: password,
                name: name,
            },
        });
    },
};
