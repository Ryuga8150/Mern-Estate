import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const { currentUser } = useSelector((store) => {
    // console.log(store);
    return store.user;
  });
  const { user } = currentUser ? currentUser.data : {};

  return user ? <Outlet /> : <Navigate to="/sign-in" />;
}

export default ProtectedRoute;
