<template>
	<div>
		<Dialog v-model:visible="dialogVisible" modal :style="{ width: '30rem' }">
			<template #container>
				<div class="p-4">
					<h3 class="text-lg font-semibold text-gray-900 dark:text-white">
						Create New Meeting
					</h3>
					<p class="text-sm text-gray-500 dark:text-gray-400 mt-1 mb-6">
						Set up a new meeting by filling in or modifying default data for all
						required details.
					</p>
					<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div class="md:col-span-2">
							<InputLabel value="Meeting Name" :invalid="!!errors.name" />
							<InputText v-model="formData.name" :invalid="!!errors.name" fluid />
							<Message
								v-if="errors.name"
								severity="error"
								size="small"
								variant="simple"
							>
								{{ errors.name }}
							</Message>
						</div>
						<div class="md:col-span-2">
							<InputLabel value="Meeting Date" :invalid="!!errors.meeting_date" />
							<DatePicker
								v-model="formData.meeting_date"
								:invalid="!!errors.meeting_date"
								fluid
							/>
							<Message
								v-if="errors.meeting_date"
								severity="error"
								size="small"
								variant="simple"
							>
								{{ errors.meeting_date }}
							</Message>
						</div>
						<div>
							<InputLabel value="Start Time" :invalid="!!errors.start_time" />
							<DatePicker
								v-model="formData.start_time"
								:invalid="!!errors.start_time"
								timeOnly
								hourFormat="12"
								fluid
							/>
							<Message
								v-if="errors.start_time"
								severity="error"
								size="small"
								variant="simple"
							>
								{{ errors.start_time }}
							</Message>
						</div>
						<div>
							<InputLabel value="End Time" :invalid="!!errors.end_time" />
							<DatePicker
								v-model="formData.end_time"
								:invalid="!!errors.end_time"
								timeOnly
								hourFormat="12"
								fluid
							/>
							<Message
								v-if="errors.end_time"
								severity="error"
								size="small"
								variant="simple"
							>
								{{ errors.end_time }}
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
							label="Start Meeting"
							@click="handleSave"
						></Button>
					</div>
				</div>
			</template>
		</Dialog>
	</div>
</template>
<script lang="ts" setup>
import { useClassStore } from '@/stores/classStore'
import type { MeetingFormCreate } from '@/types/meetings'
import { getOrdinalSuffix } from '@/utils/formatUtils'
import { computed, onMounted, ref } from 'vue'

const classStore = useClassStore()

const props = defineProps({
	visible: {
		type: Boolean,
		default: false,
	},
	index: {
		type: Number,
		default: 0,
	},
})

const formData = ref<MeetingFormCreate>({
	class_id: classStore.classInfo.id,
	name: '',
	type: '',
	meeting_date: new Date,
	start_time: classStore.classInfo.scheduled_start_time,
	end_time: classStore.classInfo.scheduled_end_time,
})

const errors = ref<Partial<Record<keyof MeetingFormCreate, string>>>({})

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

const resetForm = () => {
	formData.value = {
		class_id: classStore.classInfo.id,
		name: defaultMeetingName.value,
		type: '',
		meeting_date: new Date,
		start_time: null,
		end_time: null,
	}
	errors.value = {}
}

const closeDialog = () => {
	dialogVisible.value = false
	resetForm()
}

const defaultMeetingName = computed(() => {
	if (!classStore.classInfo.course_code) return 'Loading...'
	return `${getOrdinalSuffix(props.index + 1)} Meeting ${
		classStore.classInfo.course_code
	} - ${classStore.classInfo.year_level}-${classStore.classInfo.section}`
})
onMounted(() => {
	console.log(classStore.classInfo)
	formData.value.name = defaultMeetingName.value
})
</script>
<style></style>
