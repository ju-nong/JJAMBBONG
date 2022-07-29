import Send from "./";

export default {
    name: "store",
    getStores() {
        return Send({
            url: "/getStores",
            method: "get",
        });
    },
    getProducts(id) {
        return Send({
            url: `/getProducts?id=${id}`,
            method: "get",
        });
    },
};
