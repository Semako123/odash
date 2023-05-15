import { useSelector } from "react-redux";
import { RootState } from "../Store";
import { spotify } from "../assets/images";

const Tracks = () => {
	const tracks = useSelector((state: RootState) => state.user.topTracks.items);
	const loading = useSelector((state: RootState) => state.conditions.isLoading);
	const themeIsDark = useSelector(
		(state: RootState) => state.conditions.isDark
	);

	if (!loading) {
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
								} font-normal w-[18%] text-left pl-6`}>
								Track
							</th>
							<th
								className={`${
									themeIsDark ? "text-green-400" : "text-green-700"
								} font-normal w-[15%]`}>
								Artists
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
								} font-normal w-[10%]`}>
								Duration
							</th>
							<th
								className={`${
									themeIsDark ? "text-green-400" : "text-green-700"
								} font-normal w-[16%]`}>
								Album
							</th>
							<th
								className={`${
									themeIsDark ? "text-green-400" : "text-green-700"
								} font-normal w-[12%]`}>
								Track Number
							</th>
						</tr>
					</thead>
					<tbody
						className={`divide-y-2 ${
							themeIsDark
								? "divide-dark-secondary text-slate-200	"
								: "divide-grey-200 text-slate-700"
						}`}>
						{tracks.map((data: any, index: number) => {
							return (
								<tr key={index} className="h-16">
									<td>
										<div>
											<a href={data.external_urls.spotify} target="_blank">
												<img src={spotify} alt="" />
											</a>
										</div>
									</td>
									<td>
										<div className="flex items-center gap-2 pl-8">
											<img
												src={data.album.images[0].url}
												alt=""
												className="w-10 h-10 rounded-full"
											/>
											{data.name}
										</div>
									</td>
									<td>
										<div>
											{data.artists.map((artist: any, index: number) => (
												<div
													className="flex gap-1 items-center justify-center"
													key={index}>
													<p>{artist.name}</p>
												</div>
											))}
										</div>
									</td>
									<td className="text-center">{data.popularity}</td>
									<td className="text-center">
										{(data.duration_ms / (1000 * 60)).toFixed(1)}mins
									</td>
									<td>
										<div className="flex gap-1 items-center ml-3">
											<img
												src={data.album.images[1].url}
												alt=""
												className="w-10 h-10 rounded-full"
											/>
											<p>{data.album.name}</p>
										</div>
									</td>
									<td>
										<p className="text-center">{data.track_number}</p>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		);
	} else {
		return <div>LOADING ...</div>;
	}
};

export default Tracks;
