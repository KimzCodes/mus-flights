import { Outlet } from "react-router-dom";
import { Header } from "../../components/layout";
import { Container } from "react-bootstrap/";

const MainLayout = () => {
  return (
    <Container>
      <Header />
      <div>
        <Outlet />
      </div>
    </Container>
  );
};

export default MainLayout;
