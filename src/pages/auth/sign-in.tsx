import { useState } from "react";
import { Button, Input, Card, Typography } from "antd";
import { authService } from "@services";
import { useNavigate } from "react-router-dom";
import { setItem } from "@helpers";

const { Title } = Typography;

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const submit = async () => {
    const payload = { email, password };
    const res = await authService.signIn(payload, role);
    if (res.status == 201) {
      setItem("access_token", res.data.access_token);
      setItem("role", role);
      navigate(`/${role}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card
        className="w-full max-w-sm p-3 shadow-md rounded-lg"
        style={{ border: "none", maxWidth: "300px", background: "#ffffff" }}
      >
        <div className="text-center mb-2">
          <Title level={5} className="text-gray-900 font-light">
            Sign In
          </Title>
        </div>
        <div className="space-y-1.5">
          <Input
            type="email"
            placeholder="Email..."
            size="large"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-md border-gray-200 focus:border-gray-300"
            style={{ padding: "0.3rem", fontSize: "14px" }}
          />
          <Input.Password
            placeholder="Password..."
            size="large"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-md border-gray-200 focus:border-gray-300"
            style={{ padding: "0.3rem", fontSize: "14px" }}
          />
          <Button
            type="primary"
            size="large"
            onClick={submit}
            block
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-md text-white"
            style={{ height: "34px", fontSize: "14px" }}
          >
            Submit
          </Button>
        </div>
      </Card>
      <select onChange={(e) => setRole(e.target.value)}>
        <option value="teacher">Teacher</option>
        <option value="student">Student</option>
        <option value="admin">Admin</option>
        <option value="lid">Lid</option>
      </select>
    </div>
  );
};

export default SignIn;
