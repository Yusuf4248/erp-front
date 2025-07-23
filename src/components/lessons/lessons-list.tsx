// import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
// import { Button, Tooltip } from "antd";
// import { useRef, useState } from "react";
// import type { GroupLessonType, LessonType } from "../../types";
// import LessonInfo from "./lesson-info-modal";
// import LessonModal from "./lesson-modal";
// const LessonsList = ({ lessons }: GroupLessonType) => {
// 	const [open, setOpen] = useState(false);
// 	const [openInfo, setOpenInfo] = useState(false);
// 	const [update, setUpdate] = useState<LessonType | null>(null);
// 	const containerRef = useRef<HTMLDivElement>(null);
// 	const [scrollPosition, setScrollPosition] = useState(0);
// 	const [selectedLesson, setSelectedLesson] = useState<LessonType | null>(null);
// 	const handleScroll = () => {
// 		if (containerRef.current) {
// 			setScrollPosition(containerRef.current.scrollLeft);
// 		}
// 	};
// 	const go = (val: number) => {
// 		if (containerRef.current) {
// 			containerRef.current.scrollBy({ left: val * 50, behavior: "smooth" });
// 		}
// 	};
// 	const isStartDisabled = () => {
// 		if (!containerRef.current) return true;
// 		return scrollPosition <= 5;
// 	};
// 	const isEndDisabled = () => {
// 		if (!containerRef.current) return true;
// 		return (
// 			scrollPosition + containerRef.current.clientWidth >=
// 			containerRef.current.scrollWidth - 3
// 		);
// 	};
// 	const formatDayAndMonth = (date: string) => {
// 		const newDate = date.split("T")[0];
// 		const [_, month, day] = newDate.split("-");
// 		return `${day}.${month}`;
// 	};
// 	const updateItem = (lessonData: LessonType) => {
// 		setOpen(true);
// 		setUpdate(lessonData);
// 	};
// 	const toggle = () => {
// 		setOpen(!open);
// 		if (update) {
// 			setUpdate(null);
// 		}
// 	};
// 	const handleClickInfo = (lesson: LessonType) => {
// 		setSelectedLesson(lesson);
// 		setOpenInfo(true);
// 	};
// 	const toggleInfo = () => {
// 		setOpenInfo(!openInfo);
// 		setSelectedLesson(null);
// 	};
// 	return (
// 		<>
// 			{open && <LessonModal open={open} toggle={toggle} update={update} />}
// 			{openInfo && (
// 				<LessonInfo
// 					open={openInfo}
// 					toggle={toggleInfo}
// 					lesson={selectedLesson}
// 				/>
// 			)}
// 			<div className="flex gap-2 items-center">
// 				<Button
// 					type="primary"
// 					onClick={() => go(-1)}
// 					disabled={isStartDisabled()}
// 				>
// 					<LeftCircleOutlined />
// 				</Button>
// 				<div
// 					className="overflow-scroll flex gap-1 [&::-webkit-scrollbar]:hidden"
// 					ref={containerRef}
// 					onScroll={handleScroll}
// 				>
// 					{lessons.map((lesson: LessonType) => {
// 						return (
// 							<div
// 								key={lesson.id}
// 								onClick={() => handleClickInfo(lesson)}
// 								onContextMenu={(e) => {
// 									e.preventDefault();
// 									updateItem(lesson);
// 								}}
// 								className={`${
// 									lesson.status == "bekor qilingan"
// 										? "bg-red-700 text-amber-50"
// 										: "text-black"
// 								} flex justify-center p-3 bg-[#ccc] rounded-lg hover:cursor-pointer min-w-[50px]`}
// 							>
// 								<span>
// 									<Tooltip
// 										title={lesson.notes}
// 										// title={`${lesson.notes}(${lesson.date.split("T")[0]})`}
// 										color={
// 											lesson.status == "bekor qilingan" ? "#B91C1C" : "#ccc"
// 										}
// 										overlayInnerStyle={
// 											lesson.status == "bekor qilingan"
// 												? { color: "#fff" }
// 												: { color: "#000" }
// 										}
// 									>
// 										{formatDayAndMonth(lesson.date)}
// 									</Tooltip>
// 								</span>
// 							</div>
// 						);
// 					})}
// 				</div>
// 				<Button type="primary" onClick={() => go(1)} disabled={isEndDisabled()}>
// 					<RightCircleOutlined />
// 				</Button>
// 			</div>
// 		</>
// 	);
// };

// export default LessonsList;

import { Tooltip } from "antd";
import {
	BookOpen,
	Calendar,
	ChevronLeft,
	ChevronRight,
} from "lucide-react";
import { useRef, useState } from "react";
import type { LessonType } from "../../types/section";
import LessonInfo from "./lesson-info-modal";
import LessonModal from "./lesson-modal";

