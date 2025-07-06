<template>
	<div>
		<div
			class="flex flex-wrap items-center justify-between h-full bg-white dark:bg-slate-900 rounded-xl gap-2 p-2 border dark:border-slate-800"
		>
			<div class="order-2 md:order-1">
				<router-link :to="{name: 'class-details'}">
					<Button
						severity="secondary"
						label="Back"
						icon="pi pi-arrow-left"
						class="w-full md:w-auto"
					></Button>
				</router-link>
			</div>

			<div class="order-1 md:order-2 w-full md:w-fit font-bold text-xl text-center">
				{{ meeting?.name }}
			</div>

			<div class="order-2 md:order-3">
				<Button
					type="button"
					severity="danger"
					outlined
					label="Stop Attendance"
					icon="pi pi-stop"
					@click="stopAttendance"
				/>
			</div>
		</div>
		<div
			class="flex flex-col items-center justify-between h-full bg-white dark:bg-slate-900 rounded-xl p-2 border dark:border-slate-800 mt-2"
		>
			<div class="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 w-full">
				<div class="flex flex-col justify-between bg-slate-100 dark:bg-slate-950 space-y-1 md:space-y-2 rounded-lg p-3">
					<div class="flex justify-between">
						<div class="flex items-center gap-1">
							<div class="h-fit flex justify-center align-middle p-2 rounded-lg bg-green-100/80 dark:bg-green-600/20 backdrop-blur-md">
								<i class="pi pi-check text-green-500 md:text-lg"></i>
							</div>
							<span class="font-semibold text-slate-950 dark:text-slate-100">
								Present
							</span>
						</div>
						<div class="flex items-center font-bold md:text-xl text-slate-950 dark:text-slate-100">
							{{ meeting.attendance_summary.present }}
						</div>
					</div>

					<ProgressBar
						class="w-full"
						:showValue="false"
						:value="getPercentage(totalAttendance, meeting.attendance_summary.present)"
						pt:root:style="height: 10px"
						pt:value:class="bg-green-500"
					></ProgressBar>
				</div>

				<div class="flex flex-col justify-between bg-slate-100 dark:bg-slate-950 space-y-1 md:space-y-2 rounded-lg p-3">
					<div class="flex justify-between">
						<div class="flex items-center gap-1">
							<div class="h-fit flex justify-center align-middle p-2 rounded-lg bg-orange-100/80 dark:bg-orange-600/20 backdrop-blur-md">
								<i class="pi pi-exclamation-triangle text-orange-500 md:text-xl"></i>
							</div>
							<span class="font-semibold text-slate-950 dark:text-slate-100">
								Late
							</span>
						</div>
						<div class="flex items-center font-bold md:text-xl text-slate-950 dark:text-slate-100">
							{{ meeting.attendance_summary.late }}
						</div>
					</div>

					<ProgressBar
						class="w-full"
						:showValue="false"
						:value="getPercentage(totalAttendance, meeting.attendance_summary.late)"
						pt:root:style="height: 10px"
						pt:value:class="bg-orange-500"
					></ProgressBar>
				</div>

				<div class="flex flex-col justify-between bg-slate-100 dark:bg-slate-950 space-y-1 md:space-y-2 rounded-lg p-3">
					<div class="flex justify-between">
						<div class="flex items-center gap-1">
							<div class="h-fit flex justify-center align-middle p-2 rounded-lg bg-red-100/80 dark:bg-red-600/20 backdrop-blur-md">
								<i class="pi pi-times text-red-500 md:text-xl"></i>
							</div>
							<span class="font-semibold text-slate-950 dark:text-slate-100">
								Absent
							</span>
						</div>
						<div class="flex items-center font-bold md:text-xl text-slate-950 dark:text-slate-100">
							{{ meeting.attendance_summary.absent }}
						</div>
					</div>

					<ProgressBar
						class="w-full"
						:showValue="false"
						:value="getPercentage(totalAttendance,meeting.attendance_summary.absent)"
						pt:root:style="height: 10px"
						pt:value:class="bg-red-500"
					></ProgressBar>
				</div>

				<div class="flex flex-col justify-between bg-slate-100 dark:bg-slate-950 space-y-1 md:space-y-2 rounded-lg p-3">
					<div class="flex justify-between">
						<div class="flex items-center gap-1">
							<div class="h-fit flex justify-center align-middle p-2 rounded-lg bg-gray-100/80 dark:bg-gray-600/20 backdrop-blur-md">
								<i class="pi pi-question text-gray-500 md:text-xl"></i>
							</div>
							<span class="font-semibold text-slate-950 dark:text-slate-100">
								Not Scanned
							</span>
						</div>
						<div class="flex items-center font-bold md:text-xl text-slate-950 dark:text-slate-100">
							{{ meeting.attendance_summary.not_scanned }}
						</div>
					</div>

					<ProgressBar
						class="w-full"
						:showValue="false"
						:value="getPercentage(totalAttendance,meeting.attendance_summary.not_scanned)"
						pt:root:style="height: 10px"
						pt:value:class="bg-gray-500"
					></ProgressBar>
				</div>
			</div>
			<Divider/>
			<div class="flex flex-wrap justify-between w-full">
				<div class="text-slate-500 dark:text-slate-400 text-sm md:text-md">
					<i class="pi pi-user"></i>
					Total Students: <strong>{{ totalAttendance }}</strong>
				</div>
				<div class="text-sm md:text-md">
					<i class="pi pi-flag"></i>
					Attendance: <strong class="text-green-500">{{ getAttendancePercentage(meeting.attendance_summary.present, meeting.attendance_summary.late, totalAttendance) }}%</strong>
				</div>
				<div class="text-slate-500 dark:text-slate-400  text-sm md:text-md">
					<i class="pi pi-clock"></i>
					{{ formatDate(meeting.start_time, 'time-12hr') }} - {{ formatDate(meeting.end_time, 'time-12hr') }}
				</div>
			</div>
		</div>

		<div
			class="flex flex-col items-center justify-between h-full bg-white dark:bg-slate-900 rounded-xl p-2 border dark:border-slate-800 mt-2"
		>
			<div class="w-full md:w-96 space-y-4 my-4">
				<div class="bg-blue-100/80 dark:bg-blue-600/20 text-blue-500 backdrop-blur-md p-5 w-fit rounded-full mx-auto">
					<i class="pi pi-id-card text-4xl"></i>
				</div>
				<div>
					<h2 class="text-2xl font-bold text-center">
						Scan Student's RFID
					</h2>
					<p class="text-slate-500 dark:text-slate-400 text-xs text-center">
						Use the scanner to record attendance for students.<br/>Ensure the RFID is registered in the system.
					</p>
				</div>
				<InputText placeholder="Scan RFID or enter manually..." fluid v-model="studentRFID" @keydown.enter="handleSubmit"/>
				<div class="flex gap-2">
					<Button
						label="Submit"
						icon="pi pi-check"
						severity="primary"
						class="w-full"
						:loading="isLoadingButton"
						@click="handleSubmit"
					/>
					<Button icon="pi pi-times" severity="secondary" class="py-3 px-6" />
				</div>
			</div>
		</div>
		<div
			class="flex flex-col items-center justify-between h-full bg-white dark:bg-slate-900 rounded-xl py-3 border dark:border-slate-800 mt-2"
		>
			<StudentAttendanceDataTable :attendance="attendance" :isLoading="isLoading"/>
		</div>
	</div>
