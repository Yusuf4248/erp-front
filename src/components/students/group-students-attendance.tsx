import type { LessonType } from "@types";
import { Tooltip } from "antd";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import AttendanceInfo from "./student-info-modal";
// import LessonModal from "../lessons/lesson-modal";
const windowWidth = window.innerWidth;
const GroupStudentAttendance = ({ data }: any) => {
	const attendance = data || [];
	// const [open, setOpen] = useState(false);
	const [openInfo, setOpenInfo] = useState(false);
	// const [update, setUpdate] = useState<LessonType | null>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const [scrollPosition, setScrollPosition] = useState(0);
	const [selectedLesson, setSelectedLesson] = useState<LessonType | null>(null);
	const handleScroll = () => {
		if (containerRef.current) {
			setScrollPosition(containerRef.current.scrollLeft);
		}
	};
	const go = (val: number) => {
		if (containerRef.current) {
			containerRef.current.scrollBy({ left: val * 200, behavior: "smooth" });
		}
	};
	const isStartDisabled = () => {
		if (!containerRef.current) return true;
		return scrollPosition <= 5;
	};
	const isEndDisabled = () => {
		if (!containerRef.current) return true;
		return (
			scrollPosition + containerRef.current.clientWidth >=
			containerRef.current.scrollWidth - 3
		);
	};
	// const updateItem = (lessonData: LessonType) => {
	// 	setOpen(true);
	// 	setUpdate(lessonData);
	// };
	// const toggle = () => {
	// 	setOpen((prev) => !prev);
	// 	if (update) {
	// 		setUpdate(null);
	// 	}
	// };
	const handleClickInfo = (lesson: LessonType) => {
		setSelectedLesson(lesson);
		setOpenInfo(true);
	};
	const toggleInfo = () => {
		setOpenInfo(!openInfo);
		setSelectedLesson(null);
	};
	const getStatusColor = (status: string) => {
		switch (status.toLowerCase()) {
			case "did not come":
				return "bg-gradient-to-br from-red-500 to-red-600 text-white border-red-300";
			case "come":
				return "bg-gradient-to-br from-green-500 to-green-600 text-white border-green-300";
		}
	};
	const formatDayAndMonth = (date: string) => {
		const newDate = date.split("T")[0];
		const [_, month, day] = newDate.split("-");
		return `${day}.${month}`;
	};
	// useEffect(() => {
	// 	if (containerRef.current && studentData.length > 0) {
	// 		const inProgressIndex = studentData.findIndex(
	// 			(lesson: LessonType) => lesson.status === "in_progress"
	// 		);

	// 		if (inProgressIndex !== -1) {
	// 			const lessonElements = Array.from(
	// 				containerRef.current.children[0].children
	// 			) as HTMLElement[];
	// 			const targetLessonElement = lessonElements[inProgressIndex];
	// 			if (targetLessonElement) {
	// 				targetLessonElement.scrollIntoView({
	// 					behavior: "smooth",
	// 					block: "center",
	// 					inline: "center",
	// 				});
	// 			}
	// 		} else {
	// 			containerRef.current.scrollTo({ left: 0, behavior: "smooth" });
	// 		}
	// 	}
	// }, [studentId]);
	return (
		<div
			hidden={attendance.length === 0}
			className="w-full bg-white rounded-2xl  border border-gray-100 overflow-hidden"
		>
			<div className="bg-gradient-to-r text-black px-4">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div>
							<p className="text-lg font-medium text-gray-900">Attendance</p>
						</div>
					</div>
					<div className="bg-white rounded-lg shadow p-4 flex flex-wrap items-center gap-4 text-gray-900 text-sm font-medium w-fit">
						<span>
							All: <span className="font-bold">{attendance.length}</span>
						</span>
						<span>
							<span className="inline-block px-2 py-0.5 rounded bg-green-100 text-green-700 font-semibold">
								Came
							</span>
							:
							<span className="ml-1">
								{attendance.filter((att: any) => att.status === "came").length}
							</span>
						</span>
						<span>
							<span className="inline-block px-2 py-0.5 rounded bg-red-100 text-red-700 font-semibold">
								Did not come
							</span>
							:
							<span className="ml-1">
								{
									attendance.filter((att: any) => att.status === "did not came")
										.length
								}
							</span>
						</span>
						<span>
							<span className="inline-block px-2 py-0.5 rounded bg-yellow-200 text-black font-semibold">
								Late
							</span>
							:
							<span className="ml-1">
								{attendance.filter((att: any) => att.status === "late").length}
							</span>
						</span>
						<span>
							<span className="inline-block px-2 py-0.5 rounded bg-gray-200 text-black font-semibold">
								pending
							</span>
							:
							<span className="ml-1">
								{
									attendance.filter((att: any) => att.status === "pending")
										.length
								}
							</span>
						</span>
					</div>
				</div>
			</div>

			<div className="relative p-6">
				<div className="flex items-center gap-4">
					<button
						onClick={() => go(-1)}
						disabled={isStartDisabled()}
						className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 hover:from-indigo-100 hover:to-indigo-200 disabled:from-gray-50 disabled:to-gray-100 border border-gray-200 flex items-center justify-center transition-all duration-300 hover:shadow-md disabled:cursor-not-allowed group"
					>
						<ChevronLeft className="w-5 h-5 text-gray-600 group-hover:text-indigo-600 group-disabled:text-gray-400" />
					</button>

					<div
						ref={containerRef}
						onScroll={handleScroll}
						className={`flex-1 overflow-x-auto hide-scrollbar`}
						style={{
							scrollbarWidth: "none",
							msOverflowStyle: "none",
							maxWidth: `${windowWidth - 500}px`,
						}}
					>
						<div className="flex gap-2 p-[10px]">
							{attendance.map((att: any, index: number) => {
								const dateInfo = formatDayAndMonth(att.date);
								return (
									<div
										key={att.id || index}
										onClick={() => handleClickInfo(att)}
										// onContextMenu={(e) => {
										// 	e.preventDefault();
										// 	updateItem(att);
										// }}
										className={`${getStatusColor(att.status)} 
                     flex-shrink-0 w-14 h-14 p-4 rounded-xl border-2 cursor-pointer 
                     transition-all duration-300 hover:shadow-lg hover:scale-105 
                     transform hover:-translate-y-1 relative overflow-hidden
										 bg-gray-200`}
									>
										<Tooltip
											title={att?.description || "No description"}
											color={
												att.status == "did not came"
													? "#E80A15"
													: att.status == "late"
													? "#FFD700"
													: att.status == "came"
													? "#008000"
													: "#ccc"
											}
										>
											<div className="text-center">
												<div className="text-[14px] font-bold">
													{dateInfo.split(".")[0]}
												</div>
												<div className="text-[10px] font-medium opacity-90">
													{dateInfo.split(".")[1]}
												</div>
											</div>

											<div
												className="absolute top-1 right-1 size-3"
												// onClick={(e) => {
												// 	e.preventDefault();
												// 	updateItem(att);
												// }}
											>
												<div
													className={`w-3 h-3 rounded-full ${
														att.status === "did not came"
															? "bg-red-500"
															: att.status === "pending"
															? "bg-gray-400"
															: att.status === "came"
															? "bg-green-500"
															: att.status === "late"
															? "bg-yellow-500"
															: "bg-gray-400"
													} opacity-80`}
												></div>
											</div>
										</Tooltip>
									</div>
								);
							})}
						</div>
					</div>
					<button
						onClick={() => go(1)}
						disabled={isEndDisabled()}
						className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 hover:from-indigo-100 hover:to-indigo-200 disabled:from-gray-50 disabled:to-gray-100 border border-gray-200 flex items-center justify-center transition-all duration-300 hover:shadow-md disabled:cursor-not-allowed group"
					>
						<ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-indigo-600 group-disabled:text-gray-400" />
					</button>
				</div>
			</div>
			{/* {open && <LessonModal open={open} toggle={toggle} update={update} />} */}

			{openInfo && (
				<AttendanceInfo
					open={openInfo}
					toggle={toggleInfo}
					attendance={selectedLesson}
				/>
			)}
		</div>
	);
};
export default GroupStudentAttendance;
