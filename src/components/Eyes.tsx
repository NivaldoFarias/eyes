import RenderEyeEffect from "./Eyeball";

import type { CursorCoordinates } from "src/hooks/useCursorCoordinates";

export default function Eyes({
	cursorCoordinates,
	eyeballRadius,
}: {
	cursorCoordinates: CursorCoordinates;
	eyeballRadius?: number;
}) {
	return (
		<div className="flex h-fit w-fit items-center justify-between space-x-32">
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
