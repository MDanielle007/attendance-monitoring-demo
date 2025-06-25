import type { CourseSelectOption } from '@/types/course'
import type { SelectOption } from '@/types/general'
import type { UserSelectOption } from '@/types/user'
import { defineStore } from 'pinia'

export const useOptionStore = defineStore('option', {
	state: () => {
		return {
			userOptions: [] as UserSelectOption[],
			courseOptions: [] as CourseSelectOption[],
			programOptions: [] as SelectOption[],
			yearLevelOptions: [
				{
					name: '1st Year',
					code: 1,
				},
				{
					name: '2nd Year',
					code: 2,
				},
				{
					name: '3rd Year',
					code: 3,
				},
				{
					name: '4th Year',
					code: 4,
				},
			] as SelectOption[],
			daysOfWeek: [
				{
					name: 'Sunday',
					code: 'Sun',
				},
				{
					name: 'Monday',
					code: 'Mon',
				},
				{
					name: 'Tuesday',
					code: 'Tue',
				},
				{
					name: 'Wednesday',
					code: 'Wed',
				},
				{
					name: 'Thursday',
					code: 'Thu',
				},
				{
					name: 'Friday',
					code: 'Fri',
				},
				{
					name: 'Saturday',
					code: 'Sat',
				},
			] as SelectOption[],
		}
	},
	getters: {},
	actions: {
		async getUserOptions() {
			this.userOptions = [
				{
					code: 1,
					name: 'Maria L. Santos',
					job_title: 'Instructor I',
					department: 'CCS', //
				},
				{
					code: 2,
					name: 'Robert T. Lim',
					job_title: 'Instructor I',
					department: 'CCS', //
				},
				{
					code: 3,
					name: 'David R. Cruz',
					job_title: 'Instructor I',
					department: 'CCS', //
				},
				{
					code: 4,
					name: 'Karen M. Lopez',
					job_title: 'Instructor I',
					department: 'CCS', //
				},
			]
		},
		async getCourseOptions() {
			this.courseOptions = [
				{
					code: 1,
					name: 'CS101',
					description: 'Introduction to Programming',
				},
				{
					code: 2,
					name: 'CS202',
					description: 'Data Structures',
				},
				{
					code: 3,
					name: 'CS303',
					description: 'Database Management Systems',
				},
			]
		},
		async getProgramOptions() {
			this.programOptions = [
				{
					name: 'BSIT',
					code: 'BSIT',
				},
				{
					name: 'BSEd',
					code: 'BSEd',
				},
				{
					name: 'BSBA',
					code: 'BSBA',
				},
			]
		},
	},
})
