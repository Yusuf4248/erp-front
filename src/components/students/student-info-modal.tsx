import { Modal, Tag, Typography } from "antd";
const { Title, Text } = Typography;
const StudentInfo = ({ open, toggle, attendance }: any) => {
	return (
		<>
			<Modal
				title={
					<Title level={3} style={{ color: "#000", margin: 0 }}>
						Attendance Details
					</Title>
				}
				open={open}
				onCancel={toggle}
				footer={null}
				style={{ top: "20px" }}
				width={400}
			>
				<div
					style={{
						padding: "20px",
						background: "#fafafa",
						borderRadius: "8px",
					}}
				>
					<Text
						strong
						style={{ display: "block", marginBottom: "10px", color: "#333" }}
					>
						Description
					</Text>
					<Text
						type="secondary"
						style={{ display: "block", marginBottom: "15px" }}
					>
						{attendance.description||"No description"}
					</Text>
					<div style={{ marginBottom: "15px" }}>
						<Text strong style={{ marginRight: "10px" }}>
							Date:
						</Text>
						<Text>{new Date(attendance.date).toLocaleDateString()}</Text>
					</div>
					<div style={{ marginBottom: "15px" }}>
						<Text strong style={{ marginRight: "10px" }}>
							Status:
						</Text>
						<Tag
							color={
								attendance.status === "did not came"
									? "red"
									: attendance.status === "late"
									? "yellow"
									: attendance.status === "came"
									? "green"
									: "gray"
							}
						>
							{attendance.status}
						</Tag>
					</div>
					{attendance.lesson &&(
						<>
						<div style={{ marginBottom: "15px" }}>
						<Text strong style={{ marginRight: "10px" }}>
							Lesson:
						</Text>
						<Text>{attendance.lesson.title}</Text>
					</div>
					<div style={{ marginBottom: "15px" }}>
					<Text strong style={{ marginRight: "10px" }}>
						Lesson note:
					</Text>
					<Text>{attendance.lesson.notes}</Text>
				</div>
				</>
					)}
				</div>
			</Modal>
		</>
	);
};

export default StudentInfo;
