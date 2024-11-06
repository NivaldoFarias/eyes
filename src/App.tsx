import { useEffect, useState } from "react";

import Eyes from "./Eyes";

export interface MousePosition {
	x: number;
	y: number;
}

function App() {
	const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });

	useEffect(() => {
		const update = (event: MouseEvent) => {
			setMousePosition({ x: event.clientX, y: event.clientY });
		};

		window.addEventListener("mousemove", update);

		return () => {
			window.removeEventListener("mousemove", update);
		};
	}, [mousePosition]);

	return (
		<div className="min-w-screen flex min-h-screen flex-col justify-between bg-black">
			<div className="flex h-96 w-full items-center justify-center">
				<Eyes mousePosition={mousePosition} />
			</div>
			<h1 className="text-right text-xl text-yellow-400">
				x: {mousePosition.x} y: {mousePosition.y}
			</h1>
		</div>
	);
}

export default App;
