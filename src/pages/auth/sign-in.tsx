import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { setItem } from "@helpers";
import { Button, Form, Input, Select } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { jwtDecode } from "jwt-decode";
const SignIn = () => {
  const { mutate, isPending } = useAuth();
	const navigate = useNavigate();

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const onFinish = async (values: any) => {
		const { email, password, role } = values;
		const payload = { email, password };
		mutate(
			{ data: payload, role },
			{
				onSuccess: (res: any) => {
					if (res?.status === 201) {
						const decoded:any = jwtDecode(res.data.access_token);
						setItem("access_token", res.data.access_token);
						setItem("role", role);
						setItem("user_id", decoded.id);
						navigate(`/${role}/dashboard`);
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
				name="login"
				initialValues={{ remember: true }}
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
					Sign In
				</h2>

				<Form.Item
					name="email"
					rules={[{ required: true, message: "Please input your Email!" }]}
				>
					<Input
						prefix={<UserOutlined style={{ color: "#8c8c8c" }} />}
						placeholder="Email"
						size="large"
						style={{
							borderRadius: "6px",
							padding: "10px",
						}}
					/>
				</Form.Item>

				<Form.Item
					name="password"
					rules={[{ required: true, message: "Please input your Password!" }]}
				>
					<Input.Password
						prefix={<LockOutlined style={{ color: "#8c8c8c" }} />}
						placeholder="Password"
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
						Log In
					</Button>
				</Form.Item>

				<div
					style={{
						textAlign: "center",
						color: "#8c8c8c",
						fontSize: "14px",
					}}
				>
					Don't have an account? <a href="/signup">Sign Up</a>
				</div>
			</Form>
		</div>
	);
};

export default SignIn;
