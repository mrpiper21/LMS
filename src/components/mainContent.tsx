import React from "react"

const MainContent = React.memo(
	({ children }: { children: React.ReactNode }) => (
		<main className="flex-1 overflow-auto p-4 md:p-6 lg:p-4 transition-all duration-300">
			<div className="pl-[18dvw] pt-[10vh]">{children}</div>
		</main>
	)
);

export default MainContent