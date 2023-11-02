import "./assets/main.css";
import "primeicons/primeicons.css";
import "@animxyz/core";
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import Vueform from "@vueform/vueform";
import vueformConfig from "./../vueform.config";
import PrimeVue from "primevue/config";
import { registerComponents } from "./componentRegistration";
import VueAnimXyz from "@animxyz/vue3";

const app = createApp(App);
const pinia = createPinia();
registerComponents(app);

app
	.use(pinia)
	.use(Vueform, vueformConfig)
	.use(VueAnimXyz)
	.use(router)
	.use(PrimeVue, { unstyled: true })
	.mount("#app");
