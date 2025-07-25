import {
	BookOutlined,
	CalendarOutlined,
	ClockCircleOutlined,
	EditOutlined,
	EnvironmentOutlined,
	EyeOutlined,
	MailOutlined,
	PhoneOutlined,
	PlusOutlined,
	TeamOutlined,
	TrophyOutlined,
	UserOutlined,
} from "@ant-design/icons";
import {
	Avatar,
	Badge,
	Button,
	Card,
	Col,
	Progress,
	Row,
	Space,
	Table,
	Tag,
	Timeline,
	Tooltip,
} from "antd";

const TeacherDashboard = () => {
	// Mock data - bu real API dan keladi
	console.log("teacher dashboard");
	const teacherInfo = {
		name: "Sardor Rahimov",
		position: "Senior Frontend Developer",
		experience: "3 yil",
		rating: 4.8,
		email: "sardor.rahimov@crm.uz",
		phone: "+998 90 123 45 67",
		address: "Toshkent, Uzbekistan",
		avatar: null,
		totalStudents: 156,
		activeGroups: 8,
		completedCourses: 12,
		totalLessons: 240,
	};

	const stats = [
		{
			title: "Jami O'quvchilar",
			value: teacherInfo.totalStudents,
			icon: <UserOutlined className="text-blue-500 text-2xl" />,
			color: "bg-blue-50 border-blue-200",
			change: "+12%",
			changeType: "increase",
		},
		{
			title: "Faol Guruhlar",
			value: teacherInfo.activeGroups,
			icon: <TeamOutlined className="text-green-500 text-2xl" />,
			color: "bg-green-50 border-green-200",
			change: "+2",
			changeType: "increase",
		},
		{
			title: "Tugallangan Kurslar",
			value: teacherInfo.completedCourses,
			icon: <BookOutlined className="text-purple-500 text-2xl" />,
			color: "bg-purple-50 border-purple-200",
			change: "+3",
			changeType: "increase",
		},
		{
			title: "Jami Darslar",
			value: teacherInfo.totalLessons,
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
		{
			key: "2",
			name: "React Advanced #8",
			students: 12,
			progress: 45,
			status: "active",
			schedule: "Sesh, Pay, Shan 20:00",
			nextLesson: "2025-01-25",
			level: "Advanced",
		},
		{
			key: "3",
			name: "JavaScript Basics #24",
			students: 25,
			progress: 90,
			status: "finishing",
			schedule: "Har kuni 16:00",
			nextLesson: "2025-01-24",
			level: "Beginner",
		},
		{
			key: "4",
			name: "Vue.js Masterclass #5",
			students: 15,
			progress: 30,
			status: "active",
			schedule: "Dush, Juma 19:00",
			nextLesson: "2025-01-27",
			level: "Intermediate",
		},
	];

	const recentActivities = [
		{
			time: "10:30",
			title: "Frontend Bootcamp #12 darsi tugallandi",
			description: "React Hooks mavzusi o'tildi",
			type: "lesson",
		},
		{
			time: "09:15",
			title: "Yangi o'quvchi qo'shildi",
			description: "Alisher Karimov React Advanced #8 ga",
			type: "student",
		},
		{
			time: "08:45",
			title: "Vazifa baholandi",
			description: "15ta vazifa tekshirildi va baholandi",
			type: "homework",
		},
		{
			time: "Kecha",
			title: "Guruh yakunlandi",
			description: "JavaScript Basics #23 muvaffaqiyatli yakunlandi",
			type: "completion",
		},
	];

	const columns = [
		{
			title: "Guruh Nomi",
			dataIndex: "name",
			key: "name",
			render: (text:any) => <div className="font-medium text-gray-900">{text}</div>,
		},
		{
			title: "O'quvchilar",
			dataIndex: "students",
			key: "students",
			render: (count:any) => (
				<div className="flex items-center">
					<UserOutlined className="text-gray-400 mr-1" />
					<span>{count}</span>
				</div>
			),
		},
		{
			title: "Daraja",
			dataIndex: "level",
			key: "level",
			render: (level:any) => {
				const colors = {
					Beginner: "green",
					Intermediate: "blue",
					Advanced: "purple",
				};
				return <Tag color={colors[level as keyof typeof colors]}>{level}</Tag>;
			},
		},
		{
			title: "Progress",
			dataIndex: "progress",
			key: "progress",
			render: (progress:any) => (
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
			render: (status:any) => {
				const config = {
					active: { color: "success", text: "Faol" },
					finishing: { color: "warning", text: "Yakunlanmoqda" },
					completed: { color: "default", text: "Tugallangan" },
				};
				return (
					<Badge status={config[status as keyof typeof config].color as any	} text={config[status as keyof typeof config].text} />
				);
			},
		},
		{
			title: "Keyingi Dars",
			dataIndex: "nextLesson",
			key: "nextLesson",
			render: (date:any) => <div className="text-sm text-gray-600">{date}</div>,
		},
		{
			title: "Amallar",
			key: "actions",
			render: (_:any, record:any) => (
				<Space size="small">
					<Tooltip title="Ko'rish">
						<Button type="text" icon={<EyeOutlined />} size="small" />
					</Tooltip>
					<Tooltip title="Tahrirlash">
						<Button type="text" icon={<EditOutlined />} size="small" />
					</Tooltip>
				</Space>
			),
		},
	];

	return (
		<div className="space-y-6">
			{/* Teacher Profile Section */}
			<div className="bg-gradient-to-r from-gray-600  to-gray-400 rounded-xl p-6 text-white">
				<div className="flex flex-col md:flex-row items-start md:items-center justify-between">
					<div className="flex items-center space-x-4 mb-4 md:mb-0">
						<Avatar
							size={80}
							icon={<UserOutlined />}
							className="bg-white bg-opacity-20 border-2 border-white border-opacity-30"
						/>
						<div>
							<h1 className="text-2xl font-bold mb-1">{teacherInfo.name}</h1>
							<p className="text-blue-100 mb-2">{teacherInfo.position}</p>
							<div className="flex items-center space-x-4 text-sm text-blue-100">
								<span className="flex items-center">
									<TrophyOutlined className="mr-1" />
									{teacherInfo.experience} tajriba
								</span>
								<span className="flex items-center">
									<span className="text-yellow-300 mr-1">★</span>
									{teacherInfo.rating} reyting
								</span>
							</div>
						</div>
					</div>
					<div className="text-right">
						<Button
							type="text"
							icon={<EditOutlined />}
							className="text-white hover:bg-white hover:bg-opacity-20 border border-white border-opacity-30"
						>
							Profilni tahrirlash
						</Button>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-white border-opacity-20">
					<div className="flex items-center text-blue-100">
						<MailOutlined className="mr-2" />
						<span className="text-sm">{teacherInfo.email}</span>
					</div>
					<div className="flex items-center text-blue-100">
						<PhoneOutlined className="mr-2" />
						<span className="text-sm">{teacherInfo.phone}</span>
					</div>
					<div className="flex items-center text-blue-100">
						<EnvironmentOutlined className="mr-2" />
						<span className="text-sm">{teacherInfo.address}</span>
					</div>
				</div>
			</div>

			{/* Statistics Cards */}
			<Row gutter={[16, 16]}>
				{stats.map((stat, index) => (
					<Col xs={24} sm={12} lg={6} key={index}>
						<Card
							className={`${stat.color} border hover:shadow-lg transition-all duration-300 cursor-pointer group`}
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
								<span className="font-semibold text-gray-900">
									Mening Guruhlarim
								</span>
								
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
						title="So'nggi Faoliyat"
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

			{/* Quick Actions */}
			<Card title="Tezkor Amallar" className="shadow-sm border border-gray-200">
				<Row gutter={[16, 16]}>
					<Col xs={24} sm={12} md={6}>
						<Button
							type="primary"
							icon={<PlusOutlined />}
							block
							size="large"
							className="bg-blue-600 hover:bg-blue-700 h-12"
						>
							Yangi Dars Yaratish
						</Button>
					</Col>
					<Col xs={24} sm={12} md={6}>
						<Button
							icon={<BookOutlined />}
							block
							size="large"
							className="h-12 border-green-500 text-green-600 hover:bg-green-50"
						>
							Vazifalarni Ko'rish
						</Button>
					</Col>
					<Col xs={24} sm={12} md={6}>
						<Button
							icon={<CalendarOutlined />}
							block
							size="large"
							className="h-12 border-purple-500 text-purple-600 hover:bg-purple-50"
						>
							Jadval Ko'rish
						</Button>
					</Col>
					<Col xs={24} sm={12} md={6}>
						<Button
							icon={<ClockCircleOutlined />}
							block
							size="large"
							className="h-12 border-orange-500 text-orange-600 hover:bg-orange-50"
						>
							Hisobotlar
						</Button>
					</Col>
				</Row>
			</Card>
		</div>
	);
};

export default TeacherDashboard;
