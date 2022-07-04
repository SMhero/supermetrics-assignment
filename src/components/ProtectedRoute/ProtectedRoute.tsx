import { Navigate } from "react-router-dom";
import useTypedSelector from "hooks/useTypedSelector";
import { FC, useMemo } from "react";

interface IProps {
  children: React.ReactElement | React.ReactElement[];
}

const ProtectedRoute: FC<IProps> = ({ children }) => {
  const { data } = useTypedSelector(state => state.user);
  const isAuthorized = useMemo(() => !!data?.slToken, [data?.slToken]);

  if (!isAuthorized) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
