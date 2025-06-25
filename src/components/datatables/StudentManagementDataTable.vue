<template>
	<div>
		<div
			class="flex items-center justify-between h-full bg-white dark:bg-slate-900 rounded-xl gap-2 p-4 border dark:border-slate-800"
		>
			<div>
				<IconField>
					<InputIcon>
						<i class="pi pi-search" />
					</InputIcon>
					<InputText v-model="filters['global'].value" placeholder="Search..." />
				</IconField>
			</div>

			<div>
				<Button label="New" icon="pi pi-plus" class="mr-2" @click="showDialog = true" />
				<Button
					label="Import"
					icon="pi pi-download"
					class="mr-2"
					severity="secondary"
					@click="showImportDialog = true"
				/>
				<Button label="Export" icon="pi pi-upload" class="mr-2" severity="secondary" />
			</div>
		</div>

		<CreateEditStudentDialog v-model:visible="showDialog" :data="selectedRecord" />
		<ImportStudentsDialog v-model:visible="showImportDialog" />
		<div
			class="flex items-center justify-between h-full bg-white dark:bg-slate-900 rounded-xl gap-2 p-5 border dark:border-slate-800 mt-4"
		>
			<DataTable
				:value="students"
				dataKey="id"
				class="w-full"
				:paginator="true"
				:rows="10"
				:filters="filters"
				:rowsPerPageOptions="[5, 10, 25]"
			>
				<Column field="id_number" header="ID Number">
					<template #body="slotProps">
						<div class="flex items-center">
							<span class="font-semibold">{{ slotProps.data.id_number }}</span>
						</div>
					</template>
				</Column>
				<Column header="Full Name" style="min-width: 20rem">
					<template #body="slotProps">
						<div class="flex items-center gap-2 text-slate-700 dark:text-slate-300">
							<Avatar
								:label="
									getInitials(slotProps.data.first_name, slotProps.data.last_name)
								"
								class="mr-2 font-semibold"
								size="medium"
								style="background-color: #ece9fc; color: #2a1261"
								shape="circle"
							/>

							<div class="flex flex-col">
								<span class="">{{
									getFullName(
										slotProps.data.first_name,
										slotProps.data.middle_name,
										slotProps.data.last_name,
									)
								}}</span>
								<span class="text-xs text-slate-700 dark:text-slate-400">{{
									slotProps.data.email
								}}</span>
							</div>
						</div>
					</template>
				</Column>
				<Column header="Program" field="program">
					<template #body="slotProps">
						<span class="text-slate-700 dark:text-slate-300">
							{{ slotProps.data.program }}
						</span>
					</template>
				</Column>
				<Column header="Year Level & Section" field="year_level">
					<template #body="slotProps">
						<div class="flex items-center gap-2 text-slate-700 dark:text-slate-300">
							<span class="font-semibold">
								{{ slotProps.data.year_level }} - {{ slotProps.data.section }}
							</span>
						</div>
					</template>
				</Column>

				<Column field="status" header="Status">
					<template #body="slotProps">
						<Tag
							:severity="getStatusSeverity(slotProps.data.status)"
							:value="slotProps.data.status"
							class="text-sm"
						>
						</Tag>
					</template>
				</Column>
				<Column :exportable="false" style="width: 10rem" header="Action">
					<template #body="slotProps">
						<Button
							icon="pi pi-pencil"
							text
							class="mr-2"
							@click="editCourse(slotProps.data)"
						/>
						<Button
							icon="pi pi-trash"
							text
							severity="danger"
							@click="deleteCourse(slotProps.data.id)"
						/>
					</template>
				</Column>
			</DataTable>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { FilterMatchMode } from '@primevue/core/api'
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue'
import CreateEditStudentDialog from '../dialogs/CreateEditStudentDialog.vue'
import ImportStudentsDialog from '../dialogs/ImportStudentsDialog.vue'
import { getFullName, getInitials } from '@/utils/formatUtils'
import type { StudentFormData, StudentTableRecord } from '@/types/student'
import { getStatusSeverity } from '@/utils/stylesUtils'

