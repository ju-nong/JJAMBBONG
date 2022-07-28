<template>
    <h1>로그인 페이지</h1>
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

    <button @click="login">로그인</button>
</template>

<script>
import { ref } from "vue";

import useUserStore from "@store/user";
import router from "@router";

export default {
    setup() {
        const id = ref("");
        const password = ref("");

        const login = () => {
            const user = useUserStore();

            if (user.login(id.value, password.value)) {
                alert("값을 모두 입력해주세요.");
            } else {
                //router.push("main");
            }
        };

        return { id, password, login };
    },
};
</script>

<style></style>
