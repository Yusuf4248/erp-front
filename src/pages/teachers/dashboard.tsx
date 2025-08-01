import {
	BookOutlined,
	EnvironmentOutlined,
	MailOutlined,
	PhoneOutlined,
	TeamOutlined,
	TrophyOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { getItem } from "@helpers";
import { useTeachers } from "@hooks";
import { Avatar, Badge, Card, Col, Progress, Row, Table, Timeline } from "antd";
import { useEffect, useMemo, useState } from "react"
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
const TeacherDashboard = () => {
	const user_id = getItem("user_id");
	const { teacherDataById } = useTeachers({}, +user_id!);
	const teacherData = teacherDataById?.data?.teacher;
	const { teacherGroup } = useTeachers({});
	const teacherGroups = teacherGroup?.data || [];
	const groupIds = useMemo(() => {
		if (!Array.isArray(teacherGroups)) return [];
		return teacherGroups
			.filter((group) => group?.group?.id)
			.map((group) => group?.group?.id);
	}, [teacherGroups]);
	const { groupDetails, loading: groupDetailsLoading } =
		useMultipleGroupDetails(groupIds);
	const stats = [
		{
			title: "All Students",
			value: groupDetails.reduce((acc: number, group: any) => acc + group.data.groupStudents.length, 0),
			icon: <UserOutlined className="text-blue-500 text-2xl" />,
			color: "bg-blue-50 border-blue-200",
			change: "+12%",
			changeType: "increase",
		},
		{
			title: "Active Groups",
			value: groupDetails.reduce((acc: number, group: any) => acc + (group.data.group?.status === "active" ? 1 : 0), 0),
			icon: <TeamOutlined className="text-green-500 text-2xl" />,
			color: "bg-green-50 border-green-200",
			change: "+2",
			changeType: "increase",
		},
		{
			title: "Complated Groups",
			value: groupDetails.reduce((acc: number, group: any) => acc + (group.data.group?.status === "completed" ? 1 : 0), 0),
			icon: <BookOutlined className="text-purple-500 text-2xl" />,
			color: "bg-purple-50 border-purple-200",
			change: "0",
			changeType: "increase",
		},
		{
			title: "All Lessons",
			value: groupDetails.reduce((acc: number, group: any) => acc + group.data.lessons.length, 0),
			icon: <TrophyOutlined className="text-orange-500 text-2xl" />,
			color: "bg-orange-50 border-orange-200",
			change: "0",
			changeType: "increase",
		},
	];

	const groups = [
		...(Array.isArray(groupDetails)
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
	const columns = [
		{
			title: "Group Name",
			dataIndex: "name",
			key: "name",
			render: (text: any) => (
				<div className="font-medium text-gray-900">{text}</div>
			),
		},
		{
			title: "Course",
			dataIndex: "course",
			key: "course",
			render: (course: any) => (
				<div className="font-medium text-gray-900">{course}</div>
			),
		},
		{
			title: "Students",
			dataIndex: "students",
			key: "students",
			render: (count: any) => (
				<div className="flex items-center">
					<UserOutlined className="text-gray-400 mr-1" />
					<span>{count}</span>
				</div>
			),
		},
		{
			title: "Progress",
			dataIndex: "progress",
			key: "progress",
			render: (progress: any) => (
				<div className="w-20">
					<Progress
						percent={progress}
						size="small"
						strokeColor={
							progress > 80 ? "#52c41a" : progress > 50 ? "#1890ff" : "#faad14"
						}
					/>
				</div>
			),
		},
		{
			title: "Status",
			dataIndex: "status",
			key: "status",
			render: (status: any) => {
				const config = {
					active: { color: "success", text: "Active" },
					new: { color: "warning", text: "New" },
					completed: { color: "default", text: "Complated" },
				};
				return (
					<Badge
						status={config[status as keyof typeof config]?.color as any}
						text={config[status as keyof typeof config]?.text}
					/>
				);
			},
		},
		{
			title: "Next Lesson",
			dataIndex: "nextLesson",
			key: "nextLesson",
			render: (date: any) => (
				<div className="text-sm text-gray-600">{date}</div>
			),
		},
	];
	// =======================================================================================
	return (
		<div className="space-y-6">
			<div className="bg-gradient-to-r from-gray-600  to-gray-400 rounded-xl p-6 text-white">
				<div className="flex flex-col md:flex-row items-start md:items-center justify-between">
					<div className="flex items-center space-x-4 mb-4 md:mb-0">
						<Avatar
							size={80}
							icon={<UserOutlined />}
							className="bg-white bg-opacity-20 border-2 border-white border-opacity-30"
						/>
						<div className="ml-4">
							<h1 className="text-2xl font-bold mb-1">
								{teacherData?.first_name} {teacherData?.last_name}
							</h1>
							<p className="text-blue-100 mb-2">
								{" "}
								{teacherData?.role.toUpperCase()}
							</p>
							<div className="flex items-center space-x-4 text-sm text-blue-100">
								<span className="flex items-center">
									<TrophyOutlined className="mr-1" />
									{new Date().getFullYear() -
										new Date(teacherData?.created_at).getFullYear()}{" "}
									years experience
								</span>
								<span className="flex items-center">
									<span className="text-yellow-300 mr-1">★</span>
									4.8 rating
								</span>
							</div>
						</div>
					</div>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-white border-opacity-20">
					<div className="flex items-center text-blue-100">
						<MailOutlined className="mr-2" />
						<span className="text-sm">{teacherData?.email}</span>
					</div>
					<div className="flex items-center text-blue-100">
						<PhoneOutlined className="mr-2" />
						<span className="text-sm">{teacherData?.phone}</span>
					</div>
					<div className="flex items-center text-blue-100">
						<EnvironmentOutlined className="mr-2" />
						<span className="text-sm">
							{teacherData?.branches
								.map((branch: any) => branch?.name)
								.join(" | ")}
						</span>
					</div>
				</div>
			</div>
			<Row gutter={[16, 16]}>
				{stats.map((stat, index) => (
					<Col xs={24} sm={12} lg={6} key={index}>
						<Card
							className={`${stat?.color} border hover:shadow-lg transition-all duration-300 cursor-pointer group`}
						>
							<div className="flex items-center justify-between">
								<div>
									<div className="text-gray-600 text-sm mb-1">{stat.title}</div>
									<div className="text-2xl font-bold text-gray-900 mb-1">
										{stat.value}
									</div>
									<div
										className={`text-xs flex items-center ${
											stat.changeType === "increase"
												? "text-green-600"
												: "text-red-600"
										}`}
									>
										<span className="mr-1">
											{stat.changeType === "increase" ? "↗" : "↘"}
										</span>
										{stat.change}
									</div>
								</div>
								<div className="group-hover:scale-110 transition-transform duration-300">
									{stat.icon}
								</div>
							</div>
						</Card>
					</Col>
				))}
			</Row>

			{/* Main Content */}
			<Row gutter={[16, 16]}>
				{/* Groups Table */}
				<Col xs={24} xl={16}>
					<Card
						title={
							<div className="flex items-center justify-between">
								<span className="font-semibold text-gray-900">My Groups</span>
							</div>
						}
						className="shadow-sm border border-gray-200"
					>
						<Table
							columns={columns}
							dataSource={groups}
							pagination={false}
							size="small"
							scroll={{ x: 800 }}
							loading={groupDetailsLoading}
							className="ant-table-responsive"
						/>
					</Card>
				</Col>
				<Col xs={24} xl={8}>
					<Card
						title="Today's Lessons"
						className="shadow-sm border border-gray-200 h-fit"
					>
						<Timeline
							items={groupDetails.map((group: any) => ({
								color:
									group.data.lessons.find((lesson: any) => lesson.status === "new")?.date.split("T")[0] === new Date().toISOString().split("T")[0]
										? "blue"
										: "green",
								children: (
									<div >
										<div className="flex items-center justify-between mb-1">
											<span className="font-medium text-sm text-gray-900">
												{group.data.group?.name}
											</span>
											<span className="text-xs text-gray-500">
												{group.data.lessons.find((lesson: any) => lesson.status === "new")?.date.split("T")[0]}
											</span>
										</div>
										<p className="text-xs text-gray-600 m-0">
											{group.data.group?.start_time?.slice(0, 5)} - {group.data.group?.end_time?.slice(0, 5)}
										</p>
									</div>
								),
							}))}
							className="mt-4"
						/>
					</Card>
				</Col>
			</Row>
		</div>
	);
};

export default TeacherDashboard;
