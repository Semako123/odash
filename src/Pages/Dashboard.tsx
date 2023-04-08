import {
	Overview,
	TrackCards,
	TopMusicChart,
	TopMusicBarChart,
	TopArtistChart,
	TopArtistProfile
} from "../Containers";
import { useDispatch, useSelector } from "react-redux";
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
import { useEffect } from "react";
import { RootState } from "../Store";
import { setIsLoading } from "../Store/condition.slice";

const Dashboard = () => {
	const state = useSelector((state: RootState) => state.user);
	const loading = useSelector((state: RootState) => state.conditions.isLoading);

	useEffect(() => {
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
					params: { limit: 50, time_range: "short_term" },
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
					params: { limit: 50, time_range: "medium_term" },
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
	}, []);

	useEffect(() => {
		if (
			state.playedToday.items &&
			state.featuredPlaylist.playlists.items &&
			state.followedArtists.items &&
			state.topArtists.items &&
			state.likedSongs.items &&
			state.topTracks.items &&
			state.userPlaylist.items
		) {
			dispatch(setIsLoading(false));
		}
	}, [state]);

	const dispatch = useDispatch();

	const today = new Date();

	// Set the time to 0:00am
	today.setHours(0, 0, 0, 0);

	// Get the Unix timestamp (in milliseconds) for today at 0:00am
	const todayStartTimestamp = today.getTime();

	if (!loading) {
		return (
			<div>
				<div className="flex gap-4 ">
					<Overview />
					<TrackCards />
				</div>
				<div className="flex justify-between items-center">
					<TopMusicBarChart />
					<TopMusicChart />
				</div>
				<div className="mb-20 mt-[-30px] bg-white shadow-lg p-10 rounded-lg flex">
					<TopArtistProfile />
					<div className="w-1 bg-black"></div>
					<TopArtistChart />
				</div>
			</div>
		);
	} else {
		return <div>LOADING ...</div>;
	}
};

export default Dashboard;
