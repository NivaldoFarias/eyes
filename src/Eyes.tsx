import { useEffect, useRef, useState } from "react";

import type { MousePosition } from "./App";

function Eyes({ mousePosition }: { mousePosition: MousePosition }) {
	return (
		<div className="flex h-fit w-fit items-center justify-between space-x-48">
			{/* <div className="absolute top-0 left-0 w-6 h-6 bg-black rounded-full"></div> */}
			<RenderEyeEffect />
			<RenderEyeEffect />
		</div>
	);

	function RenderEyeEffect() {
		/**
		 * - The eye has its center is at {x:-20,y:-20}.
		 * - The eyeball is 30px in diameter.
		 * - The eyeball's movement is limited to a 40px radius.
		 */
		const [eyeballPosition, setPosition] = useState({ x: -20, y: -20 });
		const eyeRef = useRef<HTMLDivElement>(null);

		useEffect(() => {
			if (!eyeRef.current) return;

			const eyeRect = eyeRef.current.getBoundingClientRect();

			const eyeCenter = {
				x: eyeRect.left + eyeRect.width / 2,
				y: eyeRect.top + eyeRect.height / 2,
			};

			const angle = Math.atan2(mousePosition.y - eyeCenter.y, mousePosition.x - eyeCenter.x);
			console.log({ angle });

			const radius = 40;
			const x = Math.sin(angle) * radius;
			const y = Math.cos(angle) * radius;

			setPosition({ x, y });

			return () => {};
		}, [mousePosition]);

		return (
			<div className="relative isolate flex rotate-90 scale-150 items-center justify-center invert">
				<div className="absolute h-32 w-32 translate-x-10 rounded-full bg-white mix-blend-exclusion"></div>
				<div className="absolute h-32 w-32 -translate-x-10 rounded-full bg-white mix-blend-exclusion"></div>
				<div
					className="absolute h-10 w-10 rounded-full bg-white"
					style={{ top: eyeballPosition.x, left: eyeballPosition.y }}
					ref={eyeRef}
				></div>
			</div>
		);
	}
}

export default Eyes;
