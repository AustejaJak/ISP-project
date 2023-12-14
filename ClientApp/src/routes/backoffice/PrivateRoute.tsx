import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Routes from "../routes";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();

  const isAuthenticated = true;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(Routes.backoffice.base);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children;
};

export default PrivateRoute;
