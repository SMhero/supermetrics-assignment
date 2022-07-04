import { FC } from "react";
import { Navigate } from "react-router-dom";

interface IProps {
  children: React.ReactElement | React.ReactElement[];
}

const ProtectedRoute: FC<IProps> = ({ children }) => {
  const isAuthorized = false;

  if (!isAuthorized) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
