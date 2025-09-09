import axios from 'axios';

// PlagiarismCheck.org API configuration
// Use proxy in dev to avoid CORS; fall back to direct URL in prod/build
const API_BASE_URL = (import.meta as unknown as MaybeEnv)?.env?.DEV ? "/pcapi" : "https://plagiarismcheck.org/api/v1";

type EnvRecord = Record<string, string | undefined>;
type MaybeEnv = { env?: EnvRecord };

const viteToken = (import.meta as unknown as MaybeEnv)?.env?.VITE_PLAGIARISM_ORG_API;
const nodeToken = (globalThis as unknown as { process?: { env?: EnvRecord } })?.process?.env?.PLAGIARISM_ORG_API;
const API_TOKEN: string | undefined = viteToken || nodeToken || "36fgKW4-qIn-PS9j1cZw8u6r1I4LEM7S";

// Report types (partial, based on docs)
interface PlagSource {
	title?: string;
	domain?: string;
	url?: string;
}

interface PlagChunk {
	text?: string;
	content?: string;
	sources?: PlagSource[];
}

interface PlagiarismOrgReport {
	data?: {
		percent?: number;
		chunks?: PlagChunk[];
	};
	percent?: number;
	chunks?: PlagChunk[];
}

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

// --- File text extraction helpers ---
const readFileAsArrayBuffer = (file: File): Promise<ArrayBuffer> =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => resolve(reader.result as ArrayBuffer);
		reader.onerror = reject;
		reader.readAsArrayBuffer(file);
	});

const readFileAsText = (file: File): Promise<string> =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => resolve(reader.result as string);
		reader.onerror = reject;
		reader.readAsText(file);
	});

const extractTextFromPdf = async (file: File): Promise<string> => {
	try {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const pdfjs: any = await import('pdfjs-dist/build/pdf');
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const worker: any = await import('pdfjs-dist/build/pdf.worker.min?url');
		pdfjs.GlobalWorkerOptions.workerSrc = (worker as { default?: string }).default || worker;

		const data = await readFileAsArrayBuffer(file);
		const loadingTask = pdfjs.getDocument({ data });
		const pdf = await loadingTask.promise;
		let fullText = '';
		for (let i = 1; i <= pdf.numPages; i++) {
			const page = await pdf.getPage(i);
			const content = await page.getTextContent();
			const strings = (content.items as Array<{ str: string }>).map((it) => it.str);
			fullText += strings.join(' ') + '\n';
		}
		return fullText.trim();
	} catch {
		throw new Error('Failed to extract text from PDF. Install pdfjs-dist or upload text.');
	}
};

const extractTextFromFile = async (file: File): Promise<string> => {
	const type = file.type;
	if (type === 'application/pdf') return extractTextFromPdf(file);
	if (type.startsWith('text/')) return readFileAsText(file);
	// Basic fallback for unknown mime types: try text
	try {
		return await readFileAsText(file);
	} catch {
		throw new Error('Unsupported file type for text extraction. Please upload PDF or text files.');
	}
};

export const checkPlagiarism = async (
	file: File
): Promise<PlagiarismResult> => {
	// In development, token is injected by Vite proxy. In production, require token.
	if (!API_TOKEN && !(import.meta as unknown as MaybeEnv)?.env?.DEV) {
		throw new Error('Plagiarism API token missing. Set PLAGIARISM_ORG_API');
	}

	try {
		// 1) Extract text client-side
		const text = await extractTextFromFile(file);
		if (!text || text.length < 80) {
			throw new Error('Extracted text is too short for checking (min 80 characters).');
		}

		// 2) Submit text for checking
		const createResp = await axios.post(
			`${API_BASE_URL}/text`,
			new URLSearchParams({ language: 'en', text }),
			{
				headers: API_TOKEN
					? { 'X-API-TOKEN': API_TOKEN, 'Content-Type': 'application/x-www-form-urlencoded' }
					: { 'Content-Type': 'application/x-www-form-urlencoded' },
				timeout: 30000,
			}
		);

		const textId = createResp?.data?.data?.text?.id ?? createResp?.data?.data?.id;
		if (!textId) throw new Error('Unable to obtain text ID from plagiarism service');

		// 3) Poll for completion
		const maxAttempts = 30;
		const delayMs = 2000;
		for (let attempt = 0; attempt < maxAttempts; attempt++) {
			const statusResp = await axios.get(`${API_BASE_URL}/text/${textId}`, {
				headers: API_TOKEN ? { 'X-API-TOKEN': API_TOKEN } : undefined,
				timeout: 15000,
			});
			const state = statusResp?.data?.data?.state;
			if (state === 5) break; // STATE_CHECKED
			if (state === 4) throw new Error('Plagiarism check failed at service');
			await new Promise((r) => setTimeout(r, delayMs));
		}

		// 4) Retrieve final report (if report endpoint available)
		// Some implementations return full info on status endpoint after checked
		// Try report endpoint first
		try {
			const reportResp = await axios.get(`${API_BASE_URL}/text/${textId}/report`, {
				headers: API_TOKEN ? { 'X-API-TOKEN': API_TOKEN } : undefined,
				timeout: 30000,
			});
			if (reportResp.status === 200 && reportResp.data) {
				return processPlagiarismResponse(reportResp.data as PlagiarismOrgReport as unknown as Record<string, unknown>);
			}
		} catch {
			// Fallback: use status payload if it contains summary fields
			const statusResp = await axios.get(`${API_BASE_URL}/text/${textId}`, {
				headers: API_TOKEN ? { 'X-API-TOKEN': API_TOKEN } : undefined,
				timeout: 15000,
			});
			return processPlagiarismResponse(statusResp.data as PlagiarismOrgReport as unknown as Record<string, unknown>);
		}

		throw new Error('Invalid response when fetching plagiarism report');
	} catch (error) {
		console.error('Plagiarism check failed:', error);
		throw error;
	}
};

export const processPlagiarismResponse = (
	data: Record<string, unknown>
): PlagiarismResult => {
	try {
		// Normalize PlagiarismCheck.org report structure
		const report = data as unknown as PlagiarismOrgReport;
		const rawPercent = report?.data?.percent ?? report?.percent ?? 0;
		const plagPercent = typeof rawPercent === 'number' ? rawPercent : 0;
		const uniquePercent = Math.max(0, 100 - plagPercent);

		const chunks = Array.isArray(report?.data?.chunks)
			? report.data?.chunks
			: Array.isArray(report?.chunks)
			? report.chunks
			: [];

		const details = chunks.map((c: PlagChunk) => ({
			query: c.text || c.content || '',
			error: 0,
			unique: '',
			webs: Array.isArray(c.sources)
				? c.sources.map((s: PlagSource) => ({
					title: s.title || s.domain || 'Source',
					url: s.url || '',
				}))
				: [],
		}));

		return {
			plagPercent: Math.round(plagPercent),
			uniquePercent: Math.round(uniquePercent),
			details,
		};
	} catch (error) {
		console.error('Error processing plagiarism response:', error);
		return {
			plagPercent: 0,
			uniquePercent: 100,
			details: [],
		};
	}
};

export const getPlagiarismErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 401) {
      return "API token is invalid or expired (X-API-TOKEN)";
    } else if (error.response?.status === 429) {
      return "Rate limit exceeded. Please try again later.";
    } else if (error.code === 'ECONNABORTED') {
      return "Request timed out. Please try again.";
    } else {
      const data = error.response?.data as { message?: string } | undefined;
      return `API Error: ${data?.message || error.message}`;
    }
  }
  return error instanceof Error ? error.message : 'Failed to check plagiarism';
}; 