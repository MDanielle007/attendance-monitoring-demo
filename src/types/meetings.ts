export type MeetingType = 'online' | 'face-to-face'

export type AttendanceSummary = {
	present: number
	late: number
	absent: number
	not_scanned: number
}

export interface Meetings {
	id: number
	class_id: number
	type: MeetingType
	meeting_date: Date | Date[] | (Date | null)[] | null | undefined
	start_time: Date | Date[] | (Date | null)[] | null | undefined
	end_time: Date | Date[] | (Date | null)[] | null | undefined
	status: string
	created_at: string // or Date if you're parsing
	updated_at: string
	deleted_at: string | null
}

export interface MeetingListRecord {
	id: number
	name: string
	meeting_date: string
	start_time: string
	end_time: string
	type: MeetingType | string
	status: string
	attendance_summary: AttendanceSummary
}

export interface MeetingFormCreate {
	class_id: number | null
	name: string
	type: string
	meeting_date: Date | Date[] | (Date | null)[] | null | undefined
	start_time: Date | Date[] | (Date | null)[] | null | undefined
	end_time: Date | Date[] | (Date | null)[] | null | undefined
}

export type AttendanceStudents = {
	id: number
	id_number: string
	first_name: string
	middle_name: string
	last_name: string
	status: string
	time?: string
}
