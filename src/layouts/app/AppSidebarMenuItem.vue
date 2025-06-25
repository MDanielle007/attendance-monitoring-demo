<template>
	<ul class="list-none p-0 m-0">
		<li v-for="(menuItem, index) in menuItems" :key="index">
			<!-- Primary Menu Links -->
			<router-link
				v-if="!menuItem.children"
				:to="menuItem.route"
				:class="[
					'no-underline flex items-center cursor-pointer p-3 rounded-r-md text-slate-800 hover:bg-slate-200 hover:text-primary dark:hover:bg-slate-950 dark:hover:text-white transition-colors',
					isActive(menuItem.route)
						? 'text-primary font-bold border-l-2 border-primary dark:text-white dark:border-l-2 dark:border-blue-400 bg-slate-100 dark:bg-slate-800'
						: 'text-slate-600 dark:text-slate-400 font-semibold',
				]"
			>
				<i :class="menuItem.icon + (collapsed ? '' : ' mr-3')"></i>
				<span v-if="!collapsed" class="whitespace-nowrap">{{
					menuItem.label
				}}</span>
			</router-link>

			<!-- Expandable Menus -->
			<div v-else>
				<a
					@click="toggleMenu(index)"
					class="flex items-center cursor-pointer p-3 rounded-r-md text-slate-800 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-950 dark:hover:text-white transition-colors"
					:class="{
						'text-primary border-l-2 border-primary dark:text-blue-500 dark:border-l-2 dark:border-blue-400':
							isChildActive(menuItem),
					}"
				>
					<i :class="menuItem.icon + (collapsed ? '' : ' mr-3')"></i>
					<span v-if="!collapsed" class="font-semibold whitespace-nowrap">{{
						menuItem.label
					}}</span>
					<i
						v-if="!collapsed"
						class="pi pi-chevron-down ml-auto transition-transform"
						:class="{ 'rotate-180': openMenus.includes(index) }"
					></i>
				</a>

				<!-- Only show submenu when not collapsed -->
				<transition
					v-if="!collapsed"
					name="slide-down"
					@before-enter="beforeEnter"
					@enter="enter"
					@leave="leave"
				>
					<ul
						v-show="openMenus.includes(index)"
						class="list-none py-1 pl-4 m-0 overflow-hidden"
					>
						<li v-for="(child, childIndex) in menuItem.children" :key="childIndex">
							<router-link
								:to="menuItem.route"
								:class="[
									'no-underline flex items-center cursor-pointer p-3 rounded-r-md text-slate-800 hover:bg-slate-100 dark:hover:bg-slate-950 dark:hover:text-white transition-colors',
									isActive(menuItem.route)
										? 'text-primary border-l-2 border-primary dark:text-white dark:border-l-2 dark:border-blue-400'
										: 'dark:text-slate-400',
								]"
							>
								<span>{{ child.label }}</span>
							</router-link>
						</li>
					</ul>
				</transition>
			</div>
		</li>
	</ul>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import type { RouteLocationRaw } from 'vue-router'
import { ref } from 'vue'

type route = {
	name: string
}

type MenuItem = {
	label: string
	route: route
	icon?: string
	children?: MenuItem[]
}

defineProps<{
	menuItems: MenuItem[]
	collapsed?: boolean
}>()

const route = useRoute()
const openMenus = ref<number[]>([])

const router = useRouter()

const isActive = (targetRoute: RouteLocationRaw) => {
	const resolved = router.resolve(targetRoute)
	return resolved.name === route.name
}

const isChildActive = (menuItem: MenuItem): boolean => {
	if (!menuItem.children) return false
	return menuItem.children.some((child) => child.route.name === route.name)
}

const toggleMenu = (index: number) => {
	if (openMenus.value.includes(index)) {
		openMenus.value = openMenus.value.filter((i) => i !== index)
	} else {
		openMenus.value.push(index)
	}
}

const beforeEnter = (el: Element) => {
	const htmlEl = el as HTMLElement
	htmlEl.style.height = '0px'
}

const enter = (el: Element) => {
	const htmlEl = el as HTMLElement
	htmlEl.style.height = htmlEl.scrollHeight + 'px'
	htmlEl.style.transition = 'height 0.3s ease-in-out'
}

const leave = (el: Element) => {
	const htmlEl = el as HTMLElement
	htmlEl.style.height = htmlEl.scrollHeight + 'px'
	htmlEl.offsetHeight // Trigger reflow
	htmlEl.style.height = '0px'
	htmlEl.style.transition = 'height 0.3s ease-in-out'
}
</script>

<style>
/* Slide Down Transition */
.slide-down-enter-active,
.slide-down-leave-active {
	transition: height 0.3s ease-in-out;
}
.slide-down-enter-from,
.slide-down-leave-to {
	height: 0;
}
</style>
