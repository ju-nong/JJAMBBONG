<template>
    <h1>상품 수정 페이지</h1>
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
    <button @click="product.edit">상품 수정</button>
</template>

<script>
import { ref, onMounted } from "vue";

import { useRouter, useRoute } from "vue-router";
import useUserStore from "@store/user";
import useProductStore from "@store/product";

export default {
    setup() {
        const router = useRouter();
        const route = useRoute();

        const user = useUserStore();
        const product = useProductStore();

        onMounted(() => {
            const { code, seller } = route.params;

            if (seller != user._id) {
                alert("잘못된 접근입니다.");
                router.back();
            }

            product.get(code);
        });

        return { user, product };
    },
};
</script>

<style></style>
