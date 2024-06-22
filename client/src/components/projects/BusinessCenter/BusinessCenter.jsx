import a1 from "../../../assets/img/a1.png";
import a2 from "../../../assets/img/a2.png";
import a3 from "../../../assets/img/a3.png";

import { useTranslation } from "react-i18next";
import "./businessCenter.css";
import Maps from "../Maps";
function BusinessCenter() {
  const { t } = useTranslation();
  return (
    <section id="features" className="bg features paddingTop">
      <div className="container">
        <div className="row gy-4 align-items-center features-item">
          <div
            className="col-lg-5 order-2 order-lg-1 text-white"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <h3>{t("projects.key1")}</h3>
            <p className="pt-5">{t("businessCenter.key1")}</p>
            <p>{t("businessCenter.key2")}</p>
          </div>
          <div
            className="col-lg-7 order-1 order-lg-2 d-flex align-items-center"
            data-aos="zoom-out"
            data-aos-delay="100"
          >
            <div className="image-stack">
              <img src={a1} alt="" className="stack-front" />
              <img src={a2} alt="" className="stack-back" />
            </div>
          </div>
        </div>

        <div className="row gy-4 align-items-stretch justify-content-between features-item ">
          <div className="col-lg-6 features-img-bg" data-aos="zoom-out">
            <img src={a3} className="img-fluid" alt="" loading="lazy" />
          </div>
          <div
            className="col-lg-5 d-flex flex-column justify-content-evenly text-white"
            data-aos="fade-up"
          >
            <h3>{t("projects.key1")}</h3>
            <p>{t("businessCenter.key3")}</p>
          </div>
        </div>
        <Maps />
      </div>
    </section>
  );
}

export default BusinessCenter;
