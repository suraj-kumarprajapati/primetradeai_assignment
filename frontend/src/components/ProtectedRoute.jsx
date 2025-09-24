
import { Navigate } from "react-router-dom";
import Loader from "./Loader";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
    const {isAuthenticated, isUserLoading} = useSelector(state => state.auth);


    if (isUserLoading) {
        return <Loader />;
    }

    // if the user is authenticated 
    if (isAuthenticated) {
        return children;
    }
    // if user is not authenticate, then move to home page
    else return (
        <Navigate to={"/login"} replace />
    )
}

export default ProtectedRoute