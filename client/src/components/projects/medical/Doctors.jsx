import team1 from "../../../assets/img/team-1.jpg";
import team2 from "../../../assets/img/team-2.jpg";
import team3 from "../../../assets/img/team-3.jpg";
import team4 from "../../../assets/img/team-4.jpg";
import team5 from "../../../assets/img/team-5.jpg";

function Doctors() {
  const socialLinks = [
    {
      className: "fab fa-facebook-f fw-normal",
    },
    {
      className: "fab fa-twitter fw-normal",
    },
    {
      className: "fab fa-linkedin-in fw-normal",
    },
    {
      className: "fab fa-instagram fw-normal",
    },
  ];
  const doctors = [
    {
      name: "Dr John Doe",
      speciality: "Implant Surgeon",
      image: team1,
      facebook: "#",
      twitter: "#",
      instagram: "#",
      linkedin: "#",
    },
    {
      name: "Dr John Doe",
      speciality: "Implant Surgeon",
      image: team2,
      facebook: "#",
      twitter: "#",
      instagram: "#",
      linkedin: "#",
    },
    {
      name: "Dr John Doe",
      speciality: "Implant Surgeon",
      image: team3,
      facebook: "#",
      twitter: "#",
      instagram: "#",
      linkedin: "#",
    },
    {
      name: "Dr John Doe",
      speciality: "Implant Surgeon",
      image: team4,
      facebook: "#",
      twitter: "#",
      instagram: "#",
      linkedin: "#",
    },
    {
      name: "Dr John Doe",
      speciality: "Implant Surgeon",
      image: team5,
      facebook: "#",
      twitter: "#",
      instagram: "#",
      linkedin: "#",
    },
  ];
  return doctors.map((doctor) => (
    <div className="col-lg-4 wow" key={doctor.name}>
      <div className="team-item">
        <div className="position-relative rounded-top" style={{ zIndex: "1" }}>
          <img
            className="img-fluid rounded-top w-100"
            src={doctor.image}
            alt=""
          />
          <div className="position-absolute top-100 start-50 translate-middle bg-light rounded p-2 d-flex">
            {socialLinks.map((link) => (
              <a
                key={link.className}
                className="btn btn-primary btn-square m-1"
                href={doctor.twitter}
              >
                <i className={link.className}></i>
              </a>
            ))}
          </div>
        </div>
        <div className="position-relative bg-light text-center rounded-bottom p-4 pt-5">
          <h4 className="mb-2">{doctor.name}</h4>
          <p className="text-primary mb-0 colorBlueish">{doctor.speciality}</p>
        </div>
      </div>
    </div>
  ));
}

export default Doctors;
