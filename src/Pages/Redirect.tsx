import { useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";

const Redirect = () => {
	const navigate = useNavigate();
	const [hasUpdated, update] = useState(false);
	const currentTimestamp = Date.now(); // Current timestamp in milliseconds
	const fiftyMinutesInMilliseconds = 55 * 60 * 1000; // 50 minutes converted to milliseconds
	const futureTimestamp = currentTimestamp + fiftyMinutesInMilliseconds;

	useEffect(() => {
		const params = new URLSearchParams(window.location.hash.substring(1));
		// Get the access token from the search params
		const accessToken = params.get("access_token")!;
		localStorage.setItem("spotify_token", JSON.stringify(accessToken));
		localStorage.setItem(
			"spotify_time_signature",
			JSON.stringify(futureTimestamp)
		);
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
