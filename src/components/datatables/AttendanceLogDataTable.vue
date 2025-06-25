<template>
	<div class="relative mt-14 md:mt-0">
		<div class="w-full flex justify-end absolute -top-14">
			<Button label="Export" icon="pi pi-upload" class="mr-2" severity="secondary" />
		</div>
		<div
			class="flex flex-col items-center justify-between h-full bg-white dark:bg-slate-900 rounded-xl gap-2 overflow-hidden border dark:border-slate-800"
		>
			<DataTable
				:value="attendance"
				dataKey="id"
				class="w-full"
				:paginator="true"
				:rows="10"
				:rowsPerPageOptions="[5, 10, 25]"
			>
				<Column field="class_name" header="Class"></Column>
				<Column field="meeting_name" header="Meeting"></Column>
				<Column field="id_number" header="Student">
					<template #body="slotProps">
						<div class="flex flex-col">
							<span>
								{{
									getFullName(
										slotProps.data.first_name,
										slotProps.data.middle_name,
										slotProps.data.last_name,
									)
								}}
							</span>
							<span class="text-sm text-slate-500">
								{{ slotProps.data.id_number }}
							</span>
						</div>
					</template>
				</Column>
				<Column field="status" header="Status">
					<template #body="slotProps">
						<Tag
							:severity="getStatusSeverity(slotProps.data.status)"
							:value="capitalizeWords(slotProps.data.status)"
						>
						</Tag>
					</template>
				</Column>
				<Column field="scanned_time" header="Date">
					<template #body="slotProps">
						{{ formatDate(slotProps.data.scanned_time, 'datetime') }}
					</template>
				</Column>
			</DataTable>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { capitalizeWords, formatDate, getFullName } from '@/utils/formatUtils'
import { getStatusSeverity } from '@/utils/stylesUtils'
import { ref } from 'vue'

const attendance = ref([
	{
		class_name: 'Introduction to Programming - 1-F1',
		meeting_name: 'Meeting 005 CS101 - 1-F1',
		id_number: 'MCC2021-0001',
		first_name: 'John',
		middle_name: 'Adobo',
		last_name: 'Doe',
		status: 'present',
		scanned_time: new Date('2025-06-06T08:00:20'),
	},
	{
		class_name: 'Introduction to Programming - 1-F1',
		meeting_name: 'Meeting 005 CS101 - 1-F1',
		id_number: 'MCC2021-0002',
		first_name: 'June',
		middle_name: 'Sinigang',
		last_name: 'Dela Cruz',
		status: 'present',
		scanned_time: new Date('2025-06-06T08:00:19'),
	},
	{
		class_name: 'Introduction to Programming - 1-F1',
		meeting_name: 'Meeting 005 CS101 - 1-F1',
		id_number: 'MCC-2023-0003',
		first_name: 'Carlos',
		middle_name: 'Lechon',
		last_name: 'Reyes',
		status: 'absent',
		scanned_time: new Date('2025-06-06T08:00:19'),
	},
	{
		class_name: 'Introduction to Programming - 1-F1',
		meeting_name: 'Meeting 005 CS101 - 1-F1',
		id_number: 'MCC-2023-0004',
		first_name: 'Maria',
		middle_name: 'Tinola',
		last_name: 'Santos',
		status: 'present',
		scanned_time: new Date('2025-06-06T08:00:17'),
	},
	{
		class_name: 'Introduction to Programming - 1-F1',
		meeting_name: 'Meeting 005 CS101 - 1-F1',
		id_number: 'MCC-2023-0005',
		first_name: 'Liza',
		middle_name: 'Kare',
		last_name: 'Gonzales',
		status: 'late',
		scanned_time: new Date('2025-06-06T08:00:17'),
	},
	{
		class_name: 'Introduction to Programming - 1-F1',
		meeting_name: 'Meeting 005 CS101 - 1-F1',
		id_number: 'MCC-2023-0006',
		first_name: 'Ramon',
		middle_name: 'Menudo',
		last_name: 'Torres',
		status: 'present',
		scanned_time: new Date('2025-06-06T08:00:17'),
	},
	{
		class_name: 'Introduction to Programming - 1-F1',
		meeting_name: 'Meeting 005 CS101 - 1-F1',
		id_number: 'MCC-2023-0007',
		first_name: 'Anna',
		middle_name: 'Bicol',
		last_name: 'Valdez',
		status: 'late',
		scanned_time: new Date('2025-06-06T08:00:17'),
	},
	{
		class_name: 'Introduction to Programming - 1-F1',
		meeting_name: 'Meeting 005 CS101 - 1-F1',
		id_number: 'MCC-2023-0008',
		first_name: 'Mark',
		middle_name: 'Laing',
		last_name: 'Fernandez',
		status: 'present',
		scanned_time: new Date('2025-06-06T08:00:15'),
	},
])
</script>
<style></style>
