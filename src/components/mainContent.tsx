import React from "react"

const MainContent = React.memo(
	({ children }: { children: React.ReactNode }) => (
		<main className="flex-grow pl-[18dvw] pt-20">
			<div className="bg-white pb-20">{children}</div>
		</main>
	)
);

export default MainContent