import { createSlice } from "@reduxjs/toolkit"

interface userState {
    followedArtists: any,
    userPlaylist: any,
    likedSongs: any,
    topTracks: any,
    playedToday: any,
    topArtists: any,
    featuredPlaylist:any
}

const initialState: userState = {
    followedArtists: {},
    userPlaylist: {},
    likedSongs: {},
    topTracks: {},
    playedToday: {},
    topArtists: {},
    featuredPlaylist:{}
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
        }
    }
})

export const {updateFeaturedPlaylist, updadateTopArtsist, updateFollowedArtist, updateUserPlaylist, updateLikedSongs, updateTopTracks, updatePlayedToday} = userSlice.actions
export default userSlice.reducer