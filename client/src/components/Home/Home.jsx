import styles from "./Home.module.css";
import { useTranslation } from "react-i18next";
import ProjectCards from "./ProjectCards";

function Home() {
  const { t } = useTranslation();
  const lang = localStorage.getItem("lang");

  return (
    <section
      className={`${styles.hero} bg d-flex align-items-center justify-content-center`}
    >
      <div>
        <div
          className="row justify-content-center p-0 m-0 g-0"
          data-aos="fade-up"
          data-aos-delay="150"
        >
          <div className="col-xl-6 col-lg-8">
            <h1
              className={`d-flex justify-content-center align-items-center m-0 fw-bold ${styles.heroHeader}`}
              data-aos="fade-up"
              data-aos-delay="150"
            >
              <p
                className={`fs-6 colorOrangish ${
                  lang === "ar" ? styles.marginLeft : styles.marginRight
                } lh-1`}
              >
                {t("welcomeTo")}
              </p>
              <p className="text-white fs-1 lh-1">{t("bushnaqGroup")}</p>
              <i
                className="fa-solid fa-circle colorOrangish"
                style={{
                  marginRight: lang === "ar" ? "4px" : null,
                  fontSize: "0.6rem",
                }}
              ></i>
            </h1>
            <h2 className={`text-center mt-3 fs-4 ${styles.heroPar}`}>
              {t("heroPar")}
            </h2>
          </div>
        </div>
        <ProjectCards />
      </div>
    </section>
  );
}

export default Home;
