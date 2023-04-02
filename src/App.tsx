import { useEffect } from "react";
import { logo } from "./assets/images";
import { NavButton } from "./Components";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

function App() {
	const location = useLocation();
	const navigate = useNavigate();
	const navButton = [
		{
			title: "Dashboard",
			link: "/dashboard",
		},
		{
			title: "Artists",
			link: "/artists",
		},
	];

	useEffect(() => {
		navigate("/dashboard")
	}, []);

	
	return (
		<div className="flex h-full pr-2">
			<div className="py-8 px-5 w-[200px]">
				<div className="w-full flex justify-center items-center">
					<img src={logo} alt="" className="w-full" />
				</div>

				<div className="mt-10 ">
					{navButton.map((x, index) => (
						<NavButton key={index} link={x.link} isActive={location.pathname === x.link}>
							{x.title}
						</NavButton>
					))}
				</div>
			</div>
			<div className="w-full">
				<div className="h-10 p-8 flex items-center">
					<h2 className="font-bold text-2xl text-green-900">
						{location.pathname.slice(1).toUpperCase()}
					</h2>
				</div>
				<div className="bg-slate-100 h-[100vh] p-4	">
					<Outlet />
				</div>
			</div>
		</div>
	);
}

export default App;
