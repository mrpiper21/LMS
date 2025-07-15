import {
	FilePlus,
	MoreHorizontal,
	RefreshCcw,
	Search,
	Loader2,
} from "lucide-react";
import { type FC, useState } from "react";
import { themeColors } from "../../constant/Colors";
import { StatusIcon } from "../ui/StatusIcon";
import { FileUpload } from "../ui/FileUpload";
import { PlagiarismInspector } from "../ui/PlagiarismInspector";
import { getStatusColor, getStatusForTracker } from "../../utils/statusUtils";
import {
	checkPlagiarism,
	getPlagiarismErrorMessage,
	type PlagiarismResult,
} from "../../utils/plagiarismUtils";
import type {
	AssignmentStatus,
	InspectorStatus,
} from "../../utils/statusUtils";

interface Assignment {
	id: string;
	status: AssignmentStatus;
	title: string;
	description: string;
	dueDate: string;
	points?: number;
	grade?: number;
	instructions?: string;
	feedback?: string;
	submittedDate?: string;
	inspectorStatus?: InspectorStatus;
	inspectorScore?: number;
}

interface AssignmentCardProps {
	assignment: Assignment;
	onUpdateStatus?: (id: string, newStatus: AssignmentStatus) => void;
	onRunInspector?: (id: string) => void;
	onFileUpload?: (id: string, file: File) => void;
}

