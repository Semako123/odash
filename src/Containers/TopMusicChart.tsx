import { useSelector } from "react-redux";
import { RootState } from "../Store";
import { useEffect, useState } from "react";
import API from "../API";
import { CCard, CCardBody } from "@coreui/react";
import { CChartRadar } from "@coreui/react-chartjs";

const TopMusicChart = () => {
	const state = useSelector((state: RootState) => state.user.topTracks.items);
	const [data, setData] = useState({});
	let [chartData, setChartData]: any = useState([]);
	let topTrackId: number = state[0].id;
	const xPara: string[] = [
		"danceability",
		"energy",
		"speechiness",
		"acousticness",
		"instrumentalness",
		"liveness",
		"valence",
	];

	useEffect(() => {
		API.get(`/audio-features/${topTrackId}`).then((res) => {
			setData(res.data);
		});
	}, [topTrackId]);

	useEffect(() => {
		const tmpD: { [key: string]: any } = data;
		for (let x in tmpD) {
			if (xPara.includes(x)) {
				setChartData((state: any) => [...state, tmpD[x]]);
			}
		}
		console.log(chartData);
	}, [data]);

	if (chartData.length > 0) {
		return (
			<div className="bg-white shadow-lg p-3 w-[31%] rounded-lg flex items-center justify-center m-auto">
				<CCard>
					<CCardBody>
						<h5 className="text-center mb-2">Top Track Audio Features</h5>
						<CChartRadar
							data={{
								labels: xPara,
								datasets: [
									{
										label: `Top Track - ${state[0].name}`,
										backgroundColor: "#1ED76152",
										borderColor: "#1ED761",
										pointBackgroundColor: "#1ED761",
										pointBorderColor: "#fff",
										data: chartData,
									},
								],
							}}
						/>
					</CCardBody>
				</CCard>
			</div>
		);
	} else {
		return (
			<div className="bg-white shadow-lg p-3 w-[65%] translate-y-[-80px] rounded-lg">
				{" "}
				LOADING no chart...{" "}
			</div>
		);
	}
};

export default TopMusicChart;
