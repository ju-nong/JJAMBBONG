import { createApp } from "vue";
import App from "./App";
import { createPinia } from "pinia";
import router from "@router";

const app = createApp(App);
const pinia = createPinia();

app.use(router).use(pinia).mount("#app");