</template>
<script lang="ts" setup>
import type { AttendanceStudents, MeetingListRecord } from '@/types/meetings';
import { formatDate, getAttendancePercentage, getPercentage } from '@/utils/formatUtils';
import { useConfirm, useToast } from 'primevue';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import StudentAttendanceDataTable from '@/components/datatables/StudentAttendanceDataTable.vue';

const confirm = useConfirm()
const toast = useToast()
const route = useRoute();
const router = useRouter()

const meeting = ref<MeetingListRecord>(
	{
		id: 0,
		name: '',
		meeting_date: '',
		start_time: '',
		end_time: '',
		type: '',
		status: '',
		attendance_summary: {
			present: 0,
			late: 0,
			absent: 0,
			not_scanned: 0
		}
	}
)

const studentRFID = ref<string>('')
const isLoading = ref(false)
const isLoadingButton = ref(false)
const attendance = ref<AttendanceStudents[]>([])

const totalAttendance = computed(() => {
	const summary = meeting.value.attendance_summary

	const sum = summary.present + summary.late + summary.absent + summary.not_scanned
	console.log(sum);

	return sum
})

const handleSubmit = async () => {
	isLoadingButton.value = true

	try {
		toast.add({
			severity: 'success',
			summary: 'Success',
			detail: 'Update student attendance successfully',
			life: 3000,
		})
		await fetchData()
	} catch (error) {
		toast.add({
			severity: 'error',
			summary: 'Failed',
			detail: error,
			life: 3000,
		})
	} finally {
		isLoadingButton.value = false
	}
}

