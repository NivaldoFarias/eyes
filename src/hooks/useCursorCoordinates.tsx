import { useEffect, useState } from "react";

export interface CursorCoordinates {
	x: number;
	y: number;
}

const useCursorCoordinates = (includeTouch = false) => {
	const [cursorCoordinates, setCursorCoordinates] = useState<CursorCoordinates>({ x: 0, y: 0 });

	useEffect(() => {
		window.addEventListener("mousemove", updateCursorCoordinates);

		if (includeTouch) window.addEventListener("touchmove", updateCursorCoordinates);

		return () => {
			window.removeEventListener("mousemove", updateCursorCoordinates);

			if (includeTouch) window.removeEventListener("touchmove", updateCursorCoordinates);
		};
	}, []);

	return cursorCoordinates;

	function updateCursorCoordinates(event: MouseEvent | TouchEvent) {
		if (event instanceof MouseEvent) {
			setCursorCoordinates({ x: event.clientX, y: event.clientY });
		} else if (event instanceof TouchEvent) {
			const touch = event.touches[0];

			if (touch) setCursorCoordinates({ x: touch.clientX, y: touch.clientY });
		}
	}
};

export default useCursorCoordinates;
