import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Router";
import { Provider } from "react-redux";
import store from "./Store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
			<ToastContainer autoClose={5000} />
		</Provider>
	</React.StrictMode>
);
