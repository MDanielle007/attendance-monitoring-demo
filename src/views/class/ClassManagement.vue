<template>
	<div class="flex justify-between flex-col md:flex-row gap-5 mb-4">
			<div>
				<h2 class="text-xl font-bold">Class Management</h2>
				<p class="dark:text-slate-400">
					View, create, import, update, and manage all classes
				</p>
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
				:descriptionSize="'text-xs'"
				:count="item.count"
				:icon="item.icon"
				:icon-bg-color="item.iconBgColor"
				:icon-color="item.iconColor"
			/>
	</div>
	<div class="mt-4">
		<ClassManagementDataTable/>
	</div>
</template>
<script lang="ts" setup>
import DistributionMetricCard from '@/components/DistributionMetricCard.vue'
import MetricCard from '@/components/MetricCard.vue'
import ClassManagementDataTable from '@/components/datatables/ClassManagementDataTable.vue'
import { useOptionStore } from '@/stores/optionStore'
import { onMounted, ref } from 'vue'

const yearLevelMetric = ref({
	title: 'Classes per Year Level Metrics',
	description: 'Overview of classes distribution across year levels',
	countLabel: 'Total Classes',
	count: 174,
	icon: 'pi pi-users',
	iconColor: 'text-blue-500',
	iconBgColor: 'bg-blue-100/80 dark:bg-blue-600/20 backdrop-blur-md',
	data: [
		{ yearLevel: '1st Year', count: 45, label: 'classes', icon: 'pi pi-book', color: 'green' },
		{ yearLevel: '2nd Year', count: 40, label: 'classes', icon: 'pi pi-book', color: 'blue' },
		{
			yearLevel: '3rd Year',
			count: 50,
			label: 'classes',
			icon: 'pi pi-book',
			color: 'orange',
		},
		{ yearLevel: '4th Year', count: 39, label: 'classes', icon: 'pi pi-book', color: 'red' },
	],
})

const metrics = ref([
	{
		title: 'Total Meetings',
		description: 'All meetings scheduled in the system',
		count: 42,
		icon: 'pi pi-calendar',
		iconColor: 'text-blue-500',
		iconBgColor: 'bg-blue-100/80 dark:bg-blue-600/20 backdrop-blur-md',
	},
	{
		title: 'Ongoing Meetings',
		description: 'Meetings currently in progress',
		count: 5,
		icon: 'pi pi-clock',
		iconColor: 'text-green-500',
		iconBgColor: 'bg-green-100/80 dark:bg-green-600/20 backdrop-blur-md',
	},
	{
		title: 'Avg. Students per Class',
		description: 'Average number of students attending each meeting',
		count: 28,
		icon: 'pi pi-users',
		iconColor: 'text-purple-500',
		iconBgColor: 'bg-purple-100/80 dark:bg-purple-600/20 backdrop-blur-md',
	},
	{
		title: 'Avg. Meeting Duration',
		description: 'Average duration of all meetings (in minutes)',
		count: 55,
		icon: 'pi pi-stopwatch',
		iconColor: 'text-orange-500',
		iconBgColor: 'bg-orange-100/80 dark:bg-orange-600/20 backdrop-blur-md',
	}
])

const optionStore = useOptionStore();


onMounted(() => {
	optionStore.getUserOptions();
	optionStore.getCourseOptions();
	optionStore.getProgramOptions();
})
</script>
<style>

</style>
