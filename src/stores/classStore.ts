import type { ClassFormDataEdit } from '@/types/classes'
import { defineStore } from 'pinia'

export const useClassStore = defineStore('class', {
	state: () => ({
		classInfo: {
			id: null,
			user_first_name: '',
			user_middle_name: '',
			user_last_name: '',
			course_code: '',
			name: '',
			section: '',
			year_level: 0,
			program: '',
			schedule_days: [],
			scheduled_start_time: null,
			scheduled_end_time: null,
			semester: '',
			status: '',
		} as ClassFormDataEdit,
	}),
	getters: {
		yearLevelSection: (state) => {
			return `${state.classInfo.year_level}-${state.classInfo.section}`
		},
	},
	actions: {
		setClass(classInfo: ClassFormDataEdit) {
			this.classInfo = { ...this.classInfo, ...classInfo };
		},
	},
})