const toast = useToast()
const confirm = useConfirm()

const filters = ref({
	global: { value: null, matchMode: FilterMatchMode.CONTAINS },
})

const showDialog = ref(false)
const showImportDialog = ref(false)

const students = ref<StudentTableRecord[]>([
	{
		id: 1,
		id_number: 'MCC-2023-0001',
		first_name: 'John',
		middle_name: 'Adobo',
		last_name: 'Doe',
		program: 'BSIT',
		year_level: 1,
		section: 'F1',
		status: 'In Meeting',
		email: 'john.doe@email.com',
	},
	{
		id: 2,
		id_number: 'MCC-2023-0002',
		first_name: 'June',
		middle_name: 'Sinigang',
		last_name: 'Dela Cruz',
		program: 'BSIT',
		year_level: 1,
		section: 'F1',
		status: 'Out of Meeting',
		email: 'june.delacruz@email.com',
	},
	{
		id: 3,
		id_number: 'MCC-2023-0003',
		first_name: 'Carlos',
		middle_name: 'Lechon',
		last_name: 'Reyes',
		program: 'BSCS',
		year_level: 2,
		section: 'F2',
		status: 'In Meeting',
		email: 'carlos.reyes@email.com',
	},
	{
		id: 4,
		id_number: 'MCC-2023-0004',
		first_name: 'Maria',
		middle_name: 'Tinola',
		last_name: 'Santos',
		program: 'BSIS',
		year_level: 3,
		section: 'F2',
		status: 'In Meeting',
		email: 'maria.santos@email.com',
	},
	{
		id: 5,
		id_number: 'MCC-2023-0005',
		first_name: 'Liza',
		middle_name: 'Kare',
		last_name: 'Gonzales',
		program: 'BSIT',
		year_level: 2,
		section: 'F5',
		status: 'Out of Meeting',
		email: 'liza.gonzales@email.com',
	},
	{
		id: 6,
		id_number: 'MCC-2023-0006',
		first_name: 'Ramon',
		middle_name: 'Menudo',
		last_name: 'Torres',
		program: 'BSCS',
		year_level: 4,
		section: 'F2',
		status: 'In Meeting',
		email: 'ramon.torres@email.com',
	},
	{
		id: 7,
		id_number: 'MCC-2023-0007',
		first_name: 'Anna',
		middle_name: 'Bicol',
		last_name: 'Valdez',
		program: 'BSIS',
		year_level: 1,
		section: 'F2',
		status: 'Out of Meeting',
		email: 'anna.valdez@email.com',
	},
	{
		id: 8,
		id_number: 'MCC-2023-0008',
		first_name: 'Mark',
		middle_name: 'Laing',
		last_name: 'Fernandez',
		program: 'BSIT',
		year_level: 3,
		section: 'F3',
		status: 'In Meeting',
		email: 'mark.fernandez@email.com',
	},
])

const selectedRecord = ref<StudentFormData>({
	id: null,
	id_number: '',
	first_name: '',
	middle_name: '',
	last_name: '',
	email: '',
	year_level: '',
	program: '',
	section: '',
	contact_number: '',
	rfid_number: '',
})

const editCourse = (data: StudentFormData) => {
	selectedRecord.value = { ...data }
	showDialog.value = true
}

const deleteCourse = (id: number) => {
	confirm.require({
		message: 'Are you sure you want to delete this student record?',
		header: 'Confirm Deletion',
		icon: 'pi pi-exclamation-triangle',
		rejectProps: {
			label: 'Cancel',
			severity: 'secondary',
			outlined: true,
		},
		acceptProps: {
			label: 'Delete',
			severity: 'danger',
		},
		accept: () => {
			// Perform deletion logic here
			console.log(`Course with ID ${id} deleted`)
			toast.add({
				severity: 'success',
				summary: 'Successful',
				detail: 'Course Deleted',
				life: 3000,
			})
		},
	})
}
</script>
