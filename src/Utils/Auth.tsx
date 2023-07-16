import App from "../App";
import { Login } from "../Pages";
import { toast } from "react-toastify";

const Auth = ({ children }: { children: JSX.Element }) => {
	const login_toast = () => {
		toast("Login to continue");
	};
	const uid = JSON.parse(localStorage.getItem("spotify_token")!);
	if (uid !== null) {
		return <App />;
	} else {
		login_toast();
		return <Login />;
	}
};

export default Auth;
