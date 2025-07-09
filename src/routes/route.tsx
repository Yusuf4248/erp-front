import {
	Admin,
	Groups,
	NotFound,
	SignIn,
	SignUp,
	Student,
	StudentsTbl,
	Teacher,
} from "@pages";
import { lazy } from "react";
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";
import Dashboard from "../pages/admin-layout/admin-dashboard";
import Branches from "../pages/branche-layout/branch";
import Courses from "../pages/course-layout/course";
import ProtectLayout from "../pages/protect-route/protect-layout";
import ProtectLogin from "../pages/protect-route/protect-login";
const App = lazy(() => import("../App"));
const Router = () => {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<>
				<Route path="/" element={<App />}>
					<Route
						index
						element={
							<ProtectLogin>
								<SignIn />
							</ProtectLogin>
						}
					/>
					<Route path="sign-up" element={<SignUp />} />
					{/* ADMIN */}
					<Route
						path="admin"
						element={
							<ProtectLayout>
								<Admin />
							</ProtectLayout>
						}
					>
						<Route path="dashboard" element={<Dashboard />} />
						<Route path="groups" element={<Groups />} />
						<Route path="students" element={<StudentsTbl />} />
						<Route path="branches" element={<Branches />} />
						<Route path="courses" element={<Courses />} />
					</Route>
					{/* STUDENT */}
					<Route path="student" element={<Student />}></Route>
					{/* Teacher */}
					<Route path="teacher" element={<Teacher />}></Route>
					<Route path="*" element={<NotFound />} />
				</Route>
			</>
		)
	);
	return <RouterProvider router={router} />;
};
export default Router;
