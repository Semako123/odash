import { load } from "../assets/images";


interface Tracks {
	name: string;
	title: string;
	img: string;
	artist: string;
}

const TrackCard = ({ name, img, artist, title }: Tracks) => {
	
		return (
			<>
				<div className="bg-white rounded-lg p-4 w-full shadow-md hover:shadow-lg hover:translate-y-[-5px] hover:scale-[1.02] transition-transform duration-700">
					<p className="text-sm text-slate-500 mb-1 ml-1">{title}</p>
					<div className="flex items-center">
						<img src={img} alt="" className="w-20 rounded-full" />
						<div className="ml-6">
							<p className="text-lg font-semibold">{name}</p>
							<p className="text-slate-500 text-sm capitalize">{artist}</p>
						</div>
						<div className="ml-auto mr-8">
							<img src={load} alt="" className="w-10 rounded-full" />
						</div>
					</div>
				</div>
			</>
		);
};

export default TrackCard;
