import { useAppSelector } from "../../store/hooks";
import { Navigate } from "react-router-dom";

type AuthenticatedProps = {
  children: React.JSX.Element;
};

const Authenticated = ({ children }: AuthenticatedProps) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/" replace={true} />;
  }

  return <>{children}</>;
};

export default Authenticated;
