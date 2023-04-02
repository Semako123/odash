import {
	createBrowserRouter,
	Route,
	createRoutesFromElements,
} from "react-router-dom";
import App from "../App";
import { Artists, Dashboard, Login, Redirect } from "../Pages";
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
			</Route>
			<Route path="/login" element={<Login />} />
			<Route path="/redirect" element={<Redirect />} />
		</Route>
	)
);

export default router;
