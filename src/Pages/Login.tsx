import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logo } from "../assets/images";
import { useSelector } from "react-redux";
import { RootState } from "../Store";

const Login = () => {
	const navigate = useNavigate();
	const themeIsDark = useSelector(
		(state: RootState) => state.conditions.isDark
	);

	useEffect(() => {
		navigate("/login");
		localStorage.removeItem("spotify_token");
		localStorage.removeItem("spotify_time_signature");
	}, []);

	const handleLogin = () => {
		const scopes = [
			"user-read-recently-played",
			"user-top-read",
			"user-read-currently-playing",
			"user-read-playback-state",
			"user-library-read",
			"user-follow-read",
			"playlist-read-private",
		]; // set the scopes for the API request
		const CLIENT_ID = "12fd89a0a6184bfaaf2f41f27168dccb";
		const REDIRECT_URI = "https://spotifydash.netlify.app/redirect";
		const authUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}&scope=${scopes.join(
			"%20"
		)}&show_dialog=true`;
		// redirect the user to the authorization URL
		window.location.href = authUrl;
	};
	return (
		<div
			className={`${
				themeIsDark ? "bg-dark-primary" : "bg-light-primary"
			} flex justify-center items-center flex-col h-[100vh] gap-[50px]`}>
			<div className="w-6/12">
				<img src={logo} alt="" />
			</div>
			<div>
				<button
					onClick={handleLogin}
					className={`${
						themeIsDark
							? "bg-light-secondary text-dark-primary"
							: "bg-stone-900 text-slate-50"
					} px-7 py-3 shadow-xl rounded-3xl active:scale-95 transition-all`}>
					Login to Spotify
				</button>
			</div>
		</div>
	);
};

export default Login;
