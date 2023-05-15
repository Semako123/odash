import axios from "axios"

const API = () => {
    const token = JSON.parse(localStorage.getItem("spotify_token")!) 
    return (axios.create({
        baseURL: "https://api.spotify.com/v1",
        headers: { Authorization: `Bearer ${token}` }
    }))
}


export default API