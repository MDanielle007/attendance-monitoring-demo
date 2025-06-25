<template>
	<div>
		<div class="flex justify-between flex-col md:flex-row gap-5">
			<div>
				<h2 class="text-xl font-bold">User Management</h2>
				<p class="dark:text-slate-400">
					View, create, update, and manage all user accounts
				</p>
			</div>
		</div>
		<div class="grid sm:grid-cols-2 md:grid-cols-4 gap-4 w-full mt-4">
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
			<UserManagementDataTable/>
		</div>
	</div>
</template>
<script lang="ts" setup>
import MetricCard from '@/components/MetricCard.vue'
import UserManagementDataTable from '@/components/datatables/UserManagementDataTable.vue';

import { ref } from 'vue';


const metrics = ref([
	{
		title: 'Total Users',
		description: 'All registered accounts',
		count: 234,
		icon: 'pi pi-users',
		iconColor: 'text-blue-500',
		iconBgColor: 'bg-blue-100/80 dark:bg-blue-600/20 backdrop-blur-md',
	},
	{
		title: 'Total Superadmins',
		description: 'System-level administrators',
		count: 4,
		icon: 'pi pi-shield',
		iconColor: 'text-red-500',
		iconBgColor: 'bg-red-100/80 dark:bg-red-600/20 backdrop-blur-md',
	},
	{
		title: 'Total Faculty',
		description: 'Professors and instructors',
		count: 68,
		icon: 'pi pi-briefcase',
		iconColor: 'text-fuchsia-500',
		iconBgColor: 'bg-fuchsia-100/80 dark:bg-fuchsia-600/20 backdrop-blur-md',
	},
	{
		title: 'Active Users',
		description: 'Currently logged in',
		count: 29,
		icon: 'pi pi-wifi',
		iconColor: 'text-green-500',
		iconBgColor: 'bg-green-100/80 dark:bg-green-600/20 backdrop-blur-md',
	},
])
</script>
<style>

</style>
