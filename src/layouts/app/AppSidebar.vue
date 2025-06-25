<template>
	<!-- Main Sidebar (shown on large screens) -->
	<div
		v-if="!isSmallScreen"
		:class="[
			'bg-white dark:bg-slate-900 fixed top-14 left-0 h-screen z-20 transition-all duration-300 ease-in-out drop-shadow-lg lg:drop-shadow-none pt-4',
			isSidebarVisible ? 'w-72 px-4' : 'w-16 px-2 hover:w-72 hover:px-6',
		]"
		@mouseenter="handleMouseEnter"
		@mouseleave="handleMouseLeave"
	>
		<div>
			<ScrollPanel
				style="width: 100%; height: 100%"
				:dt="{ bar: { background: '{blue.600}' } }"
				pt:barX:class="hidden"
			>
				<div :class="[isSidebarVisible || isHovered ? 'pr-3' : 'pr-0']">
					<AppSidebarMenuItem
						:menuItems="menuItems"
						:collapsed="!isSidebarVisible && !isHovered"
					/>
				</div>
			</ScrollPanel>
		</div>
		<AppSidebarMenuItem
			:menuItems="userMenuItems"
			:collapsed="!isSidebarVisible && !isHovered"
		/>
	</div>

	<!-- Mobile Sidebar (shown on small screens when toggled) -->
	<Transition name="slide">
		<div
			v-if="isSmallScreen && isSidebarVisible"
			class="bg-white dark:bg-slate-800 fixed top-14 left-0 h-screen z-20 w-72 px-4 pt-4 drop-shadow-lg"
		>
			<div>
				<ScrollPanel
					style="width: 100%; height: 100%"
					:dt="{ bar: { background: '{blue.600}' } }"
					pt:barX:class="hidden"
				>
					<div class="pr-3">
						<AppSidebarMenuItem :menuItems="menuItems" :collapsed="false" />
					</div>
				</ScrollPanel>
			</div>
			<AppSidebarMenuItem :menuItems="userMenuItems" :collapsed="false" />
		</div>
	</Transition>

	<!-- Overlay (only for mobile) -->
	<Transition name="fade">
		<div
			v-if="isSidebarVisible && isSmallScreen"
			class="fixed inset-0 bg-black bg-opacity-50 dark:opacity-80 z-10"
			@click="closeSidebar"
		></div>
	</Transition>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import AppSidebarMenuItem from './AppSidebarMenuItem.vue'
import { useLayoutStore } from '@/stores/layoutStore'

const layoutStore = useLayoutStore()
const isSidebarVisible = computed(() => layoutStore.sideBar)
const isSmallScreen = computed(() => layoutStore.isSmallScreen)

// Initialize sidebar state based on screen size
onMounted(() => {
	if (isSmallScreen.value) {
		layoutStore.sideBar = false // Hide by default on mobile
	} else {
		layoutStore.sideBar = true // Show by default on desktop
	}
})

const closeSidebar = () => {
	layoutStore.sideBar = false
}

const menuItems = ref([
	{
		label: 'Dashboard (Admin)',
		route: { name: 'admin-dashboard' },
		icon: 'pi pi-home',
	},
	{
		label: 'Dashboard (Faculty)',
		route: { name: 'faculty-dashboard' },
		icon: 'pi pi-home',
	},
	{
		label: 'User Management',
		route: { name: 'user-management' },
		icon: 'pi pi-users',
	},
	{
		label: 'Courses',
		route: { name: 'course-management' },
		icon: 'pi pi-briefcase',
	},
	{
		label: 'Students',
		route: { name: 'student-management' },
		icon: 'pi pi-id-card',
	},
	{
		label: 'Classes',
		route: { name: 'class-management' },
		icon: 'pi pi-book',
	},
	{
		label: 'Attendance Logs',
		route: { name: 'attendance-logs' },
		icon: 'pi pi-receipt',
	},
	{
		label: 'Audit Logs',
		route: { name: 'audit-logs' },
		icon: 'pi pi-receipt',
	},
])

const userMenuItems = ref([])

const isHovered = ref(false)

const handleMouseEnter = () => {
	if (!isSidebarVisible.value) {
		isHovered.value = true
	}
}

const handleMouseLeave = () => {
	isHovered.value = false
}
</script>
<style scoped>
/* Slide animation for mobile sidebar */
.slide-enter-active,
.slide-leave-active {
	transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
	transform: translateX(-100%);
}

/* Fade animation for overlay */
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}

/* Optional: Prevent text selection during transitions */
.hover\:w-72 {
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
}
</style>
