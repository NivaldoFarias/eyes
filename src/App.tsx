import Eyes from "./components/Eyes";
import useCursorCoordinates from "./hooks/useCursorCoordinates";

function App() {
	const cursorCoordinates = useCursorCoordinates(true);

	const nOfEyesToScreenWidth =
		Math.round(window.innerWidth / 5) > 224 ? 224 : Math.round(window.innerWidth / 5);

	return (
		<div className="min-w-screen grid min-h-screen gap-y-10 overflow-hidden bg-black pt-4 max-sm:-ml-6 max-sm:grid-flow-row max-sm:grid-cols-4 min-[410px]:max-sm:grid-cols-5 sm:grid-flow-col sm:grid-rows-16 lg:gap-x-2">
			{new Array(nOfEyesToScreenWidth).fill(null).map((_, index) => (
				<Eyes
					key={index}
					eyeballRadius={24}
					cursorCoordinates={cursorCoordinates}
				/>
			))}
		</div>
	);
}

export default App;
