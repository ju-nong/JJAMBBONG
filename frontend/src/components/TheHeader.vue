<template>
    <header>router</header>
</template>

<script>
import useUserStore from "@store/user";

export default {
    name: "TheHeader",
    setup() {
        const user = useUserStore();

        return { user };
    },
};
</script>

<style></style>
