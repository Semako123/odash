import { useSelector } from "react-redux";
import { RootState } from "../Store";
import { spotify } from "../assets/images";

const Podcasts = () => {
	const isLoading = useSelector(
		(state: RootState) => state.conditions.isLoading
	);
	const podData = useSelector((state: RootState) => state.user.podcasts);
	const themeIsDark = useSelector(
		(state: RootState) => state.conditions.isDark
	);

	if (!isLoading) {
		return (
			<div>
				{podData.total === 0 ? (
					<div>You currently have no Saved Playlist</div>
				) : (
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
										} font-normal W-[3	%]`}>
										#
									</th>
									<th
										className={`${
											themeIsDark ? "text-green-400" : "text-green-700"
										} font-normal`}>
										Podcast
									</th>
									<th
										className={`${
											themeIsDark ? "text-green-400" : "text-green-700"
										} font-normal w-[20%] `}>
										Author
									</th>
									<th
										className={`${
											themeIsDark ? "text-green-400" : "text-green-700"
										} font-normal w-[8%]`}>
										Total Episodes
									</th>
									<th
										className={`${
											themeIsDark ? "text-green-400" : "text-green-700"
										} font-normal w-[10%]`}>
										Media Type
									</th>
									<th
										className={`${
											themeIsDark ? "text-green-400" : "text-green-700"
										} font-normal w-[10%]`}>
										Date Added
									</th>
								</tr>
							</thead>
							<tbody
								className={`divide-y-2 ${
									themeIsDark
										? "divide-dark-secondary text-slate-200	"
										: "divide-grey-200 text-slate-700"
								}`}>
								{podData.items.map((data: any, index: number) => {
									const date = new Date(data.added_at);
									return (
										<tr className="h-16" key={index}>
											<td>
												<a
													href={data.show.external_urls.spotify}
													target="_blank">
													<img src={spotify} alt="" className="h-8 w-8" />
												</a>
											</td>
											<td>
												<div className="flex items-center gap-2 pl-8">
													<img
														src={data.show.images[0].url}
														alt=""
														className="w-10 h-10 rounded-full"
													/>
													{data.show.name}
												</div>
											</td>
											<td>
												<p className="text-center">{data.show.publisher}</p>
											</td>
											<td>
												<p className="text-center">
													{data.show.total_episodes}
												</p>
											</td>
											<td>
												<p className="text-center capitalize">
													{data.show.media_type}
												</p>
											</td>
											<td>
												<p className="text-center capitalize">
													{`${date.getDate()} ${date.toLocaleString("default", {
														month: "short",
													})} ${date.getFullYear()}`}
												</p>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				)}
			</div>
		);
	}
	return <div>LOADING...</div>;
};

export default Podcasts;
