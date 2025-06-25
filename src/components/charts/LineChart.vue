<template>
	<div class="bg-white dark:bg-slate-900 rounded-xl p-4 border dark:border-slate-800 shadow-sm dark:shadow-md transition-colors duration-300">
		<div v-if="title || description" class="mb-4">
			<h2 v-if="title" class="font-semibold text-xl text-slate-950 dark:text-slate-100">{{ title }}</h2>
			<p v-if="description" class="text-slate-500 dark:text-slate-400 text-sm">{{ description }}</p>
		</div>
		<div class="w-full overflow-hidden">
			<ApexChart type="area" :options="mergedOptions" :series="series" height="350" width="100%" />
		</div>
	</div>
</template>

<script lang="ts" setup>
import { computed, nextTick, onMounted, ref, watch  } from 'vue'
import { useThemeStore } from '@/stores/themeStore'
import { getCSSVariable } from '@/utils/stylesUtils'

const props = defineProps<{
	title?: string
	description?: string
	series: ApexAxisChartSeries
	categories: string[],
	colors?: string[],
	chartOptions?: ApexCharts.ApexOptions
}>()

const theme = useThemeStore()
const isDark = computed(() => theme.darkTheme)
const chartKey = ref(0)

// Force chart re-render when needed
const forceRerender = () => {
	chartKey.value++
}

// Watch for theme changes and force re-render
watch(isDark, () => {
	nextTick(() => forceRerender())
})

// Generate dynamic palette based on number of series
const palette = computed(() => {
	const colorVars = [
        '--p-emerald-500', // #10b981 - Fresh green
		'--p-blue-500',    // #3b82f6 - Vibrant blue
        '--p-amber-500',   // #f59e0b - Warm orange/yellow
        '--p-rose-500',    // #f43f5e - Pinkish red
        '--p-violet-500',  // #8b5cf6 - Purple
        '--p-cyan-500',    // #06b6d4 - Teal blue
        '--p-lime-500',    // #84cc16 - Bright green
        '--p-fuchsia-500', // #d946ef - Magenta
        '--p-indigo-500',  // #6366f1 - Deep blue
        '--p-teal-500',    // #14b8a6 - Blue-green
        '--p-orange-500',  // #f97316 - Bright orange
        '--p-purple-500'   // #a855f7 - Purple
	]
	return props.series.map((_, index) => getCSSVariable(colorVars[index % colorVars.length]) || '#0ea5e9')
})

// Default chart options
const defaultOptions = computed<ApexCharts.ApexOptions>(() => ({
	chart: {
		type: 'area',
		toolbar: { show: false },
		zoom: { enabled: false },
		foreColor: isDark.value ? '#CBD5E1' : '#334155',
		fontFamily: getCSSVariable('font-family'),
		width: '100%',
		parentHeightOffset: 0,
		redrawOnParentResize: true,
		redrawOnWindowResize: true,
	},
	colors: props.colors || palette.value,
	dataLabels: { enabled: false },
	stroke: { curve: 'smooth', width: 2 },
	grid: {
		borderColor: isDark.value ? '#334155' : '#e2e8f0'
	},
	xaxis: {
		type: 'datetime',
		categories: props.categories,
		labels: {
			style: {
				colors: isDark.value ? '#cbd5e1' : '#475569'
			}
		}
	},
	yaxis: {
		labels: {
			style: {
				colors: isDark.value ? '#cbd5e1' : '#475569'
			}
		}
	},
	tooltip: {
		theme: isDark.value ? 'dark' : 'light',
		x: { format: 'dd/MM/yy HH:mm' }
	},
	legend: {
		labels: {
			colors: isDark.value ? '#e2e8f0' : '#1e293b'
		}
	},
	responsive: [{
		breakpoint: 480,
		options: {
			chart: {
				width: '100%'
			},
			legend: {
				position: 'bottom'
			}
		}
	}]
}))

// Merge default options with custom user options
const mergedOptions = computed(() => ({
	...defaultOptions.value,
	...props.chartOptions
}))

onMounted(() => {
	// Force initial render after mount
	nextTick(() => forceRerender())
})
</script>
