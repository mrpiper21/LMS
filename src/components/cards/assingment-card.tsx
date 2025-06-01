import {
	AlertCircle,
	CheckCircle,
	Clock,
	FileCheck,
	FilePlus,
	MoreHorizontal,
	RefreshCcw,
	Search,
	AlertTriangle,
	Shield,
	FileText,
	File,
	Loader2,
} from "lucide-react";
import { type FC, useRef, useState } from "react";
import { themeColors } from "../../constant/Colors";

interface PlagiarismResult {
	plagPercent: number;
	uniquePercent: number;
	details: Array<{
		query: string;
		error: number;
		unique: string;
		webs?: Array<{
			title: string;
			url: string;
		}>;
	}>;
}

interface Assignment {
	id: string;
	status:
		| "In Progress"
		| "Submitted"
		| "Returned"
		| "Due"
		| "Upcoming"
		| "Completed";
	title: string;
	description: string;
	dueDate: string;
	points?: number;
	grade?: number;
	instructions?: string;
	feedback?: string;
	submittedDate?: string;
	inspectorStatus?: "Not Checked" | "Checking" | "Passed" | "Issues Found";
	inspectorScore?: number;
}

interface AssignmentCardProps {
	assignment: Assignment;
	onUpdateStatus?: (id: string, newStatus: Assignment["status"]) => void;
	onRunInspector?: (id: string) => void;
	onFileUpload?: (id: string, file: File) => void;
}

const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
const PLAGIARISM_API = 'https://pro.smallseotools.com/api/checkplag';

