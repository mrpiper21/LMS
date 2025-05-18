import { useState, useEffect } from "react";
import { Clock, Calendar, ClipboardList, AlertTriangle } from "lucide-react";
import { themeColors } from "../../../constant/Colors";

export default function HomePage() {
	const [currentTime, setCurrentTime] = useState("");
	const [upcomingItems] = useState([
		{
			type: "assignment",
			course: "Entrepreneurship",
			title: "Business Plan Submission",
			due: "2024-03-25",
		},
		{
			type: "exam",
			course: "Business Law",
			title: "Midterm Examination",
			due: "2024-04-01",
		},
		{
			type: "quiz",
			course: "Marketing",
			title: "Chapter 3 Weekly Quiz",
			due: "2024-03-28",
		},
	]);

	const [announcements] = useState([
		{
			title: "Final Exam Schedule Released",
			content:
				"Check the exams section for updated timetable and room allocations",
			date: "2024-03-24",
		},
		{
			title: "Grade Appeal Deadline",
			content:
				"Last date for grade appeals is April 5th. Submit through portal",
			date: "2024-03-22",
		},
	]);

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentTime(new Date().toLocaleTimeString());
		}, 1000);
		return () => clearInterval(timer);
	}, []);

	const getDueStatus = (dueDate: string) => {
		const due = new Date(dueDate);
		const today = new Date();
		const timeDiff = due.getTime() - today.getTime();
		const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));

		if (daysLeft === 0) return "Due today";
		if (daysLeft === 1) return "Due tomorrow";
		if (daysLeft < 0) return "Overdue";
		return `Due in ${daysLeft} days`;
	};

	return (
		<div
			className="min-h-screen"
			style={{ backgroundColor: themeColors.surfaces.background }}
		>
			<div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
				{/* Upcoming Deadlines Section */}
				<section>
					<h2
						className="text-xl font-semibold mb-4"
						style={{ color: themeColors.text.primary }}
					>
						Immediate Deadlines
					</h2>
					<div className="space-y-4">
						{upcomingItems.map((item, index) => (
							<div
								key={index}
								className="p-4 rounded-lg flex items-start gap-4 group transition-all"
								style={{
									backgroundColor: themeColors.surfaces.card,
									border: `2px solid ${themeColors.accents.hover}`,
								}}
							>
								<div className="flex-shrink-0">
									{item.type === "assignment" ? (
										<ClipboardList
											size={20}
											style={{ color: themeColors.accents.active }}
										/>
									) : (
										<AlertTriangle
											size={20}
											style={{ color: themeColors.states.error }}
										/>
									)}
								</div>
								<div className="flex-1">
									<div
										className="text-sm font-medium"
										style={{ color: themeColors.text.primary }}
									>
										{item.title}
									</div>
									<div
										className="text-xs mt-1"
										style={{ color: themeColors.text.secondary }}
									>
										{item.course}
									</div>
									<div className="flex items-center gap-3 mt-2">
										<Calendar
											size={14}
											style={{ color: themeColors.text.secondary }}
										/>
										<span
											className="text-xs font-medium"
											style={{
												color:
													getDueStatus(item.due) === "Overdue"
														? themeColors.states.error
														: themeColors.text.primary,
											}}
										>
											{getDueStatus(item.due)} •{" "}
											{new Date(item.due).toLocaleDateString()}
										</span>
									</div>
								</div>
							</div>
						))}
					</div>
				</section>

				{/* Announcements Section */}
				<section>
					<h2
						className="text-xl font-semibold mb-4"
						style={{ color: themeColors.text.primary }}
					>
						Latest Announcements
					</h2>
					<div className="space-y-4">
						{announcements.map((announcement, index) => (
							<div
								key={index}
								className="p-4 rounded-lg transition-all hover:shadow-md"
								style={{ backgroundColor: themeColors.surfaces.card }}
							>
								<div className="flex items-center gap-3 mb-2">
									<div
										className="w-2 h-2 rounded-full"
										style={{ backgroundColor: themeColors.accents.active }}
									/>
									<span
										className="text-xs font-medium"
										style={{ color: themeColors.text.secondary }}
									>
										{new Date(announcement.date).toLocaleDateString()}
									</span>
								</div>
								<h3
									className="font-medium mb-1"
									style={{ color: themeColors.text.primary }}
								>
									{announcement.title}
								</h3>
								<p
									className="text-sm"
									style={{ color: themeColors.text.secondary }}
								>
									{announcement.content}
								</p>
							</div>
						))}
					</div>
				</section>
			</div>

			{/* Quick Action Bar */}
			<div
				className="fixed bottom-0 left-0 right-0 p-3 border-t flex justify-center gap-6 backdrop-blur-sm"
				style={{
					backgroundColor: themeColors.surfaces.sidebar + "CC",
					borderColor: themeColors.accents.active,
				}}
			>
				<button
					className="flex items-center gap-2 px-4 py-2 rounded-full text-sm hover:scale-105 transition-transform"
					style={{ color: themeColors.text.primary }}
				>
					<Calendar size={16} />
					Schedule
				</button>
				<button
					className="flex items-center gap-2 px-4 py-2 rounded-full text-sm hover:scale-105 transition-transform"
					style={{ color: themeColors.text.primary }}
				>
					<ClipboardList size={16} />
					Submissions
				</button>
				<button
					className="flex items-center gap-2 px-4 py-2 rounded-full text-sm hover:scale-105 transition-transform"
					style={{ color: themeColors.text.primary }}
				>
					<AlertTriangle size={16} />
					Exams
				</button>
			</div>
		</div>
	);
}
