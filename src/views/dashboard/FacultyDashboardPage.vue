<template>
	<div>
		<div class="grid sm:grid-cols-2 md:grid-cols-4 gap-4 w-full">
			<MetricCard
				v-for="(item, index) in metrics"
				:key="index"
				:title="item.title"
				:description="item.description"
				:count="item.count"
				:icon="item.icon"
				:icon-bg-color="item.iconBgColor"
				:icon-color="item.iconColor"
			/>
		</div>
		<div class="grid grid-cols-4 gap-4 w-full mt-4">
			<LineChart
				class="col-span-4 md:col-span-3"
				title="Weekly Attendance Logs"
				description="Overall student attendance trend"
				:series="[
					{ name: 'Present', data: [120, 135, 128, 140, 130, 150, 145] },
					{ name: 'Late', data: [20, 39, 48, 20, 30, 20, 70] },
					{ name: 'Absent', data: [15, 10, 12, 8, 14, 5, 7] },
				]"
				:colors="[
					getCSSVariable('--p-green-500'),
					getCSSVariable('--p-orange-500'),
					getCSSVariable('--p-red-500'),
				]"
				:categories="[
					'2024-06-01T00:00:00.000Z',
					'2024-06-02T00:00:00.000Z',
					'2024-06-03T00:00:00.000Z',
					'2024-06-04T00:00:00.000Z',
					'2024-06-05T00:00:00.000Z',
					'2024-06-06T00:00:00.000Z',
					'2024-06-07T00:00:00.000Z',
				]"
			/>
			<ClassAttendanceSummaryList class="col-span-4 md:col-span-1" />
		</div>
	</div>
</template>
<script lang="ts" setup>
import { getCSSVariable } from '@/utils/stylesUtils'
import MetricCard from '@/components/MetricCard.vue'
import LineChart from '@/components/charts/LineChart.vue'
import ClassAttendanceSummaryList from '@/components/ClassAttendanceSummaryList.vue'
import { ref } from 'vue'
import type { metric } from '@/types/general'

const metrics = ref<metric[]>([
	{
		title: 'Total Courses',
		description: 'Course handled by the faculty',
		count: 23,
		icon: 'pi pi-briefcase',
		iconColor: 'text-fuchsia-500',
		iconBgColor: 'bg-fuchsia-100/80 dark:bg-fuchsia-600/20 backdrop-blur-md',
	},
	{
		title: 'Total Classes',
		description: 'Registered classes',
		count: 48,
		icon: 'pi pi-book',
		iconColor: 'text-green-500',
		iconBgColor: 'bg-green-100/80 dark:bg-green-600/20 backdrop-blur-md',
	},
	{
		title: 'Meetings Conducted',
		description: 'Class sessions held',
		count: 367,
		icon: 'pi pi-calendar',
		iconColor: 'text-cyan-500',
		iconBgColor: 'bg-cyan-100/80 dark:bg-cyan-600/20 backdrop-blur-md',
	},
	{
		title: 'Total Students',
		description: 'Enrolled students',
		count: 124,
		icon: 'pi pi-user',
		iconColor: 'text-orange-500',
		iconBgColor: 'bg-orange-100/80 dark:bg-orange-600/20 backdrop-blur-md',
	},
])
</script>
<style></style>
