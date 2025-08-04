export class ApiUrls {
	// AUTH
	public static AUTH: string = "/log-in";
	public static FORGOT_PASSWORD: string = "/admin/forget-password";
	public static VERIFY_OTP: string = "/admin/verify-otp";
	public static SET_NEW_PASSWORD: string = "/admin/new-password";
	//ADMIN
	public static ADMIN_PROFILE: string = "/admin/profile";
	public static UPDATE_ADMIN = (id: number) => `/admin/${id}`;
	public static ADMIN_CHANGE_PASSWORD = (id: number) => `/admin/change-password/${id}`;

	public static GROUPS: string = "/group";
	public static COURSES: string = "/courses";
	public static STUDENTS: string = "/students";
	public static UPLOAD_STUDENT_AVATAR = (id:number)=>`${this.STUDENTS}/${id}/avatar`;
	public static STUDENT_CHANGE_PASSWORD = (id:number)=>`${this.STUDENTS}/change-password/${id}`;
	// public static STUDENT_GROUPS: string = "/students";

	public static LOGOUT: string = "/log-out";
	public static BRANCHES: string = "/branches";
	// TEACHER
	public static TEACHER: string = "/teacher";
	public static TEACHER_GROUPS = "/group-teachers/my-groups";
	public static TEACHER_PROFILE_AVATAR = (id: number) =>
		`${this.TEACHER}/${id}/avatar`;
	public static GET_ALL_TEACHER_GROUPS = (id: number) =>
		`${this.GROUP_TEACHERS}/by-teacher/${id}`;
	public static GET_GROUP_DETAILS_FOR_TEACHER = (id: number) =>
		`${this.GROUPS}/${id}/teacher`;
	public static CHANGE_PASSWORD = (id: number) =>
		`${this.TEACHER}/change-password/${id}`;
	//ROOM
	public static ROOMS: string = "/rooms";
	public static LESSONS: string = "/lessons";
	public static GROUP_LESSONS: string = "/lessons/group";

	//GROUP
	public static GROUP_TEACHERS: string = "/group-teachers";
	public static GROUP_TEACHERS_BY_GROUP_ID: string =
		this.GROUP_TEACHERS + "/by-group";
	public static GROUP_STUDENTS: string = "/group-students";
	public static GROUP_STUDENTS_BY_GROUP_ID: string =
		this.GROUP_STUDENTS + "/by-group";
	public static UPDATE_LESSONS_STATUS_AND_NOTES = (id: number): string =>
		`${this.LESSONS}/${id}/status`;
	public static GET_GROUP_STUDENTS_BY_GROUP_ID = (id: number) =>
		`${this.GROUP_STUDENTS}/by-group/${id}`;
	public static GET_STUDENT_GROUPS = (id: number) =>
		`${this.GROUP_STUDENTS}/by-student/${id}`;
	//ATTENDANCE
	public static ATTENDANCE: string = "/attendance";
	public static ATTENDANCE_BULK_UPDATE = `${this.ATTENDANCE}/bulk-update`;
	public static GET_ALL_ATTENDANCE_BY_LESSON_ID = (id: number) =>
		`${this.ATTENDANCE}/lesson/${id}`;
	public static GET_ALL_STUDENT_ATTENDANCE_BY_GROUP_ID = (
		studentId: number,
		groupId: number
	) => `${this.ATTENDANCE}/student/${studentId}/group/${groupId}`;
	public static CHANGE_STUDENT_ATTENDANCE=(id:number)=>`${this.ATTENDANCE}/${id}`
}
