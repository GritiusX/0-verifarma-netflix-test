import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "../stores/user";
import routes from "./routes";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: routes,
});

router.beforeEach((to, from) => {
	const store = useUserStore();

	if (to.meta.requiresAuth && !store.isAuthenticated) {
		return {
			path: "/login",
		};
	}
});
export default router;
