import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/userContext";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();
  const { userInformation } = useUserContext();

  //   const query = useQuery(QueryKey.USER_AUTHENTICATION, clientApi.getClient);

  useEffect(() => {}, [userInformation]);

  return children;
};

export default PrivateRoute;
