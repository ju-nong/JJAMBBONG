import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import sign from "@api/sign";
import service from "@api/service";
import router from "@router";

export const useUserStore = defineStore("user", () => {
    const _type = ref("buyer");
    const _id = ref("user1");
    const _password = ref("pw1");
    const _name = ref("구매자1");
    const _cart = ref([]);

    // const _type = ref("guest");
    // const _id = ref();
    // const _password = ref();
    // const _name = ref();
    // const _cart = ref([]);

    const allPrint = () => {
        console.log(`type: ${_type.value}`);
        console.log(`id: ${_id.value}`);
        console.log(`password: ${_password.value}`);
        console.log(`name: ${_name.value}`);
        console.log(`cart: ${_cart.value}`);
    };

    const login = (id, password) => {
        if (_isNull(id) || _isNull(password)) return true;

        sign.login(id, password)
            .then(async (res) => {
                const { status, response, message } = await res.data;

                if (status) {
                    const { type, id, password, name, cart } = response;

                    _type.value = type;
                    _id.value = id;
                    _password.value = password;
                    _name.value = name;
                    _cart.value = cart;

                    alert(`${name}님 안녕하세요!`);
                    router.push("main");
                } else {
                    alert(message);
                }
            })
            .catch((error) => {
                _exception(error);
            });
    };

    const join = (type, id, password, name) => {
        if (_areNull([type, id, password, name])) {
            return true;
        }
        sign.join(type, id, password, name)
            .then(async (res) => {
                const data = await res.data;

                if (data.status) {
                    alert("회원가입 되었습니다.");
                    router.push("main");
                } else {
                    alert(data.message);
                }
            })
            .catch((error) => {
                _exception(error);
            });
    };

    const logout = () => {
        alert("로그아웃 되었습니다.");
        router.push("/");
        _type.value = "guest";
        _id.value = null;
        _password.value = null;
        _name.value = null;
        _cart.value = [];
    };

    const cart = (code, count) => {
        service
            .cart(code, count)
            .then(async (res) => {
                const { status, response, message } = await res.data;

                if (status) {
                    return response;
                } else {
                    alert(message);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const _exception = (error) => {
        console.log(`error ${error}`);
        if (axios.isCancel(error)) {
            alert(error.message);
        } else {
            console.log(`error reponse ${error.response}`);
            alert("예기치 못한 에러가 발생했습니다");
        }
    };

    const _isNull = (value) =>
        value == null || value == undefined || value.trim() === "";

    const _areNull = (values) => {
        for (const value in values) {
            if (_isNull(values[value])) {
                console.log(values[value]);
                return true;
            }
        }
        return false;
    };

    return {
        _type,
        _id,
        _password,
        _name,
        _cart,
        allPrint,
        login,
        join,
        logout,
        cart,
    };
});

export default useUserStore;
