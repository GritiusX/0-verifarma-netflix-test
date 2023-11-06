import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import { reset } from "@formkit/core";

export const useUserStore = defineStore("userStore", () => {
	const isAuthenticated = ref(false);
	const registeredUsers = ref([]);
	const userAlreadyExists = ref(false);
	const userAlreadyExistsErrorMessage = ref("User email already exists");
	const userCreated = ref(false);
	const userCreatedMessage = ref(
		"User created successfully, redirecting to Login"
	);
	const userNotExist = ref(false);
	const userNotExistMessage = ref(
		"User does not exist. Please register your account"
	);
	const user = ref();
	const router = useRouter();

	const registerUser = (payload) => {
		registeredUsers.value =
			JSON.parse(localStorage.getItem("registered-users")) || [];
		userCreated.value = false;
		userAlreadyExists.value = false;

		const user = {
			id: (Math.random() + 1).toString(36).substring(7),
			...payload,
		};

		const userExists = registeredUsers.value.find(
			(regUser) => regUser.email === user.email
		);

		if (userExists) {
			toast.error(`${userAlreadyExistsErrorMessage.value}`, {
				autoClose: 2000,
				closeOnClick: true,
				theme: "colored",
				position: toast.POSITION.TOP_RIGHT,
			});
			return (userAlreadyExists.value = true);
		}

		registeredUsers.value.push(user);
		localStorage.setItem(
			"registered-users",
			JSON.stringify(registeredUsers.value)
		);
		toast.success(`${userCreatedMessage.value}`, {
			autoClose: 2000,
			closeOnClick: true,
			theme: "colored",
			position: toast.POSITION.TOP_RIGHT,
		});
		userCreated.value = true;
		reset("registerForm");
		return setInterval(() => {
			router.push("/login");
		}, 3000);
	};

	const loginUser = (payload) => {
		userNotExist.value = false;

		registeredUsers.value =
			JSON.parse(localStorage.getItem("registered-users")) || [];

		const userExists = registeredUsers.value.find(
			(regUser) => regUser.email === payload.email
		)
			? true
			: false;
		console.log(userExists);
		if (userExists) {
			console.log("loginUser", payload);
			return (isAuthenticated.value = true);
		}
		console.log("what??");
		return (userNotExist.value = true);
	};

	return {
		isAuthenticated,
		user,
		registeredUsers,
		userAlreadyExists,
		userAlreadyExistsErrorMessage,
		userCreated,
		userCreatedMessage,
		userNotExist,
		userNotExistMessage,
		registerUser,
		loginUser,
	};
});
