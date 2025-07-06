<template>
	<div
		class="flex items-center justify-between h-full bg-white dark:bg-slate-900 rounded-xl gap-2 p-5 border dark:border-slate-800"
	>
		<div class="grid grid-cols-6 gap-2 w-full">
			<div class="col-span-6 flex justify-between gap-12 md:gap-4">
				<div class="font-bold text-xl">
					{{ name }}
				</div>
				<div
					class="flex gap-2 items-center justify-end text-right flex-col-reverse md:flex-row"
				>
					<span class="text-green-400 font-bold">
						{{
							getAttendancePercentage(
								present,
								late,
								present + late + absent + notScanned,
							)
						}}
						%
					</span>
					<Tag
						:severity="getStatusSeverity(status)"
						:value="capitalizeWords(status)"
						pt:root:class="text-nowrap"
					>
					</Tag>
				</div>
			</div>
			<div class="col-span-2">
				<p class="text-sm text-slate-500 dark:text-slate-400">
					{{ formatDate(meetingDate) }}
				</p>
				<p class="text-sm text-slate-500 dark:text-slate-400">
					{{ formatDate(startTime, 'time-12hr') }} –
					{{ formatDate(endTime, 'time-12hr') }}
				</p>
			</div>
			<div class="col-span-4 flex flex-col gap-4">
				<div class="flex flex-wrap gap-2 md:gap-4 w-full justify-end">
					<div
						class="text-green-400 bg-green-100/60 dark:bg-green-600/20 backdrop-blur-md p-1 rounded"
					>
						<span class="text-nowrap">Present:</span>
						<span class="font-semibold">{{ present }}</span>
					</div>
					<div
						class="text-orange-400 bg-orange-100/60 dark:bg-orange-600/20 backdrop-blur-md p-1 rounded"
					>
						<span class="text-nowrap">Late:</span>
						<span class="font-semibold">
							{{ late }}
						</span>
					</div>
					<div
						class="text-red-400 bg-red-100/60 dark:bg-red-600/20 backdrop-blur-md p-1 rounded"
					>
						<span class="text-nowrap">Absent:</span>
						<span class="font-semibold">{{ absent }}</span>
					</div>
					<div
						v-if="status == 'on going'"
						class="text-gray-400 bg-gray-100/60 dark:bg-gray-600/20 backdrop-blur-md p-1 rounded"
					>
						<span class="text-nowrap">Not Scanned:</span>
						<span class="font-semibold">{{ notScanned }}</span>
					</div>
				</div>
			</div>
			<div v-if="showActions" class="col-span-6 flex justify-between gap-4">
  				<!-- Left: Attendance Controls -->
				<div class="flex gap-2">
					<router-link :to="{name: 'class-attendance-page', params: { id: id }}">
						<Button
							v-if="meetingStatus === 'on going'"
							type="button"
							label="Open Attendance"
							icon="pi pi-external-link"
						/>
					</router-link>
					<Button
						v-if="meetingStatus === 'on going'"
						type="button"
						severity="danger"
						outlined
						label="Stop Attendance"
						icon="pi pi-stop"
						@click="stopAttendance(id)"
					/>
				</div>

				<!-- Right: Meeting Actions -->
				<div class="flex gap-2">
					<Button
						type="button"
						label="Details"
						icon="pi pi-info-circle"
						@click="viewDialog = true"
					/>
					<Button
						type="button"
						severity="danger"
						outlined
						icon="pi pi-trash"
						@click="deleteMeeting(id)"
					/>
				</div>
			</div>
		</div>
	</div>
	<ViewMeetingAttendance v-model:visible="viewDialog" :meetingId="id" :meetingName="name" />
</template>
<script lang="ts" setup>
import { capitalizeWords, formatDate, getAttendancePercentage } from '@/utils/formatUtils'
import { getStatusSeverity } from '@/utils/stylesUtils'
import { useConfirm, useToast } from 'primevue'
import { ref, watch } from 'vue'
import ViewMeetingAttendance from './dialogs/ViewMeetingAttendance.vue'

const confirm = useConfirm()
const toast = useToast()

const viewDialog = ref(false)

const props = defineProps({
	id: {
		type: Number,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	meetingDate: {
		type: String,
		required: true,
	},
	startTime: {
		type: String,
		required: true,
	},
	endTime: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		required: true,
	},
	present: {
		type: Number,
		default: 0,
		required: true,
	},
	late: {
		type: Number,
		default: 0,
		required: true,
	},
	absent: {
		type: Number,
		default: 0,
		required: true,
	},
	notScanned: {
		type: Number,
		default: 0,
		required: true,
	},
	status: {
		type: String,
		required: true,
	},
	showActions: {
		type: Boolean,
		default: true,
	},
})

const meetingStatus = ref('finished');

watch(
	() => props.status,
	(newData) => {
		meetingStatus.value = newData
	},
	{ immediate: true },
)

const stopAttendance = (id: number) => {
	confirm.require({
		message: 'Are you sure you want to stop attendace recording for this meeting?',
		header: 'Confirm Stop Attendance',
		icon: 'pi pi-exclamation-triangle',
		rejectProps: {
			label: 'Cancel',
			severity: 'secondary',
			outlined: true,
		},
		acceptProps: {
			label: 'Delete',
			severity: 'danger',
		},
		accept: () => {
			console.log(`Stop attendance record: ${id}`);

			toast.add({
				severity: 'info',
				summary: 'Successful',
				detail: 'Stop Attendance',
				life: 3000,
			})
		},
	})
}

const deleteMeeting = (id: number) => {
	confirm.require({
		message: 'Are you sure you want to delete this meeting?',
		header: 'Confirm Deletion',
		icon: 'pi pi-exclamation-triangle',
		rejectProps: {
			label: 'Cancel',
			severity: 'secondary',
			outlined: true,
		},
		acceptProps: {
			label: 'Delete',
			severity: 'danger',
		},
		accept: () => {
			confirmDeleteData(id)
		},
	})
}

const confirmDeleteData = async (id: number)  => {
	try {
		console.log(`Delete record: ${id}`);

		toast.add({
			severity: 'info',
			summary: 'Deleted',
			detail: 'Deleted meeting record',
			life: 3000,
		})
	} catch (error) {
		console.log(error);

		toast.add({
			severity: 'error',
			summary: 'Error',
			detail: error || 'Something went wrong',
			life: 3000,
		})
	}
}
</script>
<style></style>
