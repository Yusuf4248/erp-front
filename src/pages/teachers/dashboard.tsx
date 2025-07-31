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
import { useGroups, useTeachers } from "@hooks";
import { Avatar, Badge, Card, Col, Progress, Row, Table, Timeline } from "antd";
const TeacherDashboard = () => {
	const user_id = getItem("user_id");
	const { data } = useGroups({});
	const allGroups = data?.data?.data || [];
	const { teacherDataById } = useTeachers({}, +user_id!);
	const teacherData = teacherDataById?.data?.teacher;
	// console.log("teacherData", teacherData);
	// console.log("group", allGroups);
	// console.log("data", data);
	const stats = [
		{
			title: "All Students",
			value: 156,
			icon: <UserOutlined className="text-blue-500 text-2xl" />,
			color: "bg-blue-50 border-blue-200",
			change: "+12%",
			changeType: "increase",
		},
		{
			title: "Active Groups",
			value: 15,
			icon: <TeamOutlined className="text-green-500 text-2xl" />,
			color: "bg-green-50 border-green-200",
			change: "+2",
			changeType: "increase",
		},
		{
			title: "Complated Courses",
			value: 15,
			icon: <BookOutlined className="text-purple-500 text-2xl" />,
			color: "bg-purple-50 border-purple-200",
			change: "+3",
			changeType: "increase",
		},
		{
			title: "All Lessons",
			value: 15,
			icon: <TrophyOutlined className="text-orange-500 text-2xl" />,
			color: "bg-orange-50 border-orange-200",
			change: "+15",
			changeType: "increase",
		},
	];

	const groups = [
		{
			key: "1",
			name: "Frontend Bootcamp #12",
			students: 18,
			progress: 75,
			status: "active",
			schedule: "Dush, Chor, Juma 18:00",
			nextLesson: "2025-01-26",
			level: "Intermediate",
		},
		...allGroups.map((group: any) => {
			return {
				key: group?.id,
				name: group?.name,
				course: group?.course?.title,
				students: group?.students?.length || 0,
				progress:
					group?.lessons?.length /
					group?.lessons?.map((lesson: any) => lesson.status == "completed")
						.length,
				status: group?.status,
				level: group?.status,
				nextLesson: group?.next_lesson,
				schedule: group.schedule,
			};
		}),
	];
	const recentActivities = [
		{
			time: "10:30",
			title: "Frontend Bootcamp #12 group lesson complated",
			description: "React Hooks",
			type: "lesson",
		},
		{
			time: "09:15",
			title: "New Student added",
			description: "Alisher Karimov React Advanced #8",
			type: "student",
		},
		{
			time: "08:45",
			title: "Homework marked",
			description: "15 homework chacked and marked",
			type: "homework",
		},
		{
			time: "Yesterday",
			title: "Group Complated",
			description: "JavaScript Basics #23 complated",
			type: "completion",
		},
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
				<div className="font-medium text-gray-900">{course?.name}</div>
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
					finishing: { color: "warning", text: "Uploading" },
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
							className="ant-table-responsive"
						/>
					</Card>
				</Col>

				{/* Recent Activities */}
				<Col xs={24} xl={8}>
					<Card
						title="Last Activity"
						className="shadow-sm border border-gray-200 h-fit"
					>
						<Timeline
							items={recentActivities.map((activity, index) => ({
								color:
									activity.type === "lesson"
										? "blue"
										: activity.type === "student"
										? "green"
										: activity.type === "homework"
										? "orange"
										: "purple",
								children: (
									<div key={index}>
										<div className="flex items-center justify-between mb-1">
											<span className="font-medium text-sm text-gray-900">
												{activity.title}
											</span>
											<span className="text-xs text-gray-500">
												{activity.time}
											</span>
										</div>
										<p className="text-xs text-gray-600 m-0">
											{activity.description}
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
