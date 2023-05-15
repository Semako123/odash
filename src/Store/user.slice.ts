import { createSlice } from "@reduxjs/toolkit"

interface userState {
    followedArtists: any,
    userPlaylist: any,
    likedSongs: any,
    topTracks: any,
    playedToday: any,
    topArtists: any,
    featuredPlaylist: any,
    profile: any,
    podcasts: any
}

const initialState: userState = {
    followedArtists: {},
    userPlaylist: {},
    likedSongs: {},
    topTracks: {},
    playedToday: {},
    topArtists: {},
    featuredPlaylist: {},
    profile: {},
    podcasts: {},
}

const userSlice = createSlice({
    name:"users",
    initialState,
    reducers: {
        updateFollowedArtist: (state, action) => {
            state.followedArtists = action.payload
        },
        updateUserPlaylist: (state, action) => {
            state.userPlaylist = action.payload
        },
        updateLikedSongs: (state, action) => {
            state.likedSongs = action.payload
        },
        updateTopTracks: (state, action) => {
            state.topTracks = action.payload
        },
        updatePlayedToday: (state, action) => {
            state.playedToday = action.payload
        },
        updadateTopArtsist: (state, action) => {
            state.topArtists = action.payload
        },
        updateFeaturedPlaylist: (state, action) => {
            state.featuredPlaylist = action.payload
        },
        updateUserProfile: (state, action) => {
            state.profile = action.payload
        },
        updatePodcasts: (state, action) => {
            state.podcasts = action.payload
        }
    }
})

export const {updateFeaturedPlaylist, updadateTopArtsist, updateFollowedArtist, updateUserPlaylist, updateLikedSongs, updateTopTracks, updatePlayedToday, updateUserProfile, updatePodcasts} = userSlice.actions
export default userSlice.reducer