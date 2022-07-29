import Send from "./";

export default {
    name: "product",
    get(code) {
        return Send({
            url: `/product/${code}`,
            method: "get",
        });
    },
    add(name, price, count, content) {
        return Send({
            url: "/product/add",
            method: "post",
            data: {
                name: name,
                price: price,
                count: count,
                content: content,
            },
        });
    },
    edit(code, name, price, count, content) {
        return Send({
            url: "/product/edit",
            method: "post",
            data: {
                code: code,
                name: name,
                price: price,
                count: count,
                content: content,
            },
        });
    },
    remove(seller, code) {
        return Send({
            url: "/product/remove",
            method: "post",
            data: {
                seller: seller,
                code: code,
            },
        });
    },
};
