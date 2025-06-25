<template>
	<div class="flex flex-col relative mt-8	md:mt-0">
		<CreateMeetingDialog
			v-model:visible="createdialog"
			:index="meetings.length"
		/>
		<div class="absolute -top-14 right-0">
			<Button
				type="button"
				label="New Meeting"
				icon="pi pi-plus"
				@click="createdialog = true"
			></Button>
		</div>
		<ScrollPanel
			class="w-full h-[600px] md:h-[500px] pr-0 md:pr-4"
			pt:barY:class="bg-slate-200 dark:bg-slate-700"
		>
			<div id="logContainer" class="flex flex-col gap-2">
				<MeetingCard
					v-for="(item, index) in meetings"
					:key="index"
					:id="item.id"
					:name="item.name"
					:meetingDate="item.meeting_date"
					:startTime="item.start_time"
					:endTime="item.end_time"
					:type="item.type"
					:present="item.present"
					:late="item.late"
					:absent="item.absent"
					:notScanned="item.notScanned"
					:status="item.status"
				/>
			</div>
		</ScrollPanel>
	</div>
</template>
<script lang="ts" setup>
import type { MeetingListRecord } from '@/types/meetings'
import MeetingCard from '@/components/MeetingCard.vue'
import CreateMeetingDialog from './dialogs/CreateMeetingDialog.vue'
import { onMounted, ref } from 'vue'

const createdialog = ref(false)

const meetings = ref<MeetingListRecord[]>([
	{
		id: 5,
		name: 'Meeting 005 CS101 - 1-F1',
		meeting_date: new Date('2025-06-06'),
		start_time: new Date('2025-06-06T08:00:00'),
		end_time: new Date('2025-06-06T09:30:00'),
		type: 'face-to-face',
		present: 32,
		late: 0,
		absent: 2,
		notScanned: 1,
		status: 'on going',
	},
	{
		id: 4,
		name: 'Meeting 004 CS101 - 1-F1',
		meeting_date: new Date('2025-06-05'),
		start_time: new Date('2025-06-05T08:00:00'),
		end_time: new Date('2025-06-05T09:30:00'),
		type: 'face-to-face',
		present: 31,
		late: 2,
		absent: 1,
		notScanned: 0,
		status: 'finished',
	},
	{
		id: 3,
		name: 'Meeting 003 CS101 - 1-F1',
		meeting_date: new Date('2025-06-03'),
		start_time: new Date('2025-06-03T08:00:00'),
		end_time: new Date('2025-06-03T09:30:00'),
		type: 'face-to-face',
		present: 28,
		late: 1,
		absent: 4,
		notScanned: 3,
		status: 'finished',
	},
	{
		id: 2,
		name: 'Meeting 002 CS101 - 1-F1',
		meeting_date: new Date('2025-06-01'),
		start_time: new Date('2025-06-01T08:00:00'),
		end_time: new Date('2025-06-01T09:30:00'),
		type: 'face-to-face',
		present: 30,
		late: 1,
		absent: 3,
		notScanned: 2,
		status: 'finished',
	},
	{
		id: 1,
		name: 'Meeting 001 CS101 - 1-F1',
		meeting_date: new Date('2025-05-30'),
		start_time: new Date('2025-05-30T08:00:00'),
		end_time: new Date('2025-05-30T09:30:00'),
		type: 'face-to-face',
		present: 29,
		late: 2,
		absent: 5,
		notScanned: 0,
		status: 'finished',
	},
])

onMounted(() => {
	const container = document.getElementById('logContainer')
	if (container) {
		container.scrollTop = container.scrollHeight
	}
})
</script>
<style></style>
