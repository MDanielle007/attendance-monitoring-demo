export function formatDate(value: string | Date, format = 'short') : string
{
	if (!value) return ''
	const date = new Date(value)

	switch (format) {
		case 'input':
			return new Intl.DateTimeFormat('en-CA', {
				dateStyle: 'full',
				timeStyle: 'medium',
				timeZone: 'Asia/Manila',
				hour12: true,
			})
				.format(date)
				.split('/')
				.reverse()
				.join('-')

		case 'short':
			return date.toLocaleDateString('en-US', {
				day: '2-digit',
				month: '2-digit',
				year: 'numeric',
			})

		case 'relative': {
			const now = new Date()
			const diffInMs = now.getTime() - date.getTime()
			const diffInSec = Math.floor(diffInMs / 1000)
			const diffInMin = Math.floor(diffInSec / 60)
			const diffInHour = Math.floor(diffInMin / 60)
			const diffInDay = Math.floor(diffInHour / 24)

			if (diffInSec < 60) return `${diffInSec} sec ago`
			if (diffInMin < 60) return `${diffInMin} min ago`
			if (diffInHour < 24)
				return `${diffInHour} hour${diffInHour > 1 ? 's' : ''} ${diffInMin % 60} min ago`
			if (diffInDay === 1) return 'Yesterday'
			if (diffInDay < 7) return `${diffInDay} day${diffInDay > 1 ? 's' : ''} ago`

			return `${date.getFullYear().toString().slice(-2)}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`
		}

		case 'long': {
			const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
			const months = [
				'Jan',
				'Feb',
				'Mar',
				'Apr',
				'May',
				'Jun',
				'Jul',
				'Aug',
				'Sep',
				'Oct',
				'Nov',
				'Dec',
			]
			const dayOfWeek = days[date.getDay()]
			const month = months[date.getMonth()]
			const day = date.getDate()
			const year = date.getFullYear()
			let hours = date.getHours()
			const minutes = date.getMinutes()
			const ampm = hours >= 12 ? 'PM' : 'AM'
			hours = hours % 12 || 12

			return `${dayOfWeek}, ${month} ${day}, ${year}, ${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`
		}

		case 'time-12hr': {
			let hours = date.getHours()
			const minutes = date.getMinutes()
			const ampm = hours >= 12 ? 'PM' : 'AM'
			hours = hours % 12 || 12
			return `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`
		}

		case 'time-24hr': {
			const hours = date.getHours().toString().padStart(2, '0')
			const minutes = date.getMinutes().toString().padStart(2, '0')
			return `${hours}:${minutes}`
		}

		case 'datetime': {
			const year = date.getFullYear();
			const month = (date.getMonth() + 1).toString().padStart(2, '0');
			const day = date.getDate().toString().padStart(2, '0');
			const hours = date.getHours().toString().padStart(2, '0');
			const minutes = date.getMinutes().toString().padStart(2, '0');
			const seconds = date.getSeconds().toString().padStart(2, '0');
			return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
		}

		default:
			return 'Invalid format'
	}
}

export function capitalizeWords(str: string): string
{
	if (!str) return ''

	return str
		.toLowerCase() // Convert everything to lowercase first
		.replace(/\b\w/g, (char) => char.toUpperCase()) // Capitalize first letter of each word
}

export function getFullName(firstname: string, middlename: string, lastname: string): string {
	const middleInitial = middlename?.trim() ? `${middlename.trim().charAt(0)}.` : ''
	return [firstname, middleInitial, lastname].filter(Boolean).join(' ')
}

export function getInitials(firstname: string, lastname: string): string {
	if (!firstname || !lastname) return ''
	const firstInitial = firstname.charAt(0).toUpperCase()
	const lastInitial = lastname.charAt(0).toUpperCase()
	return `${firstInitial}${lastInitial}`
}

export const getAttendancePercentage = (present: number, late: number, total: number) => {
	const res = ((present + late) / total) * 100
	return Math.round(res * 10) / 10
}

export function getOrdinalSuffix(index: number): string {
    if (index < 0) {
        throw new Error("Index cannot be negative");
    }

    const j = index % 10;
    const k = index % 100;

    if (j === 1 && k !== 11) {
        return index + "st";
    }
    if (j === 2 && k !== 12) {
        return index + "nd";
    }
    if (j === 3 && k !== 13) {
        return index + "rd";
    }
    return index + "th";
}
