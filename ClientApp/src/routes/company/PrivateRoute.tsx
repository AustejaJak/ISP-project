import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/userContext";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();
  const { userInformation } = useUserContext();

  //   const query = useQuery(QueryKey.USER_AUTHENTICATION, clientApi.getClient);

  useEffect(() => {
    if (!userInformation.roles.length) return;
    console.log(userInformation);
    const isAuthenticated = !!userInformation.roles.includes("Shop-Employee");
    console.log(isAuthenticated);
    if (!isAuthenticated) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInformation]);

  return children;
};

export default PrivateRoute;
