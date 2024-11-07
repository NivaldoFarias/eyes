import RenderEyeEffect from "./components/Eyeball";

import type { CursorCoordinates } from "./App";

export default function Eyes({ cursorCoordinates }: { cursorCoordinates: CursorCoordinates }) {
	return (
		<div className="flex h-fit w-fit items-center justify-between space-x-32">
			<RenderEyeEffect cursorCoordinates={cursorCoordinates} />
			<RenderEyeEffect cursorCoordinates={cursorCoordinates} />
		</div>
	);
}
