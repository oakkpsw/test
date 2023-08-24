import axios from "axios"

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000", // Set your API base URL here
})

axiosInstance.interceptors.request.use(
  (config) => {
    const tokenString = localStorage.getItem("token")
    if (tokenString !== null) {
      const token = JSON.parse(tokenString)
       if (token) {
         config.headers["Authorization"] = `Bearer ${token.accessToken}`
       }
    } 

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response) => {
    // Handle successful responses
    return response
  },
  (error) => {
    // Handle error responses
    return Promise.reject(error)
  }
)

export default axiosInstance
