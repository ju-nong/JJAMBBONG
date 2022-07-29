import Send from "./";

export default {
    name: "service",
    cart(code, count) {
        return Send({
            url: "/cart",
            method: "post",
            data: {
                code: code,
                count: count,
            },
        });
    },
};
