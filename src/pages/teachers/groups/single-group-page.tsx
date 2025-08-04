import {
	ArrowLeftOutlined,
	BookOutlined,
	CalendarOutlined,
	CameraOutlined,
	CheckCircleOutlined,
	MailOutlined,
	PhoneOutlined,
	PlayCircleOutlined,
	StarFilled,
	UserOutlined,
} from "@ant-design/icons";
import {
	useAttendanceByLessonIds,
	useAttendanceMutations,
	useGroupDetailsForTeacher,
	useLessonMutations,
} from "@hooks";
import {
	Avatar,
	Badge,
	Button,
	Card,
	Col,
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
	Tooltip,
	message,
} from "antd";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import StudentAttendance from "../../student-layout/student-attendance"
const { TabPane } = Tabs;
const SingleGroupPage = () => {
	const { id } = useParams();
	const { groupDetailsForTeacher } = useGroupDetailsForTeacher(+id!);
	const groupDatas = groupDetailsForTeacher?.data;
	const { useLessonUpdateStatusAndNotes } = useLessonMutations();
	const { mutate: updateLessonStatusAndNote } = useLessonUpdateStatusAndNotes();
	const { useAttendanceBulkUpdate } = useAttendanceMutations();
	const { mutate: updateAttendance } = useAttendanceBulkUpdate();
	const [activeTab, setActiveTab] = useState("1");
	const [isLessonModalVisible, setIsLessonModalVisible] = useState(false);
	const [attendanceData, setAttendanceData] = useState<
		{
			studentId: number;
			isPresent: boolean;
		}[]
	>([]);
	const [form] = Form.useForm();
	const [isCameraActive, setIsCameraActive] = useState(false);
	const [capturedImage, setCapturedImage] = useState<string | null>(null);
	const videoRef = useRef<HTMLVideoElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const streamRef = useRef<MediaStream | null>(null);
	const groupData = {
		id: 1,
		name: groupDatas?.group?.name || "No Name",
		course: groupDatas?.group?.course?.title || "No Course",
		level: groupDatas?.group?.level || "Intermediate",
		students: Array.isArray(groupDatas?.groupStudents)
			? groupDatas.groupStudents.filter(
					(student: any) => student.status === true
			  ).length
			: 0,
		maxStudents: Array.isArray(groupDatas?.groupStudents)
			? groupDatas.groupStudents.length
			: 0,
		progress:
			Array.isArray(groupDatas?.lessons) && groupDatas.lessons.length > 0
				? +(
						(groupDatas.lessons.filter(
							(lesson: any) => lesson.status === "completed"
						).length /
							groupDatas.lessons.length) *
						100
				  ).toFixed(0)
				: 0,
		status: groupDatas?.group?.status || "active",
		schedule: {
			days:
				groupDatas?.group?.course?.lessons_in_a_week == 3
					? ["Mon", "Wed", "Fri"]
					: ["Mon", "Tue", "Wed", "Thu", "Fri"],
			startTime: groupDatas?.group?.start_time?.slice(0, 5) || "18:00",
			endTime: groupDatas?.group?.end_time?.slice(0, 5) || "20:00",
		},
		startDate: groupDatas?.group?.start_date || "2024-01-01",
		endDate: groupDatas?.group?.end_date || "2024-12-31",
		room: groupDatas?.group?.room || "No Data",
		price: groupDatas?.group?.course?.price || "0",
		totalLessons: Array.isArray(groupDatas?.lessons)
			? groupDatas.lessons.length
			: 0,
		completedLessons: Array.isArray(groupDatas?.lessons)
			? groupDatas.lessons.filter(
					(lesson: any) => lesson.status === "completed"
			  ).length
			: 0,
		description: groupDatas?.group?.course?.description || "No Data",
	};
	const teachersData = [
		...(Array.isArray(groupDatas?.groupTeachers)
			? groupDatas.groupTeachers.map((teacher: any) => {
					return {
						id: teacher.id,
						name: teacher.teacher.first_name + " " + teacher.teacher.last_name,
						email: teacher.teacher.email,
						phone: teacher.teacher.phone,
						rating: teacher.teacher.rating || "N/A",
						avatar: teacher.teacher.avatar_url,
						isMain: teacher.teacher.role === "main teacher",
						experience:
							new Date().getFullYear() -
							new Date(teacher.teacher.created_at).getFullYear() +
							" yil",
					};
			  })
			: []),
	];
	const studentsData = [
		...(Array.isArray(groupDatas?.groupStudents)
			? groupDatas.groupStudents.map((student: any) => {
					return {
						id: student.id,
						name: student.student.first_name + " " + student.student.last_name,
						email: student.student.email,
						phone: student.student.phone,
						status: student.student.is_active ? "active" : "inactive",
						attendance: +(
							(student.student.attendance.filter(
								(attendance: any) => attendance.status === "present"
							).length /
								student.student.attendance.length) *
							100
						).toFixed(0),
						rating: student.student.rating || "N/A",
						avatar: student.student.avatar_url,
						joinDate: student.student.created_at,
					};
			  })
			: []),
	];
	const lessonIds = Array.isArray(groupDatas?.lessons)
		? groupDatas.lessons.map((lesson: any) => lesson.id)
		: [];
	const { data: allAttendanceData, pending: attendancePending } =
		useAttendanceByLessonIds(lessonIds);
	const lessonsData = [
		...(Array.isArray(groupDatas?.lessons)
			? groupDatas.lessons.map((lesson: any, index: number) => {
					return {
						id: lesson.id,
						title: lesson.title,
						date: lesson.date,
						time:
							groupDatas?.group?.start_time?.slice(0, 5) +
							"-" +
							groupDatas?.group?.end_time?.slice(0, 5),
						status: lesson.status,
						description: lesson.notes,
						attendance: allAttendanceData?.[index]?.data?.attendance?.length || 0,
					};
			  })
			: []),
	];
	const handleStartLesson = () => {
		setIsLessonModalVisible(true);
		const initialAttendance: { studentId: number; isPresent: boolean }[] = [];
		studentsData.forEach((student: { id: number }) => {
			initialAttendance.push({ studentId: student.id, isPresent: true });
		});
		setAttendanceData(initialAttendance);
	};
	const handleLessonSubmit = async () => {
		try {
			const currentLesson = lessonsData.find(
				(lesson: any) =>
					lesson.date.split("T")[0] === new Date().toISOString().split("T")[0]
			);
			if (!currentLesson) {
				message.error("No lesson found for today!");
				return;
			}
			const values = await form.validateFields();
			const data = {
				note: values.lessonName,
				status: "in_progress",
			};
			updateLessonStatusAndNote({ id: currentLesson?.id, data });
			updateAttendance({
				lessonTitle: values.lessonName,
				lessonId: currentLesson?.id,
				students: attendanceData.map((att) => {
					return {
						studentId: att.studentId,
						status: att.isPresent ? "came" : "did not came",
					};
				}),
			});
			console.log("Lesson data:", values);
			console.log("Attendance:", attendanceData);
			console.log(currentLesson);
			// if (capturedImage) {
			// 	await sendPhotoToBackend();
			// } else {
			// 	message.warning("Take photo for lesson!");
			// 	return;
			// }
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
		setAttendanceData((prev) => {
			const existingIndex = prev.findIndex(
				(attendance) => attendance.studentId === studentId
			);
			if (existingIndex !== -1) {
				const updated = [...prev];
				updated[existingIndex] = { studentId, isPresent };
				return updated;
			} else {
				return [...prev, { studentId, isPresent }];
			}
		});
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
							message.error("Error playing video. Please try again.");
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
				message.error(`Error uploading photo: ${uploadResponse.status}`);
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
		Table.EXPAND_COLUMN,
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
			title: "Desc",
			dataIndex: "description",
			key: "description",
			render: (description: string) => (
				<Tooltip title={description}>
					{description.length > 100
						? description.slice(0, 100) + "..."
						: description}
				</Tooltip>
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
					upcoming: { color: "processing", text: "in_progress" },
					cancelled: { color: "error", text: "Cancelled" },
					new: { color: "error", text: "New" },
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
			title: "Att",
			dataIndex: "attendance",
			key: "attendance",
			loading: attendancePending,
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
				<div className="flex items-center space-x-2 flex-col">
					<Button
						type="primary"
						icon={<PlayCircleOutlined />}
						onClick={handleStartLesson}
						size="large"
						className="bg-green-600 hover:bg-green-700"
						disabled={groupDatas?.data.isAttended}
					>
						Start Lesson
					</Button>
					<span
						className={`text-sm ${
							groupDatas?.data.isAttended ? "text-green-500" : "text-red-500"
						}`}
					>
						{groupDatas?.data.isAttended
							? "Lesson started"
							: "Lesson not started"}
					</span>
				</div>
			</div>
			<Card className="shadow-sm border border-gray-200">
				<Row gutter={[24, 24]}>
					<Col xs={24} lg={8}>
						<div className="flex items-center space-x-4">
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
			<Card className="shadow-sm border border-gray-200">
				<Tabs activeKey={activeTab} onChange={setActiveTab} type="card">
					<TabPane tab={`Students (${studentsData.length})`} key="1">
						<Table
							columns={studentsColumns}
							dataSource={studentsData}
							rowKey="id"
							pagination={{ pageSize: 10 }}
							scroll={{ x: 800 }}
							expandable={{
								expandedRowRender: (record) => (
									<StudentAttendance studentId={record.id} groupId={+id!} />
								),
							}}
						/>
					</TabPane>
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
												style={{
													marginRight: "10px",
												}}
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
													{!teacher.isMain && (
														<Tag color="blue" className="text-xs px-2 py-0.5">
															Assistant
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
					<TabPane tab={`Lessons (${lessonsData.length})`} key="3">
						<Table
							columns={lessonsColumns}
							dataSource={lessonsData}
							rowKey="id"
							pagination={{ pageSize: 10 }}
							scroll={{ x: "max-content", y: 300 }}
						/>
					</TabPane>
				</Tabs>
			</Card>
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
									rules={[
										{ required: true, message: "Lesson name is required!" },
									]}
								>
									<Input placeholder="For example: React Components" />
								</Form.Item>
							</div>
						</Form>
					</div>
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
											setCapturedImage(null);
											openCamera();
										}}
										className="bg-orange-500 hover:bg-orange-600 text-white"
									>
										Qayta olish
									</Button>
									<Button
										type="primary"
										onClick={sendPhotoToBackend}
										className="bg-green-600 hover:bg-green-700"
									>
										Tasdiqlash va yuklash
									</Button>
								</div>
							</div>
						)}
						<canvas ref={canvasRef} style={{ display: "none" }} />
					</div>
					<div>
						<h3 className="font-medium text-gray-900 mb-4">Attendance</h3>
						<div className="max-h-[300px] overflow-y-auto border border-gray-300 rounded-lg [&::-webkit-scrollbar]:hidden">
							<List
								dataSource={studentsData}
								className="!p-[10px]"
								renderItem={(student) => (
									<List.Item
										key={student.id}
										className="px-4 hover:bg-gray-50"
										actions={[
											<Switch
												checked={attendanceData.some(
													(attendance) =>
														attendance.studentId === student.id &&
														attendance.isPresent
												)}
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
							Present:{" "}
							{
								attendanceData.filter((attendance) => attendance.isPresent)
									.length
							}{" "}
							/ {studentsData.length}
						</div>
					</div>
				</div>
			</Modal>
		</div>
	);
};
export default SingleGroupPage;
