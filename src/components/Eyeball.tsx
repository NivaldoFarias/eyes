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
	const [eyeballCoordinates, setEyeballCoordinates] = useState({
		x: -STATIC.eyeball.radius,
		y: -STATIC.eyeball.radius,
	});
	const eyeRef = useRef<HTMLDivElement>(null);

	const eyeRect = eyeRef.current?.getBoundingClientRect();

	const eyeCenter = {
		x: eyeRect ? eyeRect.left + eyeRect.width / 2 : 0,
		y: eyeRect ? eyeRect.top + eyeRect.height / 2 : 0,
	};

	const cursorDistanceFromEyeCenter = {
		x: cursorCoordinates.x - eyeCenter.x,
		y: cursorCoordinates.y - eyeCenter.y,
	};

	const distanceRatio = {
		x: cursorDistanceFromEyeCenter.x / (eyeRect ? eyeRect.width : 1),
		y: cursorDistanceFromEyeCenter.y / (eyeRect ? eyeRect.height : 1),
	};

	const values = {
		top: -Math.round(distanceRatio.x) - STATIC.eyeball.radius,
		left: Math.round(distanceRatio.y) - STATIC.eyeball.radius,
	};

	return (
		<div className="relative isolate flex rotate-90 items-center justify-center invert">
			<div className="absolute h-32 w-32 translate-x-10 rounded-full bg-white mix-blend-exclusion"></div>
			<div className="absolute h-32 w-32 -translate-x-10 rounded-full bg-white mix-blend-exclusion"></div>
			<div
				className={`absolute h-[${STATIC.eyeball.radius * 2}px] w-[${STATIC.eyeball.radius * 2}px] rounded-full bg-white`}
				style={values}
				ref={eyeRef}
			></div>
			{/* <div className="absolute h-[100px] w-[100px] rounded-full border-2 border-solid border-cyan-500"></div> */}
		</div>
	);
}
