import {
	BookOpen,
	Calendar,
	Clock,
	FileText,
	Info,
	List,
	MessageCircle,
	AlertCircle,
	BarChart2,
	Bell,
	X,
} from "lucide-react";
import { themeColors } from "../../../constant/Colors";

const OverviewPage = () => {
	const upcomingAssignments = [
		{
			id: 1,
			title: "Research Paper Draft",
			course: "English Composition 101",
			dueDate: "May 25, 2025",
			status: "In Progress",
		},
		{
			id: 2,
			title: "Physics Lab Report",
			course: "Physics 202",
			dueDate: "May 22, 2025",
			status: "Not Started",
		},
		{
			id: 3,
			title: "Economic Analysis",
			course: "Economics 310",
			dueDate: "May 20, 2025",
			status: "Submitted",
		},
	];

	const courseProgress = [
		{ id: 1, name: "English Composition 101", progress: 65, grade: "B+" },
		{ id: 2, name: "Physics 202", progress: 78, grade: "A-" },
		{ id: 3, name: "Economics 310", progress: 92, grade: "A" },
		{ id: 4, name: "History of Art", progress: 45, grade: "C+" },
	];

	const announcements = [
		{
			id: 1,
			title: "Final Exam Schedule Posted",
			course: "All Courses",
			date: "May 15, 2025",
		},
		{
			id: 2,
			title: "Guest Lecture: Dr. Smith on Quantum Physics",
			course: "Physics 202",
			date: "May 19, 2025",
		},
	];

	const recentActivity = [
		{
			id: 1,
			type: "Assignment",
			title: "Term Paper Feedback",
			course: "English Composition 101",
			date: "May 16, 2025",
		},
		{
			id: 2,
			type: "Discussion",
			title: "Week 10 Discussion",
			course: "Economics 310",
			date: "May 15, 2025",
		},
		{
			id: 3,
			type: "Quiz",
			title: "Chapter 8 Quiz",
			course: "Physics 202",
			date: "May 14, 2025",
		},
	];

	return (
		<div
			className="w-full min-h-screen"
			style={{ backgroundColor: themeColors.surfaces.background }}
		>
			{/* Cache Clearing Notice */}
			<div
				className="w-full p-4 mb-6 flex items-center justify-between"
				style={{ backgroundColor: themeColors.surfaces.navBar }}
			>
				<div className="flex items-center">
					<AlertCircle
						size={20}
						className="mr-2"
						style={{ color: themeColors.primary.main }}
					/>
					<span
						className="font-medium"
						style={{ color: themeColors.primary.main }}
					>
						myatu.net has been upgraded. Please clear your browser cache if you
						experience any issues.
					</span>
				</div>
				<button className="p-1 rounded-full hover:bg-white hover:bg-opacity-20">
					<X size={20} style={{ color: themeColors.primary.main }} />
				</button>
			</div>

			{/* Page Header */}
			<div className="px-8 py-6">
				<h1
					className="text-2xl font-bold"
					style={{ color: themeColors.text.primary }}
				>
					Dashboard Overview
				</h1>
				<p className="mt-2" style={{ color: themeColors.text.secondary }}>
					Welcome back! Here's a summary of your academic progress and upcoming
					work.
				</p>
			</div>

			{/* Main Content */}
			<div className="px-8 pb-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Left Column - Upcoming Assignments */}
				<div className="lg:col-span-2">
					<div
						className="mb-6 rounded-lg shadow-sm"
						style={{ backgroundColor: themeColors.surfaces.card }}
					>
						<div
							className="px-6 py-4 border-b flex items-center"
							style={{ borderColor: `${themeColors.accents.active}40` }}
						>
							<Calendar
								size={20}
								className="mr-2"
								style={{ color: themeColors.primary.main }}
							/>
							<h2
								className="text-lg font-semibold"
								style={{ color: themeColors.text.primary }}
							>
								Upcoming Assignments
							</h2>
						</div>
						<div className="p-4">
							{upcomingAssignments.map((assignment) => (
								<div
									key={assignment.id}
									className="mb-4 p-4 rounded-md border flex items-start justify-between"
									style={{
										backgroundColor: "white",
										borderColor: `${themeColors.primary.main}20`,
									}}
								>
									<div>
										<h3
											className="font-medium"
											style={{ color: themeColors.text.primary }}
										>
											{assignment.title}
										</h3>
										<p
											className="text-sm mt-1"
											style={{ color: themeColors.text.secondary }}
										>
											{assignment.course}
										</p>
										<div className="flex items-center mt-2">
											<Clock
												size={16}
												className="mr-1"
												style={{ color: themeColors.text.secondary }}
											/>
											<span
												className="text-xs"
												style={{ color: themeColors.text.secondary }}
											>
												Due: {assignment.dueDate}
											</span>
										</div>
									</div>
									<div className="flex flex-col items-end">
										<span
											className="px-2 py-1 rounded-md text-xs"
											style={{
												backgroundColor:
													assignment.status === "Submitted"
														? `${themeColors.states.success}20`
														: `${themeColors.accents.active}20`,
												color:
													assignment.status === "Submitted"
														? themeColors.states.success
														: themeColors.primary.main,
											}}
										>
											{assignment.status}
										</span>
										<button
											className="mt-2 px-3 py-1 text-xs rounded-md hover:opacity-90"
											style={{
												backgroundColor: themeColors.primary.main,
												color: themeColors.text.inverted,
											}}
										>
											View Details
										</button>
									</div>
								</div>
							))}
							<div className="text-center mt-4">
								<button
									className="px-4 py-2 rounded-md text-sm hover:opacity-90"
									style={{
										backgroundColor: "transparent",
										color: themeColors.primary.main,
										border: `1px solid ${themeColors.primary.main}`,
									}}
								>
									View All Assignments
								</button>
							</div>
						</div>
					</div>

					{/* Recent Activity */}
					<div
						className="rounded-lg shadow-sm"
						style={{ backgroundColor: themeColors.surfaces.card }}
					>
						<div
							className="px-6 py-4 border-b flex items-center"
							style={{ borderColor: `${themeColors.accents.active}40` }}
						>
							<List
								size={20}
								className="mr-2"
								style={{ color: themeColors.primary.main }}
							/>
							<h2
								className="text-lg font-semibold"
								style={{ color: themeColors.text.primary }}
							>
								Recent Activity
							</h2>
						</div>
						<div className="p-4">
							{recentActivity.map((activity) => (
								<div
									key={activity.id}
									className="mb-3 p-3 rounded-md flex items-center hover:bg-gray-50 cursor-pointer"
								>
									{activity.type === "Assignment" && (
										<FileText
											size={16}
											style={{ color: themeColors.primary.main }}
										/>
									)}
									{activity.type === "Discussion" && (
										<MessageCircle
											size={16}
											style={{ color: themeColors.primary.main }}
										/>
									)}
									{activity.type === "Quiz" && (
										<BookOpen
											size={16}
											style={{ color: themeColors.primary.main }}
										/>
									)}
									<div className="ml-3">
										<h4
											className="font-medium text-sm"
											style={{ color: themeColors.text.primary }}
										>
											{activity.title}
										</h4>
										<div className="flex items-center mt-1">
											<span
												className="text-xs mr-2"
												style={{ color: themeColors.text.secondary }}
											>
												{activity.course}
											</span>
											<span
												className="text-xs"
												style={{ color: themeColors.text.secondary }}
											>
												{activity.date}
											</span>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Right Column - Course Progress & Announcements */}
				<div className="lg:col-span-1">
					{/* Course Progress */}
					<div
						className="mb-6 rounded-lg shadow-sm"
						style={{ backgroundColor: themeColors.surfaces.card }}
					>
						<div
							className="px-6 py-4 border-b flex items-center"
							style={{ borderColor: `${themeColors.accents.active}40` }}
						>
							<BarChart2
								size={20}
								className="mr-2"
								style={{ color: themeColors.primary.main }}
							/>
							<h2
								className="text-lg font-semibold"
								style={{ color: themeColors.text.primary }}
							>
								Course Progress
							</h2>
						</div>
						<div className="p-4">
							{courseProgress.map((course) => (
								<div key={course.id} className="mb-4">
									<div className="flex justify-between items-center mb-1">
										<h3
											className="font-medium text-sm"
											style={{ color: themeColors.text.primary }}
										>
											{course.name}
										</h3>
										<span
											className="text-sm font-medium"
											style={{ color: themeColors.primary.main }}
										>
											{course.grade}
										</span>
									</div>
									<div className="w-full bg-gray-200 rounded-full h-2">
										<div
											className="rounded-full h-2"
											style={{
												width: `${course.progress}%`,
												backgroundColor:
													course.progress > 80
														? themeColors.states.success
														: course.progress > 60
														? themeColors.accents.active
														: themeColors.states.error,
											}}
										></div>
									</div>
									<div className="flex justify-end mt-1">
										<span
											className="text-xs"
											style={{ color: themeColors.text.secondary }}
										>
											{course.progress}% complete
										</span>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Announcements */}
					<div
						className="mb-6 rounded-lg shadow-sm"
						style={{ backgroundColor: themeColors.surfaces.card }}
					>
						<div
							className="px-6 py-4 border-b flex items-center"
							style={{ borderColor: `${themeColors.accents.active}40` }}
						>
							<Bell
								size={20}
								className="mr-2"
								style={{ color: themeColors.primary.main }}
							/>
							<h2
								className="text-lg font-semibold"
								style={{ color: themeColors.text.primary }}
							>
								Announcements
							</h2>
						</div>
						<div className="p-4">
							{announcements.map((announcement) => (
								<div
									key={announcement.id}
									className="mb-3 p-3 rounded-md border hover:bg-gray-50 cursor-pointer"
									style={{ borderColor: `${themeColors.accents.active}40` }}
								>
									<h3
										className="font-medium text-sm"
										style={{ color: themeColors.text.primary }}
									>
										{announcement.title}
									</h3>
									<div className="flex justify-between items-center mt-2">
										<span
											className="text-xs"
											style={{ color: themeColors.text.secondary }}
										>
											{announcement.course}
										</span>
										<span
											className="text-xs"
											style={{ color: themeColors.text.secondary }}
										>
											{announcement.date}
										</span>
									</div>
								</div>
							))}
							<div className="text-center mt-4">
								<button
									className="px-4 py-2 rounded-md text-sm hover:opacity-90"
									style={{
										backgroundColor: "transparent",
										color: themeColors.primary.main,
										border: `1px solid ${themeColors.primary.main}`,
									}}
								>
									View All Announcements
								</button>
							</div>
						</div>
					</div>

					{/* Browser Cache Clearing Guide */}
					<div
						className="rounded-lg shadow-sm"
						style={{ backgroundColor: themeColors.surfaces.card }}
					>
						<div
							className="px-6 py-4 border-b flex items-center"
							style={{ borderColor: `${themeColors.accents.active}40` }}
						>
							<Info
								size={20}
								className="mr-2"
								style={{ color: themeColors.primary.main }}
							/>
							<h2
								className="text-lg font-semibold"
								style={{ color: themeColors.text.primary }}
							>
								Browser Cache Clearing
							</h2>
						</div>
						<div className="p-4">
							<p
								className="text-sm mb-3"
								style={{ color: themeColors.text.secondary }}
							>
								If you experience display issues after the upgrade, please clear
								your browser cache:
							</p>
							<div className="grid grid-cols-2 gap-2">
								<button
									className="p-2 rounded-md text-sm text-center hover:opacity-90"
									style={{
										backgroundColor: themeColors.primary.main,
										color: themeColors.text.inverted,
									}}
								>
									Chrome Instructions
								</button>
								<button
									className="p-2 rounded-md text-sm text-center hover:opacity-90"
									style={{
										backgroundColor: themeColors.primary.main,
										color: themeColors.text.inverted,
									}}
								>
									Firefox Instructions
								</button>
								<button
									className="p-2 rounded-md text-sm text-center hover:opacity-90"
									style={{
										backgroundColor: themeColors.primary.main,
										color: themeColors.text.inverted,
									}}
								>
									Edge/IE Instructions
								</button>
								<button
									className="p-2 rounded-md text-sm text-center hover:opacity-90"
									style={{
										backgroundColor: themeColors.primary.main,
										color: themeColors.text.inverted,
									}}
								>
									Safari Instructions
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OverviewPage;
