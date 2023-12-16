import { useAppSelector } from "../../store/hooks";
import { Navigate } from "react-router-dom";

type VisitorProps = {
  children: React.ReactNode;
};

const Visitor = ({ children }: VisitorProps) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  if (isAuthenticated) {
    return <Navigate to="/home" replace={true} />;
  }

  return <>{children}</>;
};

export default Visitor;
