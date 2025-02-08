import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/auth/selectors";

const PublicRoute = ({ component: Component }) => {
  const location = useLocation();

  const isLoggedIn = useSelector(selectIsLoggedIn);

  return isLoggedIn ? <Navigate to={location?.state || "/"} /> : Component;
};
export default PublicRoute;
