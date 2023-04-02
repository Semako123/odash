import React from "react";
import { useNavigate } from "react-router-dom";

interface navButton {
	children: string;
	isActive: boolean;
	link: string;
}

const NavButton = ({ children, isActive, link }: navButton) => {
	const navigate = useNavigate();
	return (
		<div
			onClick={() => navigate(link)}
			className={`${
				isActive
					? "bg-[#1DB954] shadow-green text-slate-50 font-semibold"
					: "text-slate-400"
			} px-6 py-2 w-[150px] rounded-xl  my-6 cursor-pointer text-md`}>
			{children}
		</div>
	);
};

export default NavButton;
