export type MeetingType = 'online' | 'face-to-face'

export interface Meetings{
	id: number
	class_id: number
	type:MeetingType
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
	meeting_date: Date
	start_time: Date
	end_time: Date
	type: MeetingType | string
	present: number
	late: number
	absent: number
	notScanned: number
	status: string
}

export interface MeetingFormCreate {
	class_id: number | null
	name: string
	type: string
	meeting_date: Date | Date[] | (Date | null)[] | null | undefined
	start_time: Date | Date[] | (Date | null)[] | null | undefined
	end_time: Date | Date[] | (Date | null)[] | null | undefined
}
