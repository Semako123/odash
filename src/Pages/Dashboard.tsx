import { Overview, TrackCards, TopMusicChart } from "../Containers";
import { useDispatch } from "react-redux";
import API from "../API";
import {
	updateFollowedArtist,
	updateUserPlaylist,
	updateLikedSongs,
	updateTopTracks,
	updatePlayedToday,
	updadateTopArtsist,
	updateFeaturedPlaylist,
} from "../Store/user.slice";

const Dashboard = () => {
	const dispatch = useDispatch();

	const today = new Date();

	// Set the time to 0:00am
	today.setHours(0, 0, 0, 0);

	// Get the Unix timestamp (in milliseconds) for today at 0:00am
	const todayStartTimestamp = today.getTime();

	API.get("/me/following", { params: { type: "artist", limit: 50 } })
		.then((res) => {
			dispatch(updateFollowedArtist(res.data.artists));
		})
		.then(() => {
			API.get("/me/playlists", { params: { limit: 50 } }).then((res) => {
				dispatch(updateUserPlaylist(res.data));
			});
		})
		.then(() => {
			API.get("/me/tracks", { params: { limit: 50 } }).then((res) => {
				dispatch(updateLikedSongs(res.data));
			});
		})
		.then(() => {
			API.get("/me/top/tracks", {
				params: { limit: 50, time_range: "long_term" },
			}).then((res) => {
				dispatch(updateTopTracks(res.data));
			});
		})
		.then(() => {
			API.get("/me/player/recently-played", {
				params: { after: todayStartTimestamp, limit: 50 },
			}).then((res) => {
				dispatch(updatePlayedToday(res.data));
			});
		})
		.then(() => {
			API.get("/me/top/artists", {
				params: { limit: 50, time_range: "long_term" },
			}).then((res) => {
				dispatch(updadateTopArtsist(res.data));
			});
		})
		.then(() => {
			API.get("/browse/featured-playlists", {
				params: { limit: 50 },
			}).then((res) => {
				dispatch(updateFeaturedPlaylist(res.data));
			});
		});
	return (
		<div className="overflow-x-hidden">
			<div className="flex gap-4 ">
				<Overview />
				<TrackCards />
			</div>
			<TopMusicChart />
		</div>
	);
};

export default Dashboard;
