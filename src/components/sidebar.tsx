/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { themeColors } from "../constant/Colors";
import type { NavItem } from "../layout/AppLayout";

const Sidebar = React.memo(
	({
		open,
		navItems,
		activeTab,
		setActiveTab,
		userInitials,
		username,
		navigate,
	}: // onItemClick,
	{
		open: boolean;
		navItems: NavItem[];
		activeTab: string;
		setActiveTab: (tab: string) => void;
		userInitials: string;
		username: string;
		navigate: any;
		// onItemClick: (r: string) => void;
	}) => (
		<aside
			style={{ backgroundColor: themeColors.surfaces.sidebar }}
			className={` w-64 min-h-screen pt-20 flex-shrink-0 transition-all duration-300 fixed ${
				open ? "left-0" : "-left-full"
			} lg:left-0`}
		>
			<div className="p-4 text-center">
				<div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
					<span className="text-2xl font-bold">{userInitials}</span>
				</div>
				<p className="font-medium truncate">{username}</p>
				<p className="text-sm text-gray-300">Student</p>
			</div>

			<nav className="mt-2">
				{navItems.map((item) => (
					<button
						style={{
							background:
								activeTab === item.id ? themeColors.accents.hover : "none",

							color: themeColors.primary.main,
						}}
						key={item.id}
						onClick={() => {
							setActiveTab(item.id);
							navigate(item.route);
						}}
						className={`flex items-center w-full gap-4 px-4 py-3 text-left transition-colors`}
					>
						<div>{React.cloneElement(item.icon)}</div>
						<span>{item.label}</span>
					</button>
				))}
			</nav>
		</aside>
	)
);

export default Sidebar