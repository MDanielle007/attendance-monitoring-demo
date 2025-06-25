<template>
	<div
		class="bg-50 dark:bg-gray-950 min-h-screen flex flex-col relative items-center justify-center"
	>
		<div
			class="flex items-center justify-center p-10 bg-white dark:bg-gray-900 rounded-lg shadow-md w-fit "
		>
			<router-view></router-view>
		</div>
		<footer
			class="p-4 text-center text-sm text-gray-600 dark:text-gray-400 absolute bottom-0 left-0 w-full"
		>
			&copy; 2025 Your Company Name
		</footer>
	</div>
</template>
<script lang="ts" setup></script>
