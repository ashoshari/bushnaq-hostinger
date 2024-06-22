import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

function Team() {
  const [team, setTeam] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    const getTeamUsers = async () => {
      const res = await fetch("https://bunaq-api.vercel.app/api/team");

      const data = await res.json();
      setTeam(data.teamUsers);
    };
    getTeamUsers();
  }, []);
  return (
    <section className="bg paddingTop">
      <div className="container" data-aos="fade-up">
        <div className="row justify-content-md-center">
          <div className="col-md-10 col-lg-8 col-xl-7 col-xxl-6">
            <h2
              className="fw-bold mb-4 display-6 text-center colorOrangish"
              data-aos="fade-up"
              data-aos-delay="150"
            >
              {t("teamPage.title")}
            </h2>
            <p
              className="text-white mb-5 text-center lead fs-4"
              style={{ position: "relative", zIndex: "1" }}
            >
              {t("teamPage.par")}
            </p>
            <hr
              className="w-50 mx-auto mb-5 mb-xl-9"
              style={{ color: "#ffc451", position: "relative", zIndex: "1000" }}
            />
          </div>
        </div>
      </div>

      <div className="container overflow-hidden" data-aos="fade-up">
        <div className="row gy-4 gy-lg-0 gx-xxl-5">
          {team.map((user) => (
            <div key={user.id} className="col-md-6 col-lg-3">
              <div className="card border-0 border-bottom borderOrangish shadow-sm overflow-hidden bg-light">
                <div className="card-body p-0">
                  <figure className="m-0 p-0">
                    <img
                      loading="lazy"
                      src={user.image}
                      alt={user.position}
                      style={{
                        width: "100%",
                        height: "300px",

                        objectFit: "cover",
                      }}
                    />
                    <figcaption className="m-0 p-4">
                      <h4 className="mb-1">{user.fullname}</h4>
                      <p className="fw-bolder mb-0 colorOrangish">
                        {user.position}
                      </p>
                    </figcaption>
                  </figure>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Team;
