<template>
    <div class="wrap">
        <TheHeader />
        <router-view></router-view>
        <!-- <input type="text" name="id" placeholder="id" v-model="id" />
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
        <button v-if="user._id != null" @click="user.logout()">로그아웃</button> -->
    </div>
</template>

<script>
import TheHeader from "@components/TheHeader";

export default {
    name: "App",
    components: { TheHeader },
    setup() {},
};
</script>

<style lang="scss">
* {
    margin: 0;
    padding: 0;
    border: 0;
    box-sizing: border-box;
}
a {
    color: #000;
    text-decoration: none;
}
</style>
