import { Bell, Menu, X } from "lucide-react";
import React from "react";
import { themeColors } from "../constant/Colors";
import Logo from "../assets/ATU-LOGO-AUTHENTIC-edit-1024x980.png";

const Header = React.memo(
	({
		sidebarOpen,
		toggleSidebar,
		notificationsCount,
		userInitials,
		username,
		dropdownRef,
		showDropdown,
		setShowDropdown,
		onLogout,
	}: {
		sidebarOpen: boolean;
		toggleSidebar: () => void;
		notificationsCount: number;
		userInitials: string;
		username: string;
		dropdownRef: React.RefObject<HTMLDivElement>;
		showDropdown: boolean;
		setShowDropdown: (show: boolean) => void;
		onLogout: () => void;
	}) => (
		<header
			style={{
				backgroundColor: themeColors.accents.hover,
				color: themeColors.primary.main,
			}}
			className="shadow-sm fixed w-full z-10"
		>
			<div className="container flex items-center justify-between p-4">
				<div className="flex items-center">
					<button
						className="mr-4 lg:hidden"
						onClick={toggleSidebar}
						aria-label="Toggle sidebar"
					>
						{sidebarOpen ? <X size={24} /> : <Menu size={24} />}
					</button>
					<div className="flex items-center gap-4">
						<img className="h-12 w-12" src={Logo} />
						<h1 className="text-lg font-bold">ACCRA TECHNICAL UNIVERSITY</h1>
					</div>
				</div>

				<div className="flex items-center gap-4">
					<button className="p-2 relative hover:opacity-80 transition-opacity">
						<Bell size={24} />
						{notificationsCount > 0 && (
							<span className="absolute top-0 right-0 bg-red-500 text-xs w-4 h-4 rounded-full flex items-center justify-center">
								{notificationsCount}
							</span>
						)}
					</button>

					<div className="relative" ref={dropdownRef}>
						<div
							onClick={() => setShowDropdown(!showDropdown)}
							className="w-10 h-10 items-center justify-center flex text-primary border rounded-full border-[#134B70] font-bold hover:cursor-pointer transition-colors"
							aria-label="User menu"
						>
							<span>{"JD"}</span>
						</div>

						{showDropdown && (
							<div className="absolute right-0 mt-2 w-48 rounded-md border bg-[#F7C966] py-1 z-[9999999]">
								<div className="px-4 py-3 border-b text-[#134B70]">
									<p className="text-sm font-medium text-[#134B70]">
										{username}
									</p>
									<p className="text-xs text-gray-500">
										ID: STU2023{Math.floor(1000 + Math.random() * 9000)}
									</p>
								</div>
								<div className="px-4 py-3 border-b text-[#134B70]">
									<p>Preference</p>
								</div>
								<button
									onClick={onLogout}
									className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
								>
									Log out
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
		</header>
	)
);

export default Header