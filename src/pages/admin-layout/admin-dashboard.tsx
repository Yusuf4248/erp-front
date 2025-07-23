import {
	BankOutlined,
	BookOutlined,
	CalendarOutlined,
	TeamOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { Card, Col, Row, Statistic, Table, Typography } from "antd";
import React from "react";

const { Title } = Typography;

const Dashboard: React.FC = () => {
	// Statistik ma'lumotlar (API dan yoki mock data)
	const stats = {
		totalStudents: 1245,
		activeStudents: 892,
		totalGroups: 56,
		activeGroups: 42,
		totalBranches: 8,
		upcomingEvents: 3,
	};

	// So'ngi faolliklar jadvali uchun ma'lumotlar
	const recentActivities = [
		{
			key: "1",
			student: "Ali Valiyev",
			action: "Yangi ro'yxatdan o'tdi",
			date: "2023-05-15",
		},
		{
			key: "2",
			student: "Gulnora Karimova",
			action: "Guruhga qo'shildi",
			date: "2023-05-14",
		},
		{
			key: "3",
			student: "Jamshid To'xtayev",
			action: "To'lov qildi",
			date: "2023-05-13",
		},
	];

	const columns = [
		{
			title: "O'quvchi",
			dataIndex: "student",
			key: "student",
		},
		{
			title: "Harakat",
			dataIndex: "action",
			key: "action",
		},
		{
			title: "Sana",
			dataIndex: "date",
			key: "date",
		},
	];

	return (
		<div className="p-2 sm:p-4 md:p-6">
			<Title level={3} style={{ marginBottom: "24px" }}>
				Dashboard
			</Title>

			{/* Asosiy statistik kartalar */}
			<Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
				<Col xs={24} sm={12} md={8} lg={6} xl={4}>
					<Card>
						<Statistic
							title="Jami O'quvchilar"
							value={stats.totalStudents}
							prefix={<UserOutlined />}
						/>
					</Card>
				</Col>
				<Col xs={24} sm={12} md={8} lg={6} xl={4}>
					<Card>
						<Statistic
							title="Faol O'quvchilar"
							value={stats.activeStudents}
							prefix={<TeamOutlined />}
						/>
					</Card>
				</Col>
				<Col xs={24} sm={12} md={8} lg={6} xl={4}>
					<Card>
						<Statistic
							title="Jami Guruhlar"
							value={stats.totalGroups}
							prefix={<BookOutlined />}
						/>
					</Card>
				</Col>
				<Col xs={24} sm={12} md={8} lg={6} xl={4}>
					<Card>
						<Statistic
							title="Faol Guruhlar"
							value={stats.activeGroups}
							prefix={<BookOutlined />}
						/>
					</Card>
				</Col>
				<Col xs={24} sm={12} md={8} lg={6} xl={4}>
					<Card>
						<Statistic
							title="Filiallar"
							value={stats.totalBranches}
							prefix={<BankOutlined />}
						/>
					</Card>
				</Col>
				<Col xs={24} sm={12} md={8} lg={6} xl={4}>
					<Card>
						<Statistic
							title="Yaqin Tadbirlar"
							value={stats.upcomingEvents}
							prefix={<CalendarOutlined />}
						/>
					</Card>
				</Col>
			</Row>

			{/* Grafiklar va qo'shimcha statistikalar */}
			<Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
				<Col span={24} md={12}>
					<Card title="O'quvchilar statistikasi (oylik)">
						<div style={{ height: "300px" }}>
							{/* Bu yerga Chart.js yoki Ant Design Chart qo'yishingiz mumkin */}
							<div
								style={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									height: "100%",
									background: "#f0f2f5",
									borderRadius: "8px",
								}}
							>
								<span>Oylik o'quvchilar statistikasi grafigi</span>
							</div>
						</div>
					</Card>
				</Col>
				<Col span={24} md={12}>
					<Card title="To'lovlar statistikasi">
						<div style={{ height: "300px" }}>
							{/* Bu yerga Chart.js yoki Ant Design Chart qo'yishingiz mumkin */}
							<div
								style={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									height: "100%",
									background: "#f0f2f5",
									borderRadius: "8px",
								}}
							>
								<span>To'lovlar statistikasi grafigi</span>
							</div>
						</div>
					</Card>
				</Col>
			</Row>

			{/* So'nggi faolliklar */}
			<Card title="So'nggi Faolliklar">
				<div className="overflow-x-auto">
					<Table
						columns={columns}
						dataSource={recentActivities}
						pagination={false}
						size="middle"
					/>
				</div>
			</Card>
		</div>
	);
};

export default Dashboard;
