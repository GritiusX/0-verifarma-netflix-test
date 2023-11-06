<template>
	<section class="register-main-section">
		<FormKit
			type="form"
			@submit="register"
			form-class="login-formkit-main-container"
			id="registerForm"
			submit-label="Register"
			:submit-attrs="{
				inputClass: 'formkit-button-classes',
			}"
		>
			<div class="register-input-container">
				<FormKit
					outer-class="inside-outer-class"
					label-class="inside-label-class"
					input-class="inside-input-class"
					messages-class="inside-messages-class"
					type="text"
					label="First name"
					name="firstName"
					id="firstName"
					validation="required|firstName"
					placeholder="First name"
				/>
				<FormKit
					outer-class="inside-outer-class"
					label-class="inside-label-class"
					input-class="inside-input-class"
					messages-class="inside-messages-class"
					type="text"
					label="Last name"
					name="lastName"
					id="lastName"
					validation="required|lastName"
					placeholder="Last name"
				/>
			</div>
			<div class="register-input-container">
				<FormKit
					outer-class="inside-outer-class"
					label-class="inside-label-class"
					input-class="inside-input-class"
					messages-class="inside-messages-class"
					type="email"
					label="Email"
					name="email"
					id="email"
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
					id="password"
					validation="required|password"
					placeholder="A1b2C3d4"
				/>
			</div>
		</FormKit>
		<p class="mt-4">
			Already registered? Then you should
			<router-link to="/login" class="text-red-500 font-medium"
				>Login!</router-link
			>
		</p>
	</section>
</template>
<script setup>
import { RouterLink } from "vue-router";

import { useUserStore } from "../stores/user";
const userStore = useUserStore();

const register = (values) => {
	const userToRegister = {
		full_name: `${values.firstName} ${values.lastName}`,
		email: values.email,
		password: values.password,
	};
	userStore.registerUser(userToRegister);
};
</script>

<style>
.register-main-section {
	@apply flex relative flex-col w-full md:w-[90%] lg:w-[70%] xl:w-[60%] 2xl:w-[40%] mx-auto;
}
.login-formkit-main-container {
	@apply flex flex-col gap-2 w-full items-center border p-4 rounded-xl mt-36;
}
.register-input-container {
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
