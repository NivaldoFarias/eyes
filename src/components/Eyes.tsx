import RenderEyeEffect from "./Eyeball";

export default function Eyes() {
	return (
		<div className="flex h-fit w-fit scale-[0.33] items-center justify-between gap-x-32 lg:scale-50">
			<RenderEyeEffect />
			<RenderEyeEffect />
		</div>
	);
}
