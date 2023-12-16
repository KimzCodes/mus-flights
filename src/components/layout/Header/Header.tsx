import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { logout } from "../../../store/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../Logo/Logo";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

const Header = () => {
  const userInfo = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="mt-3">
      <Logo />

      <Navbar expand="lg" className="mt-3" bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="categories">
                New Ticket
              </Nav.Link>
            </Nav>
            <Nav>
              <NavDropdown
                title={`Welcome: ${userInfo?.name}`}
                id="basic-nav-dropdown"
                className="justify-content-end"
              >
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
