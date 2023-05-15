import { useSelector } from "react-redux";
import { RootState } from "../Store";
import { spotify } from "../assets/images";

const Playlists = () => {
	const isLoading = useSelector(
		(state: RootState) => state.conditions.isLoading
	);
	const themeIsDark = useSelector(
		(state: RootState) => state.conditions.isDark
	);

	const playlists = useSelector((state: RootState) => state.user.userPlaylist);
	if (!isLoading) {
		return (
			<div
				className={`${
					themeIsDark
						? "bg-dark-accent shadow-slate-600 shadow-lg"
						: "bg-light-accent shadow-lg"
				}  p-4 rounded-lg mb-20`}>
				{playlists.total === 0 ? (
					<div>You currently have no Saved Playlist</div>
				) : (
					<div className="">
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
										} font-normal w-[18%]`}>
										Playlist
									</th>
									<th
										className={`${
											themeIsDark ? "text-green-400" : "text-green-700"
										} font-normal w-[15%]`}>
										Owner
									</th>
									<th
										className={`${
											themeIsDark ? "text-green-400" : "text-green-700"
										} font-normal w-[10%]`}>
										Tracks
									</th>
								</tr>
							</thead>
							<tbody
								className={`divide-y-2 ${
									themeIsDark
										? "divide-dark-secondary text-slate-200	"
										: "divide-grey-200 text-slate-700"
								}`}>
								{playlists.items.map((data: any, index: number) => (
									<tr key={index} className="h-16">
										<td>
											<div className="flex justify-center items-center">
												<a href={data.external_urls.spotify} target="_blank">
													<img src={spotify} alt="" className="h-10 w-10" />
												</a>
											</div>
										</td>
										<td>
											<div className="flex items-center gap-2 pl-8">
												<img
													src={
														data.images.length === 0
															? spotify
															: data.images[0].url
													}
													alt=""
													className="w-10 h-10 rounded-full"
												/>
												{data.name}
											</div>
										</td>
										<td>
											<div className="text-center">
												{data.owner.display_name}
											</div>
										</td>
										<td className="text-center">{data.tracks.total}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</div>
		);
	}
	return <div>LOADING...</div>;
};

export default Playlists;
