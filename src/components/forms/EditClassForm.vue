<template>
	<div
		class="flex flex-col items-center justify-between h-full bg-white dark:bg-slate-900 rounded-xl gap-4 p-5 border dark:border-slate-800"
	>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 w-full">
			<div class="md:col-span-2 lg:col-span-6">
				<InputLabel value="Class Name" />
				<InputText readonly v-model="formData.name" fluid />
			</div>
			<div class="md:col-span-2 lg:col-span-6">
				<InputLabel value="Faculty" />
				<InputText readonly v-model="facultyName" fluid />
			</div>
			<div class=" md:col-span-2 lg:col-span-6">
				<InputLabel value="Course" />
				<InputText readonly v-model="formData.course_code" fluid />
			</div>
			<div class=" md:col-span-2 lg:col-span-2">
				<InputLabel value="Program" :invalid="!!errors.program" />
				<InputText readonly v-model="formData.program" fluid />
			</div>
			<div class="md:col-span-1 lg:col-span-2">
				<InputLabel value="Year Level" :invalid="!!errors.year_level" />
				<InputText readonly v-model="classYearLevel" fluid />
			</div>
			<div class="md:col-span-1 lg:col-span-2">
				<InputLabel value="Section" :invalid="!!errors.section" />
				<InputText readonly v-model="formData.section" fluid />
			</div>
			<div class="md:col-span-2 lg:col-span-6">
				<InputLabel value="Days of the Week" :invalid="!!errors.schedule_days" />
				<MultiSelect
					v-model="formData.schedule_days"
					:options="daysOfWeek"
					optionLabel="name"
					optionValue="code"
					filter
					showClear
					fluid
					:disabled="!isEditing"
				/>
				<Message v-if="errors.schedule_days" severity="error" size="small" variant="simple">
					{{ errors.schedule_days }}
				</Message>
			</div>
			<div class="lg:col-span-3">
				<InputLabel value="Start Time" :invalid="!!errors.scheduled_start_time" />
				<DatePicker
					v-model="formData.scheduled_start_time"
					:invalid="!!errors.scheduled_start_time"
					timeOnly
					hourFormat="12"
					fluid
					:disabled="!isEditing"
				/>
				<Message
					v-if="errors.scheduled_start_time"
					severity="error"
					size="small"
					variant="simple"
				>
					{{ errors.scheduled_start_time }}
				</Message>
			</div>
			<div class="lg:col-span-3">
				<InputLabel value="End Time" :invalid="!!errors.scheduled_end_time" />
				<DatePicker
					v-model="formData.scheduled_end_time"
					:invalid="!!errors.scheduled_end_time"
					timeOnly
					hourFormat="12"
					fluid
					:disabled="!isEditing"
				/>
				<Message
					v-if="errors.scheduled_end_time"
					severity="error"
					size="small"
					variant="simple"
				>
					{{ errors.scheduled_end_time }}
				</Message>
			</div>
		</div>
		<div class="w-full flex justify-end gap-2">
			<Button
				v-if="!isEditing"
				label="Edit"
				icon="pi pi-pencil"
				outlined
				@click="toggleEdit"
			/>
			<Button
				v-else
				label="Save"
				icon="pi pi-save"
				@click="saveChanges"
			/>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { useOptionStore } from '@/stores/optionStore'
import type { ClassFormDataEdit } from '@/types/classes'
import { getFullName } from '@/utils/formatUtils'
import { computed, ref, watch } from 'vue'

const options = useOptionStore()

const props = defineProps({
	data: {
		type: Object as () => ClassFormDataEdit,
		default: () => ({
			id: null,
			user_id: null,
			course_id: null,
			name: '',
			section: '',
			year_level: null,
			program: '',
			schedule_days: [],
			scheduled_start_time: null,
			scheduled_end_time: null,
			semester: '',
			status: '',
		}),
	},
})

const isEditing = ref(false)

const daysOfWeek = options.daysOfWeek

const formData = ref<ClassFormDataEdit>({
	id: null,
	user_first_name: '',
	user_middle_name: '',
	user_last_name: '',
	course_code: '',
	name: '',
	section: '',
	year_level: 0,
	program: '',
	schedule_days: [],
	scheduled_start_time: null,
	scheduled_end_time: null,
	semester: '',
	status: '',
})

const facultyName = computed((): string => {
	if (!formData.value.id) {
		return ''
	}

	return getFullName(
		formData.value.user_first_name,
		formData.value.user_middle_name,
		formData.value.user_last_name,
	)
})

const classYearLevel = computed((): string => {
	switch (formData.value.year_level) {
		case 1:
			return '1st Year'
		case 2:
			return '2nd Year'
		case 3:
			return '3rd Year'
		case 4:
			return '4th Year'
		default:
			return ''
	}
})

const errors = ref<Partial<Record<keyof ClassFormDataEdit, string>>>({})

const toggleEdit = () => {
	isEditing.value = true
}

const saveChanges = () => {
	// TODO: add validation and API call here
	isEditing.value = false
}

watch(
	() => props.data,
	(newData: ClassFormDataEdit) => {
		formData.value = { ...newData }
	},
	{ deep: true },
)
</script>
<style></style>
