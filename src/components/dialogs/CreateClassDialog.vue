<template>
	<div>
		<GetStudentsDialog
			v-model:visible="showDialog"
			:data="{
				program: formData.program,
				year_level: formData.year_level,
				section: formData.section,
			}"
		/>
		<Dialog v-model:visible="dialogVisible" modal :style="{ width: '60rem' }">
			<template #container>
				<div class="p-4">
					<h3 class="text-lg font-semibold text-gray-900 dark:text-white">
						Create New Class
					</h3>
					<p class="text-sm text-gray-500 dark:text-gray-400 mt-1 mb-6">
						Set up a new class record by filling in all required details.
					</p>
					<ScrollPanel
						class="h-[450px] md:h-[300px]"
						pt:barY:class="bg-slate-200 dark:bg-slate-700"
						pt:barX:class="hidden"
					>
						<div class="w-full flex flex-col md:flex-row gap-4">
							<div class="md:w-[30%] flex flex-col gap-4">
								<div>
									<InputLabel value="Class Name" :invalid="!!errors.name" />
									<InputText
										v-model="formData.name"
										:invalid="!!errors.name"
										fluid
									/>
									<Message
										v-if="errors.name"
										severity="error"
										size="small"
										variant="simple"
									>
										{{ errors.name }}
									</Message>
								</div>
								<div>
									<InputLabel value="Faculty" :invalid="!!errors.name" />
									<Select
										v-model="selectedUser"
										:options="userOptions"
										optionLabel="name"
										:invalid="!!errors.name"
										placeholder="Select a faculty"
										fluid
										filter
									>
										<template #value="{ value, placeholder }">
											<div v-if="value" class="flex items-center">
												{{ value.name }}
											</div>
											<span v-else>{{ placeholder }}</span>
										</template>

										<template #option="{ option }">
											<div
												class="flex flex-col hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
											>
												<div class="font-semibold">{{ option.name }}</div>
												<div class="text-slate-500">
													<span
														class="bg-slate-100 text-slate-400 dark:bg-slate-600/20 backdrop-blur-md p-1 rounded"
													>
														{{ option.department }}
													</span>
													{{ option.job_title }}
												</div>
											</div>
										</template>
									</Select>
									<Message
										v-if="errors.name"
										severity="error"
										size="small"
										variant="simple"
									>
										{{ errors.name }}
									</Message>
								</div>
								<div>
									<InputLabel value="Course" :invalid="!!errors.name" />
									<Select
										v-model="selectedCourse"
										:options="courseOptions"
										optionLabel="name"
										:invalid="!!errors.name"
										placeholder="Select a course"
										fluid
										filter
									>
										<template #value="{ value, placeholder }">
											<div v-if="value" class="flex items-center">
												{{ value.name }}
											</div>
											<span v-else>{{ placeholder }}</span>
										</template>

										<template #option="{ option }">
											<div
												class="flex flex-col hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
											>
												<div class="font-semibold">{{ option.name }}</div>
												<div class="text-slate-500 text-sm">
													{{ option.description }}
												</div>
											</div>
										</template>
									</Select>
									<Message
										v-if="errors.name"
										severity="error"
										size="small"
										variant="simple"
									>
										{{ errors.name }}
									</Message>
								</div>
							</div>
							<Divider
								v-if="!layout.isSmallScreen"
								:layout="!layout.isSmallScreen ? 'vertical' : 'horizontal'"
							/>
							<div class="md:w-[70%] grid grid-cols-1 md:grid-cols-6 gap-4">
								<div class="md:col-span-2">
									<InputLabel value="Program" :invalid="!!errors.program" />
									<Select
										v-model="formData.program"
										:options="programOptions"
										optionLabel="name"
										optionValue="code"
										:invalid="!!errors.program"
										fluid
									></Select>
									<Message
										v-if="errors.program"
										severity="error"
										size="small"
										variant="simple"
									>
										{{ errors.program }}
									</Message>
								</div>
								<div class="md:col-span-2">
									<InputLabel value="Year Level" :invalid="!!errors.year_level" />
									<Select
										v-model="formData.year_level"
										:options="yearLevelOptions"
										optionLabel="name"
										optionValue="code"
										:invalid="!!errors.year_level"
										fluid
									></Select>
									<Message
										v-if="errors.year_level"
										severity="error"
										size="small"
										variant="simple"
									>
										{{ errors.year_level }}
									</Message>
								</div>
								<div class="md:col-span-2">
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
								<div class="md:col-span-6">
									<InputLabel
										value="Days of the Week"
										:invalid="!!errors.schedule_days"
									/>
									<MultiSelect
										v-model="formData.schedule_days"
										:options="daysOfWeek"
										optionLabel="name"
										optionValue="code"
										filter
										showClear
										fluid
									/>
									<Message
										v-if="errors.schedule_days"
										severity="error"
										size="small"
										variant="simple"
									>
										{{ errors.schedule_days }}
									</Message>
								</div>
								<div class="md:col-span-3">
									<InputLabel
										value="Start Time"
										:invalid="!!errors.scheduled_start_time"
									/>
									<DatePicker
										v-model="formData.scheduled_start_time"
										:invalid="!!errors.scheduled_start_time"
										timeOnly
										hourFormat="12"
										fluid
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
								<div class="md:col-span-3">
									<InputLabel
										value="End Time"
										:invalid="!!errors.scheduled_end_time"
									/>
									<DatePicker
										v-model="formData.scheduled_end_time"
										:invalid="!!errors.scheduled_end_time"
										timeOnly
										hourFormat="12"
										fluid
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
								<div class="md:col-span-6 flex justify-end mb-8">
									<Button
										type="button"
										label="Assign Students"
										icon="pi pi-users"
										@click="showDialog = true"
									></Button>
								</div>
							</div>
						</div>
					</ScrollPanel>
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
import { useLayoutStore } from '@/stores/layoutStore'
import type { ClassFormDataCreate } from '@/types/classes'
import type { CourseSelectOption } from '@/types/course'
import type { UserSelectOption } from '@/types/user'
import { ref, computed } from 'vue'
import GetStudentsDialog from './GetStudentsDialog.vue'
import { useOptionStore } from '@/stores/optionStore'

