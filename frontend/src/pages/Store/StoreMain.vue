<template>
    <h1>스토어</h1>
    <div v-if="path == `/store`">
        <router-link
            v-for="(store, index) in store.stores"
            :key="index"
            :to="`/store/${store}`"
            >{{ store }}</router-link
        >
    </div>
    <router-view></router-view>
</template>

<script>
import { ref, onMounted, watchEffect } from "vue";
import { useRouter } from "vue-router";

import useStore from "@store/store";

export default {
    setup() {
        const store = useStore();
        const router = useRouter();

        const path = ref();

        watchEffect(() => {
            path.value = router.currentRoute.value.fullPath;
        });

        onMounted(() => {
            store.getStores();
        });

        return { store, path };
    },
};
</script>

<style></style>
