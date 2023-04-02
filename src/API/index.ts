import axios from "axios"

const token = JSON.parse(localStorage.getItem("spotify_token")!)
const API = axios.create({
    baseURL: "https://api.spotify.com/v1",
    headers : {Authorization: `Bearer ${token}`}
})


export default API