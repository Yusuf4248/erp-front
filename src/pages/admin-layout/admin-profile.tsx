import {
	CalendarOutlined,
	CameraOutlined,
	CloseOutlined,
	EditOutlined,
	EnvironmentOutlined,
	MailOutlined,
	PhoneOutlined,
	SaveOutlined,
	StarFilled,
	TeamOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { useAdmin, useAdmins } from "@hooks";
import {
	Avatar,
	Button,
	Card,
	Col,
	Form,
	Input,
	message,
	Rate,
	Row,
	Space,
	Tabs,
	Upload,
} from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { getItem } from "@helpers";
const { TabPane } = Tabs;
const AdminProfile = () => {
	const {useAdminUpdate,changePassword}= useAdmins();
	const {mutate:updateAdmin,isPending:updating}=useAdminUpdate()
	const {mutate:adminChangePassword,isPending:passwordLoading}=changePassword()
	const [isEditing, setIsEditing] = useState(false);
	const [form] = Form.useForm();
	const [activeTab, setActiveTab] = useState("1");
	const { data } = useAdmin();
	const adminData = data?.data;
	const user_id = getItem("user_id");
	const handleEdit = () => {
		setIsEditing(true);
		form.setFieldsValue({
			first_name: adminData?.first_name,
			last_name: adminData?.last_name,
			email: adminData?.email,
			phone: adminData?.phone,
		});
	};
	const handleSave = async () => {
		try {
			const values = await form.validateFields();
			updateAdmin({ id: +user_id!, data: values },{onSuccess:()=>handleCancel()});
		} catch (error) {
			console.error("Validation error:", error);
			message.error("Please fill all required fields correctly!");
		}
	};
	const handleCancel = () => {
		setIsEditing(false);
		form.resetFields();
	};
	const handleChangePassword = async (values: any) => {
		if (values.password !== values.confirm_password) {
			message.error("Password and confirm password are not the same!");
			return;
		}
		adminChangePassword({ id: +user_id!, data: values });
	};
	return (
		<div
			hidden={!adminData}
			className="space-y-6">
			<Card className="shadow-sm border border-gray-200">
				<div className="relative">
					<div className="absolute inset-0 bg-gradient-to-r from-gray-600 to-gray-400 rounded-lg h-44"></div>
					<div className="relative pt-8 pb-4">
						<div className="flex flex-col md:flex-row items-center md:items-end space-y-4 md:space-y-0 md:space-x-6 ml-10">
							<div className="relative">
								<Avatar
									size={120}
									icon={<UserOutlined />}
									src={adminData?.avatar_url || <UserOutlined />}
									className="border-4 border-white shadow-lg bg-white"
								/>
								{isEditing && (
									<Upload
										showUploadList={false}
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
									<>
										<h1 className="text-2xl font-bold text-gray-100 mb-1">
											{adminData?.first_name} {adminData?.last_name}
										</h1>
										<p className="text-gray-300 font-medium mb-2">
											{adminData?.role?.toUpperCase()}
										</p>
										<div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-300">
											<span className="flex items-center">
												<CalendarOutlined className="mr-1" />
												{new Date().getFullYear() -
													new Date(adminData?.created_at).getFullYear()}{" "}
												years experience
											</span>
											<span className="flex items-center">
												<StarFilled className="mr-1 text-yellow-500" />
												4.8 rating
											</span>
											<span className="flex items-center">
												<TeamOutlined className="mr-1" />
												{adminData?.branch?.length > 0
													? adminData?.branch?.map((branch: any) => branch.name)
															.join(" | ")
													: "No branches"}
											</span>
										</div>
									</>
								</div>
							</div>
							<div className="flex space-x-2 mr-5">
								{!isEditing ? (
									<Button
										type="primary"
										icon={<EditOutlined />}
										onClick={handleEdit}
										className="bg-blue-600 hover:bg-blue-700"
										loading={updating}
									>
										Edit
									</Button>
								) : (
									<Space>
										<Button
											type="primary"
											icon={<SaveOutlined />}
											onClick={handleSave}
											// loading={isUpdating}
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
													<div className="font-medium">
														{adminData?.email}
													</div>
												</div>
											</div>
											<div className="flex items-center">
												<PhoneOutlined className="text-gray-400 mr-3" />
												<div>
													<div className="text-sm text-gray-600">Phone</div>
													<div className="font-medium">
														{adminData?.phone}
													</div>
												</div>
											</div>
											<div className="flex items-center">
												<EnvironmentOutlined className="text-gray-400 mr-3" />
												<div>
													<div className="text-sm text-gray-600">Branches</div>
													<div className="font-medium">
														{adminData?.branch?.map((branch: any) => branch.name)
															.join(" | ")}
													</div>
												</div>
											</div>
										</div>
									) : (
										<Form form={form} layout="vertical">
											<div className="space-y-4">
												<Form.Item
													name="email"
													label="Email"
													rules={[
														{
															type: "email",
															message: "Please enter a valid email!",
														},
													]}
												>
													<Input prefix={<MailOutlined />} />
												</Form.Item>
												<div className="flex items-center">
													<PhoneOutlined className="text-gray-400 mr-3" />
													<div>
														<div className="text-sm text-gray-600">Phone</div>
														<div className="font-medium">
															{adminData?.phone}
														</div>
													</div>
												</div>
												<div className="flex items-center">
													<EnvironmentOutlined className="text-gray-400 mr-3" />
													<div>
														<div className="text-sm text-gray-600">
															Branches
														</div>
														<div className="font-medium">
															{adminData?.branch?.map((branch: any) => branch.name)
																.join(" | ")}
														</div>
													</div>
												</div>
											</div>
										</Form>
									)}
								</Card>
							</Col>
							<Col xs={24} lg={12}>
								<Card
									title="Professional Information"
									size="small"
									className="h-full"
								>
									<div className="space-y-3">
										<div>
											<div className="text-sm text-gray-600 mb-1">
												Department
											</div>
											<div className="font-medium">
												{adminData?.branch?.length > 0
													? adminData?.branch?.map((branch: any) => branch.name)
															.join(" | ")
													: "No department"}
											</div>
										</div>
										<div>
											<div className="text-sm text-gray-600 mb-1">
												Joined Date
											</div>
											<div className="font-medium">
												{dayjs(adminData?.created_at).format("DD.MM.YYYY")}
											</div>
										</div>
										<div>
											<div className="text-sm text-gray-600 mb-1">Salary</div>
											<div className="font-medium">5000000 UZS</div>
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
												<span className="font-medium">(4.8)</span>
											</div>
										</div>
									</div>
								</Card>
							</Col>
						</Row>
					</TabPane>
					<TabPane tab="Security" key="2">
						<Row gutter={[24, 24]}>
							<Col xs={24} lg={12}>
								<p className="text-gray-700 leading-relaxed text-lg font-bold">
									Change Password
								</p>
								<Form layout="vertical" onFinish={handleChangePassword}>
									<Form.Item name="old_password" label="Old Password">
										<Input.Password />
									</Form.Item>
									<Form.Item name="password" label="New Password">
										<Input.Password />
									</Form.Item>
									<Form.Item name="confirm_password" label="Confirm Password">
										<Input.Password />
									</Form.Item>
									<Button type="primary" htmlType="submit" loading={passwordLoading}>
										Change Password
									</Button>
								</Form>
							</Col>
						</Row>
					</TabPane>
				</Tabs>
			</Card>
		</div>
	);
	// return <div>AdminProfile</div>;
};
export default AdminProfile;
