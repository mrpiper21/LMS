export type AssignmentStatus = 
  | "In Progress"
  | "Submitted"
  | "Returned"
  | "Due"
  | "Upcoming"
  | "Completed";

export type InspectorStatus = "Not Checked" | "Checking" | "Passed" | "Issues Found";

export const getStatusColor = (status: string): string => {
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

export const getInspectorStatusColor = (status?: string): string => {
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

export const getStatusForTracker = (status: string): "In Progress" | "Submitted" | "Returned" => {
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

export const getInspectorStatusText = (status?: string): string => {
  switch (status) {
    case "Issues Found":
      return "Potential Plagiarism Detected";
    case "Passed":
      return "Plagiarism Check Passed";
    case "Checking":
      return "Checking for Plagiarism";
    case "Not Checked":
    default:
      return "Plagiarism Check Not Run";
  }
}; 