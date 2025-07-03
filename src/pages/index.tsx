import { lazy } from "react";

const SignIn = lazy(() => import("./auth/sign-in"));
const SignUp = lazy(() => import("./auth/sign-up"));
const Teacher = lazy(() => import("./teacher-layout/teacher"));
const Admin = lazy(() => import("./admin-layout/admin"));
const Student = lazy(() => import("./student-layout/student"));
const Groups = lazy(() => import("./groups/groups"));

export { Admin, Groups, SignIn, SignUp, Student, Teacher };