const AssignmentCard: FC<AssignmentCardProps> = ({
	assignment,
	onUpdateStatus,
	onRunInspector,
	onFileUpload,
}) => {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [uploadedFile, setUploadedFile] = useState<File | null>(null);
	const [isChecking, setIsChecking] = useState(false);
	const [plagiarismResult, setPlagiarismResult] = useState<PlagiarismResult | null>(null);
	const [error, setError] = useState<string | null>(null);

	// Function to get appropriate status icon
	const getStatusIcon = (status: string) => {
		switch (status) {
			case "Due":
				return <AlertCircle size={16} className="text-red-500" />;
			case "In Progress":
				return <Clock size={16} className="text-blue-500" />;
			case "Submitted":
				return <CheckCircle size={16} className="text-green-500" />;
			case "Returned":
				return <FileCheck size={16} className="text-purple-500" />;
			case "Upcoming":
				return <Clock size={16} className="text-blue-500" />;
			case "Completed":
				return <CheckCircle size={16} className="text-green-500" />;
			default:
				return <Clock size={16} className="text-gray-500" />;
		}
	};

	// Function to get background color based on status
	const getStatusColor = (status: string) => {
		switch (status) {
			case "Due":
				return "bg-red-100 text-red-800";
			case "In Progress":
				return "bg-blue-100 text-blue-800";
			case "Submitted":
				return "bg-green-100 text-green-800";
			case "Returned":
				return "bg-purple-100 text-purple-800";
			case "Upcoming":
				return "bg-gray-100 text-gray-800";
			case "Completed":
				return "bg-green-100 text-green-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	// Function to get inspector status color
	const getInspectorStatusColor = (status?: string) => {
		switch (status) {
			case "Passed":
				return "bg-green-50 border-green-200";
			case "Issues Found":
				return "bg-red-50 border-red-200";
			case "Checking":
				return "bg-blue-50 border-blue-200";
			case "Not Checked":
			default:
				return "bg-gray-50 border-gray-200";
		}
	};

	// Function to get inspector status icon
	const getInspectorStatusIcon = (status?: string) => {
		switch (status) {
			case "Passed":
				return <Shield size={18} className="text-green-600" />;
			case "Issues Found":
				return <AlertTriangle size={18} className="text-red-600" />;
			case "Checking":
				return <RefreshCcw size={18} className="text-blue-600 animate-spin" />;
			case "Not Checked":
			default:
				return <Shield size={18} className="text-gray-400" />;
		}
	};

	// Map older status names to the new format if needed
	const getStatusForTracker = (
		status: string
	): "In Progress" | "Submitted" | "Returned" => {
		switch (status) {
			case "Due":
			case "Upcoming":
			case "In Progress":
				return "In Progress";
			case "Submitted":
				return "Submitted";
			case "Completed":
			case "Returned":
				return "Returned";
			default:
				return "In Progress";
		}
	};

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
								{status === "In Progress" && (
									<Clock
										size={16}
										className={
											index <= currentIndex ? "text-blue-600" : "text-gray-400"
										}
									/>
								)}
								{status === "Submitted" && (
									<CheckCircle
										size={16}
										className={
											index <= currentIndex ? "text-blue-600" : "text-gray-400"
										}
									/>
								)}
								{status === "Returned" && (
									<FileCheck
										size={16}
										className={
											index <= currentIndex ? "text-blue-600" : "text-gray-400"
										}
									/>
								)}
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

	// Function to update status (with proper TypeScript safety)
	const updateStatus = (id: string, newStatus: Assignment["status"]) => {
		if (onUpdateStatus) {
			onUpdateStatus(id, newStatus);
		}
	};

	const runInspector = (id: string) => {
		if (onRunInspector) {
			onRunInspector(id);
		}
	};

	// Function to render the Inspector score with visual indicator
	const renderInspectorScore = () => {
		if (
			!assignment.inspectorStatus ||
			assignment.inspectorStatus === "Not Checked"
		) {
			return null;
		}

		if (assignment.inspectorStatus === "Checking") {
			return (
				<div className="flex items-center">
					<div className="w-full bg-gray-200 rounded-full h-2">
						<div
							className="bg-blue-500 h-2 rounded-full animate-pulse"
							style={{ width: "50%" }}
						></div>
					</div>
					<span className="ml-2 text-xs text-blue-600">Analyzing...</span>
				</div>
			);
		}

		if (assignment.inspectorScore !== undefined) {
			const scoreColor =
				assignment.inspectorScore > 80
					? "bg-green-500"
					: assignment.inspectorScore > 60
					? "bg-yellow-500"
					: "bg-red-500";

			return (
				<div className="flex items-center">
					<div className="w-full bg-gray-200 rounded-full h-2">
						<div
							className={`${scoreColor} h-2 rounded-full`}
							style={{ width: `${assignment.inspectorScore}%` }}
						></div>
					</div>
					<span className="ml-2 text-xs font-medium">
						{assignment.inspectorScore}% Original
					</span>
				</div>
			);
		}

		return null;
	};

	const checkPlagiarism = async (content: string) => {
		try {
			setIsChecking(true);
			setError(null);

			// Initial API call
			const response = await fetch(`${CORS_PROXY}${PLAGIARISM_API}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Origin': window.location.origin,
					'X-Requested-With': 'XMLHttpRequest'
				},
				body: new URLSearchParams({
					token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30',
					data: content,
				}),
			});

			if (!response.ok) {
				throw new Error(`API request failed with status ${response.status}`);
			}

			const initialData = await response.json();
			if (!initialData.recall) {
				throw new Error('Invalid response from plagiarism API');
			}

			// Poll for results
			let currentKey = initialData.key;
			let hash = initialData.hash;
			let finalResult = null;

			while (true) {
				const pollResponse = await fetch(
					`${CORS_PROXY}https://pro.smallseotools.com/api/query-footprint/${hash}/${currentKey}`,
					{
						headers: {
							'Origin': window.location.origin,
							'X-Requested-With': 'XMLHttpRequest'
						}
					}
				);

				if (!pollResponse.ok) {
					throw new Error(`Poll request failed with status ${pollResponse.status}`);
				}

				const pollData = await pollResponse.json();

				if (!pollData.recall) {
					finalResult = pollData;
					break;
				}

				currentKey = pollData.key;
				// Wait for 2 seconds before next poll
				await new Promise(resolve => setTimeout(resolve, 2000));
			}

			setPlagiarismResult(finalResult);
			updateInspectorStatus(finalResult.plagPercent);
		} catch (error) {
			console.error('Plagiarism check failed:', error);
			setError(error instanceof Error ? error.message : 'Failed to check plagiarism');
		} finally {
			setIsChecking(false);
		}
	};

	const updateInspectorStatus = (plagPercent: number) => {
		if (plagPercent > 20) {
			// Update assignment status to show issues found
			if (onUpdateStatus) {
				onUpdateStatus(assignment.id, "Returned");
			}
		}
	};

	const extractTextFromPDF = async (file: File): Promise<string> => {
		try {
			// For now, we'll just return a placeholder message
			// In a real implementation, you would use a PDF parsing library
			return "PDF content extraction is not implemented yet. Please convert your PDF to text format before uploading.";
		} catch (error) {
			throw new Error("Failed to extract text from PDF");
		}
	};

	const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setUploadedFile(file);
			if (onFileUpload) {
				onFileUpload(assignment.id, file);
			}

			try {
				setError(null);
				let content: string;

				if (file.type === 'application/pdf') {
					content = await extractTextFromPDF(file);
					setError("PDF files are not supported for plagiarism checking. Please convert to text format.");
					return;
				} else if (file.type === 'application/msword' ||
					file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
					// For Word documents, we'll need to implement proper text extraction
					content = "Word document content extraction is not implemented yet. Please convert to text format before uploading.";
					setError("Word documents are not supported for plagiarism checking. Please convert to text format.");
					return;
				} else {
					// For text files
					content = await new Promise((resolve, reject) => {
						const reader = new FileReader();
						reader.onload = (e) => {
							const text = e.target?.result as string;
							if (text) {
								resolve(text);
							} else {
								reject(new Error("Failed to read file content"));
							}
						};
						reader.onerror = () => reject(new Error("Failed to read file"));
						reader.readAsText(file);
					});
				}

				if (content) {
					await checkPlagiarism(content);
				}
			} catch (error) {
				console.error('File processing failed:', error);
				setError(error instanceof Error ? error.message : 'Failed to process file');
			}
		}
	};

	const handleUploadClick = () => {
		fileInputRef.current?.click();
	};

	const getFileIcon = (file: File) => {
		const extension = file.name.split('.').pop()?.toLowerCase();
		switch (extension) {
			case 'pdf':
				return <FileText size={16} className="text-red-500" />;
			case 'doc':
			case 'docx':
				return <FileText size={16} className="text-blue-500" />;
			default:
				return <File size={16} className="text-gray-500" />;
		}
	};

	const formatFileSize = (bytes: number) => {
		if (bytes === 0) return '0 Bytes';
		const k = 1024;
		const sizes = ['Bytes', 'KB', 'MB', 'GB'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
	};

	return (
		<div className="border rounded-lg mb-4 hover:shadow-md transition-shadow">
			<div className="p-4 border-b">
				<div className="flex justify-between items-start">
					<div className="flex items-start">
						{getStatusIcon(assignment.status)}
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
				<div className="mt-4 p-3 border rounded">
					<div className="flex items-center justify-between mb-2">
						<div className="flex items-center">
							<Shield size={18} className="text-blue-600 mr-2" />
							<h5 className="font-medium text-blue-800">
								Plagiarism Inspector
							</h5>
						</div>
						<div className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
							Academic Integrity Check
						</div>
					</div>
					<p className="text-sm text-gray-600 mb-3">
						Inspector automatically checks your work for potential plagiarism
						and helps ensure proper attribution of sources.
					</p>

					{/* Inspector Status Section */}
					{(assignment.status === "In Progress" ||
						assignment.status === "Submitted" ||
						assignment.status === "Due") && (
						<div
							className={`p-3 border rounded flex items-start ${getInspectorStatusColor(
								assignment.inspectorStatus
							)}`}
						>
							<div className="mr-2 mt-0.5">
								{getInspectorStatusIcon(assignment.inspectorStatus)}
							</div>
							<div className="flex-grow">
								<div className="flex justify-between items-center">
									<p className="text-sm font-medium">
										{assignment.inspectorStatus === "Issues Found"
											? "Potential Plagiarism Detected"
											: assignment.inspectorStatus === "Passed"
											? "Plagiarism Check Passed"
											: assignment.inspectorStatus === "Checking"
											? "Checking for Plagiarism"
											: "Plagiarism Check Not Run"}
									</p>
									{assignment.inspectorStatus !== "Checking" && (
										<button
											className="text-xs bg-white border rounded px-2 py-1 hover:bg-gray-50"
											onClick={() => runInspector(assignment.id)}
										>
											{assignment.inspectorStatus === "Not Checked" ||
											!assignment.inspectorStatus
												? "Run Check"
												: "Re-check"}
										</button>
									)}
								</div>
								{renderInspectorScore()}
								{assignment.inspectorStatus === "Issues Found" && (
									<p className="text-xs mt-1">
										Review suggested for possible citation issues or text
										similarity with other sources.
									</p>
								)}
								{assignment.inspectorStatus === "Passed" && (
									<p className="text-xs mt-1">
										Your work appears to be original or properly cited.
									</p>
								)}
								{(assignment.inspectorStatus === "Not Checked" ||
									!assignment.inspectorStatus) && (
									<p className="text-xs mt-1">
										Run the plagiarism check to verify your work meets academic
										integrity standards before submission.
									</p>
								)}
							</div>
						</div>
					)}
				</div>

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
						<div className="flex items-center space-x-2">
							<span className="text-gray-600">File:</span>
							{uploadedFile ? (
								<div className="flex items-center space-x-2 bg-gray-50 px-3 py-1.5 rounded border">
									{getFileIcon(uploadedFile)}
									<div className="flex flex-col">
										<span className="text-sm font-medium text-gray-700">
											{uploadedFile.name}
										</span>
										<span className="text-xs text-gray-500">
											{formatFileSize(uploadedFile.size)}
										</span>
										{error && (
											<span className="text-xs text-red-500 mt-1">
												{error}
											</span>
										)}
									</div>
								</div>
							) : (
								<div className="flex items-center space-x-2">
									<input
										type="file"
										ref={fileInputRef}
										onChange={handleFileUpload}
										accept=".txt,.text"
										className="block w-full text-sm text-gray-500
											file:mr-4 file:py-2 file:px-4
											file:rounded file:border-0
											file:text-sm file:font-semibold
											file:bg-blue-50 file:text-blue-700
											hover:file:bg-blue-100"
									/>
								</div>
							)}
						</div>
						<div className="flex items-center space-x-2 mt-1">
							<span className="text-gray-600">Inspector result:</span>
							{isChecking ? (
								<div className="flex items-center space-x-2">
									<Loader2 size={16} className="animate-spin text-blue-600" />
									<span className="text-sm text-blue-600">Checking for plagiarism...</span>
								</div>
							) : error ? (
								<div className="flex items-center space-x-2">
									<AlertCircle size={16} className="text-red-500" />
									<span className="text-sm text-red-600">{error}</span>
								</div>
							) : plagiarismResult ? (
								<div className="flex items-center space-x-2">
									<span className={`text-sm font-medium ${plagiarismResult.plagPercent > 20 ? 'text-red-600' : 'text-green-600'
										}`}>
										{plagiarismResult.plagPercent}% Similar
									</span>
									<span className="text-sm text-gray-600">
										({plagiarismResult.uniquePercent}% Unique)
									</span>
								</div>
							) : (
								<span className="text-sm text-gray-500">Not checked</span>
							)}
						</div>
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
										onClick={handleUploadClick}
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
