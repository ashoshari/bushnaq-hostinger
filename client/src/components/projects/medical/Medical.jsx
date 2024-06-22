import img1 from "../../../assets/img/img-1.jpg";
import img2 from "../../../assets/img/img-2.jpg";
import img3 from "../../../assets/img/img-3.jpg";

import Maps from "../Maps";
import Doctors from "./Doctors";

import "./medical.css";
function Medical() {
  return (
    <section className="bg paddingTop">
      <div className="container position-relative">
        <div className="row align-items-center">
          <div
            className="col-lg-4 col-sm-6"
            data-aos="zoom-out"
            data-aos-delay="100"
          >
            <div>
              <img src={img1} alt="" className="img-fluid" />
              <img src={img2} alt="" className="img-fluid mt-4" />
            </div>
          </div>
          <div
            className="col-lg-4 col-sm-6"
            data-aos="zoom-out"
            data-aos-delay="100"
          >
            <div className="mt-4 mt-lg-0">
              <img src={img3} alt="" className="img-fluid" />
            </div>
          </div>
          <div className="col-lg-4" data-aos="zoom-out" data-aos-delay="100">
            <div className="pl-4 mt-4 mt-lg-0">
              <h2 className="text-white">
                Personal care <br />& healthy living
              </h2>
              <p className="mt-4 mb-5 text-white">
                We provide best leading medicle service Nulla perferendis veniam
                deleniti ipsum officia dolores repellat laudantium obcaecati
                neque.
              </p>
            </div>
          </div>
        </div>
        <div
          className="row paddingTop g-5"
          data-aos="zoom-out"
          data-aos-delay="100"
        >
          <div className="col-lg-4 wow">
            <div className="section-title bg-light rounded h-100 p-5">
              <h5 className="position-relative d-inline-block text-primary text-uppercase colorBlueish">
                Our Dentist
              </h5>
              <h1 className="display-5 fw-bold mb-4">
                Meet Our Certified & Experienced Dentist
              </h1>
              <a
                href="appointment.html"
                className="btn btn-primary py-3 px-5 bgBlueish"
              >
                Appointment
              </a>
            </div>
          </div>

          <Doctors />
        </div>
        <Maps />
      </div>
    </section>
  );
}

export default Medical;
