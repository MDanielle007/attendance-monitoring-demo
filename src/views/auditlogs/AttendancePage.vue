<template>
	<div class="flex justify-between flex-col md:flex-row gap-5 mb-4">
		<div>
			<h2 class="text-xl font-bold">Attendance Logs</h2>
			<p class="dark:text-slate-400">
				View all student attendance scan records including class, meeting, and timestamp
			</p>
		</div>
	</div>
	<div>
		<AttendanceLogDataTable />
	</div>
</template>
<script lang="ts" setup>
import AttendanceLogDataTable from '@/components/datatables/AttendanceLogDataTable.vue'
</script>
<style></style>
