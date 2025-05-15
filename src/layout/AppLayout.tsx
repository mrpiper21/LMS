/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef, useEffect } from 'react';
import { Bell, Home, User, Calendar, BookOpen, Settings, DollarSign, HelpCircle} from 'lucide-react';
import DashboardContent from '../components/dashboardContent';
import ProfileContent from '../components/profileContent';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import MainContent from '../components/mainContent';
import Footer from '../components/footer';
import { useNavigate } from 'react-router-dom';
import home from '../assets/sidebarIcons/home.png'
import course from '../assets/sidebarIcons/course.png'
import help from '../assets/sidebarIcons/help.png'
import notice from '../assets/sidebarIcons/notice.png'
import profile from '../assets/sidebarIcons/profile.png'
import setting from '../assets/sidebarIcons/setting.png'

// Type definitions
type TabContent = {
  title: string;
  component?: React.ReactNode;
};

export type NavItem = {
  id: string;
  label: string;
  icon: React.ReactElement;
  route?: string
};

interface Props {
  children: React.ReactNode
}

function AppLayout({children}: Props) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showDropdown, setShowDropdown] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const dropdownRef = useRef<HTMLDivElement | null>(null) as any;
  const navigate = useNavigate()

  const username = 'John Doe';
  const notificationsCount = 3;
  const userInitials = username.split(' ').map(word => word[0]).join('').toUpperCase();

  // Navigation configuration
  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Home', icon: <img className='h-6 w-6' src={home} />, route: "/home" },
    { id: 'course', label: 'Courses', icon: <img className='h-6 w-6' src={course} />, route: "/course" },
    // { id: 'calendar', label: 'Calendar', icon: <Calendar size={20} /> },
    // { id: 'resources', label: 'Resources', icon: <BookOpen size={20} /> },
    { id: 'notices', label: 'Notice Board', icon: <img className='h-6 w-6' src={notice} /> },
    { id: 'settings', label: 'Preferences', icon: <img className='h-6 w-6' src={setting} /> },
    // { id: 'accounts', label: 'Accounts', icon: <DollarSign size={20} /> },
        { id: 'profile', label: 'Profile', icon: <img className='h-6 w-6' src={profile} /> },
    { id: 'help', label: 'Help', icon: <img className='h-6 w-6' src={help} /> },
  ];

  const tabContents: Record<string, TabContent> = {
    dashboard: {
      title: 'Dashboard',
      component: <DashboardContent />
    },
    profile: {
      title: 'User Profile',
      component: <ProfileContent initials={userInitials} />
    },
    calendar: { title: 'Calendar' },
    resources: { title: 'Resources' },
    notices: { title: 'Notice Board', },
    settings: { title: 'Preferences' },
    accounts: { title: 'Accounts' },
    help: { title: 'Help Center'},
  };

  // Event handlers
  const handleLogout = () => console.log('Logged out');
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // Click outside handler for dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex flex-1 w-[98dvw] flex-col min-h-screen">
      <Header 
        sidebarOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        notificationsCount={notificationsCount}
        userInitials={userInitials}
        username={username}
        dropdownRef={dropdownRef}
        showDropdown={showDropdown}
        setShowDropdown={setShowDropdown}
        onLogout={handleLogout}
      />
      
      <div className="flex flex-1">
        <Sidebar 
          open={sidebarOpen}
          navItems={navItems}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          userInitials={userInitials}
          username={username}
          navigate={navigate}
        />
        
        <MainContent>
          <h2 className="text-2xl font-bold mb-4">{tabContents[activeTab].title}</h2>
           {children}
        </MainContent>
      </div>
      <Footer />
    </div>
  );
}

export default AppLayout
