import "./assets/main.css";
import "primeicons/primeicons.css";
import "@animxyz/core";
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import { plugin, defaultConfig } from "@formkit/vue";
import PrimeVue from "primevue/config";
import { registerComponents } from "./componentRegistration";
import VueAnimXyz from "@animxyz/vue3";
import Vue3Toasity from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const app = createApp(App);
const pinia = createPinia();
registerComponents(app);

app
	.use(pinia)
	.use(Vue3Toasity, { autoClose: 3000 })
	.use(plugin, defaultConfig)
	.use(VueAnimXyz)
	.use(router)
	.use(PrimeVue, { unstyled: true })
	.mount("#app");
