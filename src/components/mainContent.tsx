import React from "react"

const MainContent = React.memo(
	({ children }: { children: React.ReactNode }) => (
		<main className="flex-grow pl-[18dvw] pt-20 pb-20">
			<div className="bg-white">{children}</div>
		</main>
	)
);

export default MainContent