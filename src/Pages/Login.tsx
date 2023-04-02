import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logo } from "../assets/images";

const Login = () => {
	const navigate = useNavigate();

	useEffect(() => {
		navigate("/login");
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
		const REDIRECT_URI = "http://localhost:3000/redirect";
		const authUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}&scope=${scopes.join(
			"%20"
		)}&show_dialog=true`;
		// redirect the user to the authorization URL
		window.location.href = authUrl;
	};
	return (
		<div className="flex justify-center items-center flex-col h-[100vh] gap-[50px]">
			<div className="w-6/12">
				<img src={logo} alt="" />
			</div>
			<div>
				<button
					onClick={handleLogin}
					className="bg-stone-900 px-7 py-3 shadow-xl rounded-3xl text-slate-50 active:scale-95 transition-all">
					Login to Spotify
				</button>
			</div>
		</div>
	);
};

export default Login;
