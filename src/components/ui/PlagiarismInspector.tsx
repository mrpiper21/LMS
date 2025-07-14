import { Shield } from "lucide-react";
import { InspectorStatusIcon } from "./StatusIcon";
import { getInspectorStatusColor, getInspectorStatusText } from "../../utils/statusUtils";
import type { PlagiarismResult } from "../../utils/plagiarismUtils";

interface PlagiarismInspectorProps {
  inspectorStatus?: string;
  inspectorScore?: number;
  plagiarismResult?: PlagiarismResult | null;
  onRunInspector: () => void;
  isChecking?: boolean;
}

export const PlagiarismInspector = ({
  inspectorStatus,
  inspectorScore,
  plagiarismResult,
  onRunInspector,
  isChecking = false
}: PlagiarismInspectorProps) => {
  const renderInspectorScore = () => {
    if (!inspectorStatus || inspectorStatus === "Not Checked") {
      return null;
    }

    if (inspectorStatus === "Checking") {
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

    if (inspectorScore !== undefined) {
      const scoreColor =
        inspectorScore > 80
          ? "bg-green-500"
          : inspectorScore > 60
          ? "bg-yellow-500"
          : "bg-red-500";

      return (
        <div className="flex items-center">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`${scoreColor} h-2 rounded-full`}
              style={{ width: `${inspectorScore}%` }}
            ></div>
          </div>
          <span className="ml-2 text-xs font-medium">
            {inspectorScore}% Original
          </span>
        </div>
      );
    }

    // Show plagiarism result if available
    if (plagiarismResult) {
      const scoreColor =
        plagiarismResult.plagPercent > 20
          ? "bg-red-500"
          : "bg-green-500";

      return (
        <div className="flex items-center">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`${scoreColor} h-2 rounded-full`}
              style={{ width: `${plagiarismResult.plagPercent}%` }}
            ></div>
          </div>
          <span className="ml-2 text-xs font-medium">
            {plagiarismResult.plagPercent}% Similar ({plagiarismResult.uniquePercent}% Unique)
          </span>
        </div>
      );
    }

    return null;
  };

  return (
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

      <div
        className={`p-3 border rounded flex items-start ${getInspectorStatusColor(
          inspectorStatus
        )}`}
      >
        <div className="mr-2 mt-0.5">
          <InspectorStatusIcon status={inspectorStatus} />
        </div>
        <div className="flex-grow">
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium">
              {getInspectorStatusText(inspectorStatus)}
            </p>
            {inspectorStatus !== "Checking" && (
              <button
                className="text-xs bg-white border rounded px-2 py-1 hover:bg-gray-50"
                onClick={onRunInspector}
                disabled={isChecking}
              >
                {inspectorStatus === "Not Checked" || !inspectorStatus
                  ? "Run Check"
                  : "Re-check"}
              </button>
            )}
          </div>
          {renderInspectorScore()}
          {inspectorStatus === "Issues Found" && (
            <p className="text-xs mt-1">
              Review suggested for possible citation issues or text
              similarity with other sources.
            </p>
          )}
          {inspectorStatus === "Passed" && (
            <p className="text-xs mt-1">
              Your work appears to be original or properly cited.
            </p>
          )}
          {(inspectorStatus === "Not Checked" || !inspectorStatus) && (
            <p className="text-xs mt-1">
              Run the plagiarism check to verify your work meets academic
              integrity standards before submission.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}; 