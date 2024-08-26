import React from "react";
import NavBar from "./NavBar";
import { Outlet, Link } from "react-router-dom";
import Footer from "./footer";

const Layout = () => {
  return (
    <div>
      <NavBar />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
