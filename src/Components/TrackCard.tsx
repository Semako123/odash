import { load } from "../assets/images";
import { useSelector } from "react-redux";
import { RootState } from "../Store";

interface Tracks {
	name: string;
	title: string;
	img: string;
	artist: string;
}

const TrackCard = ({ name, img, artist, title }: Tracks) => {
	const themeIsDark = useSelector(
		(state: RootState) => state.conditions.isDark
	);

	return (
		<>
			<div
				className={`${
					themeIsDark ? "bg-dark-accent shadow-slate-600" : "bg-light-accent"
				} rounded-lg p-4 w-full shadow-md hover:shadow-lg hover:translate-y-[-5px] hover:scale-[1.02] transition-transform duration-700`}>
				<p
					className={`${
						themeIsDark ? "text-light-accent" : ""
					} "text-sm text-slate-500 mb-1 ml-1"`}>
					{title}
				</p>
				<div className="flex items-center">
					<img src={img} alt="" className="w-20 rounded-full" />
					<div className="ml-6">
						<p className={`${themeIsDark?"text-light-primary":""} text-lg font-semibold`}>{name}</p>
						<p className={`${
						themeIsDark ? "text-light-secondary" : ""
					} "text-sm text-slate-500 text-sm capitalize"`}>{artist}</p>
					</div>
					<div className="ml-auto mr-8">
						<img src={load} alt="" className="w-10 rounded-full" />
					</div>
				</div>
			</div>
		</>
	);
};

export default TrackCard;
