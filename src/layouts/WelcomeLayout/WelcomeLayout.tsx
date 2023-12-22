import { Outlet } from "react-router-dom";
import DarkMode from "../../components/layout/DarkMode/DarkMode";
import { Container, Row, Col } from "react-bootstrap";

import styles from "./styles.module.css";
import { Logo } from "../../components/layout";

const WelcomeLayout = () => {
  return (
    <>
      <Container>
        <div style={{ position: "absolute", top: "20px", right: "100px" }}>
          <DarkMode />
        </div>

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
