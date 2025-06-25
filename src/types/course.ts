import type { SelectOption } from "./general";

export interface Course {
  id: number;
  course_code: string;
  course_description: string;
  created_at: string; // or Date if parsed
  updated_at: string;
  deleted_at: string | null;
}

export type CourseFormData = {
	id: number | null;
	course_code: string;
	course_description: string;
}

export interface CourseSelectOption extends SelectOption{
	description: string;
}
