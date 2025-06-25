import type { SelectOption } from "./general"

export type UserRole = 'superadmin' | 'faculty'
export type UserStatus = 'active' | 'inactive'

export interface User {
	id: number
	username: string
	email: string
	password: string
	employee_id: string
	first_name: string
	middle_name: string
	last_name: string
	role: UserRole
	job_title: string
	department: string
	contact_number: string
	status: UserStatus
	created_at: string // or Date if parsed
	updated_at: string
	deleted_at: string | null
}

export interface UserTableRecord {
	id: number
	username: string
	first_name: string
	middle_name: string
	last_name: string
	role: UserRole
	status: UserStatus
}

export interface UserFormCreate {
	username: string
	email: string
	password: string
	password_confirmation: string
	employee_id: string
	first_name: string
	middle_name: string
	last_name: string
	role?: UserRole
	job_title: string
	department: string
	contact_number: string
}

export interface UserFormEdit {
	id: number
	username: string
	email: string
	employee_id: string
	first_name: string
	middle_name: string
	last_name: string
	role: UserRole
	job_title: string
	department: string
	contact_number: string
}

export interface LoginCredentials {
	email: string
	password: string
}

export interface LoginResponse {
	token: string
	user: User
}

export interface UserSearchParams {
	search?: string
	page?: number
	per_page?: number
	sort_by?: string
	sort_order?: 'asc' | 'desc'
}

export interface UserSearchResult {
	users: UserTableRecord[]
	total: number
	current_page: number
	last_page: number
}

export interface UserUpdateStatus {
	id: number
	status: UserStatus
}

export interface UserUpdatePassword {
	id: number | null
	password: string
	password_confirmation: string
}

export interface UserDelete {
	id: number
}

export interface UserSelectOption extends SelectOption{
	job_title: string
	department: string
}
