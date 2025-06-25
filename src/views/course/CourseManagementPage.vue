<template>
	<div>
		<div class="flex justify-between flex-col md:flex-row gap-5 mb-4">
			<div>
				<h2 class="text-xl font-bold">Course Management</h2>
				<p class="dark:text-slate-400">
					View, create, update, and manage all courses
				</p>
			</div>
		</div>
		<CourseManagementDataTable/>
	</div>
</template>
<script lang="ts" setup>
import CourseManagementDataTable from '@/components/datatables/CourseManagementDataTable.vue';
</script>
<style>

</style>
