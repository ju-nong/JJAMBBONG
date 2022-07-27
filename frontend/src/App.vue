<template>
    <div>
        <input type="text" name="id" placeholder="id" v-model="id" />
        <input
            type="password"
            name="password"
            placeholder="password"
            v-model="password"
        />
        <input type="text" name="name" placeholder="name" v-model="name" />
        <button @click="user.login(id, password) ?? isEmpty()">로그인</button>
        <button
            v-if="user._id == null"
            @click="user.join(id, password, name) ?? isEmpty()"
        >
            회원가입
        </button>
        <button v-if="user._id != null" @click="user.logout()">로그아웃</button>
    </div>
</template>

<script>
import { ref } from "vue";

import useUserStore from "@store/user";

export default {
    name: "App",
    setup() {
        const user = useUserStore();

        const id = ref();
        const password = ref();
        const name = ref();

        const isEmpty = () => {
            alert("모두 입력해주세요.");
        };

        return { id, password, name, user, isEmpty };
    },
};
</script>

<script setup></script>

<style></style>
