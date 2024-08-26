import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "../css/navbar.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const NavBar = () => {
  const navigate = useNavigate();
  const [nav, setNav] = useState(false);

  const logout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
    toast.success("Logged out successfully", {
      style: {
        backgroundColor: "rgba(255, 255, 255, 0.09)",
        backdropFilter: "blur(20px)",
        color: "white",
      },
    });
  };

  const navopen = () => {
    setNav(!nav);
  };

  return (
    <>
      <nav className={`nav ${nav ? "expanded" : ""}`}>
        <ul className="Nav-inside">
          <div className="secti1">
            <ul className="ul1">
              <li className="LI">Brand Name</li>
              <li className="LI">
                <NavLink
                  to={"/"}
                  className="LinkL"
                  activeClassName="active-link"
                >
                  Home
                </NavLink>
              </li>
              <li className="LI">
                <NavLink
                  to={"/about"}
                  className="LinkL"
                  activeClassName="active-link"
                >
                  About Us
                </NavLink>
              </li>
              <li className="LI">
                <NavLink
                  to={"/contact"}
                  className="LinkL"
                  activeClassName="active-link"
                >
                  Contact Us
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="secti2">
            <ul className="ul2">
              <li>
                {sessionStorage.getItem("token") != null &&
                sessionStorage.getItem("token") !== "" ? (
                  <>
                    <button className="btn " onClick={logout}>
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <NavLink to={"/login"}>
                      <button className="btn btnl">Login</button>
                    </NavLink>
                  </>
                )}
              </li>
              <li>
                {sessionStorage.getItem("token") != null &&
                sessionStorage.getItem("token") !== "" ? (
                  <Link to={"/profile"}>
                    <img
                      className="profile-img"
                      src="p.png"
                      alt="profile icon"
                    />
                  </Link>
                ) : (
                  ""
                )}
              </li>
              <li>
                <img
                  src="menu.png"
                  alt="menu button"
                  className="menu-img"
                  onClick={navopen}
                />
              </li>
            </ul>
          </div>
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
