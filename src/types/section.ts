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
