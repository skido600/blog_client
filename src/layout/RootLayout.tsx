import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import MessageMarquee from "../components/Messagemarque";

function RootLayout() {
  return (
    <section>
      <Nav />
      <MessageMarquee />
      <Outlet />
      <Footer />
    </section>
  );
}

export default RootLayout;
