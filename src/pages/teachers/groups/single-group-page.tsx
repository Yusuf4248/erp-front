import {
	ArrowLeftOutlined,
	BookOutlined,
	CalendarOutlined,
	CameraOutlined,
	CheckCircleOutlined,
	MailOutlined,
	PhoneOutlined,
	PlayCircleOutlined,
	PlusOutlined,
	StarFilled,
	TeamOutlined,
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
	List,
	Modal,
	Progress,
	Row,
	Statistic,
	Switch,
	Table,
	Tabs,
	Tag,
	message,
} from "antd";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react"; // useEffect import qilindi

const { TabPane } = Tabs;
const { TextArea } = Input;

const SingleGroupPage = () => {
	const [activeTab, setActiveTab] = useState("1");
	const [isLessonModalVisible, setIsLessonModalVisible] = useState(false);
	const [attendanceData, setAttendanceData] = useState<Record<number, boolean>>(
		{}
	);
	const [form] = Form.useForm(); // Form instansiyasini olish

	// Kamera holatlari
	const [isCameraActive, setIsCameraActive] = useState(false); // Kamera yoqilgan, stream ko'rsatilmoqda
	const [capturedImage, setCapturedImage] = useState<string | null>(null); // Olingan rasmni saqlash uchun

	const videoRef = useRef<HTMLVideoElement>(null); // <video> elementiga murojaat
	const canvasRef = useRef<HTMLCanvasElement>(null); // <canvas> elementiga murojaat
	const streamRef = useRef<MediaStream | null>(null); // MediaStream obyektini saqlash uchun

	// Mock group data
	const groupData = {
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
		description: "Frontend Development Bootcamp",
		room: "A-201",
		price: "1,200,000",
		totalLessons: 48,
		completedLessons: 36,
		avatar: null,
	};

	// Mock teachers data
	const teachersData = [
		{
			id: 1,
			name: "Sardor Rahimov",
			role: "Main Teacher",
			email: "sardor@crm.uz",
			phone: "+998 90 123 45 67",
			rating: 4.8,
			experience: "3 yil",
			avatar: null,
			isMain: true,
		},
		{
			id: 2,
			name: "Dilshod Karimov",
			role: "Assistant Teacher",
			email: "dilshod@crm.uz",
			phone: "+998 91 234 56 78",
			rating: 4.6,
			experience: "2 yil",
			avatar: null,
			isMain: false,
		},
	];

	const studentsData = [
		{
			id: 1,
			name: "Alisher Karimov",
			email: "alisher@gmail.com",
			phone: "+998 90 111 22 33",
			joinDate: "2024-10-15",
			progress: 85,
			attendance: 92,
			status: "active",
			avatar: null,
			rating: 4.5,
		},
		{
			id: 2,
			name: "Mohira Toshmatova",
			email: "mohira@gmail.com",
			phone: "+998 91 222 33 44",
			joinDate: "2024-10-15",
			progress: 78,
			attendance: 88,
			status: "active",
			avatar: null,
			rating: 4.2,
		},
		{
			id: 3,
			name: "Jasur Abdullayev",
			email: "jasur@gmail.com",
			phone: "+998 93 333 44 55",
			joinDate: "2024-10-20",
			progress: 92,
			attendance: 95,
			status: "active",
			avatar: null,
			rating: 4.8,
		},
		{
			id: 4,
			name: "Nigora Yunusova",
			email: "nigora@gmail.com",
			phone: "+998 94 444 55 66",
			joinDate: "2024-10-18",
			progress: 70,
			attendance: 80,
			status: "warning",
			avatar: null,
			rating: 3.9,
		},
	];

	// Mock lessons data
	const lessonsData = [
		{
			id: 1,
			title: "HTML Asoslari",
			date: "2024-10-15",
			time: "18:00-20:00",
			status: "completed",
			videoUrl: "https://example.com/video1",
			attendance: 18,
		},
		{
			id: 2,
			title: "CSS va Flexbox",
			date: "2024-10-17",
			time: "18:00-20:00",
			status: "completed",
			videoUrl: "https://example.com/video2",
			attendance: 17,
		},
		{
			id: 3,
			title: "JavaScript Variables",
			date: "2024-10-20",
			time: "18:00-20:00",
			status: "upcoming",
			videoUrl: null,
			attendance: 0,
		},
	];

	const handleStartLesson = () => {
		setIsLessonModalVisible(true);
		// Initialize attendance data
		const initialAttendance: Record<number, boolean> = {};
		studentsData.forEach((student: { id: number }) => {
			initialAttendance[student.id] = true; // Default to present
		});
		setAttendanceData(initialAttendance);
		// Modal ochilganda kamerani avtomatik ochmaslik uchun, tugma bosilishini kutish
	};

	const handleLessonSubmit = async () => {
		try {
			const values = await form.validateFields(); // Formani validatsiya qilish
			console.log("Lesson data:", values);
			console.log("Attendance:", attendanceData);

			if (capturedImage) {
				await sendPhotoToBackend(); 
			} else {
				message.warning("Take photo for lesson!");
				return; 
			}

			setIsLessonModalVisible(false);
			form.resetFields(); 
			closeCamera(); 

			message.success("Lesson started successfully!");
		} catch (error) {
			console.error("Form validation failed or submission error:", error);
			message.error(
				"Error starting lesson. Please check that all form fields are filled correctly."
			);
		}
	};

	const handleAttendanceChange = (studentId: number, isPresent: boolean) => {
		setAttendanceData((prev) => ({
			...prev,
			[studentId]: isPresent,
		}));
	};

	const openCamera = async () => {
		setCapturedImage(null); 
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				video: {
					facingMode: "user", 
				},
				audio: false, 
			});

			streamRef.current = stream; 

			if (videoRef.current) {
				videoRef.current.srcObject = stream;
				videoRef.current.onloadedmetadata = () => {
					videoRef.current
						?.play()
						.then(() => {
							setIsCameraActive(true); 
						})
						.catch((error) => {
							console.error("Error playing video:", error);
							message.error(
								"Error playing video. Please try again."
							);
							closeCamera(); 
						});
				};
			}
		} catch (error) {
			console.error("Error opening camera:", error);
			message.error(
				"Error opening camera! Please check that you have permission to use the camera."
			);
			closeCamera(); 
		}
	};

	const closeCamera = () => {
		if (streamRef.current) {
			streamRef.current.getTracks().forEach((track) => track.stop()); 
			streamRef.current = null;
		}
		setIsCameraActive(false); 
		setCapturedImage(null); 
		if (videoRef.current) {
			videoRef.current.srcObject = null; 
		}
	};

	const capturePhoto = () => {
		if (videoRef.current && canvasRef.current) {
			const canvas = canvasRef.current;
			const video = videoRef.current;

			canvas.width = video.videoWidth;
			canvas.height = video.videoHeight;

			const ctx = canvas.getContext("2d");
			if (ctx) {
				ctx.drawImage(video, 0, 0, canvas.width, canvas.height); 
				const imageData = canvas.toDataURL("image/jpeg", 0.9); 
				setCapturedImage(imageData); 
				setIsCameraActive(false); 
				closeCamera(); 
				message.success("Photo taken successfully!");
			}
		}
	};

	// Backendga rasmni yuborish funksiyasi
	const sendPhotoToBackend = async () => {
		if (!capturedImage) {
			message.error("Take photo for lesson!");
			return;
		}

		try {
			const response = await fetch(capturedImage);
			const blob = await response.blob();

			const formData = new FormData();
			formData.append("image", blob, "lesson_photo.jpeg"); 

			const backendUploadUrl = "YOUR_BACKEND_UPLOAD_URL"; 

			const uploadResponse = await fetch(backendUploadUrl, {
				method: "POST",
				body: formData,
			});

			if (uploadResponse.ok) {
				const result = await uploadResponse.json();
				console.log("Backend response:", result);
				message.success("Photo uploaded successfully!");
				return result; 
			} else {
				const errorText = await uploadResponse.text();
				console.error(
					"Error uploading photo:",
					uploadResponse.status,
					errorText
				);
				message.error(
					`Error uploading photo: ${uploadResponse.status}`
				);
				throw new Error("Photo not uploaded"); 
			}
		} catch (error) {
			console.error("Unexpected error uploading photo:", error);
			message.error("Unexpected error uploading photo!");
			throw error; 
		}
	};

	useEffect(() => {
		if (!isLessonModalVisible) {
			closeCamera(); 
		}
	}, [isLessonModalVisible]); 

	useEffect(() => {
		return () => {
			closeCamera();
		};
	}, []); 

	const studentsColumns = [
		{
			title: "Student",
			dataIndex: "name",
			key: "name",
			render: (text: string, record: any) => (
				<div className="flex items-center space-x-3">
					<Avatar
						size={40}
						icon={<UserOutlined />}
						src={record.avatar}
						className="bg-blue-500"
					/>
					<div>
						<div className="font-medium text-gray-900">{text}</div>
						<div className="text-sm text-gray-500">{record.email}</div>
					</div>
				</div>
			),
		},
		{
			title: "Phone",
			dataIndex: "phone",
			key: "phone",
			render: (phone: string) => <span className="text-gray-600">{phone}</span>,
		},
		{
			title: "Progress",
			dataIndex: "progress",
			key: "progress",
			render: (progress: number) => (
				<div className="flex items-center space-x-2">
					<Progress
						percent={progress}
						size="small"
						className="w-20"
						strokeColor={
							progress > 80 ? "#52c41a" : progress > 60 ? "#1890ff" : "#faad14"
						}
					/>
				</div>
			),
		},
		{
			title: "Attendance",
			dataIndex: "attendance",
			key: "attendance",
			render: (attendance: number) => (
				<Tag
					color={
						attendance > 90 ? "green" : attendance > 75 ? "blue" : "orange"
					}
				>
					{attendance}%
				</Tag>
			),
		},
		{
			title: "Rating",
			dataIndex: "rating",
			key: "rating",
			render: (rating: number) => (
				<div className="flex items-center space-x-1">
					<StarFilled className="text-yellow-500 text-sm" />
					<span className="text-sm">{rating}</span>
				</div>
			),
		},
		{
			title: "Status",
			dataIndex: "status",
			key: "status",
			render: (status: string) => {
				const config = {
					active: { color: "success", text: "Active" },
					warning: { color: "warning", text: "Warning" },
					inactive: { color: "default", text: "Inactive" },
				} as const;
				type StatusKey = keyof typeof config;
				const statusKey = status as StatusKey;
				return (
					<Badge
						status={config[statusKey]?.color}
						text={config[statusKey]?.text}
					/>
				);
			},
		},
	];

	const lessonsColumns = [
		{
			title: "Lesson name",
			dataIndex: "title",
			key: "title",
			render: (text: string) => (
				<div className="font-medium text-gray-900">{text}</div>
			),
		},
		{
			title: "Date",
			dataIndex: "date",
			key: "date",
			render: (date: string) => (
				<span className="text-gray-600">
					{dayjs(date).format("DD.MM.YYYY")}
				</span>
			),
		},
		{
			title: "Time",
			dataIndex: "time",
			key: "time",
			render: (time: string) => <span className="text-gray-600">{time}</span>,
		},
		{
			title: "Status",
			dataIndex: "status",
			key: "status",
			render: (status: string) => {
				const config = {
					completed: { color: "success", text: "Completed" },
					upcoming: { color: "processing", text: "Upcoming" },
					cancelled: { color: "error", text: "Cancelled" },
				};
				type StatusKey = keyof typeof config;
				const statusKey = status as StatusKey;
				const color = config[statusKey]?.color as
					| "success"
					| "processing"
					| "error"
					| "default"
					| "warning"
					| undefined;
				return <Badge status={color} text={config[statusKey]?.text} />;
			},
		},
		{
			title: "Attendance",
			dataIndex: "attendance",
			key: "attendance",
			render: (attendance: number, record: any) => (
				<span className="text-gray-600">
					{record.status === "completed"
						? `${attendance}/${groupData.students}`
						: "-"}
				</span>
			),
		},
	];

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div className="flex items-center space-x-4">
					<Button
						icon={<ArrowLeftOutlined />}
						onClick={() => window.history.back()}
						className="hover:bg-gray-100"
					>
						Back
					</Button>
					<div>
						<h1 className="text-2xl font-bold text-gray-900">
							{groupData.name}
						</h1>
						<p className="text-gray-600">{groupData.course}</p>
					</div>
				</div>
				<Button
					type="primary"
					icon={<PlayCircleOutlined />}
					onClick={handleStartLesson}
					size="large"
					className="bg-green-600 hover:bg-green-700"
				>
					Start Lesson
				</Button>
			</div>

			{/* Group Overview */}
			<Card className="shadow-sm border border-gray-200">
				<Row gutter={[24, 24]}>
					<Col xs={24} lg={8}>
						<div className="flex items-center space-x-4">
							<Avatar
								size={80}
								icon={<TeamOutlined />}
								className="bg-gradient-to-r from-blue-500 to-purple-500"
							/>
							<div>
								<h2 className="text-xl font-semibold text-gray-900 mb-1">
									{groupData.name}
								</h2>
								<Tag color="blue" className="mb-2">
									{groupData.level}
								</Tag>
								<div className="text-sm text-gray-600">
									<div>Room: {groupData.room}</div>
									<div>Price: {groupData.price} UZS</div>
								</div>
							</div>
						</div>
					</Col>

					<Col xs={24} lg={16}>
						<Row gutter={[16, 16]}>
							<Col xs={12} sm={6}>
								<Statistic
									title="Students"
									value={groupData.students}
									suffix={`/ ${groupData.maxStudents}`}
									prefix={<UserOutlined />}
								/>
							</Col>
							<Col xs={12} sm={6}>
								<Statistic
									title="Progress %"
									value={groupData.progress}
									suffix="%"
									prefix={<CheckCircleOutlined />}
								/>
							</Col>
							<Col xs={12} sm={6}>
								<Statistic
									title="Lessons"
									value={groupData.completedLessons}
									suffix={`/ ${groupData.totalLessons}`}
									prefix={<BookOutlined />}
								/>
							</Col>
							<Col xs={12} sm={6}>
								<Statistic
									title="Schedule"
									value="Mon, Wed, Fri"
									prefix={<CalendarOutlined />}
									className="text-sm"
								/>
							</Col>
						</Row>

						<div className="mt-4">
							<div className="text-sm text-gray-600 mb-2">Total Progress:</div>
							<Progress
								percent={groupData.progress}
								strokeColor={{
									"0%": "#108ee9",
									"100%": "#87d068",
								}}
								className="mb-2"
							/>
							<div className="flex justify-between text-xs text-gray-500">
								<span>{dayjs(groupData.startDate).format("DD.MM.YYYY")}</span>
								<span>{dayjs(groupData.endDate).format("DD.MM.YYYY")}</span>
							</div>
						</div>
					</Col>
				</Row>

				<Divider />

				<div>
					<h3 className="font-medium text-gray-900 mb-2">Description:</h3>
					<p className="text-gray-600 leading-relaxed">
						{groupData.description}
					</p>
				</div>
			</Card>

			{/* Tabs Content */}
			<Card className="shadow-sm border border-gray-200">
				<Tabs activeKey={activeTab} onChange={setActiveTab} type="card">
					{/* Students Tab */}
					<TabPane tab={`Students (${studentsData.length})`} key="1">
						<Table
							columns={studentsColumns}
							dataSource={studentsData}
							rowKey="id"
							pagination={{ pageSize: 10 }}
							scroll={{ x: 800 }}
						/>
					</TabPane>

					{/* Teachers Tab */}
					<TabPane tab={`Teachers (${teachersData.length})`} key="2">
						<Row gutter={[16, 16]}>
							{teachersData.map((teacher) => (
								<Col xs={24} md={12} key={teacher.id}>
									<Card
										size="small"
										className="hover:shadow-md transition-shadow"
									>
										<div className="flex items-center space-x-4">
											<Avatar
												size={64}
												icon={<UserOutlined />}
												src={teacher.avatar}
												className="bg-blue-500"
											/>
											<div className="flex-1">
												<div className="flex items-center space-x-2 mb-1">
													<h3 className="font-semibold text-gray-900">
														{teacher.name}
													</h3>
													{teacher.isMain && (
														<Tag color="gold" className="text-xs px-2 py-0.5">
															Main
														</Tag>
													)}
												</div>
												<p className="text-sm text-blue-600 mb-2">
													{teacher.role}
												</p>
												<div className="space-y-1 text-xs text-gray-600">
													<div className="flex items-center space-x-1">
														<MailOutlined />
														<span>{teacher.email}</span>
													</div>
													<div className="flex items-center space-x-1">
														<PhoneOutlined />
														<span>{teacher.phone}</span>
													</div>
													<div className="flex items-center space-x-1">
														<StarFilled className="text-yellow-500" />
														<span>
															{teacher.rating} • {teacher.experience}
														</span>
													</div>
												</div>
											</div>
										</div>
									</Card>
								</Col>
							))}
						</Row>
					</TabPane>

					{/* Lessons Tab */}
					<TabPane tab={`Lessons (${lessonsData.length})`} key="3">
						<div className="mb-4 flex justify-between items-center">
							<Button
								type="primary"
								icon={<PlusOutlined />}
								onClick={handleStartLesson}
								className="bg-blue-600 hover:bg-blue-700"
							>
								New Lesson
							</Button>
						</div>
						<Table
							columns={lessonsColumns}
							dataSource={lessonsData}
							rowKey="id"
							pagination={{ pageSize: 10 }}
						/>
					</TabPane>
				</Tabs>
			</Card>

			{/* Start Lesson Modal */}
			<Modal
				title={
					<div className="flex items-center space-x-2">
						<PlayCircleOutlined className="text-green-500" />
						<span>Start New Lesson</span>
					</div>
				}
				open={isLessonModalVisible}
				onCancel={() => {
					setIsLessonModalVisible(false);
				}}
				width={800}
				footer={[
					<Button
						key="cancel"
						onClick={() => {
							setIsLessonModalVisible(false);
						}}
					>
						Cancel
					</Button>,
					<Button
						key="submit"
						type="primary"
						onClick={handleLessonSubmit}
						className="bg-green-600 hover:bg-green-700"
					>
						Start Lesson
					</Button>,
				]}
			>
				<div className="space-y-6">
					{/* Lesson Info */}
					<div>
						<h3 className="font-medium text-gray-900 mb-4">
							Lesson Information
						</h3>
						<Form form={form} layout="vertical">
							{" "}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<Form.Item
									label="Lesson name"
									name="lessonName"
									rules={[{ required: true, message: "Lesson name is required!" }]}
								>
									<Input placeholder="Masalan: React Components" />
								</Form.Item>
								<Form.Item
									label="Date"
									name="lessonDate"
									rules={[{ required: true, message: "Date is required!" }]}
									initialValue={dayjs()} 
								>
									<DatePicker className="w-full" format="DD.MM.YYYY" />
								</Form.Item>
							</div>
							<Form.Item label="Lesson description" name="lessonDescription">
								<TextArea rows={3} placeholder="Lesson description..." />
							</Form.Item>
						</Form>
					</div>

					{/* Camera Section */}
					<div>
						<h3 className="font-medium text-gray-900 mb-4">Take Photo</h3>

						{!isCameraActive && !capturedImage && (
							<div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
								<CameraOutlined className="text-4xl text-gray-400 mb-4" />
								<p className="text-gray-600 mb-4">Take photo for lesson</p>
								<Button
									type="primary"
									icon={<CameraOutlined />}
									onClick={openCamera}
									className="bg-blue-600 hover:bg-blue-700"
								>
									Open camera
								</Button>
							</div>
						)}

						{isCameraActive && !capturedImage && (
							<div className="space-y-4">
								<div className="relative bg-black rounded-lg overflow-hidden">
									<video
										ref={videoRef}
										autoPlay
										playsInline
										muted 
										className="w-full h-64 object-cover" 
									></video>
								</div>
								<div className="flex justify-center space-x-4">
									<Button
										onClick={closeCamera} 
										className="bg-gray-500 hover:bg-gray-600 text-white"
									>
										Cancel
									</Button>
									<Button
										type="primary"
										icon={<CameraOutlined />}
										onClick={capturePhoto} 
										className="bg-green-600 hover:bg-green-700"
									>
										Take photo
									</Button>
								</div>
							</div>
						)}
				
						{capturedImage && (
							<div className="space-y-4">
								<div className="relative">
									<img
										src={capturedImage}
										alt="Olingan rasm"
										className="w-full h-64 object-cover rounded-lg border"
									/>
								</div>
								<div className="flex justify-center space-x-4">
									<Button
										onClick={() => {
											setCapturedImage(null); // Olingan rasmni tozalash
											openCamera(); // Kamerani qayta ochish
										}}
										className="bg-orange-500 hover:bg-orange-600 text-white"
									>
										Qayta olish
									</Button>
									<Button
										type="primary"
										onClick={sendPhotoToBackend} // Rasmni backendga yuborish
										className="bg-green-600 hover:bg-green-700"
									>
										Tasdiqlash va yuklash
									</Button>
								</div>
							</div>
						)}

						{/* Canvas elementi har doim mavjud bo'lishi kerak, lekin yashiringan holda */}
						<canvas ref={canvasRef} style={{ display: "none" }} />
					</div>

					{/* Attendance */}
					<div>
						<h3 className="font-medium text-gray-900 mb-4">Attendance</h3>
						<div className="max-h-60 overflow-y-auto border rounded-lg">
							<List
								dataSource={studentsData}
								renderItem={(student) => (
									<List.Item
										key={student.id}
										className="px-4 hover:bg-gray-50"
										actions={[
											<Switch
												checked={attendanceData?.[student.id] !== false}
												onChange={(checked) =>
													handleAttendanceChange(student.id, checked)
												}
											/>,
										]}
									>
										<List.Item.Meta
											avatar={
												<Avatar
													icon={<UserOutlined />}
													src={student.avatar}
													className="bg-blue-500"
												/>
											}
											title={student.name}
											description={student.email}
										/>
									</List.Item>
								)}
							/>
						</div>
						<div className="mt-2 text-sm text-gray-600">
							Present: {Object.values(attendanceData).filter(Boolean).length} /{" "}
							{studentsData.length}
						</div>
					</div>
				</div>
			</Modal>
		</div>
	);
};

export default SingleGroupPage;
