import { useEffect, useRef, useState } from "react";

import type { CursorCoordinates } from "./../App";

const STATIC = {
	eyeball: {
		radius: 24,
		boundingRect: {
			width: 100,
			height: 100,
		},
	},
};

const viewportToEyeballRatio = {
	height: window.innerHeight / STATIC.eyeball.boundingRect.height,
	width: window.innerWidth / STATIC.eyeball.boundingRect.width,
};

/**
 * - The eye has its center is at {x:-24,y:-24}.
 * - The eyeball is 48px in diameter.
 * - The eyeball's movement is limited to a square of 100px.
 * - The eyeball moves within that range in a ratio to the distance from the cursor.
 * - The eyeball never crosses the border of that rectangle.
 * - The eyeball's movement is limited to two times the eyeball's radius.
 * - The number of pixels the eyeball moves is the distance from the cursor times
 * the computed ratio.
 * - The cursor has a bounding rectangle equal to the window's width and height.
 * - The cursor's position is updated on mousemove.
 * - Each eyeball has a bounding rectangle equal to the eye's width and height, a square of 100px.
 * - Thus, if the cursor moves X pixels in the X-axis, the eyeball moves (X * ratio) pixels
 * in the X-axis. The same applies to the Y-axis.
 */
export default function RenderEyeEffect({
	cursorCoordinates,
}: {
	cursorCoordinates: CursorCoordinates;
}) {
	const [eyeballPosition, setPosition] = useState({
		x: -STATIC.eyeball.radius,
		y: -STATIC.eyeball.radius,
	});
	const eyeRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!eyeRef.current) return;

		const eyeRect = eyeRef.current.getBoundingClientRect();
		const eyeCenter = {
			x: eyeRect.left + eyeRect.width / 2,
			y: eyeRect.top + eyeRect.height / 2,
		};

		return () => {};
	}, [cursorCoordinates]);

	return (
		<div className="relative isolate flex rotate-90 scale-150 items-center justify-center invert">
			<div className="absolute h-32 w-32 translate-x-10 rounded-full bg-white mix-blend-exclusion"></div>
			<div className="absolute h-32 w-32 -translate-x-10 rounded-full bg-white mix-blend-exclusion"></div>
			<div
				className={`absolute border-2 border-solid border-red-500 h-[${STATIC.eyeball.radius * 2}px] w-[${STATIC.eyeball.radius * 2}px] rounded-full bg-white`}
				style={{ top: eyeballPosition.x, left: eyeballPosition.y }}
				ref={eyeRef}
			></div>
			<div className="absolute h-[100px] w-[100px] rounded-full border-2 border-solid border-cyan-500"></div>
		</div>
	);
}
