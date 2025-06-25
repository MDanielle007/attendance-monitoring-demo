<template >
	<div class="flex flex-col">
		<div>
			<div class="mx-auto mb-6 w-full h-12">
				<PlaceholderItem title="image" />
			</div>
			<h2 class="mt-6 text-3xl font-extrabold text-slate-900 dark:text-slate-100">
				Reset Password
			</h2>
			<p class="text-slate-800 dark:text-slate-400">
				Please enter your new password below
			</p>
		</div>

		<div class="mt-6">

			<div>
				<label class="block mt-4 text-gray-700 dark:text-gray-400">Password</label>
				<IconField fluid>
					<InputIcon>
						<i class="pi pi-lock" />
					</InputIcon>
					<Password
						v-model="formData.password"
						fluid
						toggleMask
						placeholder="Enter your new password"
					/>
				</IconField>
			</div>
			<div>
				<label class="block mt-4 text-gray-700 dark:text-gray-400">Confirm Password</label>
				<IconField fluid>
					<InputIcon>
						<i class="pi pi-lock" />
					</InputIcon>
					<Password
						v-model="formData.password_confirmation"
						fluid
						toggleMask
						placeholder="Confirm your password"
					/>
				</IconField>
			</div>
			<Button fluid @click="handleSubmit" label="Reset password" class="mt-6 dark:text-white" />
		</div>
	</div>
</template>
<script lang="ts" setup>
import PlaceholderItem from '@/components/PlaceholderItem.vue'
import type { UserUpdatePassword } from '@/types/user';
import { useToast } from 'primevue';
import { ref } from 'vue';

const toast = useToast();

const formData = ref<UserUpdatePassword>({
	id: null,
	password: '',
	password_confirmation: ''
})

const handleSubmit = async () => {
	console.log(formData.value);

	toast.add({
		severity: 'info',
		summary: 'Reset Password Attempt',
		detail: `Password: ${formData.value.password}`,
		life: 3000,
	})
};
</script>
<style >

</style>
