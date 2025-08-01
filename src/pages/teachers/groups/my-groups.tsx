import {
	CalendarOutlined,
	ClockCircleOutlined,
	TeamOutlined,
	UserOutlined,
} from "@ant-design/icons";
import {
	Badge,
	Card,
	Col,
	Empty,
	Input,
	Progress,
	Row,
	Select,
	Statistic,
	Table,
} from "antd";

import { useTeachers } from "@hooks";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const { Option } = Select;
const { Search } = Input;
const useMultipleGroupDetails = (groupIds: number[]) => {
	const [groupDetails, setGroupDetails] = useState<any[]>([]);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		if (!groupIds.length) return;
		const fetchGroupDetails = async () => {
			setLoading(true);
			const promises = groupIds.map(async (groupId) => {
				try {
					const { teacherService } = await import("@service");
					const response = await teacherService.getGroupDetailsForTeacher(
						groupId
					);
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
				setGroupDetails(results);
			} catch (error) {
				console.error("Error fetching group details:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchGroupDetails();
	}, [groupIds]);

	return { groupDetails, loading };
};

const TeacherGroups = () => {
	const navigate = useNavigate();
	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState("all");
	const [levelFilter] = useState("all");
	const { teacherGroup } = useTeachers({});
	const groups = teacherGroup?.data || [];
	const groupIds = useMemo(() => {
		if (!Array.isArray(groups)) return [];
		return groups
			.filter((group) => group.group?.id)
			.map((group) => group.group.id);
	}, [groups]);
	const { groupDetails, loading: groupDetailsLoading } =
		useMultipleGroupDetails(groupIds);
	const groupsData = [
		// {
		// 	id: 0,
		// 	name: "Frontend Bootcamp #12",
		// 	course: "Frontend Development",
		// 	students: 18,
		// 	maxStudents: 20,
		// 	progress: 75,
		// 	status: "active",
		// 	level: "Intermediate",
		// 	schedule: {
		// 		days: ["Mon", "Wed", "Fri"],
		// 		startTime: "18:00",
		// 		endTime: "20:00",
		// 	},
		// 	startDate: "2024-10-15",
		// 	endDate: "2025-02-15",
		// 	nextLesson: "2025-01-29",
		// 	room: "A-201",
		// },
		...(Array.isArray(groups)
			? groupDetails.map((group: any) => {
					return {
						id: group.data.group?.id || 1,
						name: group.data.group?.name,
						course: group.data.group?.course?.title,
						students: group.data?.groupStudents.map(
							(student: any) => student.status === true
						).length,
						maxStudents: group.data?.groupStudents.length,
						progress: (
							(group.data?.lessons.filter(
								(lesson: any) => lesson.status === "completed"
							).length /
								group.data?.lessons.length) *
							100
						).toFixed(0),
						status: group.data.group?.status,
						schedule: {
							days:
								group.data.group?.course?.lessons_in_a_week == 3
									? ["Mon", "Wed", "Fri"]
									: ["Mon", "Tue", "Wed", "Thu", "Fri"],
							startTime: group.data.group?.start_time?.slice(0, 5),
							endTime: group.data.group?.end_time?.slice(0, 5),
						},
						startDate: group.data.group?.start_date,
						endDate: group.data.group?.end_date,
						nextLesson: group.data.lessons.find((lesson:any)=>lesson.status==="new")?.date.split("T")[0],
						room: "TBD",
					};
			  })
			: []),
	];
	const filteredGroups = groupsData.filter((group) => {
		const matchesSearch =
			group.name?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
			group.course?.toLowerCase().includes(searchTerm?.toLowerCase());
		const matchesStatus =
			statusFilter === "all" || group.status === statusFilter;
		const matchesLevel = levelFilter === "all";

		return matchesSearch && matchesStatus && matchesLevel;
	});

	const stats = {
		total: groupsData.length,
		active: groupsData.filter((g) => g.status === "new").length,
		finishing: groupsData.filter((g) => g.status === "completed").length,
		starting: groupsData.filter((g) => g.status === "active").length,
		totalStudents: groupsData.reduce((sum, g) => sum + (g.students || 0), 0),
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
			new: {
				color: "processing",
				text: "New",
				bgColor: "bg-blue-50",
				textColor: "text-blue-600",
			},
		};
		return configs[status as keyof typeof configs] || configs.active;
	};
	const formatSchedule = (schedule: any) => {
		if (!schedule) return "No schedule";
		const days = schedule?.days?.join(", ") || "TBD";
		return `${days} • ${schedule.startTime || "TBD"}-${
			schedule.endTime || "TBD"
		}`;
	};
	const handleGroupClick = (groupId: any) => {
		console.log("Group clicked:", groupId);
		navigate(`${groupId}`);
	};
	const columns = [
		{
			title: "Group",
			dataIndex: "name",
			key: "name",
			render: (text: string, record: any) => (
				<div className="flex items-center space-x-3">
					<div className="font-semibold text-gray-900 hover:text-blue-600 cursor-pointer">
						{text}
					</div>
					<div className="text-sm text-gray-600">{record.course}</div>
					<div className="text-xs text-gray-500">Room: {record.room}</div>
				</div>
			),
		},
		{
			title: "Students",
			dataIndex: "students",
			key: "students",
			render: (students: number, record: any) => (
				<div className="flex items-center space-x-2">
					<UserOutlined className="text-gray-400 text-sm" />
					<span className="font-medium">
						{students || 0}/{record.maxStudents || 0}
					</span>
				</div>
			),
		},
		{
			title: "Progress",
			dataIndex: "progress",
			key: "progress",
			render: (progress: number) => (
				<div className="flex items-center space-x-2">
					<Progress
						percent={progress || 0}
						size="small"
						className="w-20"
						strokeColor={
							(progress || 0) > 80
								? "#52c41a"
								: (progress || 0) > 50
								? "#1890ff"
								: "#faad14"
						}
					/>
				</div>
			),
		},
		{
			title: "Schedule",
			dataIndex: "schedule",
			key: "schedule",
			render: (schedule: any, record: any) => (
				<div className="space-y-1">
					<div className="flex items-center space-x-1">
						<CalendarOutlined className="text-blue-500 text-sm" />
						<span className="text-sm">{formatSchedule(schedule)}</span>
					</div>
					<div className="flex items-center space-x-1">
						<ClockCircleOutlined className="text-gray-400 text-sm" />
						<span className="text-xs text-gray-500">
							Next: {record.nextLesson || "TBD"}
						</span>
					</div>
				</div>
			),
		},
		{
			title: "Status",
			dataIndex: "status",
			key: "status",
			render: (status: string) => {
				const statusConfig = getStatusConfig(status);
				return (
					<div
						className={`inline-block px-3 py-1 rounded-full ${statusConfig.bgColor}`}
					>
						<span className={`text-sm font-medium ${statusConfig.textColor}`}>
							{statusConfig.text}
						</span>
					</div>
				);
			},
		},
		{
			title: "Duration",
			dataIndex: "startDate",
			key: "duration",
			render: (startDate: string, record: any) => (
				<div className="text-sm text-gray-600">
					<div>
						{startDate ? new Date(startDate).toLocaleDateString() : "TBD"}
					</div>
					<div className="text-xs text-gray-500">
						to{" "}
						{record.endDate
							? new Date(record.endDate).toLocaleDateString()
							: "TBD"}
					</div>
				</div>
			),
		},
	];
	return (
		<div className="space-y-6">
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
				<div>
					<h1 className="text-2xl font-bold text-gray-900 mb-2">My Groups</h1>
					<p className="text-gray-600">All active and finished groups</p>
				</div>
			</div>
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
							<Option defaultChecked value="all">All Status</Option>
							<Option value="active">Active</Option>
							<Option value="finishing">Complated</Option>
							<Option value="new">New</Option>
						</Select>
					</div>
				</div>
			</Card>
			<Card className="shadow-sm border border-gray-200">
				{groupDetailsLoading ? (
					<div className="text-center py-12">
						<p className="text-gray-500">
							Loading detailed group information...
						</p>
					</div>
				) : filteredGroups.length > 0 ? (
					<Table
						columns={columns}
						dataSource={filteredGroups}
						rowKey="id"
						pagination={{
							pageSize: 10,
							showSizeChanger: true,
							showQuickJumper: true,
							showTotal: (total, range) =>
								`${range[0]}-${range[1]} of ${total} groups`,
						}}
						onRow={(record) => ({
							onClick: () => handleGroupClick(record.id),
							className: "cursor-pointer hover:bg-gray-50",
						})}
						scroll={{ x: 1200 }}
						className="custom-table"
					/>
				) : (
					<div className="text-center py-12">
						<Empty
							description={
								<div>
									<p className="text-gray-500 mb-2">No groups found</p>
									<p className="text-sm text-gray-400">
										{searchTerm ||
										statusFilter !== "all" ||
										levelFilter !== "all"
											? "Change search criteria"
											: "You don't have any groups yet"}
									</p>
								</div>
							}
						/>
					</div>
				)}
			</Card>
		</div>
	);
};
export default TeacherGroups;
