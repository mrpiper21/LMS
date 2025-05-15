const DashboardContent = () => (
  <>
    <p className="text-gray-600">Welcome to your dashboard! Here's your personalized overview.</p>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
      {[1, 2, 3].map((item) => (
        <div key={item} className="p-4 border rounded-md bg-gray-50">
          <h3 className="font-bold text-lg">Card {item}</h3>
          <p className="text-gray-600">Sample card content</p>
        </div>
      ))}
    </div>
  </>
);

export default DashboardContent
