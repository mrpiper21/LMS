import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import MainContent from "../components/mainContent";
import Footer from "../components/footer";
import { FolderClosed, FolderOpen } from "lucide-react";

// Type definitions
export type NavItem = {
	id: string;
	label: string;
	icon: React.ReactElement;
	route: string;
};

interface AppLayoutProps {
	children: React.ReactNode;
	user?: {
		name: string;
		initials?: string;
		avatar?: string;
	};
	notificationsCount?: number;
}

function AppLayout({
	children,
	user = {
		name: "John Doe",
		initials: "JD",
	},
	notificationsCount = 0,
}: AppLayoutProps) {
	const [activeTab, setActiveTab] = useState("dashboard");
	const [showDropdown, setShowDropdown] = useState(false);
	const [sidebarOpen, setSidebarOpen] = useState(true);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const navigate = useNavigate();

	// Navigation configuration
	const navItems = (activeTab: string) => [
		{
			id: "overview",
			label: "Overview",
			icon: activeTab === "overview" ? <FolderOpen /> : <FolderClosed />,
			route: "/overview",
		},
		{
			id: "announcement",
			label: "Announcements",
			icon: activeTab === "announcement" ? <FolderOpen /> : <FolderClosed />,
			route: "/home",
		},
		{
			id: "course",
			label: "Courses",
			icon: activeTab === "course" ? <FolderOpen /> : <FolderClosed />,
			route: "/courses",
		},
		// {
		// 	id: "notices",
		// 	label: "Notice Board",
		// 	icon: <FolderOpen />,
		// 	route: "/notices",
		// },
		// {
		// 	id: "settings",
		// 	label: "Preferences",
		// 	icon: <FolderOpen />,
		// 	route: "/settings",
		// },
		// {
		// 	id: "profile",
		// 	label: "Profile",
		// 	icon: <FolderOpen />,
		// 	route: "/profile",
		// },
		// {
		// 	id: "help",
		// 	label: "Help",
		// 	icon: <FolderOpen />,
		// 	route: "/help",
		// },
	];

	// Event handlers
	const handleLogout = () => {
		console.log("Logged out");
		// Add actual logout logic here
		navigate("/login");
	};

	const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

	const handleNavigation = (item: NavItem) => {
		setActiveTab(item.id);
		navigate?.(item?.route);
	};

	// Click outside handler for dropdown
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setShowDropdown(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<div className="flex flex-col min-h-screen w-screen">
			<Header
				sidebarOpen={sidebarOpen}
				toggleSidebar={toggleSidebar}
				notificationsCount={notificationsCount}
				// userInitials={user.initials}
				username={user.name}
				dropdownRef={dropdownRef}
				showDropdown={showDropdown}
				setShowDropdown={setShowDropdown}
				onLogout={handleLogout}
			/>

			<div className="flex flex-1 overflow-hidden">
				<Sidebar
					open={sidebarOpen}
					navItems={navItems(activeTab)}
					activeTab={activeTab}
					// onItemClick={handleNavigation}
					// userInitials={user.initials}
					navigate={navigate}
					username={user.name}
					setActiveTab={setActiveTab}
					userInitials=""
				/>

				<MainContent>{children}</MainContent>
			</div>

			{/* <Footer /> */}
		</div>
	);
}

export default AppLayout;
