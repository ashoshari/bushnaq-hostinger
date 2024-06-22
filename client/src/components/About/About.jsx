import { useTranslation } from "react-i18next";
function About() {
  const { t } = useTranslation();

  return (
    <main className="bg paddingTop">
      <div className="row mx-0 justify-content-center">
        <div
          className="col-sm-6 position-relative"
          data-aos="fade-up"
          data-aos-delay="150"
        >
          <h2
            className="colorOrangish fs-1 fw-bold text-center"
            data-aos="fade-up"
            data-aos-delay="150"
          >
            {t("aboutPage.title")}
          </h2>
          <p className="text-white pt-3 text-center">{t("aboutPage.par")}</p>
        </div>
      </div>
    </main>
  );
}

export default About;
