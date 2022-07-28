import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import store from "@api/store";
import router from "@router";

export const useStore = defineStore("store", () => {
    const stores = ref([]);

    const getStores = () => {
        store
            .getStores()
            .then(async (res) => {
                const { status, response, message } = await res.data;

                if (status) {
                    stores.value = response;
                } else {
                    alert(message);
                }
            })
            .catch((error) => {
                _exception(error);
            });
    };

    const productAdd = (name, price, count, content) => {
        store
            .productAdd(name, price, count, content)
            .then(async (res) => {
                const { status, response, message } = await res.data;

                if (status) {
                    alert("상품이 추가 되었습니다.");
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
        value == null || value == undefined || value.trim() === "";

    return {
        stores,
        getStores,
        productAdd,
    };
});

export default useStore;
