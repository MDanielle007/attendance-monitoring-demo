<template>
	<div
		class="fixed top-0 left-0 right-0 z-50 w-screen h-14 bg-gradient-to-r from-blue-500 to-indigo-600 text-white flex justify-between items-center px-4 gap-4 drop-shadow-md"
	>
		<div class="flex gap-4 justify-center items-center">
			<i
				class="pi pi-bars hover:cursor-pointer"
				style="font-size: 2rem"
				@click="layoutStore.toggleSideBar"
			></i>
		</div>
		<div class="flex gap-4 items-center">
			<!-- User Profile with Dropdown -->
			<div class="relative profile-menu">
				<button @click="toggleProfileMenu" class="flex items-center focus:outline-none">
					<Avatar
						label="U"
						class="mr-2 cursor-pointer"
						size="medium"
						style="background-color: #ece9fc; color: #2a1261"
						shape="circle"
					/>
				</button>
				<div
					v-show="showProfileMenu"
					class="absolute right-0 mt-2 w-60 bg-white text-gray-800 shadow-lg rounded-lg overflow-hidden z-50 border border-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-50"
				>
					<Menu :model="items">
						<template #item="{ item, props }">
							<router-link
								v-if="item.route"
								v-slot="{ href, navigate }"
								:to="item.route"
								custom
							>
								<a v-ripple :href="href" v-bind="props.action" @click="navigate">
									<span :class="item.icon" />
									<span class="ml-2">{{ item.label }}</span>
								</a>
							</router-link>
							<button
								v-else
								v-ripple
								:href="item.url"
								:target="item.target"
								v-bind="props.action"
								class="w-full"
							>
								<span :class="item.icon" />
								<span class="ml-2">{{ item.label }}</span>
							</button>
						</template>
						<template #end>
							<button
								v-ripple
								class="relative overflow-hidden w-full border-0 bg-transparent flex items-start p-2 pl-4 hover:bg-surface-100 dark:hover:bg-surface-800 rounded-none cursor-pointer transition-colors duration-200"
							>
								<Avatar label="U" class="mr-2" shape="circle" />
								<span class="inline-flex flex-col items-start">
									<span class="font-bold">Username</span>
									<span class="text-sm">User role</span>
								</span>
							</button>
						</template>
					</Menu>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useLayoutStore } from '@/stores/layoutStore'
import { useThemeStore } from '@/stores/themeStore'
import { useRouter } from 'vue-router'

const router = useRouter()
const layoutStore = useLayoutStore()
const themeStore = useThemeStore();

const showProfileMenu = ref(false)

interface MenuItem {
  label?: string
  icon?: string
  route?: { name: string }
  command?: () => void
  url?: string
  target?: string
  items?: MenuItem[]
  separator?: boolean
}

const items = ref<MenuItem[]>([])

// Update menu items whenever theme changes
const updateMenuItems = () => {
  items.value = [
    {
      label: 'Profile',
      items: [
        {
          label: 'Settings',
          icon: 'pi pi-cog',
          route: { name: 'settings' },
        },
        {
          label: themeStore.darkTheme ? 'Light Mode' : 'Dark Mode',
          icon: themeStore.darkTheme ? 'pi pi-sun' : 'pi pi-moon',
          command: () => {
            themeStore.themeChange()
          },
        },
        {
          label: 'Logout',
          icon: 'pi pi-sign-out',
          command: async () => {
            router.push({ name: 'login' })
          },
        },
		{
			separator: true
		},
      ],
    },
  ]
}


watch(() => themeStore.darkTheme, updateMenuItems)
updateMenuItems()

const toggleProfileMenu = () => {
	showProfileMenu.value = !showProfileMenu.value
}
</script>
