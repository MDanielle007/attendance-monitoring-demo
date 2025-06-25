<template>
	<div>
		<Dialog v-model:visible="dialogVisible" modal :style="{ width: '25rem' }">
			<template #container>
				<div class="p-4">
					<h3 class="text-lg font-semibold text-gray-900 dark:text-white">
						{{ isEditMode ? 'Edit Course Details' : 'Create New Course' }}
					</h3>
					<p class="text-sm text-gray-500 dark:text-gray-400 mt-1 mb-6">
						{{
							isEditMode
								? 'Modify the course information. Changes will be applied immediately.'
								: 'Set up a new course by filling in all required details.'
						}}
					</p>
					<div class="flex flex-col gap-4">
						<div>
							<InputLabel value="Course Code" :invalid="!!errors.course_code" />
							<InputText
								v-model="formData.course_code"
								:invalid="!!errors.course_code"
								fluid
							/>
							<Message
								v-if="errors.course_code"
								severity="error"
								size="small"
								variant="simple"
							>
								{{ errors.course_code }}
							</Message>
						</div>
						<div>
							<InputLabel
								value="Course Description"
								:invalid="!!errors.course_description"
							/>
							<Textarea
								v-model="formData.course_description"
								:invalid="!!errors.course_description"
								rows="5"
								fluid
							/>
							<Message
								v-if="errors.course_description"
								severity="error"
								size="small"
								variant="simple"
							>
								{{ errors.course_description }}
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
import type { CourseFormData } from '@/types/course'
import { useToast } from 'primevue'
import { computed, ref, watch } from 'vue'

const toast = useToast()

const props = defineProps({
	visible: {
		type: Boolean,
		default: false,
	},
	data: {
		type: Object as () => CourseFormData,
		default: () => ({
			id: null,
			course_code: '',
			course_description: '',
		}),
	}
})

const isEditMode = ref<boolean>(false)

const formData = ref<CourseFormData>({
	id: null,
	course_code: '',
	course_description: '',
})

const errors = ref<Partial<Record<keyof CourseFormData, string>>>({})

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
				course_code: '',
				course_description: '',
			}
		}
	},
	{ deep: true }
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
		course_code: '',
		course_description: '',
	}
	errors.value = {}
}
</script>
<style></style>
