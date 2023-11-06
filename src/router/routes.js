const routes = [
	{
		path: "/",
		name: "Home",
		alias: ["/home", "/index", "/main", "/main-page"],
		meta: { requiresAuth: true },
		component: () => import("../views/HomeView.vue"),
	},
	{
		path: "/:id",
		name: "Details",
		meta: { requiresAuth: true },
		component: () => import("../views/DetailsView.vue"),
	},
	{
		path: "/login",
		name: "Login",
		alias: ["/log-in", "/logIn"],
		component: () => import("../views/LoginView.vue"),
	},
	{
		path: "/register",
		name: "Register",
		alias: ["/register", "/signUp", "/sign-up", "/signUpUser", "/sign-up-user"],
		component: () => import("../views/RegisterView.vue"),
	},
];
export default routes;
