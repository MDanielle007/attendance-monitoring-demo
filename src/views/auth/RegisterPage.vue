<template>
	<div class="flex flex-col">
		<div class="mb-4">
			<div class="mx-auto w-full h-12">
				<PlaceholderItem title="image" />
			</div>
			<h2 class="mt-4 text-3xl font-extrabold text-slate-900 dark:text-slate-100">
				Create an account
			</h2>
			<p class="text-slate-800 dark:text-slate-400">
				Enter your details below to create your account
			</p>
		</div>

		<form @submit.prevent="handleSubmit">
			<div class="grid grid-cols-1 md:grid-cols-6 gap-6">
				<!-- Account Information Section - Takes full width on mobile, left column on desktop -->
				<div
					class="bg-white dark:bg-slate-900 rounded-xl p-4 border dark:border-slate-800 md:row-span-2 md:col-span-2"
				>
					<div class="flex flex-col md:flex-row gap-2 justify-between mb-4">
						<div>
							<h3 class="text-lg font-medium text-slate-700 dark:text-slate-300">
								Account Information
							</h3>
							<p class="text-gray-600 dark:text-gray-500 text-sm">
								Set up login credentials including username, email address and
								secure password.
							</p>
						</div>
					</div>
					<div class="flex flex-col sm:flex-row gap-6">
						<div class="flex-1 flex flex-col gap-4">
							<div>
								<InputLabel value="Username" :invalid="!!errors.username" />
								<InputText
									v-model="formData.username"
									:invalid="!!errors.username"
									fluid
								/>
								<Message
									v-if="errors.username"
									severity="error"
									size="small"
									variant="simple"
								>
									{{ errors.username }}
								</Message>
							</div>
							<div>
								<InputLabel value="Email" :invalid="!!errors.email" />
								<IconField fluid>
									<InputIcon>
										<i class="pi pi-envelope" />
									</InputIcon>
									<InputText
										v-model="formData.email"
										:invalid="!!errors.email"
										fluid
									/>
								</IconField>
								<Message
									v-if="errors.email"
									severity="error"
									size="small"
									variant="simple"
								>
									{{ errors.email }}
								</Message>
							</div>
							<div>
								<InputLabel value="Password" :invalid="!!errors.password" />
								<IconField fluid>
									<InputIcon>
										<i class="pi pi-lock" />
									</InputIcon>
									<Password
										v-model="formData.password"
										:invalid="!!errors.password"
										fluid
										toggleMask
									/>
								</IconField>
								<Message
									v-if="errors.password"
									severity="error"
									size="small"
									variant="simple"
								>
									{{ errors.password }}
								</Message>
							</div>
							<div>
								<InputLabel
									value="Confirm Password"
									:invalid="!!errors.password_confirmation"
								/>
								<IconField fluid>
									<InputIcon>
										<i class="pi pi-lock" />
									</InputIcon>
									<Password
										v-model="formData.password_confirmation"
										:invalid="!!errors.password_confirmation"
										fluid
										toggleMask
									/>
								</IconField>
								<Message
									v-if="errors.password_confirmation"
									severity="error"
									size="small"
									variant="simple"
								>
									{{ errors.password_confirmation }}
								</Message>
							</div>
						</div>
					</div>
				</div>

				<!-- Personal Information Section - Right column top on desktop -->
				<div
					class="bg-white dark:bg-slate-900 rounded-xl p-4 border dark:border-slate-800 md:col-span-4"
				>
					<h3 class="text-lg font-medium text-slate-700 dark:text-slate-300">
						Personal Information
					</h3>
					<p class="text-gray-600 dark:text-gray-500 text-sm mb-4">
						Enter the user's basic personal details including full name and contact
						information.
					</p>
					<div class="grid grid-cols-12 gap-4">
						<div class="col-span-12 sm:col-span-4">
							<InputLabel value="First Name" :invalid="!!errors.first_name" />
							<InputText
								v-model="formData.first_name"
								:invalid="!!errors.first_name"
								fluid
							/>
							<Message
								v-if="errors.first_name"
								severity="error"
								size="small"
								variant="simple"
							>
								{{ errors.first_name }}
							</Message>
						</div>
						<div class="col-span-12 sm:col-span-4">
							<InputLabel value="Middle Name" :invalid="!!errors.middle_name" />
							<InputText
								v-model="formData.middle_name"
								:invalid="!!errors.middle_name"
								fluid
							/>
							<Message
								v-if="errors.middle_name"
								severity="error"
								size="small"
								variant="simple"
							>
								{{ errors.middle_name }}
							</Message>
						</div>
						<div class="col-span-12 sm:col-span-4">
							<InputLabel value="Last Name" :invalid="!!errors.last_name" />
							<InputText
								v-model="formData.last_name"
								:invalid="!!errors.last_name"
								fluid
							/>
							<Message
								v-if="errors.last_name"
								severity="error"
								size="small"
								variant="simple"
							>
								{{ errors.last_name }}
							</Message>
						</div>
						<div class="col-span-12 sm:col-span-4">
							<InputLabel value="Contact Number" :invalid="!!errors.contact_number" />
							<InputText
								v-model="formData.contact_number"
								:invalid="!!errors.contact_number"
								fluid
							/>
							<Message
								v-if="errors.contact_number"
								severity="error"
								size="small"
								variant="simple"
							>
								{{ errors.contact_number }}
							</Message>
						</div>
					</div>
				</div>

				<!-- Employment Information Section - Right column bottom on desktop -->
				<div
					class="bg-white dark:bg-slate-900 rounded-xl p-4 border dark:border-slate-800 md:col-span-4"
				>
					<h3 class="text-lg font-medium text-slate-700 dark:text-slate-300">
						Employment Information
					</h3>
					<p class="text-gray-600 dark:text-gray-500 text-sm mb-4">
						Provide work-related information including employee ID, department, job
						title, and system role.
					</p>
					<div class="grid grid-cols-12 gap-4">
						<div class="col-span-12 sm:col-span-4">
							<InputLabel value="Employee ID" :invalid="!!errors.employee_id" />
							<InputText
								v-model="formData.employee_id"
								:invalid="!!errors.employee_id"
								fluid
							/>
							<Message
								v-if="errors.employee_id"
								severity="error"
								size="small"
								variant="simple"
							>
								{{ errors.employee_id }}
							</Message>
						</div>
						<div class="col-span-12 sm:col-span-4">
							<InputLabel value="Department" :invalid="!!errors.department" />
							<InputText
								v-model="formData.department"
								:invalid="!!errors.department"
								fluid
							/>
							<Message
								v-if="errors.department"
								severity="error"
								size="small"
								variant="simple"
							>
								{{ errors.department }}
							</Message>
						</div>
						<div class="col-span-12 sm:col-span-4">
							<InputLabel value="Job Title" :invalid="!!errors.job_title" />
							<InputText
								v-model="formData.job_title"
								:invalid="!!errors.job_title"
								fluid
							/>
							<Message
								v-if="errors.job_title"
								severity="error"
								size="small"
								variant="simple"
							>
								{{ errors.job_title }}
							</Message>
						</div>
					</div>
				</div>
			</div>
			<div class="flex flex-col justify-end items-end">
				<div class="flex gap-3">
					<Button
						label="Clear"
						class="mt-6 min-w-28"
						severity="secondary"
						@click="handleClear"

					/>
					<Button
						label="Create Account"
						class="mt-6 w-fit"
						:loading="layout.isLoading"
						type="submit"
					/>
				</div>
				<div class="text-sm text-gray-600 dark:text-gray-400 mt-4">
					Already have an account?

					<router-link :to="{ name: 'login' }"
						><span class="text-slate-950 dark:text-slate-100 font-bold"
							>Sign In</span
						></router-link
					>
				</div>
			</div>
		</form>
	</div>
</template>
<script lang="ts" setup>
import { useToast } from 'primevue'
import { ref } from 'vue'
import { useLayoutStore } from '@/stores/layoutStore'
import PlaceholderItem from '@/components/PlaceholderItem.vue'
import type { UserFormCreate } from '@/types/user'


const layout = useLayoutStore()

const formData = ref<UserFormCreate>({
	username: '',
	email: '',
	password: '',
	password_confirmation: '',
	employee_id: '',
	first_name: '',
	middle_name: '',
	last_name: '',
	job_title: '',
	department: '',
	contact_number: '',
})

const errors = ref<Partial<Record<keyof UserFormCreate, string>>>({})

const toast = useToast()

const handleSubmit = async () => {
	toast.add({
		severity: 'info',
		summary: 'Login Attempt',
		detail: `Email: ${formData.value.email}, Password: ${formData.value.password}`,
		life: 3000,
	})
};

const handleClear = () => {
	formData.value = {
		username: '',
		email: '',
		password: '',
		password_confirmation: '',
		employee_id: '',
		first_name: '',
		middle_name: '',
		last_name: '',
		job_title: '',
		department: '',
		contact_number: '',
	}
}

</script>
<style></style>
