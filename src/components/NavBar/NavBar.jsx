import "./NavBar.scss";
import { useState } from "react";
import { Collapse, Navbar, Nav, NavItem } from "reactstrap";
import { FaShoppingCart } from "react-icons/fa";
import { BsList } from "react-icons/bs";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import useAuth from "../../utils/customHooks/useAuth";
import useAxios from "../../utils/customHooks/useAxios";
import { toast } from "react-toastify";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const closeNavbarToggler = () => setIsOpen(false);

  const { cartNum } = useSelector((state) => state.cart);
  const userInfo = useSelector((state) => state.user);

  const { instance } = useAxios();
  const { removeUserInfo } = useAuth();
  const [isSubmitting, setSubmitting] = useState(false);

  const logout = () => {
    setSubmitting(true);
    instance
      .get("/users/unauthenticate")
      .then((response) => {
        setSubmitting(false);
        toast.dark("Signed out successfully");
        removeUserInfo();
      })
      .catch((error) => {
        setSubmitting(false);
        toast.error(error.response.data.message);
      });
  };

  return (
    <Navbar className="navbar fixed-top w-100" expand="md">
      <div className="container">
        <Link to="/" className="h1 m-0 navbar-brand">
          E-Commerce
        </Link>
        <button onClick={toggle} className="btn nav-toggleBtn ">
          <BsList className="border border-white rounded text-white toggle-icon" />
        </button>
        <Collapse isOpen={isOpen} navbar className="flex-grow-0">
          <Nav navbar>
            <NavItem>
              <NavLink
                to="/"
                exact
                className="nav-link"
                activeClassName="activeRoute"
                onClick={closeNavbarToggler}
              >
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                to="/cart"
                exact
                className="nav-link"
                activeClassName="activeRoute"
                onClick={closeNavbarToggler}
              >
                <FaShoppingCart className="pr-2" /> <span>{cartNum}</span>
              </NavLink>
            </NavItem>
            {userInfo ? (
              <>
                <NavLink
                  to="/orders"
                  exact
                  className="nav-link"
                  activeClassName="activeRoute"
                  onClick={closeNavbarToggler}
                >
                  Orders
                </NavLink>
                <NavLink
                  to="/profile"
                  exact
                  className="nav-link"
                  activeClassName="activeRoute"
                  onClick={closeNavbarToggler}
                >
                  Update Profile
                </NavLink>
                <NavItem
                  className="ps-md-5 nav-link"
                  onClick={() => {
                    logout();
                    closeNavbarToggler();
                  }}
                  disabled={isSubmitting}
                >
                  {!isSubmitting ? (
                    "Logout"
                  ) : (
                    <div
                      className="spinner-border spinner-border-sm text-light"
                      role="status"
                    ></div>
                  )}
                </NavItem>
              </>
            ) : (
              <>
                <NavItem>
                  <NavLink
                    to="/signup"
                    exact
                    className="nav-link"
                    activeClassName="activeRoute"
                    onClick={closeNavbarToggler}
                  >
                    Sign Up
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    to="/signin"
                    exact
                    className="nav-link"
                    activeClassName="activeRoute"
                    onClick={closeNavbarToggler}
                  >
                    Sign In
                  </NavLink>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </div>
    </Navbar>
  );
};

export default NavBar;
