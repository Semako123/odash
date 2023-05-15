import API from "../API";
import { useEffect, useState } from "react";
import { spotify } from "../assets/images";
import { useSelector } from "react-redux";
import { RootState } from "../Store";

const TopArtistProfile = ({ data }: any) => {
	const api = API();
	useEffect(() => {
		api.get(`/artists/${data.id}`).then((res) => {
			setArtistDetail(res.data);
			setIsLoading(false);
		});
	}, []);

	const [isLoading, setIsLoading] = useState(true);
	const [artistDetail, setArtistDetail]: any = useState({});

	const themeIsDark = useSelector(
		(state: RootState) => state.conditions.isDark
	);

	if (!isLoading) {
		return (
			<div className="w-[45%] mx-auto">
				<div className="w-[70%] mx-auto">
					<div className="flex items-center">
						<img
							className="w-[120px] h-[120px] rounded-full mb-3"
							src={data.images[0].url}
							alt=""
						/>
						<div className="ml-5">
							<h5
								className={`${
									themeIsDark ? "text-zinc-300" : "text-stone-700"
								} font-semibold text-xl`}>
								{data.name}
							</h5>
							<p
								className={`${
									themeIsDark ? "text-light-accent" : ""
								} text-slate-600 text-base capitalize mb-4`}>
								{data.genres}
							</p>
						</div>
					</div>
				</div>
				<div className="flex mx-auto gap-10 w-fit my-3">
					<div className="flex flex-col items-center">
						<h4
							className={`${
								themeIsDark ? "text-slate-200" : "text-slate-800"
							} font-bold text-3xl`}
							style={{
								textShadow: "2px 2px 2px rgba(0, 0, 0, 0.5)",
							}}>
							{Math.round(artistDetail.followers.total / 1000)}K
						</h4>
						<p className={`${themeIsDark ? "text-light-secondary" : ""}`}>
							Followers
						</p>
					</div>
					<div className="flex flex-col items-center">
						<h4
							className={`${
								themeIsDark ? "text-slate-200" : "text-slate-800"
							} font-bold text-3xl`}
							style={{
								textShadow: "2px 2px 2px rgba(0, 0, 0, 0.5)",
							}}>
							{data.popularity}
						</h4>
						<p className={`${themeIsDark ? "text-light-secondary" : ""}`}>
							Popularity
						</p>
					</div>
				</div>
				<button className="bg-[#1DB954] px-4 py-1 hover:cursor-pointer flex items-center rounded-full mt-3 mx-auto gap-1">
					<img src={spotify} alt="" className="h-10 w-10" />
					<a
						className="text-white font-bold"
						href={`${artistDetail.external_urls.spotify}`}
						target="_blank"
						rel="noopener noreferrer">
						Open in Spotify
					</a>
				</button>
			</div>
		);
	}
	return <div>Loading...</div>;
};

export default TopArtistProfile;
