import { UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Select } from "antd";
import Countdown from "antd/es/statistic/Countdown";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
	useForgotPassword,
	useSetNewPassword,
	useVerifyOtp,
} from "../../hooks/useAuth";
const ForgotPassword = () => {
	const { mutate, isPending } = useForgotPassword();
	const { mutate: verifyOtp, isPending: isVerifyOtpPending } = useVerifyOtp();
	const { mutate: setNewPassword, isPending: isSetNewPasswordPending } =
		useSetNewPassword();
	const [otpSuccess, setOtpSuccess] = useState(false);
	const [newPasswordSuccess, setNewPasswordSuccess] = useState(false);
	const navigate = useNavigate();
	const onFinish = async (values: any) => {
		const { email, role } = values;
		mutate(
			{ email, role },
			{
				onSuccess: (res: any) => {
					if (res?.status === 201) {
						setOtpSuccess(true);
						setCountdown(Date.now() + 3 * 60 * 1000);
					}
				},
			}
		);
	};
	const onFinishOtp = async (values: any) => {
		const { otp } = values;
		verifyOtp(
			{ otp: Number(otp) },
			{
				onSuccess: (res: any) => {
					if (res?.status === 201) {
						setNewPasswordSuccess(true);
					}
				},
			}
		);
	};
	const onFinishNewPassword = async (values: any) => {
		const { password, confirm_password } = values;
		setNewPassword(
			{ password, confirm_password },
			{
				onSuccess: () => {
					navigate("/");
				},
			}
		);
	};
	const [countdown, setCountdown] = useState(Date.now() + 3 * 60 * 1000);
	return (
		<>
			<Modal
				open={newPasswordSuccess}
				onCancel={() => setNewPasswordSuccess(false)}
				footer={null}
			>
				<Form name="new-password" onFinish={onFinishNewPassword}>
					<div className="text-center text-2xl font-bold mb-4">New Password</div>
					<Form.Item
						name="password"
						rules={[
							{ required: true, message: "Please input your new password!" },
						]}
					>
						<Input.Password placeholder="Enter your new password" />
					</Form.Item>
					<Form.Item
						name="confirm_password"
						rules={[
							{
								required: true,
								message: "Please input your confirm password!",
							},
						]}
					>
						<Input.Password placeholder="Enter your confirm password" />
					</Form.Item>
					<Form.Item>
						<Button
							type="primary"
							htmlType="submit"
							loading={isSetNewPasswordPending}
						>
							Submit
						</Button>
					</Form.Item>
				</Form>
			</Modal>
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
						<div className="text-center text-sm text-gray-500 mt-2">
							<Link to="/">Back to Login</Link>
						</div>
				</Form>
				<Form
					name="otp-verification"
					hidden={!otpSuccess}
					style={{
						maxWidth: 400,
						width: "100%",
						padding: "32px",
						background: "#fff",
						borderRadius: "8px",
						boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
						margin: "16px",
					}}
					onFinish={onFinishOtp}
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
					<div className="flex justify-center items-center mb-4">
						<label className="text-center text-lg mr-2">Expire in: </label>
						<Countdown
							value={countdown}
							format="mm:ss"
							valueStyle={{
								color: "#000",
								fontSize: "18px",
							}}
							onFinish={() => {
								setOtpSuccess(false);
							}}
						/>
					</div>
					<Form.Item
						name="otp"
						rules={[{ required: true, message: "Please input your Email!" }]}
					>
						<Input.OTP autoFocus formatter={(str) => str.toUpperCase()} />
					</Form.Item>
					<Form.Item>
						<Button
							block
							type="primary"
							htmlType="submit"
							size="large"
							loading={isVerifyOtpPending}
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
		</>
	);
};

export default ForgotPassword;
