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
			</div>
		</div>

		<CreateClassDialog v-model:visible="showDialog" />
		<div
			class="flex items-center justify-between h-full bg-white dark:bg-slate-900 rounded-xl gap-2 p-5 border dark:border-slate-800 mt-4"
		>
			<DataTable
				:value="classes"
				dataKey="id"
				class="w-full"
				:paginator="true"
				:rows="10"
				:filters="filters"
				:rowsPerPageOptions="[5, 10, 25]"
			>
				<Column field="class_name" header="Class Name">
					<template #body="slotProps">
						<div class="flex flex-col">
							<span class="font-semibold">{{ slotProps.data.name }}</span>
							<span class="text-xs text-slate-500">{{
								slotProps.data.course_code
							}}</span>
						</div>
					</template>
				</Column>
				<Column header="Faculty">
					<template #body="slotProps">
						<div class="flex items-center gap-2 text-slate-700 dark:text-slate-300">
							<Avatar
								v-if="!layout.isMediumScreen && !layout.isSmallScreen"
								:label="
									getInitials(slotProps.data.first_name, slotProps.data.last_name)
								"
								class="mr-2 font-semibold"
								size="medium"
								style="background-color: #ece9fc; color: #2a1261"
								shape="circle"
							/>

							<span class="">{{
								getFullName(
									slotProps.data.first_name,
									slotProps.data.middle_name,
									slotProps.data.last_name,
								)
							}}</span>
						</div>
					</template>
				</Column>
				<Column header="Program Year Level & Section" style="width: 10rem">
					<template #body="slotProps">
						<div class="flex items-center gap-2 text-slate-700 dark:text-slate-300">
							<span class="text-slate-700 dark:text-slate-300 font-semibold">
								{{ slotProps.data.program }}
							</span>
							<span>
								{{ slotProps.data.year_level }} - {{ slotProps.data.section }}
							</span>
						</div>
					</template>
				</Column>
				<Column header="Meetings" field="meetings">
					<template #body="slotProps">
						<span class="text-slate-700 dark:text-slate-300 font-semibold">
							{{ slotProps.data.meetings }}
						</span>
					</template>
				</Column>
				<Column header="Students" field="students">
					<template #body="slotProps">
						<span class="text-slate-700 dark:text-slate-300 font-semibold">
							{{ slotProps.data.students }}
						</span>
					</template>
				</Column>
				<Column :exportable="false" style="width: 10rem" header="Action">
					<template #body="slotProps">
						<Button
							icon="pi pi-eye"
							text
							class="mr-2"
							@click="viewClass(slotProps.data.id)"
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
import { onMounted, ref } from 'vue'
import { FilterMatchMode } from '@primevue/core/api'
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue'
import { getFullName, getInitials } from '@/utils/formatUtils'
import type { ClassTableRecord } from '@/types/classes'
import CreateClassDialog from '../dialogs/CreateClassDialog.vue'
import { useRouter } from 'vue-router'
import { ClassService } from '@/services/ClassService'
import { useLayoutStore } from '@/stores/layoutStore'

const toast = useToast()
const confirm = useConfirm()
const router = useRouter()
const layout = useLayoutStore()

const filters = ref({
	global: { value: null, matchMode: FilterMatchMode.CONTAINS },
})

const showDialog = ref(false)

const classes = ref<ClassTableRecord[]>([])

const viewClass = (id: string) => {
	router.push({
		name: 'class-details',
		params: { ref: btoa(`user_${id}`) },
	})
}

const deleteCourse = (id: number) => {
	confirm.require({
		message: 'Are you sure you want to delete this class record?',
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
			console.log(`Class with ID ${id} deleted`)
			toast.add({
				severity: 'success',
				summary: 'Successful',
				detail: 'Class Deleted',
				life: 3000,
			})
		},
	})
}

onMounted(async () => {
	try {
		classes.value = await ClassService.getAll()
	} catch (error: unknown) {
		console.log(error)
	}
})
</script>
