<template>
	<div class="flex relative h-screen overflow-hidden">
		<AppTopBar />
		<AppSidebar />
		<!-- Main Content -->
		<main
			:class="[
				'flex-1 pt-16 pr-2 h-full w-full transition-all duration-300 ease-in-out',
				isSmallScreen
					? 'pl-2'
					: isSidebarVisible && !isMediumScreen
						? 'xl:pl-72 md:pl-14'
						: 'xl:pl-16 md:pl-14',
			]"
		>
			<ScrollPanel
				class="w-full"
				:style="{ height: `${scrollHeight}px` }"
				pt:barY:class="bg-slate-300 dark:bg-slate-800"
			>
				<div class="p-2 sm:p-4 md:p-6">
					<router-view></router-view>
				</div>
		<ScrollTop target="parent" :threshold="100" icon="pi pi-arrow-up" :buttonProps="{ severity: 'contrast', raised: true, rounded: true }" />

			</ScrollPanel>
		</main>
	</div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import AppTopBar from './AppTopBar.vue'
import AppSidebar from './AppSidebar.vue'
import { useLayoutStore } from '@/stores/layoutStore'

const layoutStore = useLayoutStore()
const isSidebarVisible = computed(() => layoutStore.sideBar)
const isSmallScreen = computed(() => layoutStore.isSmallScreen)
const isMediumScreen = computed(() => layoutStore.isMediumScreen)

const scrollHeight = ref(window.innerHeight - 64) // Adjust based on your layout

const updateScrollHeight = () => {
	scrollHeight.value = window.innerHeight - 64 // Adjust for navbar height if needed
}

onMounted(() => {
	layoutStore.initResizeListener()
	window.addEventListener('resize', updateScrollHeight)
})

onUnmounted(() => {
	layoutStore.cleanupResizeListener()
	window.removeEventListener('resize', updateScrollHeight)
})
</script>
