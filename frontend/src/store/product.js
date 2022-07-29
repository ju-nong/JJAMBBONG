import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import product from "@api/product";
import { useRouter } from "vue-router";
import router from "@/router";

export const useProductStore = defineStore("store", () => {
    const _seller = ref();
    const _code = ref();
    const _name = ref();
    const _price = ref();
    const _count = ref();
    const _content = ref();

    const allPrint = () => {
        console.log(_seller.value);
        console.log(_code.value);
        console.log(_name.value);
        console.log(_price.value);
        console.log(_count.value);
        console.log(_content.value);
    };

    const reset = () => {
        _seller.value = null;
        _code.value = null;
        _name.value = null;
        _price.value = null;
        _count.value = null;
        _content.value = null;
    };

    const get = (code) => {
        product
            .get(code)
            .then(async (res) => {
                const { status, response, message } = await res.data;

                if (status) {
                    _seller.value = response.seller;
                    _code.value = response.code;
                    _name.value = response.name;
                    _price.value = response.price;
                    _count.value = response.count;
                    _content.value = response.content;
                } else {
                    alert(message);
                    const router = useRouter();
                    router.push("/main");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const add = () => {
        if (
            _areNull([_name.value, _price.value, _count.value, _content.value])
        ) {
            return true;
        }
        product
            .add(_name.value, _price.value, _count.value, _content.value)
            .then(async (res) => {
                const { status, response, message } = await res.data;

                if (status) {
                    alert(message);
                    reset();
                } else {
                    alert(message);
                }
            })
            .catch((error) => {
                _exception(error);
            });
    };

    const edit = () => {
        if (
            _areNull([_name.value, _price.value, _count.value, _content.value])
        ) {
            return true;
        }
        product
            .edit(
                _code.value,
                _name.value,
                _price.value,
                _count.value,
                _content.value,
            )
            .then(async (res) => {
                const { status, response, message } = await res.data;

                if (status) {
                    reset();
                    alert(message);
                    router.push(`/product/${response}`);
                } else {
                    alert(message);
                }
            })
            .catch((error) => {
                _exception(error);
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
        value == null || value == undefined || String(value).trim() === "";

    const _areNull = (values) => {
        for (const value in values) {
            if (_isNull(values[value])) {
                return true;
            }
        }
        return false;
    };

    return {
        _seller,
        _code,
        _name,
        _price,
        _count,
        _content,
        allPrint,
        get,
        add,
        edit,
    };
});

export default useProductStore;
