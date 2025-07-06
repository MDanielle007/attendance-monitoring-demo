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
					:present="item.attendance_summary.present"
					:late="item.attendance_summary.late"
					:absent="item.attendance_summary.absent"
					:notScanned="item.attendance_summary.not_scanned"
					:status="item.status"
					:showActions="true"
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
            id: 7,
            name: "7th Meeting ITC101 - 1-A",
            meeting_date: "2025-07-06",
            start_time: "07:30:00",
            end_time: "09:30:00",
            type: "face-to-face",
            status: "on going",
            attendance_summary: {
                "present": 0,
                "late": 0,
                "absent": 1,
                "not_scanned": 3
            }
        },
        {
            id: 6,
            name: "6th Meeting ITC101 - 1-A",
            meeting_date: "2025-07-06",
            start_time: "07:30:00",
            end_time: "09:30:00",
            type: "face-to-face",
            status: "finished",
            attendance_summary: {
                "present": 0,
                "late": 1,
                "absent": 3,
                "not_scanned": 0
            }
        },
        {
            id: 5,
            name: "5th Meeting ITC101 - 1-A",
            meeting_date: "2025-07-06",
            start_time: "07:30:00",
            end_time: "09:30:00",
            type: "face-to-face",
            status: "finished",
            attendance_summary: {
                "present": 0,
                "late": 0,
                "absent": 4,
                "not_scanned": 0
            }
        },
        {
            id: 4,
            name: "4th Meeting ITC101 - 1-A",
            meeting_date: "2025-07-06",
            start_time: "07:30:00",
            end_time: "09:30:00",
            type: "face-to-face",
            status: "finished",
            attendance_summary: {
                "present": 0,
                "late": 0,
                "absent": 4,
                "not_scanned": 0
            }
        },
        {
            id: 3,
            name: "3rd Meeting ITC101 - 1-A",
            meeting_date: "2025-07-06",
            start_time: "07:30:00",
            end_time: "09:30:00",
            type: "face-to-face",
            status: "finished",
            attendance_summary: {
                "present": 0,
                "late": 0,
                "absent": 4,
                "not_scanned": 0
            }
        },
        {
            id: 2,
            name: "2nd Meeting ITC101 - 1-A",
            meeting_date: "2025-07-05",
            start_time: "07:30:00",
            end_time: "09:30:00",
            type: "face-to-face",
            status: "finished",
            attendance_summary: {
                "present": 0,
                "late": 0,
                "absent": 4,
                "not_scanned": 0
            }
        },
        {
            id: 1,
            name: "1st Meeting ITC101 - 1-A",
            meeting_date: "2025-06-25",
            start_time: "07:30:00",
            end_time: "09:30:00",
            type: "face-to-face",
            status: "finished",
            attendance_summary: {
                "present": 0,
                "late": 0,
                "absent": 4,
                "not_scanned": 0
            }
        }
])

onMounted(() => {
	const container = document.getElementById('logContainer')
	if (container) {
		container.scrollTop = container.scrollHeight
	}
})
</script>
<style></style>
