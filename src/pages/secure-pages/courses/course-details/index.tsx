/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
	ChevronDown,
	ChevronRight,
	MoreHorizontal,
	FolderOpen,
	File,
	FileText,
	Video,
	Download,
	Book,
	ClipboardList,
	Award,
	Users,
	Bell,
	CheckCircle,
	Clock,
	AlertCircle,
	FilePlus,
	Plus,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { themeColors } from "../../../../constant/Colors";
import AssignmentCard from "../../../../components/cards/assingment-card";

export default function CourseDetails() {
	const [activeTab, setActiveTab] = useState("Resources");
	const [expandedLessons, setExpandedLessons] = useState<number[]>([1]); // Default open first lesson
	const [previewMaterial, setPreviewMaterial] = useState<any>(null);
	const tabs = [
		"Resources",
		"Assignments",
		"Test & Quizzes",
		"Grade Book",
		"Courses Group",
		"Calendar",
	];
	const { id } = useParams();

	// Resources tab data
	const lessons = [
		{
			id: 1,
			name: "Lesson 1: Introduction to Accounting",
			materials: [
				{
					id: 1,
					type: "video",
					title: "INTRODUCTION TO ACCOUNTING - RECORDING",
					lecturer: "DR. ASARE DAVID",
					date: "May 29, 2024 10:48 AM",
					duration: "45 min",
					views: 128,
					description:
						"This video covers the fundamental principles of accounting recording, including journal entries, ledgers, and the accounting cycle.",
				},
				{
					id: 2,
					type: "slides",
					title: "INTRODUCTION TO ACCOUNTING - SLIDES",
					lecturer: "DR. ASARE DAVID",
					date: "May 29, 2024 12:48 PM",
					pages: 24,
					downloads: 87,
					description:
						"Lecture slides covering the basic concepts of accounting, financial statements, and accounting equations.",
				},
				{
					id: 3,
					type: "document",
					title: "THEORIES OF ACC (B.Edward 2001, et al) - RESOURCE",
					lecturer: "DR. ASARE DAVID",
					date: "May 29, 2024 12:48 PM",
					pages: 56,
					downloads: 42,
					description:
						"Comprehensive resource document detailing various accounting theories and their practical applications.",
				},
			],
		},
		{
			id: 2,
			name: "Lesson 2: Financial Statements",
			materials: [
				{
					id: 4,
					type: "video",
					title: "FINANCIAL STATEMENTS ANALYSIS",
					lecturer: "DR. ASARE DAVID",
					date: "Jun 2, 2024 9:30 AM",
					duration: "52 min",
					views: 94,
					description:
						"Detailed analysis of balance sheets, income statements, and cash flow statements with practical examples.",
				},
			],
		},
		{
			id: 3,
			name: "Lesson 3: Cost Accounting",
			materials: [],
		},
	];

	// Assignments tab data
	const assignments = [
		{
			id: 1,
			title: "Financial Statement Analysis",
			status: "Due",
			dueDate: "Jun 15, 2024 11:59 PM",
			points: "100 points",
			submitted: false,
			description:
				"Analyze the provided financial statements and prepare a report on the company's financial health.",
			instructions:
				"Use the concepts learned in Lesson 2. Minimum 5 pages, APA format. Submit as PDF.",
		},
		{
			id: 2,
			title: "Journal Entry Exercise",
			status: "Submitted",
			dueDate: "May 29, 2024 11:59 PM",
			points: "50 points",
			submitted: true,
			grade: "45/50",
			feedback:
				"Excellent work! Just a few minor errors in the compound journal entries.",
			description:
				"Practice journal entries for various business transactions.",
			instructions: "Complete all 20 transactions. Show your work.",
		},
	];

	// Tests & Quizzes tab data
	const quizzes = [
		{
			id: 1,
			title: "Mid-Term Examination",
			status: "Upcoming",
			date: "Jun 10, 2024",
			time: "10:00 AM - 12:00 PM",
			duration: "2 hours",
			points: "250 points",
			topics: "Lessons 1-4, Chapters 1-6 in textbook",
			description:
				"Comprehensive exam covering all material from the first half of the course.",
		},
		{
			id: 2,
			title: "Basic Accounting Principles Quiz",
			status: "Completed",
			date: "May 15, 2024",
			time: "2:00 PM - 2:30 PM",
			duration: "30 minutes",
			points: "50 points",
			score: "47/50",
			feedback: "Excellent understanding of core concepts.",
			description: "Multiple choice quiz on fundamental accounting principles.",
		},
	];

	const grades = [
		{
			category: "Assignments",
			weight: "30%",
			items: [
				{ name: "Journal Entry Exercise", score: "45/50", percentage: "90%" },
				{ name: "Case Study Analysis", score: "38/40", percentage: "95%" },
			],
			totalScore: "83/90",
			totalPercentage: "92.2%",
		},
		{
			category: "Quizzes",
			weight: "20%",
			items: [
				{
					name: "Basic Accounting Principles Quiz",
					score: "47/50",
					percentage: "94%",
				},
			],
			totalScore: "47/50",
			totalPercentage: "94%",
		},
		{
			category: "Mid-Term Exam",
			weight: "25%",
			items: [],
			totalScore: "-",
			totalPercentage: "-",
		},
	];

	const groups = [
		{
			id: 1,
			name: "Group A - Financial Analysis",
			members: 4,
			projects: [
				{
					name: "Corporate Financial Analysis",
					deadline: "Jun 25, 2024",
					progress: 65,
				},
			],
			description:
				"Group focused on analyzing financial statements of Fortune 500 companies",
		},
		{
			id: 2,
			name: "Group B - Auditing Standards",
			members: 3,
			projects: [
				{ name: "Auditing Case Study", deadline: "Jun 20, 2024", progress: 40 },
			],
			description:
				"Group examining contemporary auditing practices and standards",
		},
	];

	// Calendar tab data
	const events = [
		{
			id: 1,
			title: "Mid-Term Examination",
			date: "Jun 10, 2024",
			time: "10:00 AM - 12:00 PM",
			location: "Room B201",
			type: "exam",
		},
		{
			id: 2,
			title: "Financial Reporting Standards Test",
			date: "Jun 20, 2024",
			time: "1:00 PM - 2:30 PM",
			location: "Room A105",
			type: "quiz",
		},
	];

	// Helper functions
	const getIcon = (type: string) => {
		const iconMap: Record<string, any> = {
			video: <Video size={18} className="text-blue-600" />,
			slides: <FileText size={18} className="text-green-600" />,
			document: <File size={18} className="text-purple-600" />,
			exam: <ClipboardList size={18} className="text-red-600" />,
			quiz: <ClipboardList size={18} className="text-orange-500" />,
			assignment: <Book size={18} className="text-blue-600" />,
			presentation: <Users size={18} className="text-green-600" />,
			lecture: <Video size={18} className="text-purple-600" />,
		};
		return iconMap[type] || <File size={18} className="text-gray-600" />;
	};

	const getStatusIcon = (status: string) => {
		switch (status) {
			case "Due":
				return <AlertCircle size={16} className="text-red-500" />;
			case "Submitted":
				return <CheckCircle size={16} className="text-green-500" />;
			case "Upcoming":
				return <Clock size={16} className="text-blue-500" />;
			case "Completed":
				return <CheckCircle size={16} className="text-green-500" />;
			default:
				return <Clock size={16} className="text-gray-500" />;
		}
	};

	const toggleLesson = (lessonId: number) => {
		setExpandedLessons((prev) =>
			prev.includes(lessonId)
				? prev.filter((id) => id !== lessonId)
				: [...prev, lessonId]
		);
	};

	const renderTabContent = () => {
		switch (activeTab) {
			case "Resources":
				return (
					<div className="flex flex-col h-full">
						{/* Resource Tabs */}
						<div className="flex border-b">
							<button
								style={{ backgroundColor: themeColors.primary.main }}
								className="flex items-center px-4 py-3 text-white"
							>
								<FolderOpen size={18} className="mr-2" />
								<span className="font-medium">Lessons</span>
							</button>
							<button className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100">
								<Download size={18} className="mr-2" />
								<span className="font-medium">Handouts</span>
							</button>
						</div>

						{/* Lessons and Preview Panes */}
						<div className="flex flex-1 overflow-hidden">
							{/* Lessons List */}
							<div className="w-1/3 border-r overflow-y-auto">
								{lessons.map((lesson) => (
									<div key={lesson.id} className="border-b">
										{/* Lesson Header */}
										<div
											className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 cursor-pointer"
											onClick={() => toggleLesson(lesson.id)}
										>
											<div className="flex items-center">
												{expandedLessons.includes(lesson.id) ? (
													<ChevronDown
														size={18}
														className="mr-2 text-gray-500"
													/>
												) : (
													<ChevronRight
														size={18}
														className="mr-2 text-gray-500"
													/>
												)}
												<FolderOpen size={18} className="mr-2 text-blue-600" />
												<span className="font-medium">{lesson.name}</span>
											</div>
											<span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">
												{lesson.materials.length} items
											</span>
										</div>

										{/* Lesson Materials */}
										{expandedLessons.includes(lesson.id) && (
											<div className="bg-white">
												{lesson.materials.map((material) => (
													<div
														key={material.id}
														className="flex items-center p-3 border-t hover:bg-blue-50 cursor-pointer"
														onClick={() => setPreviewMaterial(material)}
													>
														<div className="mr-3">{getIcon(material.type)}</div>
														<div className="flex-1 min-w-0">
															<p className="font-medium truncate">
																{material.title}
															</p>
															<p className="text-xs text-gray-500 truncate">
																{material.lecturer}
															</p>
														</div>
														<div className="text-xs text-gray-500 ml-2">
															{material.date.split(" ")[0]}
														</div>
													</div>
												))}
											</div>
										)}
									</div>
								))}
							</div>

							{/* Preview Pane */}
							<div className="flex-1 overflow-y-auto p-4 bg-gray-50">
								{previewMaterial ? (
									<div className="bg-white rounded-lg shadow-sm border p-4">
										<div className="flex justify-between items-start mb-4">
											<div>
												<h3 className="text-xl font-bold text-gray-800">
													{previewMaterial.title}
												</h3>
												<p className="text-sm text-gray-600">
													Posted by {previewMaterial.lecturer} on{" "}
													{previewMaterial.date}
												</p>
											</div>
											<div className="flex space-x-2">
												<button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded">
													<Download size={18} />
												</button>
												<button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded">
													<MoreHorizontal size={18} />
												</button>
											</div>
										</div>

										<div className="mb-6">
											<h4 className="font-medium text-gray-700 mb-2">
												Description
											</h4>
											<p className="text-gray-600">
												{previewMaterial.description}
											</p>
										</div>

										<div className="grid grid-cols-2 gap-4 mb-6">
											<div>
												<h4 className="font-medium text-gray-700 mb-1">Type</h4>
												<p className="text-gray-600 capitalize">
													{previewMaterial.type}
												</p>
											</div>
											{previewMaterial.duration && (
												<div>
													<h4 className="font-medium text-gray-700 mb-1">
														Duration
													</h4>
													<p className="text-gray-600">
														{previewMaterial.duration}
													</p>
												</div>
											)}
											{previewMaterial.pages && (
												<div>
													<h4 className="font-medium text-gray-700 mb-1">
														Pages
													</h4>
													<p className="text-gray-600">
														{previewMaterial.pages}
													</p>
												</div>
											)}
											{previewMaterial.views && (
												<div>
													<h4 className="font-medium text-gray-700 mb-1">
														Views
													</h4>
													<p className="text-gray-600">
														{previewMaterial.views}
													</p>
												</div>
											)}
										</div>

										<div className="border-t pt-4">
											<button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center">
												<Download size={18} className="mr-2" />
												Download Resource
											</button>
										</div>
									</div>
								) : (
									<div className="flex flex-col items-center justify-center h-full text-gray-500">
										<FolderOpen size={48} className="mb-4 text-gray-300" />
										<p className="text-lg">Select a resource to preview</p>
										<p className="text-sm">
											Click on any lesson material to view details here
										</p>
									</div>
								)}
							</div>
						</div>
					</div>
				);

			case "Assignments":
				return (
					<div className="flex flex-col h-full">
						{/* Assignment Tabs */}
						<div className="flex border-b">
							<button
								style={{ backgroundColor: themeColors.primary.main }}
								className="flex items-center px-4 py-3 text-white"
							>
								<Book size={18} className="mr-2" />
								<span className="font-medium">Current</span>
							</button>
							<button className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100">
								<Award size={18} className="mr-2" />
								<span className="font-medium">Completed</span>
							</button>
						</div>

						{/* Assignments List */}
						<div className="flex-1 overflow-y-auto">
							<div className="p-4">
								<div className="flex justify-between items-center mb-4">
									<h3 className="text-lg font-bold text-gray-800">
										Your Assignments
									</h3>
									<button className="bg-blue-600 text-white px-3 py-1 rounded text-sm flex items-center">
										<FilePlus size={16} className="mr-2" />
										New Submission
									</button>
								</div>

								{assignments.map((assignment) => (
									<AssignmentCard assignment={assignment as any} />
								))}
							</div>
						</div>
					</div>
				);

			case "Test & Quizzes":
				return (
					<div className="flex flex-col h-full">
						{/* Quiz Tabs */}
						<div className="flex border-b">
							<button
								style={{ background: themeColors.primary.main }}
								className="flex items-center px-4 py-3 text-white"
							>
								<ClipboardList size={18} className="mr-2" />
								<span className="font-medium">Upcoming</span>
							</button>
							<button className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100">
								<Award size={18} className="mr-2" />
								<span className="font-medium">Completed</span>
							</button>
						</div>

						{/* Quizzes List */}
						<div className="flex-1 overflow-y-auto p-4">
							<div className="mb-6">
								<h3 className="text-lg font-bold text-gray-800 mb-2">
									Tests & Quizzes
								</h3>
								<p className="text-sm text-gray-600">
									View all upcoming and completed assessments
								</p>
							</div>

							{quizzes.map((quiz) => (
								<div
									key={quiz.id}
									className="border rounded-lg mb-4 hover:shadow-md transition-shadow"
								>
									<div className="p-4 border-b">
										<div className="flex justify-between items-start">
											<div className="flex items-start">
												{getStatusIcon(quiz.status)}
												<div className="ml-3">
													<h4 className="font-bold text-gray-800">
														{quiz.title}
													</h4>
													<p className="text-sm text-gray-600">
														{quiz.description}
													</p>
												</div>
											</div>
											<div className="text-right">
												<span
													className={`inline-block px-2 py-1 text-xs rounded ${
														quiz.status === "Upcoming"
															? "bg-blue-100 text-blue-800"
															: quiz.status === "Completed"
															? "bg-green-100 text-green-800"
															: "bg-gray-100 text-gray-800"
													}`}
												>
													{quiz.status}
												</span>
											</div>
										</div>
									</div>

									<div className="p-4 bg-gray-50">
										<div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
											<div>
												<p className="text-gray-500">Date</p>
												<p className="font-medium">{quiz.date}</p>
											</div>
											<div>
												<p className="text-gray-500">Time</p>
												<p className="font-medium">{quiz.time}</p>
											</div>
											<div>
												<p className="text-gray-500">Duration</p>
												<p className="font-medium">{quiz.duration}</p>
											</div>
											<div>
												<p className="text-gray-500">Points</p>
												<p className="font-medium">{quiz.points}</p>
											</div>
										</div>

										{quiz.topics && (
											<div className="mt-4">
												<p className="text-gray-500 mb-1">Topics Covered</p>
												<p className="text-sm">{quiz.topics}</p>
											</div>
										)}

										{quiz.feedback && (
											<div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded">
												<p className="text-sm font-medium text-blue-800">
													Instructor Feedback:
												</p>
												<p className="text-sm text-blue-700">{quiz.feedback}</p>
											</div>
										)}

										<div className="mt-4 flex justify-end space-x-2">
											{quiz.status === "Upcoming" && (
												<button className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700">
													Prepare for Test
												</button>
											)}
											{quiz.status === "Completed" && (
												<button className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700">
													View Results
												</button>
											)}
											<button className="border border-gray-300 px-4 py-2 rounded text-sm hover:bg-gray-100">
												Details
											</button>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				);

			case "Grade Book":
				return (
					<div className="flex flex-col h-full">
						{/* Grade Book Header */}
						<div
							style={{ backgroundColor: themeColors.primary.main }}
							className="text-white p-4"
						>
							<div className="flex justify-between items-center">
								<div>
									<h2 className="text-xl font-bold">ACT 301 - Grade Summary</h2>
									<p className="text-sm text-blue-100">
										Current Overall: 92.5% (A)
									</p>
								</div>
								<button className="flex items-center bg-blue-800 px-3 py-1 rounded text-sm">
									<Bell size={16} className="mr-2" />
									Grade Notifications
								</button>
							</div>
						</div>

						{/* Grade Categories */}
						<div className="flex-1 overflow-y-auto p-4">
							{grades.map((category, index) => (
								<div key={index} className="mb-6">
									<div className="flex justify-between items-center mb-3">
										<div className="flex items-center">
											<Award size={20} className="mr-2 text-blue-600" />
											<h3 className="font-bold text-gray-800">
												{category.category}
											</h3>
										</div>
										<div className="text-sm text-gray-600">
											Weight:{" "}
											<span className="font-medium">{category.weight}</span>
										</div>
									</div>

									<div className="border rounded-lg overflow-hidden">
										<div className="bg-gray-100 px-4 py-2 grid grid-cols-12 text-sm font-medium text-gray-700">
											<div className="col-span-6">Item</div>
											<div className="col-span-3 text-right">Score</div>
											<div className="col-span-3 text-right">Percentage</div>
										</div>

										{category.items.length > 0 ? (
											<>
												{category.items.map((item, itemIndex) => (
													<div
														key={itemIndex}
														className="px-4 py-3 grid grid-cols-12 border-t text-sm hover:bg-gray-50"
													>
														<div className="col-span-6 text-gray-800">
															{item.name}
														</div>
														<div className="col-span-3 text-right font-medium">
															{item.score}
														</div>
														<div className="col-span-3 text-right text-green-600">
															{item.percentage}
														</div>
													</div>
												))}
												<div className="bg-gray-50 px-4 py-2 grid grid-cols-12 border-t text-sm font-medium">
													<div className="col-span-6">Category Total</div>
													<div className="col-span-3 text-right">
														{category.totalScore}
													</div>
													<div className="col-span-3 text-right text-blue-600">
														{category.totalPercentage}
													</div>
												</div>
											</>
										) : (
											<div className="px-4 py-4 text-center text-sm text-gray-500 italic">
												No grades recorded yet for this category
											</div>
										)}
									</div>
								</div>
							))}

							<div className="bg-white border rounded-lg p-4 mt-6">
								<h3 className="font-bold text-gray-800 mb-3">
									Overall Performance
								</h3>
								<div className="h-4 bg-gray-200 rounded-full overflow-hidden">
									<div
										className="h-full bg-gradient-to-r from-green-400 to-blue-500"
										style={{ width: "92.5%" }}
									></div>
								</div>
								<div className="flex justify-between text-sm text-gray-600 mt-2">
									<span>0%</span>
									<span>Current: 92.5% (A)</span>
									<span>100%</span>
								</div>
							</div>
						</div>
					</div>
				);

			case "Courses Group":
				return (
					<div className="flex flex-col h-full">
						{/* Groups Header */}
						<div
							style={{ backgroundColor: themeColors.primary.main }}
							className="text-white p-4"
						>
							<div className="flex justify-between items-center">
								<h2 className="text-xl font-bold">Course Groups</h2>
								<button className="flex items-center px-3 py-1 rounded text-sm">
									<Plus size={16} className="mr-2" />
									Create New Group
								</button>
							</div>
						</div>

						{/* Groups List */}
						<div className="flex-1 overflow-y-auto p-4">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								{groups.map((group) => (
									<div
										key={group.id}
										className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
									>
										<div className="bg-indigo-100 px-4 py-3 flex justify-between items-center">
											<div className="flex items-center">
												<Users size={18} className="mr-2 text-indigo-700" />
												<h3 className="font-bold text-indigo-800">
													{group.name}
												</h3>
											</div>
											<span className="text-xs bg-indigo-200 text-indigo-800 px-2 py-1 rounded">
												{group.members} members
											</span>
										</div>

										<div className="p-4">
											<p className="text-sm text-gray-600 mb-4">
												{group.description}
											</p>

											<div className="mb-4">
												<h4 className="font-medium text-gray-700 mb-2">
													Active Projects
												</h4>
												{group.projects.map((project, pIndex) => (
													<div
														key={pIndex}
														className="bg-gray-50 p-3 rounded border mb-2 last:mb-0"
													>
														<div className="flex justify-between items-center mb-1">
															<span className="font-medium">
																{project.name}
															</span>
															<span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
																Due: {project.deadline}
															</span>
														</div>
														<div className="w-full bg-gray-200 rounded-full h-2">
															<div
																className="bg-blue-600 h-2 rounded-full"
																style={{ width: `${project.progress}%` }}
															></div>
														</div>
														<div className="text-right text-xs text-gray-500 mt-1">
															{project.progress}% complete
														</div>
													</div>
												))}
											</div>

											<div className="flex justify-between items-center">
												<button className="text-sm text-blue-600 hover:text-blue-800">
													View Group
												</button>
												<button className="text-sm text-gray-600 hover:text-gray-800 flex items-center">
													<Users size={14} className="mr-1" />
													Members
												</button>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				);

			case "Calendar":
				return (
					<div className="flex flex-col h-full">
						{/* Calendar Header */}
						<div
							style={{ backgroundColor: themeColors.primary.main }}
							className="text-white p-4"
						>
							<div className="flex justify-between items-center">
								<h2 className="text-xl font-bold">Course Calendar</h2>
								<div className="flex space-x-2">
									<button className="bg-purple-800 text-white px-3 py-1 rounded text-sm">
										Month
									</button>
									<button className="bg-purple-600 text-purple-100 px-3 py-1 rounded text-sm">
										Week
									</button>
									<button className="bg-purple-600 text-purple-100 px-3 py-1 rounded text-sm">
										Day
									</button>
								</div>
							</div>
						</div>

						{/* Calendar View */}
						<div className="flex-1 overflow-y-auto p-4">
							<div className="mb-6">
								<h3 className="text-xl font-bold text-gray-800">June 2024</h3>
								<p className="text-sm text-gray-600">
									Upcoming events and deadlines
								</p>
							</div>

							<div className="space-y-3">
								{events.map((event) => (
									<div
										key={event.id}
										className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
									>
										<div className="flex">
											<div className="w-16 bg-purple-100 text-purple-800 flex flex-col items-center justify-center p-2">
												<div className="text-xs">JUN</div>
												<div className="text-xl font-bold">
													{event.date.split(" ")[1].replace(",", "")}
												</div>
											</div>

											<div className="flex-1 p-3">
												<div className="flex justify-between items-start">
													<div className="flex items-center">
														{getIcon(event.type)}
														<h4 className="font-bold text-gray-800 ml-2">
															{event.title}
														</h4>
													</div>
													<button className="text-gray-500 hover:text-gray-700">
														<MoreHorizontal size={18} />
													</button>
												</div>

												<div className="mt-2 text-sm text-gray-600">
													<div className="flex items-center mb-1">
														<Clock size={14} className="mr-2" />
														{event.time} • {event.location}
													</div>
												</div>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				);

			default:
				return <div className="p-6">Select a tab to view content</div>;
		}
	};

	return (
		<div className="flex flex-col h-screen">
			{/* Course Header */}
			<div className="bg-white p-4 border-b">
				<div className="flex justify-between items-center">
					<div>
						<h1 className="text-2xl font-bold text-gray-800">
							ACT 301 - Advanced Accounting
						</h1>
						<p className="text-sm text-gray-600">Instructor: Dr. Asare David</p>
					</div>
					<div className="flex items-center space-x-2">
						<button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded">
							<Bell size={20} />
						</button>
						<button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded">
							<MoreHorizontal size={20} />
						</button>
					</div>
				</div>
			</div>

			{/* Tab Navigation */}
			<div className="bg-white border-b overflow-x-auto">
				<div className="flex">
					{tabs.map((tab) => (
						<button
							key={tab}
							className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
								activeTab === tab
									? "border-b-2 border-blue-600 text-blue-600"
									: "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
							}`}
							onClick={() => setActiveTab(tab)}
						>
							{tab}
						</button>
					))}
				</div>
			</div>

			{/* Content Area */}
			<div className="flex-1 pb-24 w-full">{renderTabContent()}</div>
		</div>
	);
}