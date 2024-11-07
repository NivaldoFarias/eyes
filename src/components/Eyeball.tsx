import { useRef } from "react";

import type { CursorCoordinates } from "src/hooks/useCursorCoordinates";

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
	eyeballRadius = 24,
}: {
	cursorCoordinates: CursorCoordinates;
	eyeballRadius?: number;
}) {
	const eyeRef = useRef<HTMLDivElement>(null);

	const values = getEyeballPosition();

	return (
		<div className="relative isolate flex rotate-90 items-center justify-center invert">
			<div
				className={`absolute h-[${eyeballRadius * 5}px] w-[${eyeballRadius * 5}px] translate-x-10 rounded-full bg-white mix-blend-exclusion`}
			></div>
			<div
				className={`absolute h-[${eyeballRadius * 5}px] w-[${eyeballRadius * 5}px] -translate-x-10 rounded-full bg-white mix-blend-exclusion`}
			></div>
			<div
				className={`absolute h-[${eyeballRadius * 2}px] w-[${eyeballRadius * 2}px] rounded-full bg-white`}
				style={values}
				ref={eyeRef}
			></div>
			{/* <div className="absolute h-[100px] w-[100px] rounded-full border-2 border-solid border-cyan-500"></div> */}
		</div>
	);

	function getEyeballPosition() {
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
			top: -Math.round(distanceRatio.x) - eyeballRadius,
			left: Math.round(distanceRatio.y) - eyeballRadius,
		};
		return values;
	}
}