const fetchData = async () => {
	isLoading.value = true;

	try {
		meeting.value = {
			id: 7,
			name: "7th Meeting ITC101 - 1-A",
			meeting_date: "2025-07-06",
			start_time: "07:30:00",
			end_time: "09:30:00",
			type: "face-to-face",
			status: "on going",
			attendance_summary: {
				present: 5,
				late: 2,
				absent: 1,
				not_scanned: 0
			}
		}
		await fetchAttendanceData()
	} catch (error) {
		console.error('Error fetching user data:', error)
	} finally {
		isLoading.value = false
	}
}

const fetchAttendanceData = async () => {
	console.log();

	if (!meeting.value.id) return

	isLoading.value = true
	try {
		attendance.value = [
			{
				id: 1,
				id_number: 'MCC-2023-0001',
				first_name: 'John',
				middle_name: 'Adobo',
				last_name: 'Doe',
				status: 'present',
			},
			{
				id: 2,
				id_number: 'MCC-2023-0002',
				first_name: 'June',
				middle_name: 'Sinigang',
				last_name: 'Dela Cruz',
				status: 'present',
			},
			{
				id: 3,
				id_number: 'MCC-2023-0003',
				first_name: 'Carlos',
				middle_name: 'Lechon',
				last_name: 'Reyes',
				status: 'absent',
			},
			{
				id: 4,
				id_number: 'MCC-2023-0004',
				first_name: 'Maria',
				middle_name: 'Tinola',
				last_name: 'Santos',
				status: 'present',
			},
			{
				id: 5,
				id_number: 'MCC-2023-0005',
				first_name: 'Liza',
				middle_name: 'Kare',
				last_name: 'Gonzales',
				status: 'late',
			},
			{
				id: 6,
				id_number: 'MCC-2023-0006',
				first_name: 'Ramon',
				middle_name: 'Menudo',
				last_name: 'Torres',
				status: 'present',
			},
			{
				id: 7,
				id_number: 'MCC-2023-0007',
				first_name: 'Anna',
				middle_name: 'Bicol',
				last_name: 'Valdez',
				status: 'late',
			},
			{
				id: 8,
				id_number: 'MCC-2023-0008',
				first_name: 'Mark',
				middle_name: 'Laing',
				last_name: 'Fernandez',
				status: 'present',
			},
		]
	} catch (error) {
		console.error('Error fetching user data:', error)
	} finally {
		isLoading.value = false
	}
}

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
			label: 'Stop Attendance',
			severity: 'danger',
		},
		accept: () => {
			const idParam = route.params.id;
			const id = Array.isArray(idParam) ? Number(idParam[0]) : Number(idParam);
			confirmStopAttendance(id)
		},
	})
}

const confirmStopAttendance = async (id: number)  => {
	try {
		console.log(`Stop attendance record:${id}`);


		if (meeting.value) {
			meeting.value.status = 'finished'
		}

		toast.add({
			severity: 'info',
			summary: 'Success',
			detail: 'Stopped attendance recording successfully',
			life: 3000,
		})

		await fetchData();

		router.push({name:'class-details'})
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

onMounted(async() => {
	try {
		await fetchData()
	} catch (error) {
		console.log(error);
	}
})

</script>
<style>

</style>
