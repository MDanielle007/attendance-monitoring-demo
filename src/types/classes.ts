export interface Classes {
	id: number
	user_id: string
	course_id: string
	name: string
	section: string
	year_level: number
	program: string
	schedule_days: string[]
	scheduled_start_time: Date | Date[] | (Date | null)[] | null | undefined
	scheduled_end_time: Date | Date[] | (Date | null)[] | null | undefined
	semester: string
	status: string
	created_at: string // or Date if you're parsing
	updated_at: string
	deleted_at: string | null
}

export interface ClassFormDataCreate {
	user_id: number | null
	course_id: number | null
	name: string
	section: string
	year_level: number | null
	program: string
	schedule_days: string[]
	scheduled_start_time: Date | Date[] | (Date | null)[] | null | undefined
	scheduled_end_time: Date | Date[] | (Date | null)[] | null | undefined
	semester: string
}

export interface ClassFormDataEdit {
	id: number | null
	user_first_name: string
	user_middle_name: string
	user_last_name: string
	course_code: string
	name: string
	section: string
	year_level: number
	program: string
	schedule_days: string[]
	scheduled_start_time: Date | Date[] | (Date | null)[] | null | undefined
	scheduled_end_time: Date | Date[] | (Date | null)[] | null | undefined
	semester: string
	status: string
}

export interface ClassTableRecord {
	id: number
	name: string
	course_code: string
	first_name: string
	middle_name: string
	last_name: string
	program: string
	year_level: number
	section: string
	students: number
	meetings: number
}
