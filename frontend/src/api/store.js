import Send from "./";

export default {
    name: "store",
    getStores() {
        return Send({
            url: "/getStores",
            method: "get",
        });
    },
    productAdd(name, price, count, content) {
        return Send({
            url: "/productAdd",
            method: "post",
            data: {
                name: name,
                price: price,
                count: count,
                content: content,
            },
        });
    },
};
