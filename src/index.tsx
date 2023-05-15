import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Router";
import { Provider } from "react-redux";
import store from "./Store";
import { Provider as AlertProvider, positions, transitions } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);

const options = {
	timeout: 5000,
	position: positions.TOP_CENTER,
	transitions: transitions.SCALE,
};

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<AlertProvider template={AlertTemplate} {...options}>
				<RouterProvider router={router} />
			</AlertProvider>
		</Provider>
	</React.StrictMode>
);
