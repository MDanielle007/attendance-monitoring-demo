<template>
	<div>
		<Dialog v-model:visible="dialogVisible" modal :style="{ width: '50rem' }">
			<template #container>
				<div class="p-4">
					<h3 class="text-lg font-semibold text-gray-900 dark:text-white">
						Select Students for This Class
					</h3>
					<p class="text-sm text-gray-500 dark:text-gray-400 mt-1 mb-6">
						Based on the selected program, year level, and section, fetch eligible
						students to assign to this class.
					</p>

					<div class="w-full grid grid-cols-1 md:grid-cols-6 gap-4">
						<div class="md:col-span-2">
							<InputLabel value="Program" />
							<InputText readonly v-model="selectedSection.program" fluid />
						</div>
						<div class="md:col-span-2">
							<InputLabel value="Year Level" />
							<InputNumber readonly v-model="selectedSection.year_level" fluid />
						</div>
						<div class="md:col-span-2">
							<InputLabel value="Section" />
							<InputText readonly v-model="selectedSection.section" fluid />
						</div>
					</div>
					<div class="w-full flex justify-end mt-4">
						<Button type="button" label="Search Students" icon="pi pi-search"></Button>
					</div>
					<div class="my-4 p-1 rounded-lg dark:bg-slate-950">
						<ScrollPanel
							class="w-full bg-slate-100 dark:bg-slate-950 rounded-lg"
							:style="{ height: '350px' }"
							pt:barY:class="bg-slate-300 dark:bg-slate-800"
						>
							<DataTable
								v-if="students.length > 0"
								:value="students"
								dataKey="id"
								class="w-full"
							>
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
							label="Close"
							severity="secondary"
							@click="closeDialog"
						></Button>
						<Button
							type="button"
							label="Assign Selected"
							icon="pi pi-user-plus"
							@click="handleSave"
						></Button>
					</div>
				</div>
			</template>
		</Dialog>
	</div>
</template>
<script lang="ts" setup>
import InputLabel from '../InputLabel.vue'
import { ref, computed, watch } from 'vue'

type ProgramYearLevelSection = {
	program: string
	year_level: number | null
	section: string
}

const students = ref([])
const headers = ref<string[]>([])

const props = defineProps({
	visible: {
		type: Boolean,
		default: false,
	},
	data: {
		type: Object as () => ProgramYearLevelSection,
		default: () => ({
			program: '',
			year_level: null,
			section: '',
		}),
	},
})

const selectedSection = ref<ProgramYearLevelSection>({
	program: '',
	year_level: null,
	section: '',
})

watch(
	() => props.data,
	(newData : ProgramYearLevelSection) => {
		selectedSection.value = { ...newData }
	},
	{ deep: true },
)

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

const handleSave = () => {}

const closeDialog = () => {
	dialogVisible.value = false
}
</script>
