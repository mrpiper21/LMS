import { themeColors } from "../../../constant/Colors";
import { User, Mail, BookOpen, Calendar, CreditCard, Shield } from "lucide-react";

const AccountPage = () => {
  // Mock student data
  const student = {
    name: "Alex Johnson",
    email: "alex.johnson@university.edu",
    studentId: "STU-2023-8452",
    program: "Bachelor of Business Administration",
    enrollmentDate: "September 2023",
    expectedGraduation: "May 2027",
    status: "Active",
    contactNumber: "+1 (555) 123-4567",
    address: "123 Campus Ave, Apt 4B, University City, 10001"
  };

  const academicStats = [
    { label: "Courses Taken", value: 12, icon: <BookOpen size={20} /> },
    { label: "Credits Earned", value: 36, icon: <CreditCard size={20} /> },
    { label: "GPA", value: 3.7, icon: <Shield size={20} /> }
  ];

  return (
    <div 
      className="p-6 md:p-8 lg:p-10"
      style={{ backgroundColor: themeColors.surfaces.background }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <header className="mb-8">
          <h1 
            className="text-3xl font-bold mb-2"
            style={{ color: themeColors.text.primary }}
          >
            My Account
          </h1>
          <p 
            className="text-sm"
            style={{ color: themeColors.text.secondary }}
          >
            View and manage your student account information
          </p>
        </header>

        {/* Profile Card */}
        <div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
          style={{ color: themeColors.text.primary }}
        >
          {/* Profile Overview */}
          <div 
            className="p-6 rounded-xl col-span-1"
            style={{ 
              backgroundColor: themeColors.surfaces.card,
              border: `1px solid ${themeColors.accents.hover}`
            }}
          >
            <div className="flex flex-col items-center mb-6">
              <div 
                className="w-24 h-24 rounded-full flex items-center justify-center mb-4 text-3xl font-bold"
                style={{ 
                  backgroundColor: themeColors.primary.dark,
                  color: themeColors.text.inverted
                }}
              >
                {student.name.split(' ').map(n => n[0]).join('')}
              </div>
              <h2 className="text-xl font-semibold">{student.name}</h2>
              <p 
                className="text-sm mt-1"
                style={{ color: themeColors.text.secondary }}
              >
                {student.studentId}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail size={18} style={{ color: themeColors.accents.active }} />
                <span>{student.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <User size={18} style={{ color: themeColors.accents.active }} />
                <span>{student.status} Student</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar size={18} style={{ color: themeColors.accents.active }} />
                <span>Enrolled: {student.enrollmentDate}</span>
              </div>
            </div>
          </div>

          {/* Academic Information */}
          <div 
            className="p-6 rounded-xl col-span-2"
            style={{ 
              backgroundColor: themeColors.surfaces.card,
              border: `1px solid ${themeColors.accents.hover}`
            }}
          >
            <h2 
              className="text-xl font-semibold mb-6 pb-2 border-b"
              style={{ borderColor: themeColors.accents.hover }}
            >
              Academic Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {academicStats.map((stat, index) => (
                <div 
                  key={index}
                  className="p-4 rounded-lg text-center"
                  style={{ 
                    backgroundColor: themeColors.surfaces.sidebar,
                    border: `1px solid ${themeColors.accents.hover}`
                  }}
                >
                  <div className="flex justify-center mb-2" style={{ color: themeColors.accents.active }}>
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div 
                    className="text-sm mt-1"
                    style={{ color: themeColors.text.secondary }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div className="flex justify-between py-2 border-b" style={{ borderColor: themeColors.accents.hover }}>
                <span style={{ color: themeColors.text.secondary }}>Program</span>
                <span>{student.program}</span>
              </div>
              <div className="flex justify-between py-2 border-b" style={{ borderColor: themeColors.accents.hover }}>
                <span style={{ color: themeColors.text.secondary }}>Expected Graduation</span>
                <span>{student.expectedGraduation}</span>
              </div>
              <div className="flex justify-between py-2">
                <span style={{ color: themeColors.text.secondary }}>Academic Standing</span>
                <span className="font-medium" style={{ color: themeColors.states.success }}>
                  Good Standing
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Details Section */}
        <div 
          className="p-6 rounded-xl mb-8"
          style={{ 
            backgroundColor: themeColors.surfaces.card,
            border: `1px solid ${themeColors.accents.hover}`
          }}
        >
          <h2 
            className="text-xl font-semibold mb-6 pb-2 border-b"
            style={{ borderColor: themeColors.accents.hover }}
          >
            Personal Details
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 
                className="text-sm font-medium mb-4"
                style={{ color: themeColors.text.secondary }}
              >
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail size={18} style={{ color: themeColors.accents.active }} />
                  <div>
                    <div style={{ color: themeColors.text.secondary }}>Email</div>
                    <div>{student.email}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <User size={18} style={{ color: themeColors.accents.active }} />
                  <div>
                    <div style={{ color: themeColors.text.secondary }}>Phone</div>
                    <div>{student.contactNumber}</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 
                className="text-sm font-medium mb-4"
                style={{ color: themeColors.text.secondary }}
              >
                Address
              </h3>
              <div className="flex items-start gap-3">
                <BookOpen size={18} style={{ color: themeColors.accents.active }} />
                <div>{student.address}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-end">
          <button
            className="px-6 py-2 rounded-lg text-sm font-medium transition-colors"
            style={{
              backgroundColor: themeColors.surfaces.sidebar,
              color: themeColors.text.primary,
              border: `1px solid ${themeColors.accents.hover}`
            }}
          >
            Edit Profile
          </button>
          <button
            className="px-6 py-2 rounded-lg text-sm font-medium transition-colors"
            style={{
              backgroundColor: themeColors.primary.main,
              color: themeColors.text.inverted
            }}
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;