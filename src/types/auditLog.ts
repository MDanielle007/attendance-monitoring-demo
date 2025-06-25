type AuditChanges = {
	field: string
	old_value: null| string | number | Date
	new_value: null| string | number | Date
}

export interface AuditLog {
	username: string
	first_name: string
	middle_name: string
	last_name: string
	role: string
	model: string
	record_id: string
	action: string
	description: string
	changes: AuditChanges[] | null
	ip_address: string
	user_agent: string
	created_at: string
}
