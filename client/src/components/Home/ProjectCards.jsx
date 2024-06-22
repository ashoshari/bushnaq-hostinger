import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";
function ProjectCards() {
  const { t } = useTranslation();

  const cards = [
    {
      name: t("projects.key1"),
      className: "fa-solid fa-briefcase",
      path: "/bushnaq-businesses-center",
    },
    {
      name: t("projects.key2"),
      className: "ri-mental-health-fill",
      path: "/bushnaq-medical",
    },
    {
      name: t("projects.key3"),
      className: "fa-solid fa-wheat-awn",
      path: "/bushnaq-agriculture",
    },
    {
      name: t("projects.key4"),
      className: "fa-solid fa-house",
      path: "/bushnaq-residential",
    },
  ];
  return (
    <div
      className="row g-6 mx-0 justify-content-center"
      data-aos="zoom-in"
      data-aos-delay="250"
      style={{ marginTop: "70px" }}
    >
      {cards.map((card) => (
        <div className="col-md-3" key={card.name}>
          <Link to={card.path}>
            <div
              className={`h-100 text-center lh-1 colorOrangish ${styles.iconBox}`}
            >
              <i className={`${card.className} fs-2 `}></i>
              <h5 className="fw-bold text-white mt-5">{card.name}</h5>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default ProjectCards;
