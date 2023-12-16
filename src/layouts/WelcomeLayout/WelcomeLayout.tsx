import { Outlet } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import styles from "./styles.module.css";
import { Logo } from "../../components/layout";

const WelcomeLayout = () => {
  return (
    <>
      <Container>
        <Row>
          <Col sm={{ span: 6, offset: 3 }} className="mt-5">
            <div className={styles.logo}>
              <Logo />
            </div>
            <Outlet />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default WelcomeLayout;
