<template>
	<div>
		<form @submit.prevent="handleSubmit">
			<div
				class="flex items-center justify-center h-full bg-white dark:bg-slate-900 rounded-xl gap-2 p-4 border dark:border-slate-800 relative"
			>
				<div class="absolute left-4">
					<router-link :to="{ name: 'user-management' }">
						<Button
							:label="!layout.isSmallScreen ? 'Back' : ''"
							icon="pi pi-arrow-left"
							class="mr-2"
							severity="secondary"
						/>
					</router-link>
				</div>

				<div class="flex flex-col text-center">
					<h2 class="text-lg font-semibold">{{ pageTitle }}</h2>
					<p class="text-gray-600 dark:text-gray-500 text-sm max-w-52 sm:max-w-fit">
						{{ pageDescription }}
					</p>
				</div>

				<div></div>
			</div>
			<!-- Account Information Section -->
			<div
				class="bg-white dark:bg-slate-900 rounded-xl p-4 border dark:border-slate-800 mt-4"
			>
				<div class="flex flex-col md:flex-row gap-1 md:gap-2 justify-between mb-4">
					<div>
						<h3 class="text-lg font-medium text-slate-700 dark:text-slate-300">
							Account Information
						</h3>
						<p class="text-gray-600 dark:text-gray-500 text-sm">
							{{ isEditMode ? 'Manage' : 'Set up' }} login credentials including
							username, email address
							{{ isEditMode ? 'or reset password' : 'and secure password' }}.
						</p>
					</div>
					<div class="flex justify-end">
						<div>
							<InputLabel value="User Role" :invalid="!!errors.role" />
							<Select
								v-model="formData.role"
								:options="roles"
								optionLabel="name"
								optionValue="code"
								:invalid="!!errors.role"
								fluid
								class="w-48"
								size="small"
							/>
							<Message
								v-if="errors.role"
								severity="error"
								size="small"
								variant="simple"
							>
								{{ errors.role }}
							</Message>
						</div>
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
					</div>

					<Divider
						v-if="!layout.isSmallScreen"
						:layout="!layout.isSmallScreen ? 'vertical' : 'horizontal'"
					/>

					<div v-if="isEditMode" class="mt-6">
						<div class="mb-4">
							<h4
								class="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-1"
							>
								Password Management
							</h4>
							<p class="text-sm text-slate-500">
								Reset the user's password. They will receive an email with
								instructions to set a new password.
							</p>
						</div>

						<Button
							label="Reset Password"
							icon="pi pi-lock"
							class="mr-2 w-full md:w-80"
						/>
					</div>
					<div v-else class="flex-1 flex flex-col gap-4">
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
			<!-- Personal Information Section -->
			<div
				class="bg-white dark:bg-slate-900 rounded-xl p-4 border dark:border-slate-800 mt-4"
			>
				<h3 class="text-lg font-medium text-slate-700 dark:text-slate-300">
					Personal Information
				</h3>
				<p class="text-gray-600 dark:text-gray-500 text-sm mb-4">
					{{ isEditMode ? 'View or update' : 'Enter' }} the user's basic personal details
					including full name and contact information.
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

			<!-- Employment Information Section -->
			<div
				class="bg-white dark:bg-slate-900 rounded-xl p-4 border dark:border-slate-800 mt-4"
			>
				<h3 class="text-lg font-medium text-slate-700 dark:text-slate-300">
					Employment Information
				</h3>
				<p class="text-gray-600 dark:text-gray-500 text-sm mb-4">
					{{ isEditMode ? 'Review or modify' : 'Provide' }} work-related information
					including employee ID, department, job title, and system role.
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
			<div
				class="flex justify-between bg-white dark:bg-slate-900 rounded-xl p-4 border dark:border-slate-800 mt-4"
			>
				<div class="mb-3">
					<h3 class="text-lg font-medium text-slate-700 dark:text-slate-300">
						{{ isEditMode ? 'Account Management' : 'Finalize Account' }}
					</h3>
					<p class="text-sm text-slate-500 mt-1">
						{{
							isEditMode
								? 'Review all changes before submitting or clear your modifications'
								: 'Verify all information is correct before account creation'
						}}
					</p>
				</div>

				<div class="flex justify-end items-end gap-2">
					<Button
						label="Clear"
						class="min-w-28"
						severity="secondary"
						@click="handleClear"
					/>
					<Button
						:label="isEditMode ? 'Update Account' : 'Create Account'"
						class="w-fit"
						:loading="layout.isLoading"
						type="submit"
					/>
				</div>
			</div>
		</form>
	</div>
</template>
<script lang="ts" setup>
import { ref, onBeforeMount, computed } from 'vue'
import InputLabel from '@/components/InputLabel.vue'
import { useLayoutStore } from '@/stores/layoutStore'
import { useRoute } from 'vue-router'
import { useToast } from 'primevue'
import type { UserFormCreate, UserFormEdit } from '@/types/user'
type UserFormData = UserFormCreate & Partial<Pick<UserFormEdit, 'id'>>

const layout = useLayoutStore()
const route = useRoute()
const toast = useToast()

const formData = ref<UserFormData>({
	username: '',
	email: '',
	password: '',
	password_confirmation: '',
	employee_id: '',
	first_name: '',
	middle_name: '',
	last_name: '',
	role: 'faculty',
	job_title: '',
	department: '',
	contact_number: '',
})

const roles = ref([
	{ name: 'Super Admin', code: 'superadmin' },
	{ name: 'Faculty', code: 'faculty' },
])

const errors = ref<Partial<Record<keyof UserFormData, string>>>({})

const isEditMode = ref<boolean>(false)
const userId = ref<number | null>(null)

const handleSubmit = () => {
	toast.add({
		severity: 'info',
		summary: 'Login Attempt',
		detail: `Email: ${formData.value.email}`,
		life: 3000,
	})
}

const handleClear = () => {
	Object.assign(formData.value, {
		username: '',
		email: '',
		password: '',
		password_confirmation: '',
		employee_id: '',
		first_name: '',
		middle_name: '',
		last_name: '',
		role: 'faculty',
		job_title: '',
		department: '',
		contact_number: '',
	})
}

const pageTitle = computed(() => {
	return isEditMode.value ? 'Edit User Account' : 'Create User Account'
})

const pageDescription = computed(() => {
	return isEditMode.value
		? 'Modify user information, update roles, groups, and organizational placement.'
		: 'Register a new user and assign their roles, groups, and organizational placement.'
})

onBeforeMount(() => {
	isEditMode.value = route.name === 'user-account-edit'

	if (isEditMode.value && typeof route.params.ref === 'string' && route.params.ref) {
		try {
			const decoded = atob(route.params.ref)
			const idString = decoded.replace('user_', '')
			const parsedId = parseInt(idString)

			if (!isNaN(parsedId)) {
				userId.value = parsedId
			} else {
				console.error('Invalid user ID format in reference')
			}
		} catch (error) {
			console.error('Error decoding reference:', error)
		}
	}
})
</script>
<style></style>
