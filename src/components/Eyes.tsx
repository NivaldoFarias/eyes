import RenderEyeEffect from "./Eyeball";

import type { CursorCoordinates } from "src/hooks/useCursorCoordinates";

export default function Eyes({
	cursorCoordinates,
	eyeballRadius = 24,
}: {
	cursorCoordinates: CursorCoordinates;
	eyeballRadius?: number;
}) {
	return (
		<div className="flex h-fit w-fit scale-[0.33] items-center justify-between gap-x-32 lg:scale-50">
			<RenderEyeEffect
				cursorCoordinates={cursorCoordinates}
				eyeballRadius={eyeballRadius}
			/>
			<RenderEyeEffect
				cursorCoordinates={cursorCoordinates}
				eyeballRadius={eyeballRadius}
			/>
		</div>
	);
}
