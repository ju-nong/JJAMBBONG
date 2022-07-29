<template>
    <h1>스토어</h1>
    <div v-if="path == `/store`">
        <router-link
            v-for="(store, index) in stores"
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
import store from "@api/store";

export default {
    setup() {
        const stores = ref([]);
        const router = useRouter();

        const path = ref();

        watchEffect(() => {
            path.value = router.currentRoute.value.fullPath;
        });

        onMounted(() => {
            store
                .getStores()
                .then(async (res) => {
                    const { status, response, message } = await res.data;

                    if (status) {
                        stores.value = response;
                    } else {
                        alert(message);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        });

        return { stores, path };
    },
};
</script>

<style></style>
