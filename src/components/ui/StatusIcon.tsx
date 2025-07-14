import {
  AlertCircle,
  CheckCircle,
  Clock,
  FileCheck,
  Shield,
  AlertTriangle,
  RefreshCcw,
} from "lucide-react";

export const StatusIcon = ({ status }: { status: string }) => {
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

export const InspectorStatusIcon = ({ status }: { status?: string }) => {
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