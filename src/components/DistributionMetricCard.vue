<template>
	<div
		class="flex flex-col justify-between h-full bg-white dark:bg-slate-900 rounded-xl gap-2 p-5 border dark:border-slate-800"
	>
		<div class="flex items-center justify-between w-full gap-4">
			<div class="flex gap-2">
				<div
					:class="[iconBgColor, 'h-fit flex justify-center align-middle p-3 rounded-lg']"
				>
					<i :class="[icon, iconColor, 'text-xl']"></i>
				</div>
				<div class="flex flex-col items-start justify-content-start">
					<div class="font-semibold text-slate-950 dark:text-slate-100">
						{{ title }}
					</div>
					<div class="text-slate-500 text-sm">
						{{ description }}
					</div>
				</div>
			</div>
			<div class="flex flex-col items-end justify-content-end">
				<div class="flex justify-content-end font-bold text-lg">
					{{ formatter.format(count) }}
				</div>
				<div class="text-slate-500 text-sm">
					{{ countLabel }}
				</div>
			</div>
		</div>
		<div class="flex gap-2">
			<div
				class="flex flex-col p-3 gap-2 rounded-lg bg-slate-100 dark:bg-slate-950 w-60"
				v-for="(item, index) in data"
				:key="index"
			>
				<div class="flex justify-between">
					<span class="text-sm text-slate-700 dark:text-slate-400">{{
						item.yearLevel
					}}</span>
					<i
						:class="[item.icon, iconColor, getTextColorClass(item.color)]"
					></i>
				</div>
				<div class="flex flex-col">
					<span class="text-xl font-bold">
						{{ formatter.format(item.count) }}
					</span>
					<span class="text-xs text-slate-700 dark:text-slate-400">
						{{ item.label }}
					</span>
				</div>
				<ProgressBar
					class="w-full"
					:showValue="false"
					:value="getPercentage(count, item.count)"
					pt:root:style="height: 5px"
					:pt:value:class="getBgColorClass(item.color)"
				></ProgressBar>
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { getBgColorClass, getTextColorClass } from '@/utils/stylesUtils'

const formatter = new Intl.NumberFormat()

defineProps({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: false,
	},
	countLabel: {
		type: String,
		required: false,
		default: 'Total',
	},
	count: {
		type: Number,
		required: true,
	},
	icon: {
		type: String,
		required: true,
	},
	iconColor: {
		type: String,
		required: false,
		default: 'text-primary-500',
	},
	iconBgColor: {
		type: String,
		required: false,
		default: 'bg-primary-100 dark:bg-primary-900',
	},
	data: {
		type: Array as () => Array<{
			yearLevel: string
			count: number
			label: string
			icon: string
			color?: string
		}>,
		required: false,
		default: () => [],
	},
})

const getPercentage = (total: number, value: number): number => {
	if (total === 0) return 0
	return (value / total) * 100
}
</script>
<style></style>
