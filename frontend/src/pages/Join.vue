<template>
    <h1>회원가입 페이지</h1>
    <select name="type" v-model="type">
        <option value="buyer">구매자</option>
        <option value="seller">판매자</option></select
    ><br />
    <input
        type="text"
        name="id"
        placeholder="id"
        autocomplete="off"
        v-model="id"
    /><br />
    <input
        type="password"
        name="password"
        placeholder="password"
        autocomplete="off"
        v-model="password"
    /><br />
    <input
        type="text"
        name="name"
        placeholder="name"
        autocomplete="off"
        v-model="name"
    /><br />

    <button @click="join">회원가입</button>
</template>

<script>
import { ref } from "vue";

import useUserStore from "@store/user";
import router from "@router";

export default {
    setup() {
        const id = ref("");
        const password = ref("");
        const name = ref("");
        const type = ref("buyer");

        const join = () => {
            const user = useUserStore();

            if (user.join(type.value, id.value, password.value, name.value)) {
                alert("값을 모두 입력해주세요.");
            } else {
                //router.push("main");
            }
        };

        return { id, password, name, type, join };
    },
};
</script>

<style></style>
