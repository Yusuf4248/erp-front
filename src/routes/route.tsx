import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "../App";
import {
  SignIn,
  SignUp,
  NotFound,
  TeacherLayout,
  StudentLayout,
  AdminLayout,
  Groups,
} from "@pages";

const Router = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route index element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />

        {/* ======= ADMIN LAYOUT ============= */}
        <Route path="admin" element={<AdminLayout />}>
          <Route path="groups" element={<Groups />} />
        </Route>

        {/* ======= TEACHER LAYOUT ============= */}
        <Route path="teacher" element={<TeacherLayout />}></Route>

        {/* ======= STUDENT LAYOUT ============= */}
        <Route path="student" element={<StudentLayout />}></Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default Router;
