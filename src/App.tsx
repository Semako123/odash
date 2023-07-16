import { useEffect } from "react";
import { logo } from "./assets/images";
import { NavButton, Toggle } from "./Components";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import API from "./API";
import {
	updateFollowedArtist,
	updateUserPlaylist,
	updateLikedSongs,
	updateTopTracks,
	updatePlayedToday,
	updadateTopArtsist,
	updateFeaturedPlaylist,
	updateUserProfile,
	updatePodcasts,
} from "./Store/user.slice";
import { setIsLoading } from "./Store/condition.slice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./Store";
import { toast } from "react-toastify";

function App() {
	const location = useLocation();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const state = useSelector((state: RootState) => state.user);
	const today = new Date();
	const api = API();
	const logout_toast = () => {
		toast("✅ You've successfully logged out");
	};
	const session_toast = () => {
		toast("🚫 Your session has expired. Login to continue");
	};

	// Set the time to 0:00am
	today.setHours(0, 0, 0, 0);

	// Get the Unix timestamp (in milliseconds) for today at 0:00am
	const todayStartTimestamp = today.getTime();
	const navButton = [
		{
			title: "Dashboard",
			link: "/dashboard",
		},
		{
			title: "Artists",
			link: "/artists",
		},
		{
			title: "Tracks",
			link: "/tracks",
		},
		{
			title: "Playlists",
			link: "/playlists",
		},
		{
			title: "Podcasts",
			link: "/podcasts",
		},
	];

	const fetchData = async () => {
		try {
			const [
				followedArtistsRes,
				playlistsRes,
				tracksRes,
				topTracksRes,
				topArtistsRes,
				playedTodayRes,
				featuredPlaylistsRes,
				userProfileRes,
				userPodcastRes,
			] = await Promise.all([
				api.get("/me/following", { params: { type: "artist", limit: 50 } }),
				api.get("/me/playlists", { params: { limit: 50 } }),
				api.get("/me/tracks", { params: { limit: 50 } }),
				api.get("/me/top/tracks", {
					params: { limit: 50, time_range: "short_term" },
				}),
				api.get("/me/top/artists", {
					params: { limit: 50, time_range: "medium_term" },
				}),
				api.get("/me/player/recently-played", {
					params: { after: todayStartTimestamp, limit: 50 },
				}),
				api.get("/browse/featured-playlists", { params: { limit: 50 } }),
				api.get("/me"),
				api.get("/me/shows", { params: { limit: 50 } }),
			]);

			dispatch(updateFollowedArtist(followedArtistsRes.data.artists));
			dispatch(updateUserPlaylist(playlistsRes.data));
			dispatch(updateLikedSongs(tracksRes.data));
			dispatch(updateTopTracks(topTracksRes.data));
			dispatch(updadateTopArtsist(topArtistsRes.data));
			dispatch(updatePlayedToday(playedTodayRes.data));
			dispatch(updateFeaturedPlaylist(featuredPlaylistsRes.data));
			dispatch(updateUserProfile(userProfileRes.data));
			dispatch(updatePodcasts(userPodcastRes.data));
		} catch (error) {
			navigate("/");
		}
	};
	useEffect(() => {
		fetchData();
		if (location.pathname === "/") {
			navigate("/dashboard");
		}
	}, []);

	useEffect(() => {
		const currentTimestamp = Date.now();

		if (
			currentTimestamp >
			parseInt(localStorage.getItem("spotify_time_signature")!)
		) {
			session_toast();
			navigate("/login");
		}
	}, [location]);

	useEffect(() => {
		if (
			state.playedToday.items &&
			state.featuredPlaylist.playlists.items &&
			state.followedArtists.items &&
			state.topArtists.items &&
			state.likedSongs.items &&
			state.topTracks.items &&
			state.userPlaylist.items &&
			state.profile
		) {
			dispatch(setIsLoading(false));
		}
	}, [state]);

	const themeIsDark = useSelector(
		(state: RootState) => state.conditions.isDark
	);

	return (
		<div
			className={`flex h-full pr-2 ${
				themeIsDark ? "bg-dark-primary" : "bg-light-primary"
			}`}>
			<div className="py-8 px-5 w-[200px]">
				<div className="w-full flex justify-center items-center relative">
					<img src={logo} alt="" className="w-full" />
				</div>

				<div className="mt-10">
					{navButton.map((x, index) => (
						<NavButton
							key={index}
							link={x.link}
							isActive={location.pathname === x.link}>
							{x.title}
						</NavButton>
					))}
				</div>
				<Toggle />
				<div
					className="absolute bottom-4"
					onClick={() => {
						logout_toast();
					}}>
					<NavButton link="/login" isActive={true}>
						Logout
					</NavButton>
				</div>
			</div>
			<div className="w-full">
				<div className="h-10 p-8 flex items-center rounded-lg">
					<h2
						className={`${
							themeIsDark ? "text-green-500" : "text-green-900"
						} font-bold text-2xl`}>
						{location.pathname.slice(1).toUpperCase()}
					</h2>
					{state.profile.display_name && (
						<a
							className="ml-auto"
							href={`${state.profile.external_urls.spotify}`}
							target="_blank">
							<div className="flex items-center gap-2">
								<p
									className={`${
										themeIsDark ? "text-green-500" : "text-green-900"
									} font-semibold`}>
									{state.profile.display_name}
								</p>

								<div className="h-14 w-14 rounded-full overflow-hidden">
									<img
										src={state.profile.images[0].url}
										alt=""
										className="object-cover h-full w-full"
									/>
								</div>
							</div>
						</a>
					)}
				</div>
				<div
					className={`${
						themeIsDark ? "bg-dark-secondary" : "bg-light-secondary"
					} h-[100vh] p-4 overflow-y-scroll`}>
					<Outlet />
				</div>
			</div>
		</div>
	);
}

export default App;
