import axios from "axios";

import useUserStore from "@store/user";

const instance = axios.create({
    baseURL: "http://localhost:4040/",
});

const headerList = ["/product/add", "/cart"];

instance.interceptors.request.use(
    function (req) {
        if (headerList.includes(req.url)) {
            const user = useUserStore();

            req.headers.id = user._id;
        }
        return req;
    },
    function (error) {
        return Promise.reject(error);
    },
);

instance.interceptors.response.use(
    function (res) {
        return res;
    },

    function (error) {
        return Promise.reject(error);
    },
);

export default instance;
