<template>
	<div>
		<Dialog v-model:visible="dialogVisible" modal :style="{ width: '50rem' }">
			<template #container>
				<div class="p-4">
					<h3 class="text-lg font-semibold text-gray-900 dark:text-white">
						Import Students
					</h3>
					<p class="text-sm text-gray-500 dark:text-gray-400 mt-1 mb-6">
						Upload a Excel file to import student records into the system.
					</p>
					<div class="flex flex-col gap-4">
						<div class="w-full flex justify-content-center gap-3">
							<Button class="flex gap-2">
								<i class="pi pi-excel" style="font-size: 1rem"></i>
								Choose File
								<input
									ref="fileInput"
									style="opacity: 0; position: absolute"
									type="file"
									accept=".xlsx"
									@change="handleFileChange"
								/>
							</Button>
							<Button label="Clear" icon="pi pi-times" severity="secondary" @click="clearFile"/>
						</div>
					</div>
					<div class="my-4 p-1 rounded-lg dark:bg-slate-950">
						<ScrollPanel
							class="w-full bg-slate-100 dark:bg-slate-950 rounded-lg"
							:style="{ height: '350px' }"
							pt:barY:class="bg-slate-300 dark:bg-slate-800"
						>
							<DataTable v-if="students.length > 0" :value="students" dataKey="id" class="w-full ">
								<Column
									v-for="(item, index) in headers"
									:key="index"
									:header="item"
									:field="item"
									class="text-xs bg-slate-100 dark:bg-slate-950"
								></Column>
							</DataTable>
						</ScrollPanel>
					</div>
					<div class="flex justify-end gap-2 mt-4">
						<Button
							type="button"
							label="Cancel"
							severity="secondary"
							@click="closeDialog"
						></Button>
						<Button label="Import" @click="$emit('save')" />
					</div>
				</div>
			</template>
		</Dialog>
	</div>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue'
import { getRowKeys, importExcelFile } from '@/utils/excelUtils'
import type { ExcelRow } from '@/utils/excelUtils'

const students = ref<ExcelRow[]>([])
const headers = ref<string[]>([])

const props = defineProps({
	visible: {
		type: Boolean,
		default: false,
	},
})

const emit = defineEmits<{
	(e: 'update:visible', value: boolean): void
	(e: 'save'): void
}>()

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

const handleFileChange = async (event: Event) => {
	const input = event.target as HTMLInputElement
	const file = input.files?.[0]

	if (file) {
		const data = await importExcelFile(file)
		console.log('Imported Data:', data)
		students.value = [...data]

		if (data.length > 0) {
			const keys = getRowKeys(data[0])
			headers.value = [...keys]
			console.log('Detected Headers:', keys)
		}
	}
}

const fileInput = ref<HTMLInputElement | null>(null)

const clearFile = () => {
  students.value = []
  headers.value = []

  // Reset file input
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}
</script>
