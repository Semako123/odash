import { useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";

const Redirect = () => {
	const navigate = useNavigate();
	const [hasUpdated, update] = useState(false);
	useEffect(() => {
		const params = new URLSearchParams(window.location.hash.substring(1));
		// Get the access token from the search params
		const accessToken = params.get("access_token")!;
		console.log(accessToken);
		localStorage.setItem("spotify_token", JSON.stringify(accessToken));
		update(true);
	}, []);

	useEffect(() => {
		if (hasUpdated) {
			navigate("/");
		}
	}, [hasUpdated]);
	return <div></div>;
};

export default Redirect;
