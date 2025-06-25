<template>
	<div
		class="bg-slate-300 dark:bg-slate-950 border border-slate-700 dark:border-slate-500 border-dashed rounded-lg flex items-center justify-center"
		style="width: 100%; height: 100%"
	>
		{{ title }}
	</div>
</template>
<script lang="ts" setup>
defineProps({
	title: {
		type: String,
		default: '',
		required: false,
	},
})
</script>
