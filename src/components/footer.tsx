import React, { useState } from "react";
import {
	Calendar as CalendarIcon,
	ClipboardList,
	AlertTriangle,
	ChevronDown,
	ChevronUp,
} from "lucide-react";
import { themeColors } from "../constant/Colors";

const Footer = React.memo(() => {
	const [expanded, setExpanded] = useState(true);

	if (!expanded) {
		return (
			<div className="fixed bottom-3 right-3 z-50" style={{}}>
				<button
					onClick={() => setExpanded(true)}
					className="px-3 py-2 rounded-full shadow-md border flex items-center gap-2"
					style={{
						backgroundColor: themeColors.surfaces.card,
						color: themeColors.text.primary,
						borderColor: themeColors.accents.active,
					}}
					aria-label="Expand quick actions"
				>
					<span className="text-sm">Quick Actions</span>
					<ChevronUp size={16} />
				</button>
			</div>
		);
	}

	return (
		<div
			className="fixed bottom-0 left-0 right-0 p-3 border-t flex justify-center gap-6 backdrop-blur-sm z-40"
			style={{
				backgroundColor: themeColors.surfaces.sidebar + "CC",
				borderColor: themeColors.accents.active,
			}}
		>
			<div className="flex items-center gap-6">
				<button
					className="flex items-center gap-2 px-4 py-2 rounded-full text-sm hover:scale-105 transition-transform border"
					style={{
						color: themeColors.text.primary,
						backgroundColor: themeColors.surfaces.card,
						borderColor: themeColors.accents.active,
					}}
				>
					<CalendarIcon size={16} />
					Schedule
				</button>
				<button
					className="flex items-center gap-2 px-4 py-2 rounded-full text-sm hover:scale-105 transition-transform border"
					style={{
						color: themeColors.text.primary,
						backgroundColor: themeColors.surfaces.card,
						borderColor: themeColors.accents.active,
					}}
				>
					<ClipboardList size={16} />
					Submissions
				</button>
				<button
					className="flex items-center gap-2 px-4 py-2 rounded-full text-sm hover:scale-105 transition-transform border"
					style={{
						color: themeColors.text.primary,
						backgroundColor: themeColors.surfaces.card,
						borderColor: themeColors.accents.active,
					}}
				>
					<AlertTriangle size={16} />
					Exams
				</button>
			</div>

			<button
				onClick={() => setExpanded(false)}
				className="absolute right-3 -top-4 px-2 py-1 rounded-full shadow border flex items-center gap-1 text-xs"
				style={{
					backgroundColor: themeColors.surfaces.card,
					color: themeColors.text.primary,
					borderColor: themeColors.accents.active,
				}}
				aria-label="Collapse quick actions"
			>
				<ChevronDown size={14} />
				Hide
			</button>
		</div>
	);
});

export default Footer;
