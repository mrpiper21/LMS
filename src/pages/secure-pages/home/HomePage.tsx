import { useState, useEffect } from "react";
import {
	Clock,
	Calendar as CalendarIcon,
	ClipboardList,
	AlertTriangle,
} from "lucide-react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { themeColors } from "../../../constant/Colors";

type ValuePiece = Date | null;
type CalendarValue = ValuePiece | [ValuePiece, ValuePiece];

export default function HomePage() {
	const [currentTime, setCurrentTime] = useState("");
	const [calendarDate, setCalendarDate] = useState<CalendarValue>(new Date());

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

	const calendarStyles = {
		backgroundColor: themeColors.surfaces.card,
		border: `2px solid ${themeColors.accents.active}`,
		borderRadius: "12px",
		padding: "1rem",
		color: themeColors.text.primary,
	};

	const calendarTileStyles = ({ date }: { date: Date }) => ({
		color: themeColors.text.primary,
		backgroundColor:
			date.getDay() === 0 ? themeColors.accents.hover + "40" : "transparent",
	});

	return (
		<div
			className="min-h-screen pb-16"
			style={{ backgroundColor: themeColors.surfaces.background }}
		>
			<div className="p-6 max-w-7xl mx-auto">
				{/* Header Section */}
				<header className="mb-8">
					<h1
						className="text-3xl font-bold"
						style={{ color: themeColors.text.primary }}
					>
						Academic Announcements
					</h1>
					<p
						className="text-sm mt-2"
						style={{ color: themeColors.text.secondary }}
					>
						{new Date().toLocaleDateString(undefined, {
							weekday: "long",
							year: "numeric",
							month: "long",
							day: "numeric",
						})}
					</p>
				</header>

				{/* Time & Calendar Section */}
				<section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
					<div
						className="p-6 rounded-xl flex flex-col items-center justify-center"
						style={{
							backgroundColor: themeColors.surfaces.card,
							border: `2px solid ${themeColors.accents.active}`,
						}}
					>
						<div className="flex items-center gap-4 mb-4">
							<Clock size={32} style={{ color: themeColors.accents.active }} />
							<div
								className="text-4xl font-bold"
								style={{ color: themeColors.text.primary }}
							>
								{currentTime}
							</div>
						</div>
						<div
							className="text-lg text-center"
							style={{ color: themeColors.text.secondary }}
						>
							{new Date().toLocaleDateString(undefined, {
								weekday: "long",
								month: "long",
								day: "numeric",
								year: "numeric",
							})}
						</div>
					</div>

					<div style={calendarStyles}>
						<Calendar
							value={calendarDate}
							onChange={setCalendarDate}
							tileClassName="hover:bg-opacity-20 transition-colors"
							tileStyle={calendarTileStyles}
							navigationLabel={({ label }) => (
								<span
									style={{ color: themeColors.text.primary, fontWeight: 600 }}
								>
									{label}
								</span>
							)}
							nextLabel={
								<span
									style={{
										color: themeColors.text.primary,
										fontSize: "1.2rem",
									}}
								>
									›
								</span>
							}
							prevLabel={
								<span
									style={{
										color: themeColors.text.primary,
										fontSize: "1.2rem",
									}}
								>
									‹
								</span>
							}
							next2Label={null}
							prev2Label={null}
							formatShortWeekday={(_, date) =>
								["S", "M", "T", "W", "T", "F", "S"][date.getDay()]
							}
							className="[&_.react-calendar__tile--now]:bg-accent-hover/40 [&_.react-calendar__tile--active]:bg-accent-active/30"
						/>
					</div>
				</section>

				{/* Content Sections */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					{/* Upcoming Deadlines Section */}
					<section>
						<h2
							className="text-xl font-semibold mb-4 flex items-center gap-2"
							style={{ color: themeColors.text.primary }}
						>
							<AlertTriangle
								size={20}
								style={{ color: themeColors.accents.active }}
							/>
							Immediate Deadlines
						</h2>
						<div className="space-y-4">
							{upcomingItems.map((item, index) => (
								<div
									key={index}
									className="p-4 rounded-xl flex items-start gap-4 group transition-all hover:shadow-md"
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
											<CalendarIcon
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
							className="text-xl font-semibold mb-4 flex items-center gap-2"
							style={{ color: themeColors.text.primary }}
						>
							<ClipboardList
								size={20}
								style={{ color: themeColors.accents.active }}
							/>
							Latest Announcements
						</h2>
						<div className="space-y-4">
							{announcements.map((announcement, index) => (
								<div
									key={index}
									className="p-4 rounded-xl group transition-all hover:shadow-md relative overflow-hidden"
									style={{
										backgroundColor: themeColors.surfaces.card,
										border: `2px solid ${themeColors.accents.hover}`,
									}}
								>
									<div
										className="absolute left-0 top-0 h-full w-2"
										style={{ backgroundColor: themeColors.accents.active }}
									/>
									<div className="pl-4">
										<div className="flex items-center gap-3 mb-2">
											<span
												className="text-xs font-medium"
												style={{ color: themeColors.text.secondary }}
											>
												{new Date(announcement.date).toLocaleDateString()}
											</span>
										</div>
										<h3
											className="font-medium mb-1 text-lg"
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
								</div>
							))}
						</div>
					</section>
				</div>
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
					style={{
						color: themeColors.text.primary,
						backgroundColor: themeColors.surfaces.card,
					}}
				>
					<CalendarIcon size={16} />
					Schedule
				</button>
				<button
					className="flex items-center gap-2 px-4 py-2 rounded-full text-sm hover:scale-105 transition-transform"
					style={{
						color: themeColors.text.primary,
						backgroundColor: themeColors.surfaces.card,
					}}
				>
					<ClipboardList size={16} />
					Submissions
				</button>
				<button
					className="flex items-center gap-2 px-4 py-2 rounded-full text-sm hover:scale-105 transition-transform"
					style={{
						color: themeColors.text.primary,
						backgroundColor: themeColors.surfaces.card,
					}}
				>
					<AlertTriangle size={16} />
					Exams
				</button>
			</div>
		</div>
	);
}