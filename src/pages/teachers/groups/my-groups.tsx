import {
	CalendarOutlined,
	ClockCircleOutlined,
	TeamOutlined,
	UserOutlined,
} from "@ant-design/icons";
import {
	Avatar,
	Badge,
	Button,
	Card,
	Col,
	Empty,
	Input,
	Progress,
	Row,
	Select,
	Statistic,
	Tag,
} from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const { Option } = Select;
const { Search } = Input;
const TeacherGroups = () => {
	const navigate = useNavigate();
	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState("all");
	const [levelFilter, setLevelFilter] = useState("all");

	// Mock groups data
	const groupsData = [
		{
			id: 1,
			name: "Frontend Bootcamp #12",
			course: "Frontend Development",
			level: "Intermediate",
			students: 18,
			maxStudents: 20,
			progress: 75,
			status: "active",
			schedule: {
				days: ["Mon", "Wed", "Fri"],
				startTime: "18:00",
				endTime: "20:00",
			},
			startDate: "2024-10-15",
			endDate: "2025-02-15",
			nextLesson: "2025-01-29",
			description: "HTML, CSS, JavaScript, React asoslariga o'rgatiladi",
			room: "A-201",
			avatar: null,
		},
		{
			id: 2,
			name: "React Advanced #8",
			course: "React Development",
			level: "Advanced",
			students: 12,
			maxStudents: 15,
			progress: 45,
			status: "active",
			schedule: {
				days: ["Mon", "Wed", "Fri"],
				startTime: "20:00",
				endTime: "22:00",
			},
			startDate: "2024-12-01",
			endDate: "2025-04-01",
			nextLesson: "2025-01-28",
			description: "Redux, Context API, Custom Hooks, Performance Optimization",
			room: "B-105",
			avatar: null,
		},
		{
			id: 3,
			name: "JavaScript Basics #24",
			course: "JavaScript Fundamentals",
			level: "Beginner",
			students: 25,
			maxStudents: 25,
			progress: 90,
			status: "finishing",
			schedule: {
				days: ["Mon", "Wed", "Fri"],
				startTime: "16:00",
				endTime: "18:00",
			},
			startDate: "2024-09-01",
			endDate: "2025-01-31",
			nextLesson: "2025-01-25",
			description: "JavaScript dasturlash tilining asoslari",
			room: "C-301",
			avatar: null,
		},
		{
			id: 4,
			name: "Vue.js Masterclass #5",
			course: "Vue.js Development",
			level: "Intermediate",
			students: 15,
			maxStudents: 18,
			progress: 30,
			status: "active",
			schedule: {
				days: ["Mon", "Wed", "Fri"],
				startTime: "19:00",
				endTime: "21:30",
			},
			startDate: "2025-01-10",
			endDate: "2025-05-10",
			nextLesson: "2025-01-31",
			description: "Vue.js 3 Composition API, Pinia, Nuxt.js",
			room: "D-202",
			avatar: null,
		},
		{
			id: 5,
			name: "TypeScript Pro #3",
			course: "TypeScript",
			level: "Advanced",
			students: 8,
			maxStudents: 12,
			progress: 15,
			status: "starting",
			schedule: {
				days: ["Mon", "Wed", "Fri"],
				startTime: "18:30",
				endTime: "21:00",
			},
			startDate: "2025-02-05",
			endDate: "2025-06-05",
			nextLesson: "2025-02-05",
			description: "Advanced TypeScript, Decorators, Generic Types",
			room: "A-103",
			avatar: null,
		},
		{
			id: 6,
			name: "Node.js Backend #7",
			course: "Backend Development",
			level: "Intermediate",
			students: 14,
			maxStudents: 16,
			progress: 60,
			status: "active",
			schedule: {
				days: ["Mon", "Wed", "Fri"],
				startTime: "19:30",
				endTime: "22:00",
			},
			startDate: "2024-11-15",
			endDate: "2025-03-15",
			nextLesson: "2025-01-30",
			description: "Express.js, MongoDB, REST API, Authentication",
			room: "B-204",
			avatar: null,
		},
	];

	// Filter groups based on search and filters
	const filteredGroups = groupsData.filter((group) => {
		const matchesSearch =
			group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			group.course.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesStatus =
			statusFilter === "all" || group.status === statusFilter;
		const matchesLevel = levelFilter === "all" || group.level === levelFilter;

		return matchesSearch && matchesStatus && matchesLevel;
	});

	// Statistics
	const stats = {
		total: groupsData.length,
		active: groupsData.filter((g) => g.status === "active").length,
		finishing: groupsData.filter((g) => g.status === "finishing").length,
		starting: groupsData.filter((g) => g.status === "starting").length,
		totalStudents: groupsData.reduce((sum, g) => sum + g.students, 0),
	};

	const getStatusConfig = (status: any) => {
		const configs = {
			active: {
				color: "success",
				text: "Active",
				bgColor: "bg-green-50",
				textColor: "text-green-600",
			},
			finishing: {
				color: "warning",
				text: "Finishing",
				bgColor: "bg-yellow-50",
				textColor: "text-yellow-600",
			},
			starting: {
				color: "processing",
				text: "Starting",
				bgColor: "bg-blue-50",
				textColor: "text-blue-600",
			},
			completed: {
				color: "default",
				text: "Completed",
				bgColor: "bg-gray-50",
				textColor: "text-gray-600",
			},
		};
		return configs[status as keyof typeof configs] || configs.active;
	};

	const getLevelColor = (level: any) => {
		const colors = {
			Beginner: "green",
			Intermediate: "blue",
			Advanced: "purple",
		};
		return colors[level as keyof typeof colors] || "blue";
	};

	const formatSchedule = (schedule: any) => {
		const days = schedule.days.join(", ");
		return `${days} • ${schedule.startTime}-${schedule.endTime}`;
	};

	const handleGroupClick = (groupId: any) => {
		console.log("----------------------------");
		navigate(`${groupId}`);

	};

	return (
		<div className="space-y-6">
			{/* Header Section */}
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
				<div>
					<h1 className="text-2xl font-bold text-gray-900 mb-2">My Groups</h1>
					<p className="text-gray-600">All active and finished groups</p>
				</div>
			</div>

			{/* Statistics Cards */}
			<Row gutter={[16, 16]}>
				<Col xs={24} sm={12} lg={6}>
					<Card className="text-center hover:shadow-lg transition-all duration-300 border border-gray-200">
						<Statistic
							title="Total Groups"
							value={stats.total}
							prefix={<TeamOutlined className="text-blue-500" />}
							className="mb-0"
						/>
					</Card>
				</Col>
				<Col xs={24} sm={12} lg={6}>
					<Card className="text-center hover:shadow-lg transition-all duration-300 border border-gray-200">
						<Statistic
							title="Active Groups"
							value={stats.active}
							prefix={<Badge status="success" />}
							className="mb-0"
						/>
					</Card>
				</Col>
				<Col xs={24} sm={12} lg={6}>
					<Card className="text-center hover:shadow-lg transition-all duration-300 border border-gray-200">
						<Statistic
							title="Total Students"
							value={stats.totalStudents}
							prefix={<UserOutlined className="text-green-500" />}
							className="mb-0"
						/>
					</Card>
				</Col>
				<Col xs={24} sm={12} lg={6}>
					<Card className="text-center hover:shadow-lg transition-all duration-300 border border-gray-200">
						<Statistic
							title="Finishing Groups"
							value={stats.finishing}
							prefix={<Badge status="warning" />}
							className="mb-0"
						/>
					</Card>
				</Col>
			</Row>

			{/* Filters */}
			<Card className="shadow-sm border border-gray-200">
				<div className="flex flex-col md:flex-row gap-4 items-center">
					<div className="flex-1 w-full md:w-auto">
						<Search
							placeholder="Search by group name or course..."
							allowClear
							size="large"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="w-full"
						/>
					</div>
					<div className="flex gap-2 w-full md:w-auto">
						<Select
							value={statusFilter}
							onChange={setStatusFilter}
							className="w-full md:w-40"
							size="large"
						>
							<Option value="all">All Status</Option>
							<Option value="active">Active</Option>
							<Option value="finishing">Finishing</Option>
							<Option value="starting">Starting</Option>
						</Select>
						<Select
							value={levelFilter}
							onChange={setLevelFilter}
							className="w-full md:w-40"
							size="large"
						>
							<Option value="all">All Levels</Option>
							<Option value="Beginner">Beginner</Option>
							<Option value="Intermediate">Intermediate</Option>
							<Option value="Advanced">Advanced</Option>
						</Select>
					</div>
				</div>
			</Card>

			{/* Groups Grid */}
			{filteredGroups.length > 0 ? (
				<Row gutter={[16, 16]}>
					{filteredGroups.map((group: any) => {
						const statusConfig = getStatusConfig(group.status);

						return (
							<Col xs={24} lg={12} xl={8} key={group.id}>
								<Card
									className="hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200 group"
									onClick={() => handleGroupClick(group.id)}
								>
									{/* Card Header */}
									<div className="flex items-start justify-between mb-4">
										<div className="flex items-center space-x-3">
											<Avatar
												size={48}
												icon={<TeamOutlined />}
												className="bg-gradient-to-r from-blue-500 to-purple-500"
											/>
											<div>
												<h3 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
													{group.name}
												</h3>
												<p className="text-sm text-gray-600">{group.course}</p>
											</div>
										</div>
										<div
											className={`px-2 py-1 rounded-full ${statusConfig.bgColor}`}
										>
											<span
												className={`text-xs font-medium ${statusConfig.textColor}`}
											>
												{statusConfig.text}
											</span>
										</div>
									</div>

									{/* Course Info */}
									<div className="space-y-3 mb-4">
										<div className="flex items-center justify-between">
											<span className="text-sm text-gray-600">Level:</span>
											<Tag
												color={getLevelColor(group.level)}
												className="border-0"
											>
												{group.level}
											</Tag>
										</div>

										<div className="flex items-center justify-between">
											<span className="text-sm text-gray-600">Students:</span>
											<div className="flex items-center space-x-1">
												<UserOutlined className="text-gray-400 text-xs" />
												<span className="text-sm font-medium">
													{group.students}/{group.maxStudents}
												</span>
											</div>
										</div>

										<div className="flex items-center justify-between">
											<span className="text-sm text-gray-600">Progress:</span>
											<div className="flex items-center space-x-2">
												<Progress
													percent={group.progress}
													size="small"
													className="w-16"
													strokeColor={
														group.progress > 80
															? "#52c41a"
															: group.progress > 50
															? "#1890ff"
															: "#faad14"
													}
												/>
												{/* <span className="text-xs text-gray-600">
													{group.progress}%
												</span> */}
											</div>
										</div>
									</div>

									{/* Schedule */}
									<div className="bg-gray-50 rounded-lg p-3 mb-4">
										<div className="flex items-center space-x-2 mb-2">
											<CalendarOutlined className="text-blue-500" />
											<span className="text-sm font-medium text-gray-900">
												Schedule
											</span>
										</div>
										<p className="text-sm text-gray-600 mb-1">
											{formatSchedule(group.schedule)}
										</p>
										<div className="flex items-center space-x-2 text-xs text-gray-500">
											<ClockCircleOutlined />
											<span>Next lesson: {group.nextLesson}</span>
										</div>
									</div>

									{/* Description */}
									<p className="text-sm text-gray-600 line-clamp-2">
										{group.description}
									</p>

									{/* Room Info */}
									<div className="mt-3 pt-3 border-t border-gray-200">
										<div className="flex items-center justify-between text-xs text-gray-500">
											<span>Room: {group.room}</span>
											<span>
												{new Date(group.startDate).toLocaleDateString()} -{" "}
												{new Date(group.endDate).toLocaleDateString()}
											</span>
										</div>
									</div>
								</Card>
							</Col>
						);
					})}
				</Row>
			) : (
				<Card className="text-center py-12">
					<Empty
						description={
							<div>
								<p className="text-gray-500 mb-2">No groups found</p>
								<p className="text-sm text-gray-400">
									{searchTerm || statusFilter !== "all" || levelFilter !== "all"
										? "Change search criteria or"
										: ""}
								</p>
							</div>
						}
					></Empty>
				</Card>
			)}

			{filteredGroups.length > 0 && filteredGroups.length >= 6 && (
				<div className="text-center">
					<Button size="large" className="px-8">
						Load more
					</Button>
				</div>
			)}
		</div>
	);
};

export default TeacherGroups;
