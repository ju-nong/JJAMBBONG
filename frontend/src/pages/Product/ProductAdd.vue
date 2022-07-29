<template>
    <h1>상품 추가 페이지</h1>
    <input
        type="text"
        name="name"
        placeholder="상품명"
        v-model="product._name"
    />
    <input
        type="number"
        name="price"
        placeholder="가격"
        v-model="product._price"
    />
    <input
        type="number"
        name="count"
        placeholder="개수"
        v-model="product._count"
    />
    <textarea
        name="content"
        cols="30"
        rows="10"
        placeholder="상품 설명"
        v-model="product._content"
    ></textarea>
    <button @click="add">상품 추가</button>
</template>

<script>
import { ref } from "vue";

import useProductStore from "@store/product";

export default {
    setup() {
        const product = useProductStore();

        const add = () => {
            if (product.add() === true) {
                alert("값을 모두 입력해주세요.");
            }
        };

        return { product, add };
    },
};
</script>

<style>
input {
    border: 1px solid #000;
}
</style>
