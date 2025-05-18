import {
  AlertCircle,
  CheckCircle,
  Clock,
  FileCheck,
  FilePlus,
  MoreHorizontal,
  RefreshCcw,
} from "lucide-react";
import { type FC } from "react";

interface Assignment {
  id: string;
  status: "In Progress" | "Submitted" | "Returned" | "Due" | "Upcoming" | "Completed";
  title: string;
  description: string;
  dueDate: string;
  points?: number;
  grade?: number;
  instructions?: string;
  feedback?: string;
  submittedDate?: string;
}

interface AssignmentCardProps {
  assignment: Assignment;
  onUpdateStatus?: (id: string, newStatus: Assignment["status"]) => void;
}

const AssignmentCard: FC<AssignmentCardProps> = ({ assignment, onUpdateStatus }) => {
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
  
  const getStatusForTracker = (status: string): "In Progress" | "Submitted" | "Returned" => {
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
            <div className={`flex flex-col items-center ${index <= currentIndex ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`rounded-full p-1 ${index <= currentIndex ? 'bg-blue-100' : 'bg-gray-100'}`}>
                {status === "In Progress" && <Clock size={16} className={index <= currentIndex ? 'text-blue-600' : 'text-gray-400'} />}
                {status === "Submitted" && <CheckCircle size={16} className={index <= currentIndex ? 'text-blue-600' : 'text-gray-400'} />}
                {status === "Returned" && <FileCheck size={16} className={index <= currentIndex ? 'text-blue-600' : 'text-gray-400'} />}
              </div>
              <span className="text-xs mt-1">{status}</span>
            </div>
            {index < statuses.length - 1 && (
              <div className={`h-0.5 flex-grow mx-1 ${index < currentIndex ? 'bg-blue-400' : 'bg-gray-300'}`}></div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const updateStatus = (id: string, newStatus: Assignment["status"]) => {
    if (onUpdateStatus) {
      onUpdateStatus(id, newStatus);
    }
  };

  return (
    <div className="border rounded-lg mb-4 hover:shadow-md transition-shadow">
      <div className="p-4 border-b">
        <div className="flex justify-between items-start">
          <div className="flex items-start">
            {getStatusIcon(assignment.status)}
            <div className="ml-3">
              <h4 className="font-bold text-gray-800">
                {assignment.title}
              </h4>
              <p className="text-sm text-gray-600">
                {assignment.description}
              </p>
            </div>
          </div>
          <div className="text-right">
            <span
              className={`inline-block px-2 py-1 text-xs rounded ${getStatusColor(assignment.status)}`}
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
            <p className="text-sm text-blue-700">
              {assignment.feedback}
            </p>
          </div>
        )}

        <div className="mt-4 flex justify-end space-x-2">
          {(assignment.status === "In Progress" || assignment.status === "Due") && (
            <button 
              className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700 flex items-center"
              onClick={() => updateStatus(assignment.id, "Submitted")}
            >
              <FilePlus size={16} className="mr-2" />
              Submit Assignment
            </button>
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
  );
};

export default AssignmentCard;