import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Routes from "../routes";
import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "../../clients/react-query/queryKeys";
import { clientApi } from "../../clients/api/clientApi";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();

  //   const query = useQuery(QueryKey.USER_AUTHENTICATION, clientApi.getClient);

  const isAuthenticated = true;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(`${Routes.company.prefix}${Routes.company.login}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children;
};

export default PrivateRoute;
