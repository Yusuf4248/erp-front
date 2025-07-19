import { lazy } from "react";

const SignIn = lazy(() => import("./auth/sign-in"));
const SignUp = lazy(() => import("./auth/sign-up"));
const Teacher = lazy(() => import("./teacher-layout/teacher"));
const Admin = lazy(() => import("./admin-layout/admin"));
const Student = lazy(() => import("./student-layout/student"));
const Groups = lazy(() => import("./groups/groups"));
const NotFound = lazy(() => import("./not-found/not-found"));
const StudentsTbl = lazy(() => import("./student-layout/student"));
const ProtectLayout = lazy(() => import("./protect-route/protect-layout"));
const ProtectLogin = lazy(() => import("./protect-route/protect-login"));
const Courses = lazy(() => import("./course-layout/course"));
const Worker = lazy(() => import("./workers/worker"));
const SingleGroup = lazy(() => import("./groups/single-group"));
const Rooms = lazy(() => import("./rooms-layout/rooms"));

export {
	Admin,
	Courses,
	Groups,
	NotFound,
	ProtectLayout,
	ProtectLogin,
	SignIn,
	SignUp,
	Student,
	StudentsTbl,
	Teacher,
	Worker,
	Rooms,
	SingleGroup
};
