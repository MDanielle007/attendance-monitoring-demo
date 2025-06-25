<template>
	<div class="w-full grid grid-cols-1 md:grid-cols-8 gap-4">
		<div class="flex flex-col justify-between mb-4 md:col-span-6">
			<h2 class="text-xl font-bold">{{ classInfo?.name }}</h2>
			<p v-if="!layout.isSmallScreen" class="dark:text-slate-400 md:w-[40%] text-sm">
				You can update the scheduled days and class time, as well as manage and create
				meetings for this class.
			</p>
		</div>
		<div v-if="!isSmallScreen" class="md:col-span-3">
			<EditClassForm :data="classInfo" />
		</div>
		<div class="md:col-span-5">
			<ClassMeetingList />
		</div>
	</div>
</template>
<script lang="ts" setup>
import { ClassService } from '@/services/ClassService'
import { useOptionStore } from '@/stores/optionStore'
import type { ClassFormDataEdit } from '@/types/classes'
import { ref, onBeforeMount, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import EditClassForm from '@/components/forms/EditClassForm.vue'
import ClassMeetingList from '@/components/ClassMeetingList.vue'
import { useLayoutStore } from '@/stores/layoutStore'
import { useClassStore } from '@/stores/classStore'

const route = useRoute()
const optionStore = useOptionStore()
const classStore = useClassStore()
const layout = useLayoutStore()
const isSmallScreen = computed(() => layout.isSmallScreen)

const classId = ref(0)
const classInfo = ref<ClassFormDataEdit>()

onBeforeMount(() => {
	if (typeof route.params.ref === 'string' && route.params.ref) {
		try {
			const decoded = atob(route.params.ref)
			const idString = decoded.replace('user_', '')
			const parsedId = parseInt(idString)

			if (!isNaN(parsedId)) {
				classId.value = parsedId
			} else {
				console.error('Invalid user ID format in reference')
			}
		} catch (error) {
			console.error('Error decoding reference:', error)
		}
	}
})

onMounted(async () => {
	try {
		await Promise.all([
			optionStore.getUserOptions(),
			optionStore.getCourseOptions(),
			optionStore.getProgramOptions(),
		])

		const response = await ClassService.get(classId.value)
		classStore.setClass(response)
		classInfo.value = classStore.classInfo
	} catch (error: unknown) {
		console.log(error)
	}
})
</script>
<style></style>
