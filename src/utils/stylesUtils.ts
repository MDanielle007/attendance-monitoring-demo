export function getCSSVariable(varName: string) {
	return getComputedStyle(document.documentElement).getPropertyValue(varName).trim()
}

export function getStatusSeverity(status: string): string {
	switch (status) {
		case 'active':
		case 'In Meeting':
		case 'on going':
		case 'present':
			return 'success'
		case 'late':
			return 'warning'
		case 'inactive':
		case 'Out of Meeting':
		case 'absent':
			return 'danger'
		case 'finished':
			return 'info'
		case 'not scanned':
			return 'secondary'
		default:
			return 'info'
	}
}

export function getStudentStatusSeverity(status: string): string {
	switch (status) {
		case 'In Meeting':
			return 'success'
		case 'Out of Meeting':
			return 'danger'
		default:
			return 'info'
	}
}

type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl'

const tailwindBreakpoints: Record<Breakpoint, string> = {
	sm: '(min-width: 640px)',
	md: '(min-width: 768px)',
	lg: '(min-width: 1024px)',
	xl: '(min-width: 1280px)',
	'2xl': '(min-width: 1536px)',
}

export function isAtLeastBreakpoint(bp: Breakpoint): boolean {
	if (typeof window === 'undefined') return false // SSR-safe
	return window.matchMedia(tailwindBreakpoints[bp]).matches
}

export const getBgColorClass = (color: string | undefined) => {
	if (!color) {
		return 'bg-blue-500'
	}

	const colorMap: Record<string, string> = {
		emerald: 'bg-emerald-500',
		green: 'bg-green-500',
		blue: 'bg-blue-500',
		amber: 'bg-amber-500',
		rose: 'bg-rose-500',
		violet: 'bg-violet-500',
		cyan: 'bg-cyan-500',
		lime: 'bg-lime-500',
		fuchsia: 'bg-fuchsia-500',
		indigo: 'bg-indigo-500',
		teal: 'bg-teal-500',
		orange: 'bg-orange-500',
		red: 'bg-red-500',
		purple: 'bg-purple-500',
	}

	return colorMap[color] || 'bg-blue-500'
}

export const getTextColorClass = (color: string | undefined) => {
	if (!color) {
		return 'text-blue-500'
	}

	const colorMap: Record<string, string> = {
		emerald: 'text-emerald-500',
		green: 'text-green-500',
		blue: 'text-blue-500',
		amber: 'text-amber-500',
		rose: 'text-rose-500',
		violet: 'text-violet-500',
		cyan: 'text-cyan-500',
		lime: 'text-lime-500',
		fuchsia: 'text-fuchsia-500',
		indigo: 'text-indigo-500',
		teal: 'text-teal-500',
		orange: 'text-orange-500',
		red: 'text-red-500',
		purple: 'text-purple-500',
	}

	return colorMap[color] || 'text-blue-500'
}
