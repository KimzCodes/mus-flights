import { Outlet } from "react-router-dom";
import { Header } from "../../components/layout";
import { Container } from "react-bootstrap/";

const MainLayout = () => {
  return (
    <Container>
      <Header />
      <div className="mt-2">
        <Outlet />
      </div>
    </Container>
  );
};

export default MainLayout;
