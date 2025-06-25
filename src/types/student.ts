export interface Student {
	id: number
	id_number: string
	first_name: string
	middle_name: string
	last_name: string
	email: string
	year_level: string
	program: string
	section: string
	contact_number: string
	rfid_number: string
	status: 'in meeting' | 'out of meeting'
	created_at: string // or Date if you're parsing
	updated_at: string
	deleted_at: string | null
}

export interface StudentFormData {
	id: number | null
	id_number: string
	first_name: string
	middle_name: string
	last_name: string
	email: string
	year_level: string
	program: string
	section: string
	contact_number: string
	rfid_number: string
}

export interface StudentTableRecord {
	id: number
	id_number: string
	first_name: string
	middle_name: string
	last_name: string
	program: string
	year_level: number
	section: string
	email: string
	status: 'In Meeting' | 'Out of Meeting'
}
