<template>
	<div class="flex justify-between flex-col md:flex-row gap-5 mb-4">
		<div>
			<h2 class="text-xl font-bold">Student Management</h2>
			<p class="dark:text-slate-400">View, create, import, update, and manage all students</p>
		</div>
	</div>
	<div class="grid grid-cols-2 md:grid-row-2 lg:grid-cols-4 gap-4">
		<DistributionMetricCard
			class="col-span-2 row-span-2"
			:title="yearLevelMetric.title"
			:description="yearLevelMetric.description"
			:count-label="yearLevelMetric.countLabel"
			:count="yearLevelMetric.count"
			:icon="yearLevelMetric.icon"
			:icon-color="yearLevelMetric.iconColor"
			:icon-bg-color="yearLevelMetric.iconBgColor"
			:data="yearLevelMetric.data"
		/>
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
	<div class="mt-4">
		<StudentManagementDataTable />
	</div>
</template>
<script lang="ts" setup>
import DistributionMetricCard from '@/components/DistributionMetricCard.vue'
import MetricCard from '@/components/MetricCard.vue'
import StudentManagementDataTable from '@/components/datatables/StudentManagementDataTable.vue'
import type { distributedMetric, metric } from '@/types/general'
import { ref } from 'vue'

const yearLevelMetric = ref<distributedMetric>({
	title: 'Student per Year Level Metrics',
	description: 'Overview of student distribution across year levels',
	countLabel: 'Total Students',
	count: 174,
	icon: 'pi pi-users',
	iconColor: 'text-blue-500',
	iconBgColor: 'bg-blue-100/80 dark:bg-blue-600/20 backdrop-blur-md',
	data: [
		{ yearLevel: '1st Year', count: 45, label: 'students', icon: 'pi pi-user', color: 'green' },
		{ yearLevel: '2nd Year', count: 40, label: 'students', icon: 'pi pi-user', color: 'blue' },
		{
			yearLevel: '3rd Year',
			count: 50,
			label: 'students',
			icon: 'pi pi-user',
			color: 'orange',
		},
		{ yearLevel: '4th Year', count: 39, label: 'students', icon: 'pi pi-user', color: 'red' },
	],
})

const metrics = ref<metric[]>([
	{
		title: 'Total Programs',
		description: 'Students academic programs',
		count: 12,
		icon: 'pi pi-sitemap',
		iconColor: 'text-blue-500',
		iconBgColor: 'bg-blue-100/80 dark:bg-blue-600/20 backdrop-blur-md',
	},
	{
		title: 'Total Sections',
		description: 'All active class sections',
		count: 34,
		icon: 'pi pi-th-large',
		iconColor: 'text-green-500',
		iconBgColor: 'bg-green-100/80 dark:bg-green-600/20 backdrop-blur-md',
	},
	{
		title: 'Students In Meeting',
		description: 'Currently attending students',
		count: 428,
		icon: 'pi pi-check',
		iconColor: 'text-emerald-500',
		iconBgColor: 'bg-emerald-100/80 dark:bg-emerald-600/20 backdrop-blur-md',
	},
	{
		title: 'Students Out of Meeting',
		description: 'Not attending or absent',
		count: 87,
		icon: 'pi pi-ban',
		iconColor: 'text-red-500',
		iconBgColor: 'bg-red-100/80 dark:bg-red-600/20 backdrop-blur-md',
	},
])
</script>
<style></style>
