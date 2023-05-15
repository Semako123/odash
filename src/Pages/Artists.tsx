import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../Store";
import { spotify } from "../assets/images";
import API from "../API";
import { Badge } from "../Components";

interface ArtistsData {
	name: string;
	img: string;
	popularity: number;
	link: string;
	followers: number;
	album: number;
	genre: string;
	top_track: string;
	following: boolean;
}

const Artists = () => {
	useEffect(() => {
		api = API();
	}, []);

	let api = API();
	const artists = useSelector(
		(state: RootState) => state.user.topArtists.items
	);
	const [table_data, setTableData] = useState<ArtistsData[]>([]);
	const loading = useSelector((state: RootState) => state.conditions.isLoading);
	const themeIsDark = useSelector(
		(state: RootState) => state.conditions.isDark
	);

	useEffect(() => {
		setTableData([]);
		if (!loading) {
			const fetchArtistData = async (artist: any) => {
				try {
					const artistData = {
						name: artist.name,
						img: artist.images[0].url,
						popularity: artist.popularity,
						link: artist.external_urls.spotify,
						following: false,
						genre: "",
						top_track: "",
						followers: 0,
						album: 0,
					};
					const [followersRes, albumsRes, topTracksRes, followingRes] =
						await Promise.all([
							api.get(`/artists/${artist.id}`),
							api.get(`/artists/${artist.id}/albums`),
							api.get(`/artists/${artist.id}/top-tracks`, {
								params: { market: "NG" },
							}),
							api.get("/me/following/contains", {
								params: { type: "artist", ids: `${artist.id}` },
							}),
						]);
					artistData.followers = followersRes.data.followers.total;
					artistData.album = albumsRes.data.total;
					artistData.top_track = topTracksRes.data.tracks[0].name;
					artistData.following = followingRes.data[0];
					artistData.genre = artist.genres[0] ?? "None";
					setTableData((tableData) => [...tableData, artistData]);
				} catch (error) {
					console.error(
						`Error fetching artist data for ${artist.name}:`,
						error
					);
				}
			};
			artists.forEach(fetchArtistData);
		}
	}, [artists]);

	if (!loading && table_data.length > 0) {
		return (
			<div
				className={`${
					themeIsDark
						? "bg-dark-accent shadow-slate-600 shadow-lg"
						: "bg-light-accent shadow-lg"
				}  p-4 rounded-lg mb-20`}>
				<table className="w-[100%] table">
					<thead className="table-header-group">
						<tr>
							<th
								className={`${
									themeIsDark ? "text-green-400" : "text-green-700"
								} font-normal w-[3%]`}>
								#
							</th>
							<th
								className={`${
									themeIsDark ? "text-green-400" : "text-green-700"
								} font-normal w-[25%] text-center pl-6`}>
								Artist
							</th>
							<th
								className={`${
									themeIsDark ? "text-green-400" : "text-green-700"
								} font-normal w-[12%]`}>
								Following
							</th>
							<th
								className={`${
									themeIsDark ? "text-green-400" : "text-green-700"
								} font-normal w-[12%]`}>
								Genre
							</th>
							<th
								className={`${
									themeIsDark ? "text-green-400" : "text-green-700"
								} font-normal w-[10%]`}>
								Popularity
							</th>
							<th
								className={`${
									themeIsDark ? "text-green-400" : "text-green-700"
								} font-normal w-[8%]`}>
								Followers
							</th>
							<th
								className={`${
									themeIsDark ? "text-green-400" : "text-green-700"
								} font-normal w-[8%]`}>
								Albums
							</th>
							<th
								className={`${
									themeIsDark ? "text-green-400" : "text-green-700"
								} font-normal w-[27%]`}>
								Top Track
							</th>
						</tr>
					</thead>
					<tbody
						className={`divide-y-2 ${
							themeIsDark
								? "divide-dark-secondary text-slate-200	"
								: "divide-grey-200 text-slate-700"
						}`}>
						{table_data.map((data, index) => (
							<tr className="h-14" key={index}>
								<td>
									<a href={data.link} target="_blank">
										<img src={spotify} alt="" />
									</a>
								</td>
								<td>
									<div className="flex items-center gap-2 pl-8">
										<img
											src={data.img}
											alt=""
											className="w-10 h-10 rounded-full"
										/>
										{data.name}
									</div>
								</td>
								<td>
									<div className="flex justify-center items-center">
										<Badge
											value={`${
												data.following ? "Following" : "Not Following"
											}`}
											variant={`${data.following ? "success" : ""}`}
										/>
									</div>
								</td>
								<td className="text-center capitalize">
									{data.genre ? data.genre : "None"}
								</td>
								<td className="text-center">{data.popularity}</td>
								<td className="text-center">
									{data.followers > 1000000
										? `${(data.followers / 1000000).toFixed(2)}M`
										: `${(data.followers / 1000).toFixed(1)}K`}
								</td>
								<td className="text-center">{data.album}</td>
								<td className="text-center">{data.top_track}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		);
	} else {
		return <div>LOADING...</div>;
	}
};

export default Artists;
