import RenderEyeEffect from "./components/Eyeball";

import type { CursorCoordinates } from "./App";

export default function Eyes({ cursorCoordinates }: { cursorCoordinates: CursorCoordinates }) {
	return (
		<div className="flex h-fit w-fit items-center justify-between space-x-48">
			{/* <div className="absolute top-0 left-0 w-6 h-6 bg-black rounded-full"></div> */}
			<RenderEyeEffect cursorCoordinates={cursorCoordinates} />
			<RenderEyeEffect cursorCoordinates={cursorCoordinates} />
		</div>
	);
}
