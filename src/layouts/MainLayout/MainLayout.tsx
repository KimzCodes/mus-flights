import { Outlet } from "react-router-dom";
import { Header } from "../../components/layout";
import { Container, Row, Col } from "react-bootstrap/";

const MainLayout = () => {
  return (
    <Container style={{ height: "100vh" }}>
      <Header />
      <Row className="mt-2">
        <Col sm={{ span: 8, offset: 2 }}>
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};

export default MainLayout;
