<template>
	<div
		class="bg-white dark:bg-slate-900 rounded-xl p-4 border dark:border-slate-800 shadow-sm dark:shadow-md transition-colors duration-300"
	>
		<div v-if="title || description" class="mb-4">
			<h2 v-if="title" class="font-semibold text-xl text-slate-950 dark:text-slate-100">
				{{ title }}
			</h2>
			<p v-if="description" class="text-slate-500 dark:text-slate-400 text-sm">
				{{ description }}
			</p>
		</div>
		<div class="w-full overflow-hidden">
			<ApexChart type="bar" :options="mergedOptions" :series="processedSeries" height="350" width="100%" />
		</div>
	</div>
</template>

<script lang="ts" setup>
import { computed,nextTick, onMounted, ref, watch } from 'vue'
import { useThemeStore } from '@/stores/themeStore'
import { getCSSVariable } from '@/utils/stylesUtils'

interface YearLevelData {
	program: string
	firstYear: number
	secondYear: number
	thirdYear: number
	fourthYear: number
}

const props = defineProps<{
	title?: string
	description?: string
	yaxisTitle?: string
	xaxisTitle?: string
	tooltipLabel?: string
	data: YearLevelData[]
	chartOptions?: ApexCharts.ApexOptions
	colors?: string[]
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

// Process data into ApexCharts series format
const processedSeries = computed(() => {
	return [
		{
			name: '1st Year',
			data: props.data.map((item) => item.firstYear),
		},
		{
			name: '2nd Year',
			data: props.data.map((item) => item.secondYear),
		},
		{
			name: '3rd Year',
			data: props.data.map((item) => item.thirdYear),
		},
		{
			name: '4th Year',
			data: props.data.map((item) => item.fourthYear),
		},
	]
})

// Generate categories from program names
const categories = computed(() => props.data.map((item) => item.program))

// Generate dynamic palette for year levels
const palette = computed(() => {
	const yearColors = [
		'--p-emerald-500', // 1st Year - Fresh green
		'--p-blue-500', // 2nd Year - Vibrant blue
		'--p-amber-500', // 3rd Year - Warm orange
		'--p-rose-500', // 4th Year - Pinkish red
	]
	return yearColors.map((colorVar) => getCSSVariable(colorVar) || '#0ea5e9')
})

// Default chart options
const defaultOptions = computed<ApexCharts.ApexOptions>(() => ({
	chart: {
		type: 'bar',
		toolbar: { show: false },
		stacked: true,
		zoom: { enabled: false },
		fontFamily: getCSSVariable('font-family'),
		foreColor: isDark.value ? '#CBD5E1' : '#334155',
		width: '100%',
		parentHeightOffset: 0,
		redrawOnParentResize: true,
		redrawOnWindowResize: true,
	},
	colors: props.colors||palette.value,
	dataLabels: {
		enabled: true,
		style: {
			colors: ['#fff'],
		},
		formatter: function (val: number) {
			return val > 0 ? val.toString() : ''
		},
	},
	stroke: {
		width: 1,
		colors: ['#fff'],
	},
	grid: {
		borderColor: isDark.value ? '#334155' : '#e2e8f0',
	},
	xaxis: {
		categories: categories.value,
		labels: {
			style: {
				colors: isDark.value ? '#cbd5e1' : '#475569',
			},
			rotate: -45,
			rotateAlways: categories.value.length > 6,
		},
		title: {
			text: props.xaxisTitle,
			style: {
				color: isDark.value ? '#cbd5e1' : '#475569',
				fontWeight: 600,
			},
		},
	},
	yaxis: {
		labels: {
			style: {
				colors: isDark.value ? '#cbd5e1' : '#475569',
			},
		},
		title: {
			text: props.yaxisTitle,
			style: {
				color: isDark.value ? '#cbd5e1' : '#475569',
				fontWeight: 600,
			},
		},
	},
	tooltip: {
		theme: isDark.value ? 'dark' : 'light',
		shared: true,
		intersect: false,
		y: {
			formatter: function (val: number) {
				return `${val} ${props.tooltipLabel || ''}`
			},
			title: {
				formatter: function (seriesName: string) {
					return seriesName
				},
			},
		},
	},
	legend: {
		position: 'top',
		horizontalAlign: 'center',
		labels: {
			colors: isDark.value ? '#e2e8f0' : '#1e293b',
		},
	},
	plotOptions: {
		bar: {
			horizontal: false,
			columnWidth: '70%',
			endingShape: 'rounded',
		},
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
	...props.chartOptions,
}))

onMounted(() => {
	// Force initial render after mount
	nextTick(() => forceRerender())
})
</script>
