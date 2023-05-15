import {
	Overview,
	TrackCards,
	TopMusicChart,
	TopMusicBarChart,
	TopArtistProfile,
} from "../Containers";
import { useSelector } from "react-redux";
import { RootState } from "../Store";

const Dashboard = () => {
	const state = useSelector((state: RootState) => state.user);
	const loading = useSelector((state: RootState) => state.conditions.isLoading);
	const themeIsDark = useSelector(
		(state: RootState) => state.conditions.isDark
	);

	if (!loading) {
		return (
			<div>
				<div className="flex gap-4 items-center">
					<Overview />
					<TrackCards />
				</div>
				<div className="flex justify-between items-center">
					<TopMusicBarChart />
					<TopMusicChart />
				</div>
				<div
					className={` ${
						themeIsDark ? "bg-dark-accent shadow-slate-600" : "bg-light-accent"
					} mb-20 shadow-lg p-10 rounded-lg mt-6`}>
					<h4 className={`${themeIsDark?"text-light-primary" : ""} mx-auto w-fit mb-3 font-semibold text-2xl`}>
						Top Artists
					</h4>
					<div className="flex">
						<TopArtistProfile data={state.topArtists.items[0]} />
						<div className={`${themeIsDark ? "bg-[#04a251]": "bg-[#023d17]"} w-1  rounded-lg`}></div>
						<TopArtistProfile data={state.topArtists.items[1]} />
					</div>
				</div>
			</div>
		);
	} else {
		return <div>LOADING ...</div>;
	}
};

export default Dashboard;
