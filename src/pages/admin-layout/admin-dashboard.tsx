import {
	BankOutlined,
	BookOutlined,
	CalendarOutlined,
	TeamOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { Card, Statistic, Table, Typography } from "antd";
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
		<div className="w-full max-w-full p-2 sm:p-4 md:p-6">
			<Title level={3} className="mb-6 !text-2xl !font-semibold">
				Dashboard
			</Title>
			{/* Statistik kartalar */}
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
				<Card className="!p-0 !rounded-lg !shadow !border-0">
					<Statistic
						title="Jami O'quvchilar"
						value={stats.totalStudents}
						prefix={<UserOutlined />}
					/>
				</Card>
				<Card className="!p-0 !rounded-lg !shadow !border-0">
					<Statistic
						title="Faol O'quvchilar"
						value={stats.activeStudents}
						prefix={<TeamOutlined />}
					/>
				</Card>
				<Card className="!p-0 !rounded-lg !shadow !border-0">
					<Statistic
						title="Jami Guruhlar"
						value={stats.totalGroups}
						prefix={<BookOutlined />}
					/>
				</Card>
				<Card className="!p-0 !rounded-lg !shadow !border-0">
					<Statistic
						title="Faol Guruhlar"
						value={stats.activeGroups}
						prefix={<BookOutlined />}
					/>
				</Card>
				<Card className="!p-0 !rounded-lg !shadow !border-0">
					<Statistic
						title="Filiallar"
						value={stats.totalBranches}
						prefix={<BankOutlined />}
					/>
				</Card>
				<Card className="!p-0 !rounded-lg !shadow !border-0">
					<Statistic
						title="Yaqin Tadbirlar"
						value={stats.upcomingEvents}
						prefix={<CalendarOutlined />}
					/>
				</Card>
			</div>
			{/* Grafiklar va qo'shimcha statistikalar */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
				<Card
					title="O'quvchilar statistikasi (oylik)"
					className="!rounded-lg !shadow !border-0"
				>
					<div className="h-72 flex items-center justify-center bg-gray-50 rounded-lg">
						<span className="text-gray-400">
							Oylik o'quvchilar statistikasi grafigi
						</span>
					</div>
				</Card>
				<Card
					title="To'lovlar statistikasi"
					className="!rounded-lg !shadow !border-0"
				>
					<div className="h-72 flex items-center justify-center bg-gray-50 rounded-lg">
						<span className="text-gray-400">
							To'lovlar statistikasi grafigi
						</span>
					</div>
				</Card>
			</div>
			{/* So'nggi faolliklar */}
			<Card
				title="So'nggi Faolliklar"
				className="!rounded-lg !shadow !border-0"
			>
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
