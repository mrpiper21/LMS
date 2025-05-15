const ProfileContent = ({ initials }: { initials: string }) => (
  <div className="flex items-center gap-4 mb-6">
    <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center">
      <span className="text-2xl font-bold text-white">{initials}</span>
    </div>
    <div>
      <h3 className="text-xl font-semibold">John Doe</h3>
      <p className="text-gray-600">student@atu.edu.gh</p>
    </div>
  </div>
);

export default ProfileContent