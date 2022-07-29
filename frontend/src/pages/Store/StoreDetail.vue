<template>
    <h1>스토어 상세 페이지</h1>

    <router-link
        v-for="(product, index) in products"
        class="viewProduct"
        :to="`/product/${product.code}`"
    >
        <p>{{ product.name }}</p>
        <p>가격: {{ product.price }}</p>
        <p>수량: {{ product.count }}</p>
        <hr />
        <p>{{ product.content }}</p>
    </router-link>
</template>

<script>
import { ref, onMounted } from "vue";

import store from "@api/store";
import { useRouter } from "vue-router";

export default {
    setup() {
        const router = useRouter();

        const products = ref([]);

        onMounted(() => {
            store
                .getProducts(router.currentRoute.value.params.id)
                .then(async (res) => {
                    const { status, response, message } = await res.data;

                    if (status) {
                        products.value = response;
                    } else {
                        alert(message);
                        router.push("/main");
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        });

        return { products };
    },
};
</script>

<style>
.viewProduct {
    display: inline-block;
    border: 2px solid #000;
    margin: 10px;
}
</style>
