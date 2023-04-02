import App from "../App";
import { Login } from "../Pages";

const Auth = ({ children }: { children: JSX.Element }) => {
	const uid = JSON.parse(localStorage.getItem("spotify_token")!);
	if (uid !== null) {
		return <App />;
	} else {
		return <Login />;
	}
};

export default Auth;
