<template>
    <h1>상품 상세 페이지</h1>
    <div class="viewProduct">
        <p>{{ product._name }}</p>
        <p>가격: {{ product._price }}</p>
        <p>수량: {{ product._count }}</p>
        <hr />
        <p>{{ product._content }}</p>
    </div>
    <div v-if="user._type == `buyer`">
        <input type="number" v-model="count" />
        <button @click="user.cart(product._code, count)">담기</button
        >&nbsp;&nbsp;
        <button>구매</button>
    </div>
    <div v-else-if="user._id == product._seller">
        <button @click="edit">수정</button>&nbsp;&nbsp;
        <button @click="remove">삭제</button>
    </div>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

import api_product from "@api/product";
import useUserStore from "@store/user";
import useProductStore from "@store/product";

export default {
    setup() {
        const router = useRouter();
        const route = useRoute();
        const code = route.params.code;

        const user = useUserStore();
        const product = useProductStore();

        const count = ref(1);

        const edit = () => {
            router.push({
                name: "ProductEdit",
                params: { seller: product._seller },
            });
        };

        const remove = () => {
            if (confirm("정말로 삭제하시겠습니까?")) {
                api_product
                    .remove(product._seller.value, product._code.value)
                    .then(async (res) => {
                        const { status, response, message } = await res.data;

                        if (status) {
                            alert(message);
                            router.push(`/store/${product._seller.value}`);
                        } else {
                            alert(message);
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        };

        onMounted(() => {
            product.get(code);
        });

        return { user, product, count, edit, remove };
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
