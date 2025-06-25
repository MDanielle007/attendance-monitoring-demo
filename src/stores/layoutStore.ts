import { defineStore } from 'pinia'

export const useLayoutStore = defineStore('layout', {
	state: () => ({
		sideBar: false,
		isSmallScreen: false,
		isMediumScreen: false,
		isLargeScreen:false,
		isLoading: false,
	}),
	getters: {},
	actions: {
		toggleSideBar() {
			this.sideBar = !this.sideBar
		},
		handleResize() {
			// Check if screen is small (below 768px)
			this.isSmallScreen = window.innerWidth < 768
			// Check if screen is medium (between 768px and 1280px)
			this.isMediumScreen = window.innerWidth >= 768 && window.innerWidth < 1280

			this.isLargeScreen = window.innerWidth < 1280

			// Auto-hide sidebar on small screens
			if (this.isSmallScreen) {
				this.sideBar = false
			} else if (window.innerWidth >= 1280) {
				// Expanded sidebar for large screens
				this.sideBar = true
			} else {
				// Collapsed sidebar for medium screens
				this.sideBar = false
			}
		},
		initResizeListener() {
			this.handleResize() // Initial setup
			window.addEventListener('resize', this.handleResize)
		},
		cleanupResizeListener() {
			window.removeEventListener('resize', this.handleResize)
		},
	},
})
