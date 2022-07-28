import axios from "axios";

import useUserStore from "@store/user";

const instance = axios.create({
    baseURL: "http://localhost:4040/",
});

instance.interceptors.request.use(
    function (req) {
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
