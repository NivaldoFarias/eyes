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

	const eyeballData = computeEyeballCoordinates();

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
					...eyeballData.coordinates,
					height: `${eyeballRadius * 2}px`,
					width: `${eyeballRadius * 2}px`,
				}}
				ref={eyeRef}
			></div>
		</div>
	);

	function computeEyeballCoordinates() {
		const eyeRect = eyeRef.current?.getBoundingClientRect();

		if (!eyeRect) return { top: 0, left: 0 };

		const eyeCenter = {
			x: eyeRect.left + eyeRect.width / 2,
			y: eyeRect.top + eyeRect.height / 2,
		};

		const cursorDistanceFromEyeCenter = {
			x: cursorCoordinates.x - eyeCenter.x,
			y: cursorCoordinates.y - eyeCenter.y,
		};

		const distanceRatio = {
			x: cursorDistanceFromEyeCenter.x / eyeRect.width,
			y: cursorDistanceFromEyeCenter.y / eyeRect.height,
		};

		const eyeballOffset = {
			top: -Math.round(distanceRatio.x) - eyeballRadius,
			left: Math.round(distanceRatio.y) - eyeballRadius,
		};

		const boundaries = {
			top: -(eyeballRadius * 2),
			left: -(eyeballRadius * 2),
			bottom: 0,
			right: 0,
		};

		const coordinates = {
			top:
				eyeballOffset.top < 0
					? Math.max(eyeballOffset.top, boundaries.top)
					: Math.min(eyeballOffset.top, boundaries.bottom),
			left:
				eyeballOffset.left < 0
					? Math.max(eyeballOffset.left, boundaries.left)
					: Math.min(eyeballOffset.left, boundaries.right),
		};

		return {
			coordinates,
			distanceRatio,
			cursorDistanceFromEyeCenter,
		};
	}
}
