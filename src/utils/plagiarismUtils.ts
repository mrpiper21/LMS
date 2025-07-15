import axios from 'axios';

// API configuration
const API_KEY = "0f2c7a3f-6958-4181-8b59-fc4ae622fc94";
const PLAGIARISM_API_URL = "https://api.zerogpt.com/api/detect/filePlagiarism";

export interface PlagiarismResult {
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

export const checkPlagiarism = async (
	file: File
): Promise<PlagiarismResult> => {
	try {
		// Create FormData with the file
		const formData = new FormData();
		formData.append("file", file, file.name);

		// Prepare headers for the API request
		const headers = {
			ApiKey: API_KEY,
			// 'Content-Type' should NOT be set manually for FormData
		};

		// Make the API request
		const response = await axios.post(PLAGIARISM_API_URL, formData, {
			headers: headers,
			timeout: 30000,
		});

		if (response.status === 200 && response.data) {
			console.log("Plagiarism check completed successfully.", response.data);
			return processPlagiarismResponse(response.data);
		} else {
			throw new Error("Invalid response from plagiarism API");
		}
	} catch (error) {
		console.error("Plagiarism check failed:", error);
		throw error;
	}
};

// Process the plagiarism API response
export const processPlagiarismResponse = (data: Record<string, unknown>): PlagiarismResult => {
  try {
    // Extract relevant data from the API response
    const plagPercent = (data.result[15].wordsmatched as number) || (data.similarity_score as number) || 0;
    const uniquePercent = 100 - plagPercent;
    
    const details = (data.details as Array<Record<string, unknown>>) || (data.matches as Array<Record<string, unknown>>) || [];
    
    return {
      plagPercent: Math.round(plagPercent),
      uniquePercent: Math.round(uniquePercent),
      details: details.map((detail: Record<string, unknown>) => ({
        query: (detail.query as string) || (detail.text as string) || "",
        error: (detail.error as number) || 0,
        unique: (detail.unique as string) || "",
        webs: (detail.webs as Array<{title: string; url: string}>) || (detail.sources as Array<{title: string; url: string}>) || []
      }))
    };
  } catch (error) {
    console.error('Error processing plagiarism response:', error);
    // Return a default result if processing fails
    return {
      plagPercent: 0,
      uniquePercent: 100,
      details: []
    };
  }
};

export const getPlagiarismErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 401) {
      return "API key is invalid or expired";
    } else if (error.response?.status === 429) {
      return "Rate limit exceeded. Please try again later.";
    } else if (error.code === 'ECONNABORTED') {
      return "Request timed out. Please try again.";
    } else {
      return `API Error: ${error.response?.data?.message || error.message}`;
    }
  }
  return error instanceof Error ? error.message : 'Failed to check plagiarism';
}; 