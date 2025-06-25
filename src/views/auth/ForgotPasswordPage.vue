<template>
	<div class="flex flex-col">
		<div>
			<div class="mx-auto mb-6 w-full h-12">
				<PlaceholderItem title="image" />
			</div>
			<h2 class="mt-6 text-3xl font-extrabold text-slate-900 dark:text-slate-100">
				Forgot Password
			</h2>
			<p class="text-slate-800 dark:text-slate-400">
				Enter your email address below to reset your password
			</p>
		</div>

		<div class="mt-6">
			<div>
				<label class="block text-gray-700 dark:text-gray-400">Email address</label>
				<IconField fluid>
					<InputIcon>
						<i class="pi pi-envelope" />
					</InputIcon>
					<InputText type="text" v-model="email" fluid placeholder="name@company.com" />
				</IconField>
			</div>
			<Button fluid @click="handleSubmit" label="Submit" class="mt-6 dark:text-white" />
		</div>
		<div class="text-sm text-gray-600 dark:text-gray-400 mt-4">
			Remembered your password?
			<router-link :to="{ name: 'login' }"
				><span class="text-slate-950 dark:text-slate-100 font-bold">Log In</span
			></router-link>
		</div>
	</div>
</template>
<script lang="ts" setup>
import PlaceholderItem from '@/components/PlaceholderItem.vue'
import { useToast } from 'primevue'
import { ref } from 'vue'
const toast = useToast()


const email = ref('')

const handleSubmit = async () => {

	console.log({
		email: email.value,
	})

	toast.add({
		severity: 'info',
		summary: 'Forgot Password Attempt',
		detail: `Email: ${email.value}`,
		life: 3000,
	})
}
</script>
<style></style>
