export class ApiUrls {
	// AUTH
	public static AUTH: string = "/log-in";
	public static GROUPS: string = "/group";
	public static COURSES: string = "/courses";
	public static STUDENTS: string = "/student";
	public static LOGOUT: string = "/log-out";
	public static BRANCHES: string = "/branches";
	public static TEACHER: string = "/teacher";
	public static addStudent = (groupId: number, studentId: number): string =>
		`${this.GROUPS}/${groupId}/add-student/${studentId}`;
	public static removeStudent = (groupId: number, studentId: number): string =>
		`${this.GROUPS}/${groupId}/remove-student/${studentId}`;
	public static addTeacher = (groupId: number, teacherId: number): string =>
		`${this.GROUPS}/${groupId}/add-teacher/${teacherId}`;
	public static removeTeacher = (groupId: number, teacherId: number): string =>
		`${this.GROUPS}/${groupId}/remove-teacher/${teacherId}`;
}
