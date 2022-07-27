import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import sign from "@api/sign";

export const useUserStore = defineStore("user", () => {
    const _id = ref();
    const _password = ref();
    const _name = ref();
    const _cart = ref([]);

    const login = (id, password) => {
        if (_isNull(id) || _isNull(password)) return;

        sign.login(id, password)
            .then((res) => {
                const data = res.data;

                if (data.status) {
                    _id.value = id;
                    _password.value = password;
                    _name.value = data.response;
                    alert(`${_name.value}님 안녕하세요!`);
                } else {
                    alert(data.message);
                }
            })
            .catch((error) => {
                _exception(error);
            });

        return true;
    };

    const join = (id, password, name) => {
        if (_isNull(id) || _isNull(password) || _isNull(name)) return;
        sign.join(id, password, name)
            .then((res) => {
                const data = res.data;

                if (data.status) {
                    alert("회원가입 되었습니다.");
                } else {
                    alert(data.message);
                }
            })
            .catch((error) => {
                _exception(error);
            });
        return true;
    };

    const logout = () => {
        _id.value = null;
        _password.value = null;
        _name.value = null;
        _cart.value = [];
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

    return { _id, _password, _name, _cart, login, join, logout };
});

export default useUserStore;
