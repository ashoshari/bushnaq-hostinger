// import { useEffect } from "react";
// import logo from "../../assets/img/logo.png";
import { useTranslation } from "react-i18next";

import styles from "./Footer.module.css";
function Footer() {
  const { t } = useTranslation();

  // const onscroll = (el, listener) => {
  //   el.addEventListener("scroll", listener);
  // };

  // useEffect(() => {
  //   let backtotop = document.querySelector(".back-to-top");
  //   const toggleBacktotop = () => {
  //     if (window.scrollY > 100) {
  //       backtotop.style.visibility = "visible";
  //       backtotop.style.opacity = 1;
  //     } else {
  //       backtotop.style.visibility = "hidden";
  //       backtotop.style.opacity = 0;
  //     }
  //   };
  //   window.addEventListener("load", toggleBacktotop);
  //   onscroll(document, toggleBacktotop);
  // }, []);
  return (
    <footer style={{ backgroundColor: "#000" }}>
      <div className="container">
        <div className="row pb-2 pt-4 justify-content-center">
          <a href="#" className={`twitter ${styles.socialLink}`}>
            <i className="fa-brands fa-twitter"></i>
          </a>
          <a href="#" className={`facebook ${styles.socialLink}`}>
            <i className="fa-brands fa-facebook"></i>
          </a>
          <a href="#" className={`instagram ${styles.socialLink}`}>
            <i className="fa-brands fa-instagram"></i>
          </a>
          {/* <a href="#" className={`google-plus ${styles.socialLink}`}>
              <i className="fa-brands fa-skype"></i>
            </a> */}
          <a href="#" className={`linkedin ${styles.socialLink}`}>
            <i className="fa-brands fa-linkedin"></i>
          </a>
        </div>
      </div>
      <hr className="text-white" />
      <div className="container pb-5">
        <div className="text-center text-white">&copy; {t("copyRights")}</div>
      </div>
      {/* <a
        href="#"
        className={`${styles.backToTop} d-flex align-items-center justify-content-center back-to-top`}
      >
        <i className={`${styles.backToTopArrow} fa-solid fa-arrow-up-long`}></i>
      </a> */}
    </footer>
  );
}

export default Footer;
