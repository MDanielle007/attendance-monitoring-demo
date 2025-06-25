<script lang="ts" setup>
defineProps({
	value: {
		type: String,
	},
	invalid: {
		type: Boolean,
		default: false,
	},
})
</script>

<template>
	<label
		:class="[
			'block font-medium',
			!invalid ? 'text-gray-600 dark:text-gray-300' : 'text-red-500',
		]"
	>
		<span v-if="value">{{ value }}</span>
		<span v-else><slot /></span>
	</label>
</template>
