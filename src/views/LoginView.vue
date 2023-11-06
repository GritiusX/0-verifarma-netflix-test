<template>
	<section class="login-main-section">
		<FormKit
			type="form"
			@submit="login"
			form-class="login-formkit-main-container"
			submit-label="Login"
			:submit-attrs="{
				inputClass: 'formkit-button-classes',
			}"
		>
			<div class="login-input-container">
				<FormKit
					outer-class="inside-outer-class"
					label-class="inside-label-class"
					input-class="inside-input-class"
					messages-class="inside-messages-class"
					type="email"
					label="Email"
					name="email"
					validation="required|email"
					placeholder="user@verifarma.com"
				/>
				<FormKit
					outer-class="inside-outer-class"
					label-class="inside-label-class"
					input-class="inside-input-class"
					messages-class="inside-messages-class"
					type="password"
					label="Password"
					name="password"
					validation="required|password"
					placeholder="A1b2C3d4"
				/>
			</div>
		</FormKit>
		<p class="mt-4">
			No account yet? Then
			<router-link to="/register" class="text-red-500 font-medium"
				>Register!</router-link
			>
		</p>
	</section>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { toast } from "vue3-toastify";
const userStore = useUserStore();
const router = useRouter();

const login = (values) => {
	userStore.loginUser(values);
	if (userStore.userNotExist) {
		toast.info(`${userStore.userNotExistMessage}`, {
			autoClose: 2000,
			closeOnClick: true,
			theme: "colored",
			position: toast.POSITION.TOP_RIGHT,
		});
	}
	if (userStore.isAuthenticated) {
		router.push("/");
	}
};
</script>

<style>
.login-main-section {
	@apply flex flex-col w-full md:w-[90%] lg:w-[70%] xl:w-[60%] 2xl:w-[40%] mx-auto;
}
.login-formkit-main-container {
	@apply flex flex-col gap-2 w-full items-center border p-4 rounded-xl mt-36;
}
.login-input-container {
	@apply flex flex-col xsm:flex-row items-center w-full gap-4;
}

.inside-outer-class {
	@apply w-full h-[95px];
}
.inside-label-class {
	@apply text-xl;
}
.inside-input-class {
	@apply w-full rounded-lg p-2 text-red-500 outline-none focus-within:outline-2 focus-within:outline-blue-500 focus-within:transition-all focus-within:duration-300;
}
.inside-messages-class {
	@apply text-red-500;
}
</style>
