<template>
	<div class="relative mt-14 md:mt-0">
		<div class="w-full flex justify-end absolute -top-14">
			<Button label="Export" icon="pi pi-upload" class="mr-2" severity="secondary" />
		</div>
		<div
			class="flex flex-col items-center justify-between h-full bg-white dark:bg-slate-900 rounded-xl gap-2 overflow-hidden border dark:border-slate-800"
		>
			<DataTable
				:value="data"
				dataKey="id"
				class="w-full"
				:paginator="true"
				:rows="10"
				:rowsPerPageOptions="[5, 10, 25]"
			>
				<Column field="role" header="Role">
					<template #body="slotProps">
						<div class="flex flex-col">
							<span>
								{{ capitalizeWords(slotProps.data.role) }}
							</span>
						</div>
					</template>
				</Column>
				<Column field="meeting_name" header="Meeting">
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
								{{ slotProps.data.username }}
							</span>
						</div>
					</template>
				</Column>
				<Column field="action" header="Action">
					<template #body="slotProps">
						<div class="flex flex-col">
							<span>
								{{ capitalizeWords(slotProps.data.action) }}
							</span>
							<span class="text-sm text-slate-500">
								{{ slotProps.data.description }}
							</span>
						</div>
					</template>
				</Column>
				<Column field="ip_address" header="Device Information">
					<template #body="slotProps">
						<div class="flex flex-col">
							<span>
								{{ slotProps.data.ip_address }}
							</span>
							<span class="text-xs text-slate-500">
								{{ slotProps.data.user_agent }}
							</span>
						</div>
					</template>
				</Column>
				<Column field="created_at" header="Date">
					<template #body="slotProps">
						{{ formatDate(slotProps.data.created_at, 'datetime') }}
					</template>
				</Column>
				<Column :exportable="false" header="Action">
					<template #body="slotProps">
						<Button
							icon="pi pi-eye"
							text
							class="mr-2"
							@click="viewLog(slotProps.data)"
						/>
					</template>
				</Column>
			</DataTable>
		</div>
	</div>
</template>
<script lang="ts" setup>
import type { AuditLog } from '@/types/auditLog'
import { capitalizeWords, formatDate, getFullName } from '@/utils/formatUtils'
import { ref } from 'vue'

const data = ref<AuditLog[]>([
	// Superadmin actions
	{
		username: 'jdoe',
		first_name: 'John',
		middle_name: 'Adobe',
		last_name: 'Doe',
		role: 'superadmin',
		model: 'User',
		record_id: '101',
		action: 'create',
		description: 'Created new faculty account: msmith',
		changes: [
			{ field: 'username', old_value: null, new_value: 'msmith' },
			{ field: 'role', old_value: null, new_value: 'faculty' },
		],
		ip_address: '192.168.1.100',
		user_agent: 'Mozilla/5.0 (Windows NT 10.0)',
		created_at: '2024-05-15 09:30:22',
	},
	{
		username: 'jdoe',
		first_name: 'John',
		middle_name: 'Adobe',
		last_name: 'Doe',
		role: 'superadmin',
		model: 'Student',
		record_id: '',
		action: 'import',
		description: 'Imported 150 student records via CSV',
		changes: [],
		ip_address: '192.168.1.100',
		user_agent: 'Mozilla/5.0 (Windows NT 10.0)',
		created_at: '2024-05-15 10:15:00',
	},
	{
		username: 'jdoe',
		first_name: 'John',
		middle_name: 'Adobe',
		last_name: 'Doe',
		role: 'superadmin',
		model: 'Class',
		record_id: 'CS-101',
		action: 'delete',
		description: 'Deleted class "CS-101: Advanced Programming"',
		changes: [
			{ field: 'class_name', old_value: 'CS-101: Advanced Programming', new_value: null },
		],
		ip_address: '192.168.1.100',
		user_agent: 'Mozilla/5.0 (Windows NT 10.0)',
		created_at: '2024-05-16 14:20:05',
	},

	// Faculty actions
	{
		username: 'msmith',
		first_name: 'Maria',
		middle_name: 'Luna',
		last_name: 'Smith',
		role: 'faculty',
		model: 'Meeting',
		record_id: 'M-205',
		action: 'create',
		description: 'Created meeting "Midterm Exam" for CS-101',
		changes: [{ field: 'meeting_name', old_value: null, new_value: 'Midterm Exam' }],
		ip_address: '192.168.1.150',
		user_agent: 'Safari/16.6 (Mac OS X)',
		created_at: '2024-05-17 08:45:33',
	},
	{
		username: 'msmith',
		first_name: 'Maria',
		middle_name: 'Luna',
		last_name: 'Smith',
		role: 'faculty',
		model: 'Attendance',
		record_id: '',
		action: 'export',
		description: 'Exported attendance data for CS-101 (May 2024)',
		changes: [],
		ip_address: '192.168.1.150',
		user_agent: 'Safari/16.6 (Mac OS X)',
		created_at: '2024-05-18 16:30:18',
	},

	// Student RFID scans (logged under faculty/superadmin)
	{
		username: 'SYSTEM',
		first_name: '',
		middle_name: '',
		last_name: '',
		role: 'system',
		model: 'Attendance',
		record_id: 'A-500',
		action: 'scan',
		description: 'Student RFID scanned: SN-2024-001 (Alice Chen) for CS-101/Midterm Exam',
		changes: [],
		ip_address: 'RFID_TERMINAL_01',
		user_agent: 'RFID Scanner v2.1',
		created_at: '2024-05-20 09:05:47',
	},
	{
		username: 'SYSTEM',
		first_name: '',
		middle_name: '',
		last_name: '',
		role: 'system',
		model: 'Attendance',
		record_id: 'A-501',
		action: 'scan',
		description: 'Student RFID scanned: SN-2024-002 (Bob Johnson) for CS-101/Midterm Exam',
		changes: [],
		ip_address: 'RFID_TERMINAL_01',
		user_agent: 'RFID Scanner v2.1',
		created_at: '2024-05-20 09:07:12',
	},

	// Faculty data modification
	{
		username: 'msmith',
		first_name: 'Maria',
		middle_name: 'Luna',
		last_name: 'Smith',
		role: 'faculty',
		model: 'Attendance',
		record_id: 'A-500',
		action: 'update',
		description: 'Marked student SN-2024-001 as "Excused Absence"',
		changes: [{ field: 'status', old_value: 'Present', new_value: 'Excused Absence' }],
		ip_address: '192.168.1.150',
		user_agent: 'Safari/16.6 (Mac OS X)',
		created_at: '2024-05-20 10:00:00',
	},
])

const viewLog = (data: AuditLog) => {
	console.log(data)
}
</script>
<style></style>
