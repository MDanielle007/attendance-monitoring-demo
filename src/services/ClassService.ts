import axios, { AxiosError } from 'axios'
import type { ClassFormDataEdit, ClassTableRecord } from '@/types/classes'

export const ClassService = {
	async getAll(): Promise<ClassTableRecord[]> {
		try {
			const response = [
				{
					id: 1,
					name: 'Introduction to Programming - 1-F1',
					course_code: 'CS101',
					first_name: 'Maria',
					middle_name: 'Langka',
					last_name: 'Santos',
					program: 'BSIT',
					year_level: 1,
					section: 'F1',
					students: 30,
					meetings: 12,
				},
				{
					id: 2,
					name: 'Data Structures - 2-F2',
					course_code: 'CS202',
					first_name: 'Robert',
					middle_name: 'Tangirine',
					last_name: 'Lim',
					program: 'BSIT',
					year_level: 2,
					section: 'F2',
					students: 28,
					meetings: 10,
				},
				{
					id: 3,
					name: 'Database Systems - 3-F3',
					course_code: 'CS303',
					first_name: 'David',
					middle_name: 'Rizz',
					last_name: 'Cruz',
					program: 'BSIT',
					year_level: 3,
					section: 'F3',
					students: 32,
					meetings: 14,
				},
				{
					id: 4,
					name: 'Operating Systems - 3-F3',
					course_code: 'CS305',
					first_name: 'Karen',
					middle_name: 'Manalo',
					last_name: 'Lopez',
					program: 'BSIT',
					year_level: 3,
					section: 'F3',
					students: 27,
					meetings: 11,
				},
				{
					id: 5,
					name: 'Software Engineering - 4-F4',
					course_code: 'CS401',
					first_name: 'Elena',
					middle_name: 'Pinia',
					last_name: 'Martinez',
					program: 'BSIT',
					year_level: 4,
					section: 'F4',
					students: 25,
					meetings: 9,
				},
				{
					id: 6,
					name: 'Human-Computer Interaction - 4-F4',
					course_code: 'CS402',
					first_name: 'Thomas',
					middle_name: '',
					last_name: 'Garcia',
					program: 'BSIT',
					year_level: 4,
					section: 'F4',
					students: 26,
					meetings: 10,
				},
			]

			const data = await response
			return data as ClassTableRecord[]
		} catch (error: unknown) {
			let message = 'Unknown error'

			if (axios.isAxiosError(error)) {
				const axiosError = error as AxiosError
				console.error('Request failed:', axiosError.response?.data || axiosError.message)
				// Try to extract string message from the Axios error response
				message =
					(axiosError.response?.data as { message?: string })?.message ||
					axiosError.message ||
					message
			} else if (error instanceof Error) {
				console.error('Request failed:', error.message)
				message = error.message
			} else {
				console.error('Request failed: Unknown error')
			}

			throw new Error(message) // this becomes a rejected Promise
		}
	},

	async get(id: number): Promise<ClassFormDataEdit>{
		try {
			console.log(`Fetching record: ${id}`);

			const response = {
				id: 1,
				user_first_name: 'Maria',
				user_middle_name: 'Langka',
				user_last_name: 'Santos',
				course_code: 'CS101',
				name: 'Introduction to Programming - 1-F1',
				section: 'F1',
				year_level: 1,
				program: 'BSIT',
				schedule_days: ['Mon','Tue'],
				scheduled_start_time: new Date(),
				scheduled_end_time: new Date(),
				semester: '1st Semester',
				status: 'active',
			}

			const data = await response
			return data as ClassFormDataEdit
		} catch (error: unknown) {
			let message = 'Unknown error'

			if (axios.isAxiosError(error)) {
				const axiosError = error as AxiosError
				console.error('Request failed:', axiosError.response?.data || axiosError.message)
				// Try to extract string message from the Axios error response
				message =
					(axiosError.response?.data as { message?: string })?.message ||
					axiosError.message ||
					message
			} else if (error instanceof Error) {
				console.error('Request failed:', error.message)
				message = error.message
			} else {
				console.error('Request failed: Unknown error')
			}

			throw new Error(message)
		}
	},

	async create(){

	},

	async update(){

	},

	async delete(){

	}
}
