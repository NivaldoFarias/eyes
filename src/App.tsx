import Eyes from "./components/Eyes";
import useCursorCoordinates from "./hooks/useCursorCoordinates";

function App() {
	const cursorCoordinates = useCursorCoordinates(true);

	return (
		<div className="min-w-screen grid min-h-screen grid-flow-col grid-rows-6 gap-36 bg-black px-12 py-7">
			{new Array(42).fill(0).map((_, index) => (
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
