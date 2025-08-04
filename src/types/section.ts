export interface GroupType {
	id: number;
	name: string;
	course: any;
	start_date: string;
	start_time: string;
	status: string;
	roomId: number;
	room:any
}
export interface GroupStudentType {
	students: StudentType[];
}
export interface GroupTeacherType {
	teachers: TeacherType[];
}
export interface GroupLessonType {
	lessons: LessonType[];
}
export interface LessonType {
	id: number;
	title: string;
	notes: string;
	date: string;
	status: string;
	groupId: number;
	roomId: number;
}

export interface StudentType {
	id: number;
	first_name: string;
	last_name: string;
	email: string;
	phone: string;
	password_hash: string;
	gender: string;
	date_of_birth: string;
	// is_active?: boolean;
}
export interface TeacherType {
	id: number;
	first_name: string;
	last_name: string;
	email: string;
	password: string;
	phone: string;
	role: string;
	branchId: [];
	is_active?: boolean;
	branches:any
}
export interface BranchType {
	id: number;
	name: string;
	address: string;
	call_number: string;
	teachers: [];
}

export interface CourseType {
	id: number;
	title: string;
	description: string;
	price: number;
	duration: string;
	lesson_in_a_week: string;
	lesson_duration: string;
	lesson_in_a_month: number;
}

export interface AddStudentOrTeacher {
	teacherId: number;
	studentId: number;
}

export interface RoomsType {
	id: number;
	branchId: number;
	name: string;
	capacity: number;
	branch?:any
}
