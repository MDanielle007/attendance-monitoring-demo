<template>
	<DataTable :value="attendance" dataKey="id" class="w-full" pt:root:class="rounded-xl" :loading="isLoading">
		<template #empty>
			<div class="text-center py-4 text-gray-500">
				No attendance records found
			</div>
		</template>
		<Column
			field="id_number"
			header="ID"
			class="bg-slate-100 dark:bg-slate-950"
		>
			<template #body="slotProps">
				<span class="font-semibold">
					{{ slotProps.data.id_number }}
				</span>
			</template>
		</Column>
		<Column
			field="last_name"
			header="Student Name"
			class="bg-slate-100 dark:bg-slate-950"
		>
			<template #body="slotProps">
				<span class="text-slate-700 dark:text-slate-300">
					{{
						getFullName(
							slotProps.data.first_name,
							slotProps.data.middle_name,
							slotProps.data.last_name,
						)
					}}
				</span>
			</template>
		</Column>
		<Column
			field="time"
			header="Time"
			class="bg-slate-100 dark:bg-slate-950"
		>
			<template #body="slotProps">
				<span class="text-slate-700 dark:text-slate-300 ">
					{{
						slotProps.data.time != '-' ? formatDate(slotProps.data.time, 'datetime'): slotProps.data.time
					}}
				</span>
			</template>
		</Column>
		<Column
			field="status"
			header="Status"
			class="bg-slate-100 dark:bg-slate-950"
		>
			<template #body="slotProps">
				<Tag
					:severity="getStatusSeverity(slotProps.data.status)"
					:value="capitalizeWords(slotProps.data.status)"
				>
				</Tag>
			</template>
		</Column>
	</DataTable>
</template>
<script lang="ts" setup>
import { capitalizeWords, formatDate, getFullName } from '@/utils/formatUtils';
import { getStatusSeverity } from '@/utils/stylesUtils';
import type { AttendanceStudents } from '@/types/meetings';
import type { PropType } from 'vue';

defineProps({
	attendance: {
		type: Array as PropType<AttendanceStudents[]>,
		required: true
	},
	isLoading: {
		type: Boolean,
		required: false
	}
})
</script>
