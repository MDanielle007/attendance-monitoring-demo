<template>
	<div>
		<Dialog v-model:visible="dialogVisible" modal :style="{ width: '50rem' }">
			<template #container>
				<div class="p-4">
					<h3 class="text-lg font-semibold text-gray-900 dark:text-white">
						{{ isEditMode ? 'Edit Student Record' : 'Create New Student Record' }}
					</h3>
					<p class="text-sm text-gray-500 dark:text-gray-400 mt-1 mb-6">
						{{
							isEditMode
								? 'Modify the student information. Changes will be applied immediately.'
								: 'Set up a new student record by filling in all required details.'
						}}
					</p>
					<div class="grid grid-cols-1 md:grid-cols-12 gap-4">
						<div class="md:col-span-12">
							<InputLabel value="ID Number" :invalid="!!errors.id_number" />
							<InputText
								v-model="formData.id_number"
								:invalid="!!errors.id_number"
								fluid
							/>
							<Message
								v-if="errors.id_number"
								severity="error"
								size="small"
								variant="simple"
							>
								{{ errors.id_number }}
							</Message>
						</div>
						<div class="md:col-span-4">
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
						<div class="md:col-span-4">
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
						<div class="md:col-span-4">
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
						<div class="md:col-span-4">
							<InputLabel value="Program" :invalid="!!errors.program" />
							<InputText
								v-model="formData.program"
								:invalid="!!errors.program"
								fluid
							/>
							<Message
								v-if="errors.program"
								severity="error"
								size="small"
								variant="simple"
							>
								{{ errors.program }}
							</Message>
						</div>
						<div class="md:col-span-4">
							<InputLabel value="Section" :invalid="!!errors.section" />
							<InputText
								v-model="formData.section"
								:invalid="!!errors.section"
								fluid
							/>
							<Message
								v-if="errors.section"
								severity="error"
								size="small"
								variant="simple"
							>
								{{ errors.section }}
							</Message>
						</div>
						<div class="md:col-span-4">
							<InputLabel value="Year Level" :invalid="!!errors.year_level" />
							<InputText
								v-model="formData.year_level"
								:invalid="!!errors.year_level"
								fluid
							/>
							<Message
								v-if="errors.year_level"
								severity="error"
								size="small"
								variant="simple"
							>
								{{ errors.year_level }}
							</Message>
						</div>
						<div class="md:col-span-6">
							<InputLabel value="Email" :invalid="!!errors.email" />
							<InputText
								v-model="formData.email"
								:invalid="!!errors.email"
								fluid
							/>
							<Message
								v-if="errors.email"
								severity="error"
								size="small"
								variant="simple"
							>
								{{ errors.email }}
							</Message>
						</div>
						<div class="md:col-span-6">
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
						<div class="md:col-span-12">
							<InputLabel
								value="RFID Number"
								:invalid="!!errors.rfid_number"
							/>
							<Textarea
								v-model="formData.rfid_number"
								:invalid="!!errors.rfid_number"
								rows="3"
								fluid
							/>
							<Message
								v-if="errors.rfid_number"
								severity="error"
								size="small"
								variant="simple"
							>
								{{ errors.rfid_number }}
							</Message>
						</div>
					</div>
					<div class="flex justify-end gap-2 mt-4">
						<Button
							type="button"
							label="Cancel"
							severity="secondary"
							@click="closeDialog"
						></Button>
						<Button
							type="button"
							label="Save"
							icon="pi pi-save"
							@click="handleSave"
						></Button>
					</div>
				</div>
			</template>
		</Dialog>
	</div>
</template>
<script lang="ts" setup>
import type { StudentFormData } from '@/types/student'
import { useToast } from 'primevue'
import { computed, ref, watch } from 'vue'

const toast = useToast()

const props = defineProps({
	visible: {
		type: Boolean,
		default: false,
	},
	data: {
		type: Object as () => StudentFormData,
		default: () => ({
			id: null,
			id_number: '',
			first_name: '',
			middle_name: '',
			last_name: '',
			email: '',
			year_level: '',
			program: '',
			section: '',
			contact_number: '',
			rfid_number: '',
		}),
	},
})

const isEditMode = ref<boolean>(false)

const formData = ref<StudentFormData>({
	id: null,
	id_number: '',
	first_name: '',
	middle_name: '',
	last_name: '',
	email: '',
	year_level: '',
	program: '',
	section: '',
	contact_number: '',
	rfid_number: '',
})

const errors = ref<Partial<Record<keyof StudentFormData, string>>>({})

const emit = defineEmits<{
	(e: 'update:visible', value: boolean): void
	(e: 'save'): void
	(e: 'delete'): void
}>()

watch(
	() => props.data,
	(newData) => {
		if (newData.id !== null) {
			isEditMode.value = true
			formData.value = { ...newData }
		} else {
			isEditMode.value = false
			formData.value = {
				id: null,
				id_number: '',
				first_name: '',
				middle_name: '',
				last_name: '',
				email: '',
				year_level: '',
				program: '',
				section: '',
				contact_number: '',
				rfid_number: '',
			}
		}
	},
	{ deep: true },
)

const dialogVisible = computed({
	get() {
		return props.visible
	},
	set(value: boolean) {
		emit('update:visible', value)
	},
})

const handleSave = () => {
	toast.add({
		severity: 'success',
		summary: 'Success',
		detail: isEditMode.value ? 'Course updated successfully.' : 'Course created successfully.',
		life: 3000,
	})
	closeDialog()
}

const closeDialog = () => {
	dialogVisible.value = false
	isEditMode.value = false
	resetForm()
}

const resetForm = () => {
	formData.value = {
		id: null,
		id_number: '',
		first_name: '',
		middle_name: '',
		last_name: '',
		email: '',
		year_level: '',
		program: '',
		section: '',
		contact_number: '',
		rfid_number: '',
	}
	errors.value = {}
}
</script>
<style></style>
