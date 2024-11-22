import { useEffect, useState } from "react";

import Eyes from "./components/Eyes";
import { CursorContext } from "./hooks/CursorContext";

interface CursorCoordinates {
	x: number;
	y: number;
}

function App() {
	const [cursorCoordinates, setCursorCoordinates] = useState<CursorCoordinates>({ x: 0, y: 0 });

	useEffect(() => {
		window.addEventListener("mousemove", updateCursorCoordinates);
		window.addEventListener("touchmove", updateCursorCoordinates);

		return () => {
			window.removeEventListener("mousemove", updateCursorCoordinates);
			window.removeEventListener("touchmove", updateCursorCoordinates);
		};
	}, []);

	const nOfEyesToScreenWidth =
		Math.round(window.innerWidth / 5) > 224 ? 224 : Math.round(window.innerWidth / 5);

	return (
		<CursorContext.Provider value={cursorCoordinates}>
			<div className="min-w-screen grid min-h-screen gap-y-10 overflow-hidden bg-black pt-4 max-sm:-ml-6 max-sm:grid-flow-row max-sm:grid-cols-4 min-[410px]:max-sm:grid-cols-5 sm:grid-flow-col sm:grid-rows-16 lg:gap-x-2">
				{new Array(nOfEyesToScreenWidth).fill(null).map((_, index) => (
					<Eyes key={index} />
				))}
			</div>
		</CursorContext.Provider>
	);

	function updateCursorCoordinates(event: MouseEvent | TouchEvent) {
		if (event instanceof MouseEvent) {
			setCursorCoordinates({ x: event.clientX, y: event.clientY });
		} else if (event instanceof TouchEvent) {
			const touch = event.touches[0];

			if (touch) setCursorCoordinates({ x: touch.clientX, y: touch.clientY });
		}
	}
}

export default App;
