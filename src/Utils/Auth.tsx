import App from "../App";
import { Login } from "../Pages";
import { useAlert } from "react-alert";

const Auth = ({ children }: { children: JSX.Element }) => {
	const alert = useAlert()
	const uid = JSON.parse(localStorage.getItem("spotify_token")!);
	if (uid !== null) {
		return <App />;
	} else {
		alert.info("log in to continue")
		return <Login />;
	}
};

export default Auth;
