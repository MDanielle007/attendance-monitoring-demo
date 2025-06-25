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

		<CreateEditCourseDialog v-model:visible="showDialog" :data="selectedRecord" />
		<div
			class="flex items-center justify-between h-full bg-white dark:bg-slate-900 rounded-xl gap-2 p-5 border dark:border-slate-800 mt-4"
		>
			<DataTable
				:value="courses"
				dataKey="id"
				class="w-full"
				:paginator="true"
				:rows="10"
				:filters="filters"
				:rowsPerPageOptions="[5, 10, 25]"
			>
				<Column field="course_code" header="Course Code" style="min-width: 10rem">
					<template #body="slotProps">
						<div class="flex items-center">
							<span class="font-semibold">{{ slotProps.data.course_code }}</span>
						</div>
					</template>
				</Column>
				<Column
					field="course_description"
					header="Course Description"
					style="min-width: 10rem"
				></Column>
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
import CreateEditCourseDialog from '../dialogs/CreateEditCourseDialog.vue'
import type { CourseFormData } from '@/types/course'

const toast = useToast()
const confirm = useConfirm()

const filters = ref({
	global: { value: null, matchMode: FilterMatchMode.CONTAINS },
})

const showDialog = ref(false)

const courses = ref([
	{
		id: 1,
		course_code: 'CS101',
		course_description: 'Introduction to Computer Science',
	},
	{
		id: 2,
		course_code: 'CS102',
		course_description: 'Data Structures and Algorithms',
	},
	{
		id: 3,
		course_code: 'CS103',
		course_description: 'Database Management Systems',
	},
	{
		id: 4,
		course_code: 'CS104',
		course_description: 'Operating Systems',
	},
	{
		id: 5,
		course_code: 'CS105',
		course_description: 'Software Engineering',
	},
	{
		id: 6,
		course_code: 'IT201',
		course_description: 'Web Systems and Technologies',
	},
	{
		id: 7,
		course_code: 'IT202',
		course_description: 'Networking Fundamentals',
	},
	{
		id: 8,
		course_code: 'IT203',
		course_description: 'IT Project Management',
	},
	{
		id: 9,
		course_code: 'IS301',
		course_description: 'Information Systems Analysis and Design',
	},
	{
		id: 10,
		course_code: 'IS302',
		course_description: 'Business Process Management',
	},
])

const selectedRecord = ref<CourseFormData>({
	id: null,
	course_code: '',
	course_description: '',
})

const editCourse = (data: CourseFormData) => {
	selectedRecord.value = { ...data }
	showDialog.value = true
}

const deleteCourse = (id: number) => {
	confirm.require({
		message: 'Are you sure you want to delete this course?',
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
