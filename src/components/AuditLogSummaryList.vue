<template>
	<div
		class="flex flex-col h-full bg-white dark:bg-slate-900 rounded-xl gap-2 p-5 border dark:border-slate-800"
	>
		<div class="flex flex-col">
			<h2 class="text-lg font-semibold">Audit Log</h2>
			<p class="text-gray-600 dark:text-gray-500 text-sm">Recent audit log overview today</p>
		</div>

		<DataView :value="auditLogs">
			<template #list="slotProps">
				<ScrollPanel
					class="w-full pr-4"
					:style="{ height: '350px' }"
					pt:barY:class="bg-slate-200 dark:bg-slate-700"
				>
					<div class="flex flex-col">
						<div v-for="(item, index) in slotProps.items" :key="index">
							<div
								class="flex flex-col sm:items-center p-2 gap-1"
								:class="{
									'border-t border-surface-200 dark:border-surface-700':
										index !== 0,
								}"
							>
								<div class="w-full">
									<div class="flex justify-between">
										<div>
											<div class="font-bold">
												{{ item.action }}
											</div>
										</div>
										<div class="text-sm text-slate-400">
											{{ formatDate(item.timestamp) }}
										</div>
									</div>

									<div class="text-sm text-slate-400">
										{{ item.description }}
									</div>
									<div
										class="flex gap-1 align-middle items-center text-xs text-slate-400"
									>
										<div
											class="bg-slate-100 text-slate-400 dark:text-slate- dark:bg-slate-600/20 backdrop-blur-md p-1 rounded size-fit"
										>
											{{ item.username }}
										</div>
										|
										<div
											class="bg-slate-100 text-slate-400 dark:text-slate- dark:bg-slate-600/20 backdrop-blur-md p-1 rounded size-fit"
										>
											{{ item.userRole }}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</ScrollPanel>
			</template>
		</DataView>
	</div>
</template>
<script lang="ts" setup>
import { formatDate } from '@/utils/formatUtils'
import { ref } from 'vue';

const auditLogs = ref([
	{
		action: 'User Login',
		description: 'User JohnDoe logged in successfully',
		username: 'FCT-JDC202506061004',
		userRole: 'faculty',
		timestamp: '2024-06-01T10:00:00Z',
	},
	{
		action: 'Add Record',
		description: 'User JaneSmith added a new course outline',
		username: 'ADM-JSM202506051130',
		userRole: 'admin',
		timestamp: '2024-06-01T11:30:00Z',
	},
	{
		action: 'Update Profile',
		description: 'User JohnDoe updated their profile picture',
		username: 'FCT-JDC202506061004',
		userRole: 'faculty',
		timestamp: '2024-06-01T12:00:00Z',
	},
	{
		action: 'Delete Record',
		description: 'User MarkLee deleted a student entry',
		username: 'ADM-MLE202506041545',
		userRole: 'admin',
		timestamp: '2024-06-01T15:45:00Z',
	},
	{
		action: 'User Logout',
		description: 'User JohnDoe logged out',
		username: 'FCT-JDC202506061004',
		userRole: 'faculty',
		timestamp: '2024-06-01T16:00:00Z',
	},
	{
		action: 'Password Change',
		description: 'User JaneSmith changed their password',
		username: 'ADM-JSM202506051130',
		userRole: 'admin',
		timestamp: '2024-06-02T09:20:00Z',
	},
	{
		action: 'Failed Login Attempt',
		description: 'Invalid password entered by user PaulTan',
		username: 'STF-PTN202506051755',
		userRole: 'staff',
		timestamp: '2024-06-02T09:45:00Z',
	},
	{
		action: 'Download Report',
		description: 'User MarkLee downloaded the student performance report',
		username: 'ADM-MLE202506041545',
		userRole: 'admin',
		timestamp: '2024-06-02T10:10:00Z',
	},
	{
		action: 'User Login',
		description: 'User PaulTan logged in successfully',
		username: 'STF-PTN202506051755',
		userRole: 'staff',
		timestamp: '2024-06-02T10:30:00Z',
	},
	{
		action: 'Upload File',
		description: 'User JaneSmith uploaded a new academic calendar',
		username: 'ADM-JSM202506051130',
		userRole: 'admin',
		timestamp: '2024-06-02T11:00:00Z',
	},
])
</script>
