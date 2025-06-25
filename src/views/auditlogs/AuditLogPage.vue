<template>
	<div>
		<div class="flex justify-between flex-col md:flex-row gap-5 mb-4">
			<div>
				<h2 class="text-xl font-bold">Audit Logs</h2>
				<p class="dark:text-slate-400">
					Comprehensive record of all system activities, including user actions, data
					modifications, and access events
				</p>
			</div>
		</div>
		<div>
			<AudigLogDataTable />
		</div>
	</div>
</template>
<script lang="ts" setup>
import AudigLogDataTable from '@/components/datatables/AudigLogDataTable.vue'
</script>
<style></style>
