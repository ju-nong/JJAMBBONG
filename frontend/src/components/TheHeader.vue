<template>
    <header>
        <router-link to="/">Main</router-link>
        <router-link to="/store">Store</router-link>
        <span v-if="user._type == `seller`">
            <router-link :to="`/product/add`">Add</router-link>
        </span>
        <span v-if="user._type == `buyer`">
            <router-link to="/cart">Cart</router-link>
        </span>
        <span v-if="user._type == `guest`">
            <router-link to="/login">Login</router-link>
            <router-link to="/join">Join</router-link>
        </span>
        <span v-else>
            <router-link :to="`/dashboard/${user._type}`"
                >Dashboard</router-link
            >
            <router-link to="/my">My</router-link>
            <a href="#" @click="user.logout">Logout</a>
        </span>
    </header>
</template>

<script>
import { ref } from "vue";

import useUserStore from "@store/user";

export default {
    name: "TheHeader",
    setup() {
        const user = useUserStore();

        return { user };
    },
};
</script>

<style lang="scss" scoped>
a {
    margin: 10px;
}
</style>
