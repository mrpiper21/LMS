import React from "react"

const MainContent = React.memo(({ children }: { children: React.ReactNode }) => (
  <main className="flex-grow p-6 pt-20">
    <div className="bg-white">
      {children}
    </div>
  </main>
))

export default MainContent