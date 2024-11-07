import { useEffect, useState } from "react";

import Eyes from "./Eyes";

export interface CursorCoordinates {
	x: number;
	y: number;
}

function App() {
	const [cursorCoordinates, setCursorCoordinates] = useState<CursorCoordinates>({ x: 0, y: 0 });

	useEffect(() => {
		const update = (event: MouseEvent) => {
			setCursorCoordinates({ x: event.clientX, y: event.clientY });
		};

		window.addEventListener("mousemove", update);

		return () => {
			window.removeEventListener("mousemove", update);
		};
	}, [cursorCoordinates]);

	return (
		<div className="min-w-screen flex min-h-screen flex-col justify-between bg-black">
			<div className="flex h-96 w-full items-center justify-center">
				<Eyes cursorCoordinates={cursorCoordinates} />
			</div>
			<h1 className="w-fit border-2 border-solid border-yellow-300 px-2 text-right text-xl text-yellow-400">
				x: {cursorCoordinates.x} y: {cursorCoordinates.y}
			</h1>
		</div>
	);
}

export default App;
