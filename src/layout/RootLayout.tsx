// import React from "react";

import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";
function RootLayout() {
  return (
    <section>
      <Nav />
      <Outlet />
    </section>
  );
}

export default RootLayout;
