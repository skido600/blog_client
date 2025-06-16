import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
function RootLayout() {
  return (
    <section>
      <Nav />
      <Outlet />
      <Footer />
    </section>
  );
}

export default RootLayout;
