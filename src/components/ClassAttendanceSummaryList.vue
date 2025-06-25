<template>
	<div
		class="flex flex-col h-full bg-white dark:bg-slate-900 rounded-xl gap-2 p-5 border dark:border-slate-800"
	>
		<div class="flex flex-col">
			<h2 class="text-lg font-semibold">Class Attendance Summary</h2>
			<p class="text-gray-600 dark:text-gray-500 text-sm">
				Attendance overview all classes today
			</p>
		</div>

		<DataView :value="classes">
			<template #list="slotProps">
				<ScrollPanel
					class="w-full pr-4"
					:style="{ height: '350px' }"
					pt:barY:class="bg-slate-200 dark:bg-slate-700"
				>
					<div class="flex flex-col">
						<div v-for="(item, index) in slotProps.items" :key="index">
							<div
								class="flex flex-col sm:items-center p-2 gap-1"
								:class="{
									'border-t border-surface-200 dark:border-surface-700':
										index !== 0,
								}"
							>
								<div class="flex justify-between w-full">
									<div class="flex flex-col">
										<span class="font-semibold">{{ item.className }}</span>
										<span class="text-sm text-gray-500"
											>Total Students:
											<span
												class="font-semibold text-slate-800 dark:text-white"
											>
												{{ item.totalStudents }}
											</span>
										</span>
									</div>
									<div class="flex flex-col items-end justify-end">
										<span class="text-xs text-slate-400">
											{{ item.time }}
										</span>
										<span class="font-semibold text-green-400">
											{{
												getAttendancePercentage(
													item.present,
													item.late,
													item.totalStudents,
												)
											}}
											%
										</span>
									</div>
								</div>
								<div class="flex items-end justify-end w-full gap-3 text-sm">
									<div
										class="text-green-400 bg-green-100/60 dark:bg-green-600/20 backdrop-blur-md p-1 rounded"
									>
										Present:
										<span class="font-semibold">{{ item.present }}</span>
									</div>
									<div
										class="text-orange-400 bg-orange-100/60 dark:bg-orange-600/20 backdrop-blur-md p-1 rounded"
									>
										Late:
										<span class="font-semibold">
											{{ item.absent }}
										</span>
									</div>
									<div
										class="text-red-400 bg-red-100/60 dark:bg-red-600/20 backdrop-blur-md p-1 rounded"
									>
										Absent:
										<span class="font-semibold">{{ item.absent }}</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</ScrollPanel>
			</template>
		</DataView>
	</div>
</template>
<script lang="ts" setup>
import { getAttendancePercentage } from '@/utils/formatUtils';
import { ref } from 'vue';

const classes = ref([
	{
		className: 'Math 101',
		totalStudents: 36,
		present: 25,
		late: 6,
		absent: 5,
		time: '12:00 PM',
	},
	{
		className: 'History 201',
		totalStudents: 33,
		present: 20,
		late: 5,
		absent: 8,
		time: '10:30 AM',
	},
	{
		className: 'Science 301',
		totalStudents: 34,
		present: 30,
		late: 2,
		absent: 2,
		time: '8:00 AM',
	},
	{
		className: 'English 102',
		totalStudents: 32,
		present: 28,
		late: 3,
		absent: 1,
		time: '9:00 AM',
	},
	{
		className: 'Computer Science 202',
		totalStudents: 35,
		present: 31,
		late: 1,
		absent: 3,
		time: '1:30 PM',
	},
	{
		className: 'Physics 401',
		totalStudents: 30,
		present: 22,
		late: 4,
		absent: 4,
		time: '3:00 PM',
	},
	{
		className: 'Biology 104',
		totalStudents: 29,
		present: 27,
		late: 0,
		absent: 2,
		time: '11:00 AM',
	},
	{
		className: 'Economics 210',
		totalStudents: 31,
		present: 26,
		late: 2,
		absent: 3,
		time: '2:15 PM',
	},
	{
		className: 'Art Appreciation 150',
		totalStudents: 28,
		present: 24,
		late: 2,
		absent: 2,
		time: '4:00 PM',
	},
	{
		className: 'Philosophy 105',
		totalStudents: 27,
		present: 20,
		late: 4,
		absent: 3,
		time: '5:30 PM',
	},
]);
</script>
