import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../Store";
import { setIsDark } from "../Store/condition.slice";

const Toggle = () => {
	const dispatch = useDispatch();
	const state = useSelector((state: RootState) => state.conditions.isDark);

	function handleToggle() {
		dispatch(setIsDark(!state));
	}

	return (
		<label
			htmlFor="toggle"
			className="flex items-center cursor-pointer justify-center">
			<div className="relative w-10 h-5 bg-gray-300 rounded-full shadow-inner">
				<input
					type="checkbox"
					id="toggle"
					className="sr-only"
					checked={state}
					onChange={handleToggle}
				/>
				<div
					className={`absolute w-5 h-5 rounded-full shadow ${
						state ? "bg-green-500 left-5" : "bg-gray-100 left-0"
					}`}></div>
			</div>
			<div className="ml-3 text-gray-700">Dark</div>
		</label>
	);
};

export default Toggle;