const LessonsList = ({ lessons }: any) => {
	const [open, setOpen] = useState(false);
	const [openInfo, setOpenInfo] = useState(false);
	const [update, setUpdate] = useState<LessonType | null>(null);
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

	const updateItem = (lessonData: LessonType) => {
		setOpen(true);
		setUpdate(lessonData);
	};

	const toggle = () => {
		setOpen((prev) => !prev);
		if (update) {
			setUpdate(null);
		}
	};

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
			case "bekor qilingan":
				return "bg-gradient-to-br from-red-500 to-red-600 text-white border-red-300";
			case "tugagan":
				return "bg-gradient-to-br from-green-500 to-green-600 text-white border-green-300";
			case "yangi":
				return "bg-[#ccc] text-black border-blue-300";
			default:
				return "bg-gradient-to-br  to-gray-200 text-gray-800 border-gray-300 hover:from-gray-200 hover:to-gray-300";
		}
	};
	const formatDayAndMonth = (date: string) => {
		const newDate = date.split("T")[0];
		const [_, month, day] = newDate.split("-");
		return `${day}.${month}`;
	};
	const getDayName = (dateString: string) => {
		const date = new Date(dateString);
		const options: Intl.DateTimeFormatOptions = { weekday: "long" };
		return date.toLocaleDateString("uz-UZ", options);
	};
	return (
		<div className="w-full bg-white rounded-2xl  border border-gray-100 overflow-hidden mb-5">
			{/* Header */}
			<div className="bg-gradient-to-r text-black px-6 py-4">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div className="p-2 bg-white/20 rounded-lg">
							<Calendar className="w-5 h-5 text-white" />
						</div>
						<div>
							<h2 className="text-lg font-medium text-gray-900">Lessons</h2>
							<p className="text-sm font-medium text-gray-900">Group lessons</p>
						</div>
					</div>
					<div className="text-gray-900 text-sm font-medium">
						All lessons: {lessons.length}
					</div>
				</div>
			</div>

			<div className="relative p-6">
				<div className="flex items-center gap-4">
					<button
						onClick={() => go(-1)}
						disabled={isStartDisabled()}
						className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 hover:from-indigo-100 hover:to-indigo-200 disabled:from-gray-50 disabled:to-gray-100 border border-gray-200 flex items-center justify-center transition-all duration-300 hover:shadow-md disabled:cursor-not-allowed group"
					>
						<ChevronLeft className="w-5 h-5 text-gray-600 group-hover:text-indigo-600 group-disabled:text-gray-400" />
					</button>

					<div
						ref={containerRef}
						onScroll={handleScroll}
						className="flex-1 overflow-x-auto scrollbar-hide"
						style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
					>
						<div className="flex gap-4 p-[10px]">
							{lessons.map((lesson: LessonType, index: number) => {
								const dateInfo = formatDayAndMonth(lesson.date);
								const dayName = getDayName(lesson.date).slice(0, 3);

								return (
									<div
										key={lesson.id || index}
										onClick={() => handleClickInfo(lesson)}
										onContextMenu={(e) => {
											e.preventDefault();
											updateItem(lesson);
										}}
										className={`${getStatusColor(lesson.status)} 
                      flex-shrink-0 w-48 p-4 rounded-xl border-2 cursor-pointer 
                      transition-all duration-300 hover:shadow-lg hover:scale-105 
                      transform hover:-translate-y-1 relative overflow-hidden`}
									>
										<Tooltip
											title={lesson?.notes}
											color={
												lesson.status == "bekor qilingan" ? "#E80A15" : "#ccc"
											}
											overlayInnerStyle={
												lesson.status == "bekor qilingan"
													? { color: "#fff" }
													: { color: "#000" }
											}
										>
											<div className="text-center mb-3">
												<div className="text-2xl font-bold">
													{dateInfo.split(".")[0]}
												</div>
												<div className="text-sm font-medium opacity-90">
													{dateInfo.split(".")[1]}
												</div>
												<div className="text-xs opacity-75 mt-1">{dayName}</div>
											</div>

											<div className="space-y-2">
												{lesson.title && (
													<div className="flex items-center gap-2">
														<BookOpen className="w-4 h-4 opacity-80" />
														<span className="text-sm font-medium truncate">
															{lesson.title}
														</span>
													</div>
												)}


												
											</div>
											<div className="absolute top-2 right-2">
												<div
													className={`w-3 h-3 rounded-full ${
														lesson.status === "bekor qilingan"
															? "bg-red-500"
															: lesson.status === "yangi"
															? "bg-gray-400"
															: ""
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

			<div className="border-t border-gray-100 px-6 py-4 bg-gray-50/50">
				<div className="flex items-center justify-between text-sm text-gray-600">
					<div className="flex items-center gap-4">
						<div className="flex items-center gap-2">
							<div className="w-3 h-3 rounded-full bg-gray-400"></div>
							<span>Scheduled</span>
						</div>
						<div className="flex items-center gap-2">
							<div className="w-3 h-3 rounded-full bg-red-500"></div>
							<span>Canceld</span>
						</div>
					</div>
				</div>
			</div>

			{open && <LessonModal open={open} toggle={toggle} update={update} />}

			{openInfo && (
				<LessonInfo
					open={openInfo}
					toggle={toggleInfo}
					lesson={selectedLesson}
				/>
			)}
		</div>
	);
};

export default LessonsList;
