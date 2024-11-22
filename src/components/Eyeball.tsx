import { useCallback, useContext } from "react";
import { CursorContext } from "../hooks/CursorContext";

export default function RenderEyeEffect() {
	const cursorCoordinates = useContext(CursorContext);

	const eyeMovementRef = useCallback(
		(node: HTMLDivElement | null) => {
			if (!node) return;

			const coordinates = computeValues({
				rect: node.getBoundingClientRect(),
				cursorCoordinates,
			});

			node.style.top = `${coordinates.top}px`;
			node.style.left = `${coordinates.left}px`;
		},
		[cursorCoordinates],
	);

	return (
		<div className="relative isolate flex rotate-90 items-center justify-center invert">
			<div className="absolute h-[120px] w-[120px] translate-x-10 rounded-full bg-white mix-blend-exclusion"></div>
			<div className="absolute h-[120px] w-[120px] -translate-x-10 rounded-full bg-white mix-blend-exclusion"></div>
			<div
				className="absolute h-12 w-12 rounded-full bg-white"
				ref={eyeMovementRef}
			></div>
		</div>
	);
}

function computeValues({
	rect,
	cursorCoordinates,
}: {
	rect: DOMRect;
	cursorCoordinates: { x: number; y: number };
}) {
	const EYEBALL_RADIUS = 24;

	const eyeCenter = {
		x: rect.left + rect.width / 2,
		y: rect.top + rect.height / 2,
	};

	const cursorDistanceFromEyeCenter = {
		x: cursorCoordinates.x - eyeCenter.x,
		y: cursorCoordinates.y - eyeCenter.y,
	};

	const distanceRatio = {
		x: cursorDistanceFromEyeCenter.x / rect.width,
		y: cursorDistanceFromEyeCenter.y / rect.height,
	};

	const eyeballOffset = {
		top: -Math.round(distanceRatio.x) - EYEBALL_RADIUS,
		left: Math.round(distanceRatio.y) - EYEBALL_RADIUS,
	};

	const boundaries = {
		top: -(EYEBALL_RADIUS * 2),
		left: -(EYEBALL_RADIUS * 2),
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

	return coordinates;
}
