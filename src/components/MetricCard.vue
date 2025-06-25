<template>
	<div
		class="flex items-center justify-between h-full bg-white dark:bg-slate-900 rounded-xl gap-2 p-5 border dark:border-slate-800 "
	>
		<div class="flex gap-2">
			<div :class="[iconBgColor, 'h-fit flex justify-center align-middle p-3 rounded-lg']">
				<i :class="[icon, iconColor, 'text-xl']"></i>
			</div>
			<div class="flex flex-col items-start justify-content-start">
				<div class="font-semibold text-slate-950 dark:text-slate-100">
					{{ title }}
				</div>
				<div :class="['text-slate-500', descriptionSize]">
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
</template>
<script lang="ts" setup>
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
	descriptionSize: {
		type: String,
		required: false,
		default: 'text-sm',
	},
	countLabel: {
		type: String,
		required: false,
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
})
</script>
<style></style>
