import { GroupLessons, GroupStudents, GroupTeachers } from "@components";
import { useGroups } from "@hooks";
import { Calendar, Clock } from "lucide-react";
import { useParams } from "react-router-dom";
const SingleGroup = () => {
	const { id } = useParams<{ id: string }>();
	const { dataById, students, lessons, teachers } = useGroups({}, Number(id));
	const groupData: any = dataById
		? dataById.data.group
		: { course: { title: "", price: 0 } };
	console.log("groupData", groupData);

	return (
		<>
			<div
				className="min-h-screen bg-gray-50"
				style={{ margin: "-23px", borderRadius: "8px" }}
			>
				<div className="max-w-7xl mx-auto p-2 sm:p-4 md:p-6">
					{/* Group Header */}
					<div className="bg-white rounded-lg border border-gray-200 p-2 sm:p-4 md:p-6 mb-6">
						<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
							<div className="flex flex-col gap-4">
								<h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
									{groupData.name}
								</h1>
								<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
									<div className="flex items-center gap-2 text-sm">
										<Calendar className="w-4 h-4 text-gray-400" />
										<span className="text-gray-600">Start:</span>
										<span className="font-medium">{groupData.start_date}</span>
									</div>
									<div className="flex items-center gap-2 text-sm">
										<Calendar className="w-4 h-4 text-gray-400" />
										<span className="text-gray-600">End:</span>
										<span className="font-medium">{groupData.end_date}</span>
									</div>
									<div className="flex items-center gap-2 text-sm">
										<Clock className="w-4 h-4 text-gray-400" />
										<span className="text-gray-600">Time:</span>
										<span className="font-medium">
											{groupData.start_time} - {groupData.end_time}
										</span>
									</div>
									<div className="flex items-center gap-2 text-sm">
										<span className="text-gray-600">Status:</span>
										<span
											className={`px-2 py-1 text-xs font-medium rounded-full ${
												groupData.status === "new"
													? "bg-yellow-50 text-yellow-700"
													: "bg-green-50 text-green-700"
											}`}
										>
											{groupData.status === "new" ? "New" : "Active"}
										</span>
									</div>
								</div>
								<div className="bg-gray-50 rounded-lg p-3 sm:p-4">
									<h3 className="font-medium text-gray-900 mb-2">
										{groupData.course?.title}
									</h3>
									<p className="text-gray-600 text-sm">
										{groupData.course?.description}
									</p>
									<div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-500">
										<span>Duration: {groupData.course?.duration} month</span>
										<span>
											Per week: {groupData.course?.lessons_in_a_week} lesson
										</span>
										<span>
											Lesson time: {groupData.course?.lesson_duration} min
										</span>
										<span>
											Price: {groupData.course?.price?.toLocaleString()} sum
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="mb-6">
						{teachers?.data.length >= 0 && (
							<GroupTeachers teachers={teachers?.data} />
						)}
					</div>
					{lessons?.data.lessons.length >= 0 && (
						<GroupLessons lessons={lessons?.data.lessons} />
					)}

					<div>
						{students?.data.length >= 0 && (
							<GroupStudents students={students?.data} id={id} />
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default SingleGroup;
