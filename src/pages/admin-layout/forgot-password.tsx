import {  UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select } from "antd";
// import { useNavigate } from "react-router-dom";
import { useForgotPassword } from "../../hooks/useAuth";
import { useState } from "react"
const ForgotPassword = () => {
	const { mutate, isPending } = useForgotPassword();
	const [otpSuccess, setOtpSuccess] = useState(false);
	// const navigate = useNavigate();
	const onFinish = async (values: any) => {
		const { email, role } = values;
		mutate(
			{ email, role },
			{
				onSuccess: (res: any) => {
					if (res?.status === 201) {
						setOtpSuccess(true);
					}
				},
			}
		);
	};

	return (
		<div
			style={{
				width: "100%",
				minHeight: "95vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				background: "#f0f2f5",
			}}
		>
			<Form
				name="forgot-password"
				hidden={otpSuccess}
				// initialValues={{ email: "", role: "" }}
				style={{
					maxWidth: 400,
					width: "100%",
					padding: "32px",
					background: "#fff",
					borderRadius: "8px",
					boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
					margin: "16px",
				}}
				onFinish={onFinish}
			>
				<h2
					style={{
						textAlign: "center",
						marginBottom: "24px",
						color: "#1a1a1a",
						fontWeight: 600,
					}}
				>
					Forgot Password
				</h2>

				<Form.Item
					name="email"
					rules={[{ required: true, message: "Please input your Email!" }]}
				>
					<Input
						prefix={<UserOutlined style={{ color: "#8c8c8c" }} />}
						placeholder="Enter your email"
						size="large"
						style={{
							borderRadius: "6px",
							padding: "10px",
						}}
					/>
				</Form.Item>
				<Form.Item
					name="role"
					rules={[{ required: true, message: "Please select a role!" }]}
				>
					<Select
						placeholder="Select your role"
						size="large"
						style={{ borderRadius: "6px" }}
					>
						<Select.Option value="student">Student</Select.Option>
						<Select.Option value="lid">Lid</Select.Option>
						<Select.Option value="teacher">Teacher</Select.Option>
						<Select.Option value="admin">Admin</Select.Option>
					</Select>
				</Form.Item>

				<Form.Item>
					<Button
						block
						type="primary"
						htmlType="submit"
						size="large"
						loading={isPending}
						style={{
							borderRadius: "6px",
							background: "#1677ff",
							border: "none",
							fontWeight: 500,
							transition: "all 0.3s",
						}}
					>
						Submit
					</Button>
				</Form.Item>

			</Form>

			<Form
				name="otp-verification"
				hidden={!otpSuccess}
				// initialValues={{ email: "", role: "" }}
				style={{
					maxWidth: 400,
					width: "100%",
					padding: "32px",
					background: "#fff",
					borderRadius: "8px",
					boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
					margin: "16px",
				}}
				onFinish={onFinish}
			>
				<h2
					style={{
						textAlign: "center",
						marginBottom: "24px",
						color: "#1a1a1a",
						fontWeight: 600,
					}}
				>
					OTP Verification
				</h2>

				

				<Form.Item>
					<Button
						block
						type="primary"
						htmlType="submit"
						size="large"
						loading={isPending}
						style={{
							borderRadius: "6px",
							background: "#1677ff",
							border: "none",
							fontWeight: 500,
							transition: "all 0.3s",
						}}
					>
						Verify
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};

export default ForgotPassword;
