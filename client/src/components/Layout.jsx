import Header from "./Header/Header";
import { Outlet } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Footer from "./Footer/Footer";
function Layout() {
  (function () {
    var lastclear = localStorage.getItem("lastclear"),
      time_now = new Date().getTime();

    // .getTime() returns milliseconds so 1000 * 60 * 60 * 24 = 24 days
    if (time_now - lastclear > 1000 * 60 * 60) {
      localStorage.clear();
      localStorage.setItem("lastclear", time_now);
    }
  })();

  useEffect(() => {
    document.body.style.direction =
      localStorage.getItem("lang") == "ar" ? "rtl" : "ltr";
  }, []);
  useEffect(() => {
    Aos.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }, []);
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
