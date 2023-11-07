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

		const userToBeAdded = {
			id: (Math.random() + 1).toString(36).substring(7),
			...payload,
		};

		const userExists = registeredUsers.value.find(
			(regUser) => regUser.email === userToBeAdded.email
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

		registeredUsers.value.push(userToBeAdded);
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
		return setTimeout(() => {
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
		if (userExists) {
			user.value = registeredUsers.value.find(
				(regUser) => regUser.email === payload.email
			);
			console.log("userExists", user.value);

			return (isAuthenticated.value = true);
		}
		return (userNotExist.value = true);
	};

	const logoutUser = () => {
		if (user.value) {
			user.value = undefined;
			isAuthenticated.value = false;
			router.push("/login");
		}
		return;
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
		logoutUser,
	};
});
