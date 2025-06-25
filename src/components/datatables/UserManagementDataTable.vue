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
				<router-link :to="{ name: 'create-user-account' }">
					<Button label="New" icon="pi pi-plus" class="mr-2" />
				</router-link>
			</div>
		</div>
		<div
			class="flex items-center justify-between h-full bg-white dark:bg-slate-900 rounded-xl gap-2 p-5 border dark:border-slate-800 mt-4"
		>
			<DataTable
				:value="users"
				dataKey="id"
				class="w-full"
				:paginator="true"
				:rows="10"
				:filters="filters"
				:rowsPerPageOptions="[5, 10, 25]"
			>
				<Column field="username" header="Username" style="min-width: 10rem">
					<template #body="slotProps">
						<div class="flex items-center">
							<span class="font-semibold">{{ slotProps.data.username }}</span>
						</div>
					</template>
				</Column>
				<Column header="Full Name" style="min-width: 12rem">
					<template #body="slotProps">
						<div class="flex items-center gap-2">
							<Avatar
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
				<Column field="role" header="Role" style="width: 10rem">
					<template #body="slotProps">
						<div>
							{{ capitalizeWords(slotProps.data.role) }}
						</div>
					</template>
				</Column>
				<Column field="status" header="Status" style="width: 10rem">
					<template #body="slotProps">
						<Tag
							:severity="getStatusSeverity(slotProps.data.status)"
							:value="capitalizeWords(slotProps.data.status)"
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
							@click="editUser(slotProps.data.id)"
						/>
						<Button
							icon="pi pi-trash"
							text
							severity="danger"
							@click="deleteUser(slotProps.data.id)"
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
import { capitalizeWords, getFullName, getInitials } from '@/utils/formatUtils'
import { getStatusSeverity } from '@/utils/stylesUtils'
import { useRouter } from 'vue-router'
import { useConfirm } from 'primevue'
import type { UserTableRecord } from '@/types/user'

const toast = useToast()
const router = useRouter()
const confirm = useConfirm()

const filters = ref({
	global: { value: null, matchMode: FilterMatchMode.CONTAINS },
	username: { value: null, matchMode: FilterMatchMode.CONTAINS },
	first_name: { value: null, matchMode: FilterMatchMode.CONTAINS },
})

const users = ref<UserTableRecord[]>([
	{
		id: 1,
		username: 'jdoe',
		first_name: 'John',
		middle_name: 'Adobe',
		last_name: 'Doe',
		role: 'superadmin',
		status: 'active',
	},
	{
		id: 2,
		username: 'msantos',
		first_name: 'Maria',
		middle_name: 'Langka',
		last_name: 'Santos',
		role: 'faculty',
		status: 'inactive',
	},
	{
		id: 3,
		username: 'rlim',
		first_name: 'Robert',
		middle_name: 'Tangirine',
		last_name: 'Lim',
		role: 'faculty',
		status: 'active',
	},
	{
		id: 4,
		username: 'achavez',
		first_name: 'Angela',
		middle_name: 'Camel',
		last_name: 'Chavez',
		role: 'superadmin',
		status: 'active',
	},
	{
		id: 5,
		username: 'dcruz',
		first_name: 'David',
		middle_name: 'Rizz',
		last_name: 'Cruz',
		role: 'faculty',
		status: 'active',
	},
	{
		id: 6,
		username: 'klopez',
		first_name: 'Karen',
		middle_name: 'Manalo',
		last_name: 'Lopez',
		role: 'faculty',
		status: 'active',
	},
	{
		id: 7,
		username: 'bsalvador',
		first_name: 'Brian',
		middle_name: 'Donya',
		last_name: 'Salvador',
		role: 'superadmin',
		status: 'inactive',
	},
	{
		id: 8,
		username: 'emartinez',
		first_name: 'Elena',
		middle_name: 'Pinia',
		last_name: 'Martinez',
		role: 'faculty',
		status: 'active',
	},
	{
		id: 9,
		username: 'tgarcia',
		first_name: 'Thomas',
		middle_name: '',
		last_name: 'Garcia',
		role: 'faculty',
		status: 'inactive',
	},
	{
		id: 10,
		username: 'rnavarro',
		first_name: 'Reina',
		middle_name: 'Barbaro',
		last_name: 'Navarro',
		role: 'faculty',
		status: 'active',
	},
])

const editUser = (id: string) => {
	router.push({
		name: 'user-account-edit',
		params: { ref: btoa(`user_${id}`) },
	})
}

const deleteUser = (id: number) => {
	confirm.require({
		message: 'Are you sure you want to delete this user?',
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
			console.log(`User with ID ${id} deleted`)
			toast.add({
				severity: 'success',
				summary: 'Successful',
				detail: 'User Deleted',
				life: 3000,
			})
		},
	})
}
</script>
