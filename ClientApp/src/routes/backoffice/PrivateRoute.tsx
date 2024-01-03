import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/userContext";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();
  const { userInformation } = useUserContext();

  useEffect(() => {
    if (!userInformation.roles.length) return;
    // const isAuthenticated = !!userInformation.roles.includes("Shop-Employee");
    // if (!isAuthenticated) {
    //   navigate("/");
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInformation]);

  return children;
};

export default PrivateRoute;
