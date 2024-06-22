import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Signup() {
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errSignup, setErrSignup] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [disableBtn, setDisableBtn] = useState(false);

  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = {};
    if (email.length < 10) {
      errors.email = t("loginPage.errEmail");
    }
    if (name.length < 3) {
      errors.name = t("signUpPage.errName");
    }
    if (password.length < 6) {
      errors.password = t("signUpPage.errPassword");
    }
    if (password !== confirmPassword) {
      errors.confirmPassword = t("signUpPage.errPassMatch");
    }

    setErrors(errors);

    if (!Object.keys(errors).length) {
      setDisableBtn(true);

      const user = {
        name: name,
        email: email,
        password: password,
      };
      const res = await fetch("https://bunaq-api.vercel.app/api/signup", {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      console.log(data);
      if (data?.errors?.email) {
        setDisableBtn(false);
        setErrSignup(t("signUpPage.errEmailInUse"));
      } else {
        localStorage.setItem("isLoggedIn", true);
        navigate("/");
      }
    }
  };

  return (
    <section id="signup" className="signup paddingTop" data-aos="fade-up">
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: "25px" }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p
                      className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4 colorOrangish"
                      data-aos="fade-up"
                      data-aos-delay="150"
                    >
                      {t("signup")}
                    </p>

                    <form className="mx-1 mx-md-4">
                      {errSignup && (
                        <p className="text-light text-center bg-danger rounded py-3">
                          {errSignup}
                        </p>
                      )}
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg mx-3 fa-fw"></i>
                        <div
                          data-mdb-input-init
                          className="form-outline flex-fill mb-0"
                        >
                          <label
                            className="form-label"
                            htmlFor="form3Example1c"
                          >
                            {t("signUpPage.yourName")}
                          </label>
                          <input
                            type="text"
                            id="form3Example1c"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                          <div className="mt-2">
                            <p className="text-danger">{errors.name}</p>
                          </div>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg mx-3 fa-fw"></i>
                        <div
                          data-mdb-input-init
                          className="form-outline flex-fill mb-0"
                        >
                          <label
                            className="form-label"
                            htmlFor="form3Example3c"
                          >
                            {t("loginPage.yourEmail")}
                          </label>
                          <input
                            type="email"
                            id="form3Example3c"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          <div className="mt-2">
                            <p className="text-danger">{errors.email}</p>
                          </div>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg mx-3 fa-fw"></i>
                        <div
                          data-mdb-input-init
                          className="form-outline flex-fill mb-0"
                        >
                          <label
                            className="form-label"
                            htmlFor="form3Example4c"
                          >
                            {t("loginPage.password")}
                          </label>
                          <input
                            type="password"
                            id="form3Example4c"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <div className="mt-2">
                            <p className="text-danger">{errors.password}</p>
                          </div>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-key fa-lg mx-3 fa-fw"></i>
                        <div
                          data-mdb-input-init
                          className="form-outline flex-fill mb-0"
                        >
                          <label
                            className="form-label"
                            htmlFor="form3Example4cd"
                          >
                            {t("signUpPage.repeatPass")}
                          </label>
                          <input
                            type="password"
                            id="form3Example4cd"
                            className="form-control"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                          <div className="mt-2">
                            <p className="text-danger">
                              {errors.confirmPassword}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button
                          data-mdb-button-init
                          data-mdb-ripple-init
                          className="btn text-white bgOrangish btn-lg btnHover"
                          onClick={handleSubmit}
                          disabled={disableBtn}
                        >
                          {t("signUpPage.register")}
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      className="img-fluid"
                      alt="Sample image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signup;
