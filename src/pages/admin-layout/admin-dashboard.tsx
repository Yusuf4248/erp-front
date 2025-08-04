import {
	BankOutlined,
	BookOutlined,
	CalendarOutlined,
	TeamOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { useBranches, useGroups, useStudents } from "@hooks";
import { Card, Statistic, Typography } from "antd";
import React, { useMemo } from "react";

const { Title } = Typography;

const Dashboard: React.FC = () => {
	const groupsParams = useMemo(() => ({}), []);
	const studentsParams = useMemo(() => ({page:1,limit:1000}), []);
	const branchesParams = useMemo(() => ({}), []);

	const { data: groupsData } = useGroups(groupsParams);
	const { data: studentsData } = useStudents(studentsParams);
	const { data: branchesData } = useBranches(branchesParams);
	const stats = useMemo(() => {
		const groups = groupsData?.data?.data || [];
		const students = studentsData?.data?.data || [];
		const branches = branchesData?.data?.branch || [];

		return {
			totalStudents: students.length,
			activeStudents: students.filter(
				(student: any) => student.status === "active"
			).length,
			totalGroups: groups.length,
			activeGroups: groups.filter((group: any) => group.status === "active")
				.length,
			totalBranches: branches.length,
			upcomingEvents: 3,
		};
	}, [groupsData, studentsData, branchesData]);

	return (
		<div className="w-full max-w-full p-2 sm:p-4 md:p-6">
			<Title level={3} className="mb-6 !text-2xl !font-semibold">
				Dashboard
			</Title>
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
		</div>
	);
};

export default Dashboard;
