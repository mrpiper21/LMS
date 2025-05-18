import { useState } from "react";
import { ChevronDown, FolderOpen, ChevronUp, FolderClosed } from "lucide-react";
import { Link } from "react-router-dom";
import { themeColors } from "../../../constant/Colors";

// Types
type Course = {
	id: string;
	title: string;
};

type CourseData = {
	[year: string]: Course[];
};

type ActiveSemester = {
	[year: string]: string;
};

// Mock Data
const courseData: CourseData = {
	"2025": Array.from({ length: 6 }, (_, i) => ({
		id: `ACT 30${i + 1}`,
		title: "Entrepreneurship",
	})),
	"2024": Array.from({ length: 3 }, (_, i) => ({
		id: `ACT 30${i + 1}`,
		title: "Entrepreneurship",
	})),
};

const dropdownOptions = [
	"Resources",
	"Assignments",
	"Test and Quizzes",
	"Grade Book",
	"Calendar",
	"Course Groups",
];

export default function CoursesDashboard() {
	const [activeSemester, setActiveSemester] = useState<ActiveSemester>({
		"2025": "SEM 1",
		"2024": "SEM 1",
	});
	// Keep track of active course with year
	const [activeCourse, setActiveCourse] = useState<{
		year: string;
		courseId: string;
	} | null>(null);
	const [expandedYears, setExpandedYears] = useState<{
		[year: string]: boolean;
	}>({
		"2025": true,
		"2024": true,
	});

	const handleSemesterClick = (year: string, semester: string) => {
		setActiveSemester((prev) => ({ ...prev, [year]: semester }));
	};

	const handleCourseClick = (
		year: string,
		courseId: string,
		event: React.MouseEvent
	) => {
		// Prevent event propagation to avoid triggering any parent handlers
		event.stopPropagation();

		// Close dropdown if clicked on the same course, otherwise open the new one
		setActiveCourse((prev) =>
			prev?.year === year && prev?.courseId === courseId
				? null
				: { year, courseId }
		);
	};

	const toggleYearExpansion = (year: string) => {
		setExpandedYears((prev) => ({ ...prev, [year]: !prev[year] }));
	};

	// Close dropdown when clicking outside
	const handleDocumentClick = () => {
		if (activeCourse) {
			setActiveCourse(null);
		}
	};

	return (
		<div
			className="bg-white p-6 min-h-screen space-y-8"
			onClick={handleDocumentClick}
		>
			{Object.keys(courseData).map((year) => (
				<div key={year} className="space-y-6">
					{/* Year Header with toggle */}
					<div className="flex items-center justify-between">
						<h1
							className="text-3xl font-bold cursor-pointer"
							onClick={() => toggleYearExpansion(year)}
							style={{ color: themeColors.primary.main }}
						>
							{year}
						</h1>
						<button
							onClick={() => toggleYearExpansion(year)}
							className="text-blue-900 hover:bg-blue-50 p-2 rounded-full"
							aria-label={`Toggle ${year} courses`}
						>
							{expandedYears[year] ? (
								<ChevronUp size={24} />
							) : (
								<ChevronDown size={24} />
							)}
						</button>
					</div>

					{expandedYears[year] && (
						<>
							{/* Semester Buttons */}
							<div className="flex gap-4">
								{["SEM 1", "SEM 2"].map((sem) => (
									<button
										key={sem}
										onClick={() => handleSemesterClick(year, sem)}
										className={`px-6 py-2 rounded-full text-lg font-medium transition-all duration-200 ${
											activeSemester[year] === sem
												? "bg-amber-200 text-blue-900"
												: "border-2 border-blue-900 text-blue-900 hover:bg-blue-50"
										}`}
										aria-current={
											activeSemester[year] === sem ? "true" : "false"
										}
									>
										{sem}
									</button>
								))}
							</div>

							{/* Courses Grid */}
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
								{courseData[year].map((course) => (
									<div key={course.id} className="relative">
										<div
											onClick={(e) => handleCourseClick(year, course.id, e)}
											className={`bg-gray-50 rounded-lg p-4 min-w-[300px] flex items-center justify-between cursor-pointer transition-all duration-200 border-2 ${
												activeCourse?.year === year &&
												activeCourse?.courseId === course.id
													? "border-amber-500 bg-amber-50"
													: "border-transparent hover:border-gray-200"
											}`}
											aria-expanded={
												activeCourse?.year === year &&
												activeCourse?.courseId === course.id
											}
										>
											<div className="flex items-center gap-3">
												{activeCourse?.year === year &&
												activeCourse?.courseId === course.id ? (
													<FolderOpen
														size={30}
														className="flex-shrink-0"
														style={{ color: themeColors.primary.main }}
													/>
												) : (
													<FolderClosed
														size={30}
														className="flex-shrink-0"
														style={{ color: themeColors.primary.main }}
													/>
												)}

												<div className="min-w-0">
													<h3 className="text-xl font-bold text-blue-900 truncate">
														{course.id}
													</h3>
													<p className="text-gray-600 truncate">
														{course.title}
													</p>
												</div>
											</div>
											<ChevronDown
												size={24}
												className={`text-blue-900 transition-transform duration-200 ${
													activeCourse?.year === year &&
													activeCourse?.courseId === course.id
														? "rotate-180"
														: ""
												}`}
											/>
										</div>

										{/* Dropdown */}
										{activeCourse?.year === year &&
											activeCourse?.courseId === course.id && (
												<div
													className="absolute z-10 top-full left-0 right-0 mt-1 bg-white rounded-lg border border-gray-200 shadow-lg animate-fadeIn"
													onClick={(e) => e.stopPropagation()} // Prevent clicks inside dropdown from closing it
												>
													{dropdownOptions.map((option) => (
														<Link
															key={option}
															to={`/courses/${course.id}`} // Use actual course ID
															className="block py-3 px-4 hover:bg-amber-50 font-medium border-b border-gray-100 last:border-b-0 transition-colors duration-150"
															style={{ color: themeColors.primary.main }}
														>
															{option}
														</Link>
													))}
												</div>
											)}
									</div>
								))}
							</div>
						</>
					)}
				</div>
			))}
		</div>
	);
}