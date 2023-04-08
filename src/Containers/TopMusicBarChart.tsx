import React from "react";
import { CCard, CCardBody, CCardHeader } from "@coreui/react";
import { CChartBar } from "@coreui/react-chartjs";
import { useSelector } from "react-redux";
import { RootState } from "../Store";

const TopMusicBarChart = () => {
	const data = useSelector((state: RootState) =>
		state.user.topTracks.items.slice(0, 7)
	);
	const labels: string[] = [];
	const popularity: number[] = [];
	for (let track of data) {
		labels.push(track.name);
		popularity.push(track.popularity);
	}
	return (
		<div className="bg-white shadow-lg p-3 w-[65%] translate-y-[-50px] rounded-lg">
			<CCard className="mb-4">
				<h5 className="text-lg text-center mb-2">Your Top Tracks by Popularity</h5>
				<CCardBody>
					<CChartBar
						data={{
							labels: labels,
							datasets: [
								{
									label: "Popularity",
									backgroundColor: [
										"rgba(255, 99, 132, 0.5)",
										"rgba(255, 159, 64, 0.5)",
										"rgba(255, 205, 86, 0.5)",
										"rgba(75, 192, 192, 0.5)",
										"rgba(54, 162, 235, 0.5)",
										"rgba(153, 102, 255, 0.5)",
										"rgba(201, 203, 207, 0.5)",
									],
									borderColor: [
										"rgb(255, 99, 132)",
										"rgb(255, 159, 64)",
										"rgb(255, 205, 86)",
										"rgb(75, 192, 192)",
										"rgb(54, 162, 235)",
										"rgb(153, 102, 255)",
										"rgb(201, 203, 207)",
									],
									data: [...popularity, 100],
									barPercentage: 0.5,
									borderRadius: 6,
									borderWidth: 2,
								},
							],
						}}
					/>
				</CCardBody>
			</CCard>
		</div>
	);
};

export default TopMusicBarChart;
