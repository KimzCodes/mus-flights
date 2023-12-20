import Lottie from "lottie-react";
import notFoundAnimation from "../assets/lottie/notFoundAnimation.json";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

const ErrorPage = () => {
  return (
    <Container>
      <Row>
        <Col sm={{ span: 6, offset: 3 }} className="mt-5">
          <div className="d-flex align-items-center justify-content-center flex-column mt-5">
            <Lottie animationData={notFoundAnimation} loop={true} />
            <Link to="/" replace={true} className="text-center">
              Looks like you've stumbled upon a non-existent page. <br />
              How about going back to safety?
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ErrorPage;
