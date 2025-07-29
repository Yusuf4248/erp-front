import {
	BookOutlined,
	CalendarOutlined,
	CameraOutlined,
	CloseOutlined,
	EditOutlined,
	EnvironmentOutlined,
	GithubOutlined,
	GlobalOutlined,
	LinkedinOutlined,
	MailOutlined,
	PhoneOutlined,
	PlusOutlined,
	SaveOutlined,
	StarFilled,
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
	DatePicker,
	Divider,
	Form,
	Input,
	message,
	Rate,
	Row,
	Select,
	Space,
	Statistic,
	Tabs,
	Tag,
	Timeline,
	Upload,
} from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { useTeachers } from "@hooks"
import { getItem } from "@helpers"

const { TextArea } = Input;
const { Option } = Select;
const { TabPane } = Tabs;

const TeacherProfile = () => {
	const [isEditing, setIsEditing] = useState(false);
	const [form] = Form.useForm();
	const [activeTab, setActiveTab] = useState("1");
	const { useTeacherUploadAvatar } = useTeachers({});
	const {mutate:uploadAvatar,}=useTeacherUploadAvatar()
	const formData = new FormData();
	const user_id = getItem("user_id");
	const { teacherDataById } = useTeachers({}, +user_id!);
	const teacherDatas = teacherDataById?.data?.teacher;
	const [teacherData, setTeacherData] = useState({
		id: "12345",
		firstName: "Sardor",
		lastName: "Rahimov",
		email: "sardor.rahimov@crm.uz",
		phone: "+998 90 123 45 67",
		address: "Toshkent, Uzbekistan",
		birthDate: "1990-05-15",
		position: "Senior Frontend Developer",
		department: "IT Education",
		experience: "3 yil",
		joinDate: "2022-01-15",
		salary: "5,000,000",
		rating: 4.8,
		bio: "Frontend development sohasida 3 yillik tajribaga ega bo'lgan dasturchi. React, Vue.js va Angular framework larida chuqur bilimga ega. 150 dan ortiq o'quvchini muvaffaqiyatli o'qitgan.",
		avatar: null,
		skills: [
			"React",
			"JavaScript",
			"TypeScript",
			"Vue.js",
			"Node.js",
			"HTML/CSS",
		],
		languages: [
			{ name: "O'zbek", level: "Native" },
			{ name: "Ingliz", level: "Intermediate" },
			{ name: "Rus", level: "Advanced" },
		],
		education: [
			{
				degree: "Bachelor's Degree",
				institution: "Toshkent Axborot Texnologiyalari Universiteti",
				year: "2018",
				field: "Dasturiy Ta'minot",
			},
		],
		certifications: [
			{ name: "React Developer Certificate", issuer: "Meta", year: "2023" },
			{ name: "JavaScript Advanced", issuer: "freeCodeCamp", year: "2022" },
			{ name: "Frontend Web Development", issuer: "Coursera", year: "2021" },
		],
		socialLinks: {
			github: "https://github.com/sardor",
			linkedin: "https://linkedin.com/in/sardor",
			website: "https://sardor.dev",
		},
	});

	const statistics = [
		{
			title: "Total Students",
			value: 156,
			icon: <UserOutlined />,
			color: "text-blue-500",
		},
		{
			title: "Active Groups",
			value: 8,
			icon: <TeamOutlined />,
			color: "text-green-500",
		},
		{
			title: "Completed Courses",
			value: 12,
			icon: <BookOutlined />,
			color: "text-purple-500",
		},
		{
			title: "Average Rating",
			value: 4.8,
			icon: <StarFilled />,
			color: "text-yellow-500",
		},
	];
	const recentActivities = [
		{
			date: "2025-01-25",
			title: "Frontend Bootcamp #12 darsi",
			description: "React Hooks topic completed",
			type: "lesson",
			status: "completed",
		},
		{
			date: "2025-01-24",
			title: "New student accepted",
			description: "Alisher Karimov React Advanced group added",
			type: "student",
			status: "completed",
		},
		{
			date: "2025-01-23",
			title: "Tasks evaluated",
			description: "25 tasks checked and evaluated",
			type: "homework",
			status: "completed",
		},
	];
	const handleEdit = () => {
		setIsEditing(true);
		form.setFieldsValue({
			...teacherDatas,
			joinDate: dayjs(teacherDatas?.created_at),
		});
	};
	const handleSave = async () => {
		try {
			const values = await form.validateFields();
			setTeacherData({
				...teacherDatas,
				...values,
				joinDate: values.created_at.format("YYYY-MM-DD"),
			});
			setIsEditing(false);
			message.success("Profil successfuly updated!");
		} catch (error) {
			message.error("Please fill all fields!");
		}
	};
	const handleCancel = () => {
		setIsEditing(false);
		form.resetFields();
	};
	const handleAvatarUpload = (info: any) => {
		console.log(info.file);
		formData.append("avatar_url", info.file.originFileObj);
		uploadAvatar({
			id: Number(teacherDatas.id),
			body: formData,
		});
	};
	return (
		<div className="space-y-6">
			<Card className="shadow-sm border border-gray-200">
				<div className="relative">
					<div className="absolute inset-0 bg-gradient-to-r from-gray-600 to-gray-400 rounded-lg h-44"></div>
					<div className="relative pt-8 pb-4">
						<div className="flex flex-col md:flex-row items-center md:items-end space-y-4 md:space-y-0 md:space-x-6 ml-10">
							<div className="relative">
								<Avatar
									size={120}
									icon={<UserOutlined />}
									src={teacherDatas?.avatar_url|| <UserOutlined />}
									className="border-4 border-white shadow-lg bg-white"
								/>
								{isEditing && (
									<Upload
										showUploadList={false}
										onChange={handleAvatarUpload}
										accept="image/*"
									>
										<Button
											type="primary"
											shape="circle"
											icon={<CameraOutlined />}
											size="small"
											className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700"
										/>
									</Upload>
								)}
							</div>
							<div className="flex-1 text-center md:text-left">
								<div className=" from-gray-600 to-gray-400 rounded-lg p-4 shadow-sm">
									{!isEditing ? (
										<>
											<h1 className="text-2xl font-bold text-gray-100 mb-1">
												{teacherDatas?.first_name} {teacherDatas?.last_name}
											</h1>
											<p className="text-gray-300 font-medium mb-2">
												{teacherDatas?.role.toUpperCase()}
											</p>
											<div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-300">
												<span className="flex items-center">
													<CalendarOutlined className="mr-1" />
													{new Date().getFullYear() -
														new Date(teacherDatas?.created_at).getFullYear()}{" "}
													years experience
												</span>
												<span className="flex items-center">
													<StarFilled className="mr-1 text-yellow-500" />
													4.8 rating
												</span>
												<span className="flex items-center">
													<TeamOutlined className="mr-1" />
													{teacherDatas?.branches
														.map((branch: any) => branch.name)
														.join(" | ")}
												</span>
											</div>
										</>
									) : (
										<div className="space-y-4">
											<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
												<div>
													<label className="block text-sm font-medium mb-1">
														Ism
													</label>
													<Input defaultValue={teacherDatas?.first_name} />
												</div>
												<div>
													<label className="block text-sm font-medium mb-1">
														Familiya
													</label>
													<Input defaultValue={teacherDatas?.last_name} />
												</div>
											</div>
										</div>
									)}
								</div>
							</div>
							<div className="flex space-x-2 mr-5">
								{!isEditing ? (
									<Button
										type="primary"
										icon={<EditOutlined />}
										onClick={handleEdit}
										className="bg-blue-600 hover:bg-blue-700"
									>
										Edit
									</Button>
								) : (
									<Space>
										<Button
											type="primary"
											icon={<SaveOutlined />}
											onClick={handleSave}
											className="bg-green-600 hover:bg-green-700"
										>
											Save
										</Button>
										<Button icon={<CloseOutlined />} onClick={handleCancel}>
											Cancel
										</Button>
									</Space>
								)}
							</div>
						</div>
					</div>
				</div>
			</Card>
			<Row gutter={[16, 16]}>
				{statistics.map((stat, index) => (
					<Col xs={24} sm={12} lg={6} key={index}>
						<Card className="text-center hover:shadow-lg transition-all duration-300 border border-gray-200">
							<div className={`text-3xl ${stat.color} mb-2`}>{stat.icon}</div>
							<Statistic
								title={stat.title}
								value={stat.value}
								precision={stat.title.includes("Rating") ? 1 : 0}
								className="mb-0"
							/>
						</Card>
					</Col>
				))}
			</Row>
			<Card className="shadow-sm border border-gray-200">
				<Tabs activeKey={activeTab} onChange={setActiveTab} type="card">
					<TabPane tab="Personal Information" key="1">
						<Row gutter={[24, 24]}>
							<Col xs={24} lg={12}>
								<Card title="Main Information" size="small" className="h-full">
									{!isEditing ? (
										<div className="space-y-4">
											<div className="flex items-center">
												<MailOutlined className="text-gray-400 mr-3" />
												<div>
													<div className="text-sm text-gray-600">Email</div>
													<div className="font-medium">{teacherDatas?.email}</div>
												</div>
											</div>
											<div className="flex items-center">
												<PhoneOutlined className="text-gray-400 mr-3" />
												<div>
													<div className="text-sm text-gray-600">Phone</div>
													<div className="font-medium">{teacherDatas?.phone}</div>
												</div>
											</div>
											<div className="flex items-center">
												<EnvironmentOutlined className="text-gray-400 mr-3" />
												<div>
													<div className="text-sm text-gray-600">Branches</div>
													<div className="font-medium">
														{teacherDatas?.branches
														.map((branch: any) => branch.name)
														.join(" | ")}
													</div>
												</div>
											</div>
										</div>
									) : (
										<div className="space-y-4">
											<div>
												<label className="block text-sm font-medium mb-1">
													Email
												</label>
												<Input
													prefix={<MailOutlined />}
													defaultValue={teacherDatas?.email}
												/>
											</div>
											<div>
												<label className="block text-sm font-medium mb-1">
													Telefon
												</label>
												<Input
													prefix={<PhoneOutlined />}
													defaultValue={teacherDatas?.phone}
												/>
											</div>
											<div>
												<label className="block text-sm font-medium mb-1">
													Manzil
												</label>
												<Input
													prefix={<EnvironmentOutlined />}
													defaultValue={teacherDatas?.branches
														.map((branch: any) => branch.name)
														.join(" | ")}
												/>
											</div>
										</div>
									)}
								</Card>
							</Col>
							<Col xs={24} lg={12}>
								<Card
									title="Professional Information"
									size="small"
									className="h-full"
								>
									{!isEditing ? (
										<div className="space-y-3">
											<div>
												<div className="text-sm text-gray-600 mb-1">
													Department
												</div>
												<div className="font-medium">
													{teacherDatas?.branches
														.map((branch: any) => branch.name)
														.join(" | ")}
												</div>
											</div>
											<div>
												<div className="text-sm text-gray-600 mb-1">
													Joined Date
												</div>
												<div className="font-medium">
													{dayjs(teacherDatas?.created_at).format("DD.MM.YYYY")}
												</div>
											</div>
											<div>
												<div className="text-sm text-gray-600 mb-1">Salary</div>
												<div className="font-medium">
													5000000 UZS
												</div>
											</div>
											<div>
												<div className="text-sm text-gray-600 mb-1">Rating</div>
												<div className="flex items-center">
													<Rate
														disabled
														value={4.8}
														allowHalf
														className="text-sm mr-2"
													/>
													<span className="font-medium">
														(4.8)
													</span>
												</div>
											</div>
										</div>
									) : (
										<div className="space-y-4">
											<div>
												<label className="block text-sm font-medium mb-1">
													Department
												</label>
												<Select
													defaultValue={teacherDatas?.branches
														.map((branch: any) => branch.name)
														.join(" | ")}
													className="w-full"
												>
													<Option value="IT Education">IT Education</Option>
													<Option value="Business">Business</Option>
													<Option value="Design">Design</Option>
												</Select>
											</div>
											<div>
												<label className="block text-sm font-medium mb-1">
													Joined Date
												</label>
												<DatePicker
													className="w-full"
													defaultValue={dayjs(teacherDatas?.created_at)}
												/>
											</div>
											<div>
												<label className="block text-sm font-medium mb-1">
													Salary
												</label>
												<Input suffix="UZS" defaultValue={5000000} />
											</div>
										</div>
									)}
								</Card>
							</Col>
							<Col xs={24}>
								<Card title="About" size="small">
									{!isEditing ? (
										<p className="text-gray-700 leading-relaxed">
											{teacherData?.bio}
										</p>
									) : (
										<Form.Item name="bio" label="About yourself...">
											<TextArea rows={4} placeholder="About yourself..." />
										</Form.Item>
									)}
								</Card>
							</Col>
						</Row>
					</TabPane>
					<TabPane tab="Skills & Education" key="2">
						<Row gutter={[24, 24]}>
							<Col xs={24} lg={12}>
								<Card title="Technical Skills" size="small" className="mb-6">
									<div className="flex flex-wrap gap-2 mb-4">
										{teacherData.skills.map((skill, index) => (
											<Tag key={index} color="blue" className="px-3 py-1">
												{skill}
											</Tag>
										))}
									</div>
									{isEditing && (
										<Button
											type="dashed"
											icon={<PlusOutlined />}
											className="w-full"
										>
											Add Skill
										</Button>
									)}
								</Card>
								<Card title="Languages" size="small">
									<div className="space-y-3">
										{teacherData.languages.map((lang, index) => (
											<div
												key={index}
												className="flex items-center justify-between"
											>
												<span className="font-medium">{lang.name}</span>
												<Tag
													color={
														lang.level === "Native"
															? "green"
															: lang.level === "Advanced"
															? "blue"
															: "orange"
													}
												>
													{lang.level}
												</Tag>
											</div>
										))}
									</div>
									{isEditing && (
										<Button
											type="dashed"
											icon={<PlusOutlined />}
											className="w-full mt-4"
										>
											Add Language
										</Button>
									)}
								</Card>
							</Col>
							<Col xs={24} lg={12}>
								<Card title="Education" size="small" className="mb-6">
									{teacherData.education.map((edu, index) => (
										<div
											key={index}
											className="border-l-4 border-blue-500 pl-4 mb-4 last:mb-0"
										>
											<h4 className="font-semibold text-lg mb-1">
												{edu.degree}
											</h4>
											<p className="text-blue-600 mb-1">{edu.institution}</p>
											<p className="text-sm text-gray-600">
												{edu.field} • {edu.year}
											</p>
										</div>
									))}
									{isEditing && (
										<Button
											type="dashed"
											icon={<PlusOutlined />}
											className="w-full mt-4"
										>
											Add Education
										</Button>
									)}
								</Card>
								<Card title="Certificates" size="small">
									<div className="space-y-3">
										{teacherData.certifications.map((cert, index) => (
											<div key={index} className="flex items-start">
												<TrophyOutlined className="text-yellow-500 mt-1 mr-3" />
												<div className="flex-1">
													<div className="font-medium">{cert.name}</div>
													<div className="text-sm text-gray-600">
														{cert.issuer} • {cert.year}
													</div>
												</div>
											</div>
										))}
									</div>
									{isEditing && (
										<Button
											type="dashed"
											icon={<PlusOutlined />}
											className="w-full mt-4"
										>
											Add Certificate
										</Button>
									)}
								</Card>
							</Col>
						</Row>
					</TabPane>
					<TabPane tab="Recent Activity" key="3">
						<Row gutter={[24, 24]}>
							<Col xs={24} lg={16}>
								<Card title="Activity History" size="small">
									<Timeline
										items={recentActivities.map((activity, index) => ({
											color:
												activity.type === "lesson"
													? "blue"
													: activity.type === "student"
													? "green"
													: "orange",
											children: (
												<div key={index}>
													<div className="flex items-center justify-between mb-2">
														<span className="font-medium">
															{activity.title}
														</span>
														<Badge
															status={
																activity.status === "completed"
																	? "success"
																	: "processing"
															}
															text={
																activity.status === "completed"
																	? "Completed"
																	: "In Progress"
															}
														/>
													</div>
													<p className="text-gray-600 text-sm mb-1">
														{activity.description}
													</p>
													<p className="text-xs text-gray-500">
														{dayjs(activity.date).format("DD.MM.YYYY")}
													</p>
												</div>
											),
										}))}
									/>
								</Card>
							</Col>
							<Col xs={24} lg={8}>
								<Card title="Social Media" size="small">
									<div className="space-y-4">
										<div className="flex items-center justify-between">
											<div className="flex items-center">
												<GithubOutlined className="text-lg mr-3" />
												<span>GitHub</span>
											</div>
											<Button type="link" size="small">
												View
											</Button>
										</div>
										<div className="flex items-center justify-between">
											<div className="flex items-center">
												<LinkedinOutlined className="text-lg mr-3 text-blue-600" />
												<span>LinkedIn</span>
											</div>
											<Button type="link" size="small">
												View
											</Button>
										</div>
										<div className="flex items-center justify-between">
											<div className="flex items-center">
												<GlobalOutlined className="text-lg mr-3 text-green-600" />
												<span>Website</span>
											</div>
											<Button type="link" size="small">
												View
											</Button>
										</div>
									</div>

									{isEditing && (
										<>
											<Divider />
											<div className="space-y-3">
												<Input
													placeholder="GitHub URL"
													prefix={<GithubOutlined />}
												/>
												<Input
													placeholder="LinkedIn URL"
													prefix={<LinkedinOutlined />}
												/>
												<Input
													placeholder="Website URL"
													prefix={<GlobalOutlined />}
												/>
											</div>
										</>
									)}
								</Card>
							</Col>
						</Row>
					</TabPane>
				</Tabs>
			</Card>
		</div>
	);
};
export default TeacherProfile;
