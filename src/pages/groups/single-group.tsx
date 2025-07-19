import { useGroups } from "@hooks";
import {
	ArrowLeft,
	BookOpen,
	Calendar,
	Clock,
	Mail,
	MapPin,
	Phone,
	UserCheck,
	Users,
} from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Student from "../student-layout/student";
import Teachers from "../teacher-layout/teacher";
import AddTeacherorStudentModal from "./single-modal";
const SingleGroupPage = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const { dataById } = useGroups({}, +id!);
	const selectedGroup = dataById?.data.group;
	const [open, setOpen] = useState(false);
	const [addingTeacher, setAddingTeacher] = useState(true);

	const toggle = () => {
		setOpen(!open);
	};
	console.log(selectedGroup)
	return (
		<>
			{open && (
				<AddTeacherorStudentModal
					open={open}
					toggle={toggle}
					addingTeacher={addingTeacher}
					groupId={+id!}
				/>
			)}
			<div style={{ margin: "-23px" }}>
				<div
					className="bg-white shadow-sm border-b"
					style={{ borderRadius: "8px" }}
				>
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="flex items-center justify-between h-16">
							<div className="flex items-center space-x-4">
								<button
									onClick={() => navigate("/admin/groups")}
									className="flex items-center text-gray-900 hover:text-gray-900"
								>
									<ArrowLeft className="h-5 w-5 mr-2" />
									Groups
								</button>
								<div className="h-6 w-px bg-gray-300"></div>
								<h1 className="text-xl font-semibold text-gray-900">
									{selectedGroup?.name || ""}
								</h1>
							</div>
						</div>
					</div>
				</div>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
						<div className="bg-white rounded-lg shadow-sm p-6">
							<div className="flex items-center">
								<Users className="h-8 w-8 text-blue-600" />
								<div className="ml-4">
									<p className="text-sm font-medium text-gray-600">
										All students
									</p>
									<p className="text-2xl font-bold text-gray-900">
										{selectedGroup?.students?.length || 0}
									</p>
								</div>
							</div>
						</div>

						<div className="bg-white rounded-lg shadow-sm p-6">
							<div className="flex items-center">
								<UserCheck className="h-8 w-8 text-green-600" />
								<div className="ml-4">
									<p className="text-sm font-medium text-gray-600">
										Active Students
									</p>
									<p className="text-2xl font-bold text-gray-900">
										{selectedGroup?.students?.length || 0}
									</p>
								</div>
							</div>
						</div>

						<div className="bg-white rounded-lg shadow-sm p-6">
							<div className="flex items-center">
								<BookOpen className="h-8 w-8 text-purple-600" />
								<div className="ml-4">
									<p className="text-sm font-medium text-gray-600">Lessons</p>
									<p className="text-2xl font-bold text-gray-900">
										{129}/{250}
									</p>
								</div>
							</div>
						</div>

						<div className="bg-white rounded-lg shadow-sm p-6">
							<div className="flex items-center">
								<Calendar className="h-8 w-8 text-orange-600" />
								<div className="ml-4">
									<p className="text-sm font-medium text-gray-600">Status</p>
									<p className="text-2xl font-bold text-green-600">Active</p>
								</div>
							</div>
						</div>
					</div>
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
						<div className="lg:col-span-1">
							<div className="bg-white rounded-lg shadow-sm p-6">
								<h2 className="text-lg font-semibold text-gray-900 mb-4">
									About Group
								</h2>

								<div className="space-y-4">
									<div className="flex items-center">
										<Users className="h-5 w-5 text-gray-400 mr-3" />
										<div>
											<p className="text-sm text-gray-600">Teachers</p>
											<p className="font-medium">{"Ali Valiyev"}</p>
										</div>
									</div>

									<div className="flex items-center">
										<Phone className="h-5 w-5 text-gray-400 mr-3" />
										<div>
											<p className="text-sm text-gray-600">Phone</p>
											<p className="font-medium">{"+998901234567"}</p>
										</div>
									</div>

									<div className="flex items-center">
										<Mail className="h-5 w-5 text-gray-400 mr-3" />
										<div>
											<p className="text-sm text-gray-600">Email</p>
											<p className="font-medium">{"ali@gmail.com"}</p>
										</div>
									</div>

									<div className="flex items-center">
										<Calendar className="h-5 w-5 text-gray-400 mr-3" />
										<div>
											<p className="text-sm text-gray-600">Lesson schedule</p>
											<p className="font-medium">{"Du/Chor/Ju"}</p>
										</div>
									</div>

									<div className="flex items-center">
										<Clock className="h-5 w-5 text-gray-400 mr-3" />
										<div>
											<p className="text-sm text-gray-600">Time</p>
											<p className="font-medium">{"08:00"}</p>
										</div>
									</div>

									<div className="flex items-center">
										<MapPin className="h-5 w-5 text-gray-400 mr-3" />
										<div>
											<p className="text-sm text-gray-600">Room</p>
											<p className="font-medium">{"Google"}</p>
										</div>
									</div>
								</div>

								<div className="mt-6 pt-6 border-t">
									<h3 className="text-sm font-medium text-gray-900 mb-2">
										About Course
									</h3>
									<p className="text-sm text-gray-600">{"bla-bla-bla"}</p>
								</div>

								<div className="mt-4 pt-4 border-t">
									<div className="flex justify-between items-center">
										<span className="text-sm text-gray-600">Course Price:</span>
										<span className="font-semibold text-lg">
											{"800000"} sum
										</span>
									</div>
								</div>
							</div>
						</div>
						<div className="lg:col-span-2">
							<div className="bg-white rounded-lg shadow-sm">
								<div className="overflow-x-auto">
									<div
										style={{
											display: "flex",
											justifyContent: "center",
											margin: "10px 0",
										}}
									>
										<h3 className="text-3xl font-bold dark:text-black">
											Teachers
										</h3>
									</div>
									<Teachers teachers={selectedGroup?.teachers || []} />
									<div
										style={{
											display: "flex",
											justifyContent: "center",
											margin: "10px 0",
										}}
									>
										<h3 className="text-3xl font-bold dark:text-black">
											Students
										</h3>
									</div>
									<Student students={selectedGroup?.students || []} />
								</div>
							</div>
							<div className="bg-white rounded-lg shadow-sm mt-5">
								<button
									type="button"
									className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
									onClick={() => {
										setOpen(true);
										setAddingTeacher(true);
									}}
								>
									Add Teacher
								</button>
								<button
									type="button"
									className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
									onClick={() => {
										setOpen(true);
										setAddingTeacher(false);
									}}
								>
									Add Student
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default SingleGroupPage;
