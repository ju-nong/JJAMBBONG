<template>
    <h1>상품 추가 페이지</h1>
    <input type="text" name="name" v-model="name" />
    <input type="number" name="price" v-model="price" />
    <input type="number" name="count" v-model="count" />
    <textarea name="content" cols="30" rows="10" v-model="content"></textarea>
</template>

<script>
import { ref } from "vue";

export default {
    setup() {
        const name = ref("");
        const price = ref(0);
        const count = ref(0);
        const content = ref("");

        return { name, price, count, content };
    },
};
</script>

<style></style>
