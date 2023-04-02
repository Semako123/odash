import { useSelector } from "react-redux";
import { RootState } from "../Store";
import { useEffect, useState } from "react";
import API from "../API";
import {
	ChartComponent,
	SeriesCollectionDirective,
	SeriesDirective,
	Inject,
	ILoadedEventArgs,
	ChartTheme,
	LineSeries,
	Legend,
	DateTime,
	Tooltip,
	Highlight,
} from "@syncfusion/ej2-react-charts";
import { Browser } from "@syncfusion/ej2-base";

const TopMusicChart = () => {
	const state = useSelector((state: RootState) => state.user.topTracks.items);
	const [data, setData] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	let chartData:any = []

	// useEffect(() => {
	// 	for (let x in data) {
	// 		chartData.push({
	// 			[x]: data})
	// 	}
	// 	console.log(chartData)
	// },[])

	if (state) {
		const topTrackId = state[0].id;
		API.get(`/audio-features/${topTrackId}`).then((res) => {
			setData(res.data)
		});
		if (!isLoading) {
			return (
				<div className="bg-white shadow-lg p-3 w-[65%] translate-y-[-80px] rounded-lg"></div>
			);
		} else {
			return (
				<div className="bg-white shadow-lg p-3 w-[65%] translate-y-[-80px] rounded-lg">
					{" "}
					LOADING...{" "}
				</div>
			);
		}
	} else {
		return (
			<div className="bg-white shadow-lg p-3 w-[65%] translate-y-[-80px] rounded-lg">
				{" "}
				LOADING...{" "}
			</div>
		);
	}
};

export default TopMusicChart;