const layout = useLayoutStore()
const options = useOptionStore()

const props = defineProps({
	visible: {
		type: Boolean,
		default: false,
	},
})

const showDialog = ref(false)

const userOptions = options.userOptions

const courseOptions = options.courseOptions

const programOptions = options.programOptions

const yearLevelOptions = options.yearLevelOptions

const daysOfWeek = options.daysOfWeek

const formData = ref<ClassFormDataCreate>({
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
})

const selectedUser = computed<UserSelectOption | null>({
	get() {
		return userOptions.find((user) => user.code === formData.value.user_id) || null
	},
	set(newValue) {
		if (typeof newValue?.code === 'number') {
			formData.value.user_id = newValue.code
		} else {
			formData.value.user_id = null
		}
	},
})

const selectedCourse = computed<CourseSelectOption | null>({
	get() {
		return courseOptions.find((course) => course.code === formData.value.course_id) || null
	},
	set(newValue) {
		if (typeof newValue?.code === 'number') {
			formData.value.course_id = newValue.code
		} else {
			formData.value.course_id = null
		}
	},
})

const errors = ref<Partial<Record<keyof ClassFormDataCreate, string>>>({})

const emit = defineEmits<{
	(e: 'update:visible', value: boolean): void
	(e: 'save'): void
}>()

const dialogVisible = computed({
	get() {
		return props.visible
	},
	set(value: boolean) {
		emit('update:visible', value)
	},
})

const handleSave = () => {}

const closeDialog = () => {
	dialogVisible.value = false
	resetForm()
}

const resetForm = () => {
	formData.value = {
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
	}
	errors.value = {}
}
</script>