const AssignmentCard: FC<AssignmentCardProps> = ({
	assignment,
	onUpdateStatus,
	onRunInspector,
	onFileUpload,
}) => {
	const [uploadedFile, setUploadedFile] = useState<File | null>(null);
	const [isChecking, setIsChecking] = useState(false);
	const [plagiarismResult, setPlagiarismResult] =
		useState<PlagiarismResult | null>(null);
	const [error, setError] = useState<string | null>(null);

	// Function to render status progress tracker
	const renderStatusTracker = (currentStatus: string) => {
		const statuses = ["In Progress", "Submitted", "Returned"];
		const mappedStatus = getStatusForTracker(currentStatus);
		const currentIndex = statuses.indexOf(mappedStatus);

		return (
			<div className="flex items-center w-full my-3">
				{statuses.map((status, index) => (
					<div key={status} className="flex items-center flex-grow">
						<div
							className={`flex flex-col items-center ${
								index <= currentIndex ? "text-blue-600" : "text-gray-400"
							}`}
						>
							<div
								className={`rounded-full p-1 ${
									index <= currentIndex ? "bg-blue-100" : "bg-gray-100"
								}`}
							>
								<StatusIcon status={status} />
							</div>
							<span className="text-xs mt-1">{status}</span>
						</div>
						{index < statuses.length - 1 && (
							<div
								className={`h-0.5 flex-grow mx-1 ${
									index < currentIndex ? "bg-blue-400" : "bg-gray-300"
								}`}
							></div>
						)}
					</div>
				))}
			</div>
		);
	};

	// Function to update status
	const updateStatus = (id: string, newStatus: AssignmentStatus) => {
		if (onUpdateStatus) {
			onUpdateStatus(id, newStatus);
		}
	};

	const runInspector = (id: string) => {
		if (onRunInspector) {
			onRunInspector(id);
		}
	};

	// Handle file selection
	const handleFileSelect = (file: File) => {
		setUploadedFile(file);
		if (onFileUpload) {
			onFileUpload(assignment.id, file);
		}
	};

	// Handle file processing and plagiarism check
	const handleFileProcess = async (file: File) => {
		try {
			setIsChecking(true);
			setError(null);

			const result = await checkPlagiarism(file);
			setPlagiarismResult(result);

			// Update inspector status based on results
			if (result.plagPercent > 20) {
				if (onUpdateStatus) {
					onUpdateStatus(assignment.id, "Returned");
				}
			}
		} catch (error) {
			console.error("Plagiarism check failed:", error);
			setError(getPlagiarismErrorMessage(error));
		} finally {
			setIsChecking(false);
		}
	};

	// Handle file upload errors
	const handleFileError = (errorMessage: string) => {
		setError(errorMessage);
	};

	return (
		<div className="border rounded-lg mb-4 hover:shadow-md transition-shadow">
			<div className="p-4 border-b">
				<div className="flex justify-between items-start">
					<div className="flex items-start">
						<StatusIcon status={assignment.status} />
						<div className="ml-3">
							<h4 className="font-bold text-gray-800">{assignment.title}</h4>
							<p className="text-sm text-gray-600">{assignment.description}</p>
						</div>
					</div>
					<div className="text-right">
						<span
							className={`inline-block px-2 py-1 text-xs rounded ${getStatusColor(
								assignment.status
							)}`}
						>
							{assignment.status}
						</span>
					</div>
				</div>

				{renderStatusTracker(assignment.status)}
			</div>

			<div className="p-4 bg-gray-50">
				<div className="grid grid-cols-3 gap-4 text-sm">
					<div>
						<p className="text-gray-500">Due Date</p>
						<p className="font-medium">{assignment.dueDate}</p>
					</div>
					{assignment.points !== undefined && (
						<div>
							<p className="text-gray-500">Grade Scale</p>
							<p className="font-medium">{assignment.points} pts</p>
						</div>
					)}
					{assignment.submittedDate && (
						<div>
							<p className="text-gray-500">Submitted</p>
							<p className="font-medium">{assignment.submittedDate}</p>
						</div>
					)}
					{assignment.grade !== undefined && (
						<div>
							<p className="text-gray-500">Grade</p>
							<p className="font-medium text-green-600">
								{assignment.grade}/{assignment.points}
							</p>
						</div>
					)}
				</div>

				{/* Plagiarism Inspector Section */}
				{(assignment.status === "In Progress" ||
					assignment.status === "Submitted" ||
					assignment.status === "Due") && (
					<PlagiarismInspector
						inspectorStatus={assignment.inspectorStatus}
						inspectorScore={assignment.inspectorScore}
						plagiarismResult={plagiarismResult}
						onRunInspector={() => runInspector(assignment.id)}
						isChecking={isChecking}
					/>
				)}

				{assignment.instructions && (
					<div className="mt-4">
						<p className="text-gray-500 mb-1">Instructions</p>
						<p className="text-sm">{assignment.instructions}</p>
					</div>
				)}
				<div className="mt-4">
					<p className="text-gray-500 mb-1">Number of resubmissions allowed</p>
					<p className="text-sm">{"N/A"}</p>
				</div>
				<div className="mt-4">
					<p className="text-gray-500 mb-1">Additional resources</p>
					<p className="text-sm">{"N/A"}</p>
				</div>
				{assignment.feedback && (
					<div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded">
						<p className="text-sm font-medium text-blue-800">
							Instructor Feedback:
						</p>
						<p className="text-sm text-blue-700">{assignment.feedback}</p>
					</div>
				)}

				<div className="mt-4 flex justify-between">
					<div>
						<FileUpload
							onFileSelect={handleFileSelect}
							onFileProcess={handleFileProcess}
							isProcessing={isChecking}
							error={error}
							uploadedFile={uploadedFile}
							onError={handleFileError}
						/>
					</div>
					<div className="flex items-center space-x-2">
						{(assignment.status === "In Progress" ||
							assignment.status === "Due") && (
							<>
								<button
									className="border border-gray-300 bg-white px-4 py-2 rounded text-sm hover:bg-gray-50 flex items-center"
									onClick={() => runInspector(assignment.id)}
									disabled={isChecking}
								>
									{isChecking ? (
										<Loader2 size={16} className="animate-spin mr-2" />
									) : (
										<Search size={16} className="mr-2" />
									)}
									Run Plagiarism Check
								</button>
								<button
									style={{ backgroundColor: themeColors.accents.active }}
									className="text-white px-4 py-2 rounded text-sm flex items-center hover:opacity-90 transition-opacity"
									disabled={isChecking}
								>
									<FilePlus size={16} className="mr-2" />
									Submit Assignment
								</button>
							</>
						)}
						{assignment.status === "Submitted" && (
							<button
								className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 flex items-center"
								onClick={() => updateStatus(assignment.id, "In Progress")}
							>
								<RefreshCcw size={16} className="mr-2" />
								Resubmit
							</button>
						)}
						<button className="border border-gray-300 px-4 py-2 rounded text-sm hover:bg-gray-100 flex items-center">
							<MoreHorizontal size={16} className="mr-2" />
							Details
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AssignmentCard;
