import { profile, note, playlist, favorites } from "../assets/images";
import { InfoCard } from "../Components";
import { useSelector } from "react-redux";
import { RootState } from "../Store";

const Overview = () => {
	const state = useSelector((state: RootState) => state.user);
	const themeIsDark = useSelector(
		(state: RootState) => state.conditions.isDark
	);
	return (
		<div
			className={`${
				themeIsDark
					? "bg-dark-accent shadow-slate-600 shadow-lg"
					: "bg-light-accent shadow-lg"
			} rounded-lg p-5 w-[65%] shadow-md h-min mt-[10px]`}>
			<h3
				className={`${
					themeIsDark ? "text-light-primary" : ""
				} font-semibold text-xl`}>
				Overview
			</h3>
			<div>
				<h4
					className={`${
						themeIsDark ? "text-light-secondary" : ""
					} my-2 text-slate-500`}>
					Top Analytics
				</h4>
				<div className="grid grid-cols-4 mt-6 gap-4">
					<InfoCard
						name="Following"
						value={state.followedArtists.total}
						img={profile}
						color={["bg-[#FFDEE1]", "bg-[#FA5A7D]"]}
					/>
					<InfoCard
						name="Songs Played Today"
						value={
							state.playedToday.items.length > 50
								? "50+"
								: state.playedToday.items.length
						}
						img={note}
						color={["bg-[#FFF4DE]", "bg-[#FF947A]"]}
					/>
					<InfoCard
						name="Playlists"
						value={state.userPlaylist.total}
						img={playlist}
						color={["bg-[#DCFCE7]", "bg-[#3CD856]"]}
					/>
					<InfoCard
						name="Favorites"
						value={state.likedSongs.total}
						img={favorites}
						color={["bg-[#F3E8FF]", "bg-[#BF83FF]"]}
					/>
				</div>
			</div>
		</div>
	);
};

export default Overview;
