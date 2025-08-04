import { getItem } from "@helpers";
import { useStudentGroups, useStudents } from "@hooks";
import {
	BookOpen,
	CheckCircle,
	Clock,
	FileText,
	Star,
	TrendingUp,
	Users,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
const useMultipleGroupLessons = (groupIds: number[]) => {
	const [groupLessons, setGroupLessons] = useState<any[]>([]);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		if (!groupIds.length) return;
		const fetchGroupLessons = async () => {
			setLoading(true);
			const promises = groupIds.map(async (groupId) => {
				try {
					const { lessonsService } = await import("@service");
					const response = await lessonsService.getLessonsByGroupId(groupId);
					return { groupId, data: response?.data };
				} catch (error) {
					console.error(
						`Error fetching group details for group ${groupId}:`,
						error
					);
					return { groupId, data: null };
				}
			});
			try {
				const results = await Promise.all(promises);
				setGroupLessons(results);
			} catch (error) {
				console.error("Error fetching group details:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchGroupLessons();
	}, [groupIds]);

	return { groupLessons, loading };
};
const StudentDashboard = () => {
	const userId = getItem("user_id");
	const { dataById } = useStudents({}, +userId!);
	const studentDatas = dataById?.data.student;
	const { studentGroups } = useStudentGroups(+userId!);
	const group = studentGroups?.data || [];
	const groupIds = useMemo(() => {
		if (!Array.isArray(group)) return [];
		return group
			.filter((group) => group?.group?.id)
			.map((group) => group?.group?.id);
	}, [group]);
	const { groupLessons, loading: groupLessonsLoading } =
		useMultipleGroupLessons(groupIds);
	const studentData = {
		name: studentDatas?.first_name + " " + studentDatas?.last_name,
		id: `ST-2025-${studentDatas?.id}`,
		course: "Frontend Development",
		avatar: studentDatas.avatar_url,
	};

	const statistics = {
		totalLessons: groupLessons
			.map((les) => les?.data.lessons.length)
			.reduce((acc, cur) => acc + cur, 0),
		completedLessons: groupLessons
			.map(
				(les) =>
					les?.data.lessons.filter((ind: any) => ind.status == "completed")
						.length
			)
			.reduce((acc, cur) => acc + cur, 0),
		pendingAssignments: 3,
		averageGrade: 4.7,
		attendance: 89,
	};
	const getGroupStatusColor = (status: any) => {
		switch (status) {
			case "new":
				return "text-[#fff] bg-gray-400";
			case "active":
				return "text-[#fff] bg-green-400";
			case "complated":
				return "text-[#fff] bg-yellow-400";
			default:
				return "text-gray-600 bg-gray-0";
		}
	};
	const groups = [
		...(Array.isArray(group)
			? group.map((perGroup: any) => {
					const lesson = groupLessons.find(
						(ind) => ind.groupId == perGroup.group.id
					);
					return {
						id: perGroup.group.id,
						name: perGroup.group.name,
						status: (
							<span
								className={`px-3 py-1 rounded-full text-xs font-medium ${getGroupStatusColor(
									perGroup.group?.status
								)}`}
							>
								{perGroup.group?.status}
							</span>
						),
						start: perGroup.group.start_date,
						end: perGroup.group.end_date,
						progress: (
							(lesson?.data.lessons.filter(
								(les: any) => les.status == "completed"
							).length /
								lesson?.data.lessons.length) *
							100
						).toFixed(0),
						nextClass: lesson?.data.lessons
							.find((ind: any) => ind.status == "new")
							?.date.split("T")[0],
						room: lesson?.data.lessons.find((ind: any) => ind.status == "new")
							?.room.name,
					};
			  })
			: []),
	];

	const recentAssignments = [
		{
			id: 1,
			title: "React Hooks loyihasi",
			subject: "Frontend Development",
			dueDate: "2024-08-10",
			status: "pending",
			priority: "high",
		},
		{
			id: 2,
			title: "JavaScript ES6 amaliy ish",
			subject: "Programming",
			dueDate: "2024-08-08",
			status: "submitted",
			priority: "medium",
		},
		{
			id: 3,
			title: "CSS Flexbox Layout",
			subject: "Web Design",
			dueDate: "2024-08-12",
			status: "pending",
			priority: "low",
		},
	];
	const recentLessons = [
		{
			id: 1,
			title: "React hooks",
			subject: "Frontend Development",
			dueDate: "2024-08-10",
			status: "complated",
			priority: "low",
		},
		{
			id: 2,
			title: "React router dom",
			subject: "Feontend Development",
			dueDate: "2024-08-08",
			status: "complated",
			priority: "low",
		},
		{
			id: 3,
			title: "CSS Flexbox Layout",
			subject: "Frontend Development",
			dueDate: "2024-08-12",
			status: "complated",
			priority: "low",
		},
	];
	const getStatusColor = (status: any) => {
		switch (status) {
			case "submitted":
				return "text-green-600 bg-green-100";
			case "pending":
				return "text-orange-600 bg-orange-100";
			default:
				return "text-gray-600 bg-gray-100";
		}
	};

	const getPriorityColor = (priority: any) => {
		switch (priority) {
			case "high":
				return "border-l-red-500";
			case "medium":
				return "border-l-yellow-500";
			case "low":
				return "border-l-green-500";
			default:
				return "border-l-gray-500";
		}
	};

	return (
		<div className="min-h-screen bg-gray-50 p-6">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<div className="bg-white rounded-xl shadow-sm p-6 mb-6">
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-4">
							<img
								src={studentData.avatar}
								alt="Profile"
								className="w-16 h-16 rounded-full object-cover"
							/>
							<div>
								<h1 className="text-2xl font-bold text-gray-900">
									{studentData.name}
								</h1>
								<p className="text-gray-600">
									{studentData.id} • {studentData.course}
								</p>
							</div>
						</div>
					</div>
				</div>

				<div
					hidden={groupLessonsLoading}
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6"
				>
					<div className="bg-white rounded-xl shadow-sm p-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-gray-600">All lessons</p>
								<p className="text-2xl font-bold text-gray-900">
									{statistics.totalLessons}
								</p>
							</div>
							<BookOpen className="w-8 h-8 text-blue-500" />
						</div>
					</div>

					<div className="bg-white rounded-xl shadow-sm p-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-gray-600">Complated</p>
								<p className="text-2xl font-bold text-green-600">
									{statistics.completedLessons}
								</p>
							</div>
							<CheckCircle className="w-8 h-8 text-green-500" />
						</div>
					</div>

					<div className="bg-white rounded-xl shadow-sm p-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-gray-600">Pending</p>
								<p className="text-2xl font-bold text-orange-600">
									{statistics.pendingAssignments}
								</p>
							</div>
							<Clock className="w-8 h-8 text-orange-500" />
						</div>
					</div>

					<div className="bg-white rounded-xl shadow-sm p-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-gray-600">Avarage mark</p>
								<p className="text-2xl font-bold text-purple-600">
									{statistics.averageGrade}
								</p>
							</div>
							<Star className="w-8 h-8 text-purple-500" />
						</div>
					</div>

					<div className="bg-white rounded-xl shadow-sm p-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-gray-600">Attendance</p>
								<p className="text-2xl font-bold text-indigo-600">
									{statistics.attendance}%
								</p>
							</div>
							<TrendingUp className="w-8 h-8 text-indigo-500" />
						</div>
					</div>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
					{/* Groups */}
					<div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
						<div className="flex items-center justify-between mb-6">
							<h2 className="text-xl font-bold text-gray-900 flex items-center">
								<Users className="w-6 h-6 mr-2 text-blue-500" />
								My Groups
							</h2>
						</div>

						<div className="space-y-4">
							{groups.map((group) => (
								<div
									key={group.id}
									className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
								>
									<div className="flex items-center justify-between mb-3">
										<h3 className="font-semibold text-gray-900">
											{group.name}
										</h3>
										<span className="text-sm text-gray-500">
											{group.status}
										</span>
									</div>

									<div className="flex items-center justify-between mb-3">
										<p className="text-sm text-gray-600">
											Started: {group.start} | Finish: {group.end}
										</p>
										<div className="flex flex-col">
											<p className="text-sm text-gray-600">
												Next Lesson: {group.nextClass}
											</p>
											<p className="text-[10px] text-gray-600">
												Room: {group.room}
											</p>
										</div>
									</div>

									<div className="w-full bg-gray-200 rounded-full h-2">
										<div
											className="bg-blue-500 h-2 rounded-full transition-all duration-300"
											style={{ width: `${group.progress}%` }}
										></div>
									</div>
									<p className="text-xs text-gray-500 mt-1">
										Progress: {group.progress}%
									</p>
								</div>
							))}
						</div>
					</div>

					{/* Assignment Upload */}
					<div className="mt-6 bg-white rounded-xl shadow-sm p-6">
						<h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
							<FileText className="w-6 h-6 mr-2 text-purple-500" />
							Last Lessons
						</h2>

						<div className="space-y-4">
							{recentLessons.map((assignment) => (
								<div
									key={assignment.id}
									className={`border-l-4 ${getPriorityColor(
										assignment.priority
									)} bg-gray-50 p-4 rounded-r-lg`}
								>
									<div className="flex items-center justify-between mb-2">
										<h3 className="font-semibold text-gray-900">
											{assignment.title}
										</h3>
										<span
											className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
												assignment.status
											)}`}
										>
											{assignment.status === "complated" ? "Done" : "Pending"}
										</span>
									</div>
									<div className="flex items-center justify-between text-sm text-gray-600">
										<span>{assignment.subject}</span>
										<span>Date: {assignment.dueDate}</span>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>

				<div className="mt-6 bg-white rounded-xl shadow-sm p-6">
					<h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
						<FileText className="w-6 h-6 mr-2 text-purple-500" />
						Last Homeworks
					</h2>

					<div className="space-y-4">
						{recentAssignments.map((assignment) => (
							<div
								key={assignment.id}
								className={`border-l-4 ${getPriorityColor(
									assignment.priority
								)} bg-gray-50 p-4 rounded-r-lg`}
							>
								<div className="flex items-center justify-between mb-2">
									<h3 className="font-semibold text-gray-900">
										{assignment.title}
									</h3>
									<span
										className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
											assignment.status
										)}`}
									>
										{assignment.status === "complated" ? "Done" : "Pending"}
									</span>
								</div>
								<div className="flex items-center justify-between text-sm text-gray-600">
									<span>{assignment.subject}</span>
									<span>Deadline: {assignment.dueDate}</span>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default StudentDashboard;
