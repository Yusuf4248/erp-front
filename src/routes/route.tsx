import {
	Admin,
	AdminProfile,
	ForgotPassword,
	Groups,
	NotFound,
	Rooms,
	SignIn,
	SignUp,
	SingleGroup,
	StudentDashboard,
	StudentLayout,
	StudentMyGroups,
	StudentProfile,
	StudentSingleGroup,
	StudentsTbl,
	Teacher,
	TeacherGroups,
	TeacherProfile,
	TeacherSingleGroupPage,
	TeachersLayout,
	Worker
} from "@pages"
import { lazy } from "react"
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom"
import Dashboard from "../pages/admin-layout/admin-dashboard"
import Branches from "../pages/branche-layout/branch"
import Courses from "../pages/course-layout/course"
import ProtectLayout from "../pages/protect-route/protect-layout"
import ProtectLogin from "../pages/protect-route/protect-login"
import TeacherDashboard from "../pages/teachers/dashboard"
const App = lazy(() => import("../App"));
const Router = () => {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<>
				<Route path="/" element={<App />}>
					<Route index element={<ProtectLogin><SignIn/></ProtectLogin>}/>
					<Route path="sign-up" element={<SignUp />} />
					<Route path="forgot-password" element={<ForgotPassword />} />
					{/* ADMIN */}
					<Route path="admin" element={<ProtectLayout><Admin/></ProtectLayout>}>
						<Route path="dashboard" element={<Dashboard />} />
						<Route path="groups" element={<Groups />} />
						<Route path="groups/:id" element={<SingleGroup />} />
						<Route path="students" element={<StudentsTbl />} />
						<Route path="branches" element={<Branches />} />
						<Route path="courses" element={<Courses />} />
						<Route path="teacher" element={<Teacher />} />
						<Route path="rooms" element={<Rooms />} />
						<Route path="me" element={<AdminProfile />} />
					</Route>
					{/* STUDENT */}
					<Route path="student" element={<ProtectLayout><StudentLayout/></ProtectLayout>}>
						<Route path="dashboard" element={<StudentDashboard/>}/>
						<Route path="my-groups" element={<StudentMyGroups/>}/>
						<Route path="my-groups/:id" element={<StudentSingleGroup/>}/>
						<Route path="me" element={<StudentProfile/>}/>
					</Route>
					{/* Teacher */}
					<Route path="teacher" element={<ProtectLayout><TeachersLayout /></ProtectLayout>}>
						<Route path="dashboard" element={<TeacherDashboard />} />
						<Route path="me" element={<TeacherProfile />} />
						<Route path="my-groups" element={<TeacherGroups />} />
						<Route path="my-groups/:id" element={<TeacherSingleGroupPage />} />
					</Route>
					<Route path="worker" element={<Worker />} />
					<Route path="*" element={<NotFound />} />
				</Route>
			</>
		)
	);
	return <RouterProvider router={router} />;
};
export default Router;
