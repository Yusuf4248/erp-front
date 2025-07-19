import {
	Admin,
	Groups,
	NotFound,
	Rooms,
	SignIn,
	SignUp,
	SingleGroup,
	Student,
	StudentsTbl,
	Teacher,
	Worker,
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
				<Route path="/" element={<App />}><Route index element={<ProtectLogin><SignIn /></ProtectLogin>}
					/>
					<Route path="sign-up" element={<SignUp />} />
					{/* ADMIN */}
					<Route path="admin" element={<ProtectLayout><Admin /></ProtectLayout>}
					>
						<Route path="dashboard" element={<Dashboard />} />
						<Route path="groups" element={<Groups />} />
						<Route path="groups/:id" element={<SingleGroup />} />
						<Route path="students" element={<StudentsTbl />} />
						<Route path="branches" element={<Branches />} />
						<Route path="courses" element={<Courses />} />
						<Route path="teacher" element={<Teacher />} />
						<Route path="rooms" element={<Rooms />} />
					</Route>
					{/* STUDENT */}
					<Route path="student" element={<Student />}></Route>
					{/* Teacher */}
					<Route path="worker" element={<Worker />} />
					<Route path="*" element={<NotFound />} />
				</Route>
			</>
		)
	);
	return <RouterProvider router={router} />;
};
export default Router;
