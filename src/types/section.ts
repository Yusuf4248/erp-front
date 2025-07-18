export interface GroupType {
	id: number;
	name: string;
	course: string;
	start_date: string;
	end_date: string;
	status: string;
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
	lidId: number;
	eventsId: number;
	groupsId: number;
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
}

export interface AddStudentOrTeacher {
	teacherId: number;
	studentId: number;
}
