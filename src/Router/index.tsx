import {
	createBrowserRouter,
	Route,
	createRoutesFromElements,
} from "react-router-dom";
import App from "../App";
import {
	Artists,
	Dashboard,
	Login,
	Playlists,
	Podcasts,
	Redirect,
	Tracks,
} from "../Pages";
import { Auth } from "../Utils";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route>
			<Route
				path="/"
				element={
					<Auth>
						<App />
					</Auth>
				}>
				<Route path="dashboard" element={<Dashboard />}></Route>
				<Route path="artists" element={<Artists />}></Route>
				<Route path="/tracks" element={<Tracks />} />
				<Route path="/playlists" element={<Playlists />} />
				<Route path="/podcasts" element={<Podcasts />} />
			</Route>
			<Route path="/login" element={<Login />} />
			<Route path="/redirect" element={<Redirect />} />
		</Route>
	)
);

export default router;
