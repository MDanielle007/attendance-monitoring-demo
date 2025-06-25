<template>
	<div class="flex flex-col">
		<div>
			<div class="mx-auto mb-6 w-full h-12">
				<PlaceholderItem title="image" />
			</div>
			<h2 class="mt-6 text-3xl font-extrabold text-slate-900 dark:text-slate-100">
				Log in to your account
			</h2>
			<p class="text-slate-800 dark:text-slate-400">
				Enter your email and password below to log in
			</p>
		</div>

		<!-- Error Alert -->
		<div
			v-if="error"
			class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
			role="alert"
		>
			<span class="block sm:inline">{{ error }}</span>
		</div>

		<div class="mt-6">
			<div>
				<label class="block text-gray-700 dark:text-gray-400">Email address</label>
				<IconField fluid>
					<InputIcon>
						<i class="pi pi-envelope" />
					</InputIcon>
					<InputText type="text" v-model="formData.email" fluid placeholder="name@company.com" />
				</IconField>
			</div>
			<div>
				<label class="block mt-4 text-gray-700 dark:text-gray-400">Password</label>
				<IconField fluid>
					<InputIcon>
						<i class="pi pi-lock" />
					</InputIcon>
					<Password
						:feedback="false"
						v-model="formData.password"
						fluid
						toggleMask
						placeholder="Enter your password"
					/>
				</IconField>
				<router-link :to="{ name: 'forgot-password' }"
				><span class="text-slate-600 text-sm dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
					>Forgot your password?</span
				></router-link
			>
			</div>
			<Button fluid @click="handleSubmit" label="Sign In" class="mt-6 dark:text-white" />
		</div>
		<div class="text-sm text-gray-600 dark:text-gray-400 mt-4">
			Don't have an account?

			<router-link :to="{ name: 'register' }"
				><span class="text-slate-950 dark:text-slate-100 font-bold"
					>Sign Up</span
				></router-link
			>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { useToast } from 'primevue'
import { ref } from 'vue'
import PlaceholderItem from '@/components/PlaceholderItem.vue'
import type { LoginCredentials } from '@/types/user'

const toast = useToast()

const error = ref('')

const formData = ref<LoginCredentials>({
	email: '',
	password: ''
})

const handleSubmit = async () => {
	error.value = '' // Clear previous errors

	console.log(formData.value)

	toast.add({
		severity: 'info',
		summary: 'Login Attempt',
		detail: `Email: ${formData.value.email}, Password: ${formData.value.password}`,
		life: 3000,
	})
}
</script>
<style></style>
