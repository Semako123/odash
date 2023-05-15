import { TrackCard } from "../Components";
import { useSelector } from "react-redux";
import { RootState } from "../Store";

const TrackCards = () => {
	const topMusic = useSelector(
		(state: RootState) => state.user.topTracks.items
	);
	const topArtist = useSelector(
		(state: RootState) => state.user.topArtists.items
	);
	const featuredPlaylist = useSelector(
		(state: RootState) => state.user.featuredPlaylist.playlists
	);
	let topMusicArtist = "";
	for (let artist of topMusic[0].artists) {
		topMusicArtist += `${artist.name} . `;
	}
	const themeIsDark = useSelector(
		(state: RootState) => state.conditions.isDark
	);

	return (
		<div
			className={`p-1 rounded-lg w-[35%] flex flex-col gap-5`}>
			<TrackCard
				artist={topMusicArtist}
				img={topMusic[0].album.images[0].url}
				title="Top Song"
				name={topMusic[0].name}
			/>
			<TrackCard
				artist={topArtist[0].genres.join(" . ")}
				img={topArtist[0].images[0].url}
				title="Top Artist"
				name={topArtist[0].name}
			/>
			<TrackCard
				artist={featuredPlaylist.items[0].owner.display_name}
				img={featuredPlaylist.items[0].images[0].url}
				title="Top Featured Playlist"
				name={featuredPlaylist.items[0].name}
			/>
		</div>
	);
};

export default TrackCards;
