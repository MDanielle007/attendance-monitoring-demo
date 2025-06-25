export interface metric {
	title: string
	description: string
	descriptionSize?: string
	count: number
	icon: string
	iconColor?: string
	iconBgColor?: string
}

export interface distributedData {
	yearLevel: string
	count: number
	label: string
	icon: string
	color?: string
}

export interface distributedMetric extends metric {
	countLabel?: string
	data: distributedData[]
}

export interface SelectOption {
	code: number |string | null
	name: string
}
