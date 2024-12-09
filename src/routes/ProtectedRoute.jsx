import { Outlet, Navigate } from "react-router-dom";
function ProtectedRoute() {
  const auth = localStorage.getItem("loggedin");
  return auth ? <Outlet /> : <Navigate to={"/login"} />;
}
export default ProtectedRoute;
