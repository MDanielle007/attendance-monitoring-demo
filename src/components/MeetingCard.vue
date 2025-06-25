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
							{{ absent }}
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
			<div class="col-span-6 flex justify-end gap-4">
				<Button
					v-if="status == 'on going'"
					type="button"
					severity="danger"
					outlined
					label="Stop Attendance"
					icon="pi pi-stop-circle"
					@click="stopAttendance"
				></Button>
				<Button
					type="button"
					label="View"
					icon="pi pi-eye"
					@click="viewDialog = true"
				></Button>
			</div>
		</div>
	</div>
	<ViewMeetingAttendance v-model:visible="viewDialog" :meetingId="id" :meetingName="name" />
</template>
<script lang="ts" setup>
import { capitalizeWords, formatDate, getAttendancePercentage } from '@/utils/formatUtils'
import { getStatusSeverity } from '@/utils/stylesUtils'
import { useConfirm, useToast } from 'primevue'
import { ref } from 'vue'
import ViewMeetingAttendance from './dialogs/ViewMeetingAttendance.vue'

const confirm = useConfirm()
const toast = useToast()

const viewDialog = ref(false)

defineProps({
	id: {
		type: Number,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	meetingDate: {
		type: Date,
		required: true,
	},
	startTime: {
		type: Date,
		required: true,
	},
	endTime: {
		type: Date,
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
})

const stopAttendance = () => {
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
			toast.add({
				severity: 'info',
				summary: 'Successful',
				detail: 'Stop Attendance',
				life: 3000,
			})
		},
	})
}
</script>
<style></style>
