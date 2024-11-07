import { useRef } from "react";

import type { CursorCoordinates } from "src/hooks/useCursorCoordinates";

export default function RenderEyeEffect({
	cursorCoordinates,
	eyeballRadius,
}: {
	cursorCoordinates: CursorCoordinates;
	eyeballRadius: number;
}) {
	const eyeRef = useRef<HTMLDivElement>(null);

	return (
		<div className="relative isolate flex rotate-90 items-center justify-center invert">
			<div
				className="absolute translate-x-10 rounded-full bg-white mix-blend-exclusion"
				style={{
					height: `${eyeballRadius * 5}px`,
					width: `${eyeballRadius * 5}px`,
				}}
			></div>
			<div
				className="absolute -translate-x-10 rounded-full bg-white mix-blend-exclusion"
				style={{
					height: `${eyeballRadius * 5}px`,
					width: `${eyeballRadius * 5}px`,
				}}
			></div>
			<div
				className="absolute rounded-full bg-white"
				style={{
					...getEyeballPosition(),
					height: `${eyeballRadius * 2}px`,
					width: `${eyeballRadius * 2}px`,
				}}
				ref={eyeRef}
			></div>
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

		// const withinBounds = {
		// 	top:
		// 		values.top > 0 ? Math.max(values.top, -eyeballRadius) : Math.min(values.top, eyeballRadius),
		// 	left:
		// 		values.left > 0
		// 			? Math.max(values.left, -eyeballRadius)
		// 			: Math.min(values.left, eyeballRadius),
		// };

		const boundaries = {
			top: -(eyeballRadius * 2),
			left: -(eyeballRadius * 2),
			bottom: 0,
			right: 0,
		};

		return {
			top:
				values.top < 0
					? Math.max(values.top, boundaries.top)
					: Math.min(values.top, boundaries.bottom),
			left:
				values.left < 0
					? Math.max(values.left, boundaries.left)
					: Math.min(values.left, boundaries.right),
		};
	}
}
