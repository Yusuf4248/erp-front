import { useStudentGroups } from "@hooks";
import {
	AlertCircle,
	ArrowLeft,
	BookOpen,
	Calendar,
	CheckCircle,
	Clock,
	Download,
	FileText,
	MapPin,
	Target,
	TrendingUp,
	Upload,
	Users,
	Video,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getItem } from "../../../helpers";
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
const SingleGroupPage = () => {
	const navigate=useNavigate()
	const groupId = useParams();
	const userId = getItem("user_id");
	const { studentGroups } = useStudentGroups(+userId!);
	const groups = studentGroups?.data || [];
	const groupIds = useMemo(() => {
		if (!Array.isArray(groups)) return [];
		return groups
			.filter((group) => group?.group?.id)
			.map((group) => group?.group?.id);
	}, [groups]);
	const { groupLessons, loading: groupLessonsLoading } =
		useMultipleGroupLessons(groupIds);
	const [selectedFile, setSelectedFile] = useState<any>(null);
	const [uploadStatus, setUploadStatus] = useState("");
	const [comment, setComment] = useState("");
	const stGroup = groups.find((gr:any) => gr?.group.id == +groupId.id!);
	const lesson:any=groupLessons.filter((ind)=>ind.groupId==stGroup.group.id)[0]
	const groupData = {
		id: stGroup?.group.id,
		name: stGroup?.group.name,
		description:"Learn Web Programming",
		myProgress: (
							(lesson?.data?.lessons.filter(
								(les: any) => les.status == "completed"
							).length /
								lesson?.data?.lessons.length) *
							100
						).toFixed(0),
		startDate: stGroup?.group.start_date,
		endDate: stGroup?.group.end_date,
		schedule: `Mon, Tue, Wed, Thu, Fri - ${stGroup?.group.start_time.slice(
			0,
			5
		)}-${stGroup?.group.end_time.slice(0, 5)}`,
		location: "Najot Ta'lim",
	};
	const lastLesson = {
		id: 15,
		title: "React Hooks and State Management",
		date: "2024-08-01",
		time: stGroup.group.start_time.slice(0,5)+":"+stGroup.group.end_time.slice(0,5),
		duration: "4 hours",
		topics: [
			"useState anf useEffect hooks",
			"Create Custom hooks",
			"Context API with state management",
			"Performance optimization",
		],
		materials: [
			{ name: "react-project.pdf", size: "2.5 MB", type: "pdf" },
			{ name: "project.zip", size: "1.2 MB", type: "zip" },
			{ name: "recourse.txt", size: "0.5 KB", type: "txt" },
		],
		attendance: 23,
		recordingUrl: "https://example.com/recording",
	};

	const homework = {
		id: 8,
		title: "React Todo App with Hooks",
		description:
			"Create Todo app using useState, useEffect and custom hooks dan foydalanib. Requirements:",
		requirements: [
			"Todo create, read, update, delete",
			"Save datas to local storage",
			"Filters (all, complated, not complated)",
			"Create custom hook (useLocalStorage)",
			"Responsive designe",
		],
		dueDate: "2024-08-10",
		maxScore: 100,
		submissionFormat: ".zip fayl (project codes + README.md)",
		status: "pending",
		mySubmission: null,
	};

	const handleFileUpload = (event: any) => {
		const file = event.target.files[0];
		if (file) {
			setSelectedFile(file);
			setUploadStatus("");
		}
	};

	const submitHomework = () => {
		if (!selectedFile) {
			setUploadStatus("Please, choose file!");
			return;
		}

		setUploadStatus("Sending......");
		setTimeout(() => {
			setUploadStatus("Successfully sent!");
			setSelectedFile(null);
			setComment("");
		}, 2000);
	};

	const downloadMaterial = (material: any) => {
		alert(`Downloading: ${material.name}`);
	};

	const getDaysLeft = (dueDate: any) => {
		const today = new Date();
		const due = new Date(dueDate);
		const diffTime = due.getTime() - today.getTime();
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
		return diffDays;
	};

	const daysLeft = getDaysLeft(homework.dueDate);

	return (
		<div className="min-h-screen bg-gray-50 p-6">
			<div className="max-w-6xl mx-auto">
				<div className="mb-6">
					<button className="flex items-center text-blue-600 hover:text-blue-700 mb-4" onClick={()=>navigate("/student/my-groups")}>
						<ArrowLeft className="w-5 h-5 mr-2" />
						Back
					</button>
					<div className="bg-white rounded-xl shadow-sm p-6">
						<div className="flex items-start justify-between" hidden={groupLessonsLoading}>
							<div className="flex-1">
								<h1 className="text-3xl font-bold text-gray-900 mb-2">
									{groupData.name}
								</h1>
								<p className="text-gray-600 mb-4">{groupData.description}</p>

								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
									<div className="flex items-center text-gray-600">
										<Users className="w-5 h-5 mr-2" />
										<span>Student</span>
									</div>
									<div className="flex items-center text-gray-600">
										<Calendar className="w-5 h-5 mr-2" />
										<span>{groupData.schedule}</span>
									</div>
									<div className="flex items-center text-gray-600">
										<MapPin className="w-5 h-5 mr-2" />
										<span>{groupData.location}</span>
									</div>
									<div className="flex items-center text-gray-600">
										<TrendingUp className="w-5 h-5 mr-2" />
										<span>{groupData.myProgress}% progress</span>
									</div>
								</div>
							</div>
						</div>
						<div className="mt-6">
							<div className="flex items-center justify-between mb-2">
								<span className="text-sm text-gray-600">Group Progress</span>
								<span className="text-sm font-medium text-gray-900">
									{groupData.myProgress}%
								</span>
							</div>
							<div className="w-full bg-gray-200 rounded-full h-3">
								<div
									className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-300"
									style={{ width: `${groupData.myProgress}%` }}
								></div>
							</div>
						</div>
					</div>
				</div>
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
					<div className="lg:col-span-2 space-y-6">
						<div className="bg-white rounded-xl shadow-sm p-6">
							<h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
								<BookOpen className="w-6 h-6 mr-2 text-blue-500" />
								Last Lesson
							</h2>

							<div className="border-l-4 border-blue-500 pl-4 mb-6">
								<h3 className="text-lg font-semibold text-gray-900">
									{lastLesson.title}
								</h3>
								<div className="flex items-center space-x-4 text-sm text-gray-600 mt-2">
									<span className="flex items-center">
										<Calendar className="w-4 h-4 mr-1" />
										{lastLesson.date}
									</span>
									<span className="flex items-center">
										<Clock className="w-4 h-4 mr-1" />
										{lastLesson.time}
									</span>
								</div>
							</div>
							<div className="mb-6">
								<h4 className="font-semibold text-gray-900 mb-3">
									Lesson topics:
								</h4>
								<ul className="space-y-2">
									{lastLesson.topics.map((topic, index) => (
										<li key={index} className="flex items-center text-gray-700">
											<CheckCircle className="w-4 h-4 mr-2 text-green-500" />
											{topic}
										</li>
									))}
								</ul>
							</div>
							<div>
								<h4 className="font-semibold text-gray-900 mb-3">
									Lesson materials:
								</h4>
								<div className="space-y-3">
									{lastLesson.materials.map((material, index) => (
										<div
											key={index}
											className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
										>
											<div className="flex items-center">
												<FileText className="w-5 h-5 mr-3 text-gray-500" />
												<div>
													<p className="font-medium text-gray-900">
														{material.name}
													</p>
													<p className="text-sm text-gray-500">
														{material.size}
													</p>
												</div>
											</div>
											<button
												onClick={() => downloadMaterial(material)}
												className="flex items-center text-blue-600 hover:text-blue-700"
											>
												<Download className="w-4 h-4 mr-1" />
												Download
											</button>
										</div>
									))}
								</div>
							</div>
							<div className="mt-6 p-4 bg-purple-50 rounded-lg">
								<div className="flex items-center justify-between">
									<div className="flex items-center">
										<Video className="w-5 h-5 mr-2 text-purple-600" />
										<span className="font-medium text-purple-900">
											Lesson video
										</span>
									</div>
									<button className="text-purple-600 hover:text-purple-700 font-medium">
										Watch
									</button>
								</div>
							</div>
						</div>
					</div>
					<div className="space-y-6">
						<div className="bg-white rounded-xl shadow-sm p-6">
							<div className="flex items-center justify-between mb-4">
								<h2 className="text-xl font-bold text-gray-900 flex items-center">
									<Target className="w-6 h-6 mr-2 text-orange-500" />
									Homework
								</h2>
								<span
									className={`px-3 py-1 rounded-full text-sm font-medium ${
										daysLeft > 3
											? "bg-green-100 text-green-800"
											: daysLeft > 0
											? "bg-yellow-100 text-yellow-800"
											: "bg-red-100 text-red-800"
									}`}
								>
									{daysLeft > 0 ? `${daysLeft} days left` : "Expired"}
								</span>
							</div>

							<h3 className="font-semibold text-gray-900 mb-2">
								{homework.title}
							</h3>
							<p className="text-gray-600 mb-4">{homework.description}</p>

							<div className="mb-4">
								<h4 className="font-medium text-gray-900 mb-2">Students:</h4>
								<ul className="space-y-1">
									{homework.requirements.map((req, index) => (
										<li
											key={index}
											className="flex items-start text-sm text-gray-600"
										>
											<div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
											{req}
										</li>
									))}
								</ul>
							</div>

							<div className="grid grid-cols-2 gap-4 mb-4 text-sm">
								<div>
									<span className="text-gray-500">Deadline:</span>
									<p className="font-medium text-gray-900">
										{homework.dueDate}
									</p>
								</div>
								<div>
									<span className="text-gray-500">Max. ball:</span>
									<p className="font-medium text-gray-900">
										{homework.maxScore}
									</p>
								</div>
							</div>

							<div className="mb-6">
								<span className="text-gray-500 text-sm">File format:</span>
								<p className="font-medium text-gray-900">
									{homework.submissionFormat}
								</p>
							</div>
						</div>
						<div className="bg-white rounded-xl shadow-sm p-6">
							<h3 className="font-semibold text-gray-900 mb-4 flex items-center">
								<Upload className="w-5 h-5 mr-2 text-green-500" />
								Send Homework
							</h3>

							<div className="space-y-4">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Choose file *
									</label>
									<input
										type="file"
										onChange={handleFileUpload}
										className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
										accept=".zip,.rar,.pdf"
									/>
								</div>

								{selectedFile && (
									<div className="p-3 bg-blue-50 rounded-lg">
										<p className="text-sm text-blue-800 flex items-center">
											<FileText className="w-4 h-4 mr-2" />
											{selectedFile.name} (
											{(selectedFile?.size / 1024 / 1024).toFixed(2)} MB)
										</p>
									</div>
								)}

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Comment (optional)
									</label>
									<textarea
										value={comment}
										onChange={(e) => setComment(e.target.value)}
										placeholder="Additional information about homework..."
										className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
										rows={3}
									/>
								</div>

								<button
									onClick={submitHomework}
									disabled={!selectedFile}
									className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors"
								>
									Send Homework
								</button>

								{uploadStatus && (
									<div
										className={`p-3 rounded-lg ${
											uploadStatus.includes("Successfully")
												? "bg-green-50 text-green-800"
												: uploadStatus.includes("Sending...")
												? "bg-blue-50 text-blue-800"
												: "bg-red-50 text-red-800"
										}`}
									>
										<p className="text-sm flex items-center">
											{uploadStatus.includes("Successfully") && (
												<CheckCircle className="w-4 h-4 mr-2" />
											)}
											{uploadStatus.includes("Sending...") && (
												<Clock className="w-4 h-4 mr-2" />
											)}
											{!uploadStatus.includes("Successfully") &&
												!uploadStatus.includes("Sending...") && (
													<AlertCircle className="w-4 h-4 mr-2" />
												)}
											{uploadStatus}
										</p>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SingleGroupPage;
