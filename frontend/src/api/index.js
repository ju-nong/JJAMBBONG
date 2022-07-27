import axios from "axios";

import useUserStore from "@store/user";

const instance = axios.create({
    baseURL: "http://localhost:4040/",
});

instance.interceptors.request.use(
    function (req) {
        if (!(req.url == "/login" || req.url == "/join")) {
            const user = useUserStore();
            const id = user.id;
            if (!id) {
                throw new axios.Cancel("로그인을 해주세요.");
            } else {
                req.headers.id = id;
            }
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
