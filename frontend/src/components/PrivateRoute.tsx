import { Navigate, RouteProps } from "react-router-dom"


const PrivateRoute = ({ children }: RouteProps) => {
  const isLoggedIn = localStorage.getItem("token") == null ? false : true
  return <>{isLoggedIn ? children : <Navigate to="/login" />}</>
}

export default PrivateRoute
