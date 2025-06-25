<template>
	<div>
		<Dialog v-model:visible="dialogVisible" modal :style="{ width: '50rem' }">
			<template #container>
				<div class="p-4">
					<h3 class="text-lg font-semibold text-gray-900 dark:text-white">
						{{ meetingName }} Attendance Logs
					</h3>
					<p class="text-sm text-gray-500 dark:text-gray-400 mt-1 mb-6">
						Below are the attendance records for the selected meeting. Review the list
						to see each participant's attendance status.
					</p>
					<div class="my-4 p-1 rounded-lg dark:bg-slate-950">
						<ScrollPanel
							class="w-full bg-slate-100 dark:bg-slate-950 rounded-lg"
							:style="{ height: '350px' }"
							pt:barY:class="bg-slate-300 dark:bg-slate-800"
						>
							<DataTable :value="attendance" dataKey="id" class="w-full">
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
						</ScrollPanel>
					</div>
					<div class="flex justify-end gap-2 mt-4">
						<Button
							type="button"
							label="Close"
							severity="secondary"
							@click="closeDialog"
						></Button>
					</div>
				</div>
			</template>
		</Dialog>
	</div>
</template>
<script lang="ts" setup>
import { capitalizeWords, getFullName } from '@/utils/formatUtils'
import { getStatusSeverity } from '@/utils/stylesUtils'
import { computed, ref } from 'vue'

const props = defineProps({
	visible: {
		type: Boolean,
		default: false,
	},
	meetingId: {
		type: Number,
	},
	meetingName: {
		type: String,
	},
})

const emit = defineEmits<{
	(e: 'update:visible', value: boolean): void
	(e: 'save'): void
}>()

const attendance = ref([
	{
		id_number: 'MCC-2023-0001',
		first_name: 'John',
		middle_name: 'Adobo',
		last_name: 'Doe',
		status: 'present',
	},
	{
		id_number: 'MCC-2023-0002',
		first_name: 'June',
		middle_name: 'Sinigang',
		last_name: 'Dela Cruz',
		status: 'present',
	},
	{
		id_number: 'MCC-2023-0003',
		first_name: 'Carlos',
		middle_name: 'Lechon',
		last_name: 'Reyes',
		status: 'absent',
	},
	{
		id_number: 'MCC-2023-0004',
		first_name: 'Maria',
		middle_name: 'Tinola',
		last_name: 'Santos',
		status: 'present',
	},
	{
		id_number: 'MCC-2023-0005',
		first_name: 'Liza',
		middle_name: 'Kare',
		last_name: 'Gonzales',
		status: 'late',
	},
	{
		id_number: 'MCC-2023-0006',
		first_name: 'Ramon',
		middle_name: 'Menudo',
		last_name: 'Torres',
		status: 'present',
	},
	{
		id_number: 'MCC-2023-0007',
		first_name: 'Anna',
		middle_name: 'Bicol',
		last_name: 'Valdez',
		status: 'late',
	},
	{
		id_number: 'MCC-2023-0008',
		first_name: 'Mark',
		middle_name: 'Laing',
		last_name: 'Fernandez',
		status: 'present',
	},
])

const dialogVisible = computed({
	get() {
		return props.visible
	},
	set(value: boolean) {
		emit('update:visible', value)
	},
})

const closeDialog = () => {
	dialogVisible.value = false
}
</script>
<style></style>
