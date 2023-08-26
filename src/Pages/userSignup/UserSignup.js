import React, { useState, useEffect } from "react";
import Header from "../../Components/Header";
import axios from "axios";
import Footer from "../../Components/Footer";

import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { backendApis } from "../../Utils/APIS";
import ReactLoading from "react-loading";
const Signup = () => {
  // console.log( backendApis.userApi.userLogin  )

  const [loginIsLoading, setloginIsLoading] = useState(false);
  const [signupIsLoading, setsignupIsLoading] = useState(false);

  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const [termsCondition, settermsCondition] = useState(false);
  const [loginTermsCondition, setloginTermsCondition] = useState(false);

  const [loginEmail, setloginEmail] = useState("");
  const [loginPassword, setloginPassword] = useState("");

  const inputOnChng = (e) => {
    if (e.target.name === "fname") {
      setfname(e.target.value);
    }

    if (e.target.name === "lname") {
      setlname(e.target.value);
    }

    if (e.target.name === "email") {
      setemail(e.target.value);
    }

    if (e.target.name === "password") {
      setpassword(e.target.value);
    }

    if (e.target.name === "loginEmail") {
      setloginEmail(e.target.value);
    }

    if (e.target.name === "loginPassword") {
      setloginPassword(e.target.value);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setsignupIsLoading(true);

    // console.log(backendApis.userApi.signup);

    let firstName = fname;
    let LastName = lname;
    let Eemail = email;
    let Ppassword = password;

    await axios
      .post(backendApis.userApi.signup, {
        firstName,
        LastName,
        Eemail,
        Ppassword,
      })

      .then(
        await function (response) {
          // console.log(response.data)

          if (response.data.status == 200) {
            if (response.data.msg === "userSignUpSuccessfull") {
              setfname("");
              setlname("");
              setemail("");
              setpassword("");

              alert(response.data.msg);
              setsignupIsLoading(false);

              // window.location.replace("/signup")
            } else {
              alert(response.data.msg);
              setsignupIsLoading(false);
            }
          }
        }
      );
  };

  const handleLoginOnSubmit = async (e) => {
    setloginIsLoading(true);
    e.preventDefault();

    // console.log(backendApis.userApi.userLogin);

    let loginEmailId = loginEmail;
    let loginPasswords = loginPassword;

    await axios
      .post(backendApis.userApi.userLogin, {
        loginEmailId,
        loginPasswords,
      })

      .then(function (response) {
        // console.log(response.data);
        if (response.data.status === 200) {
          if (response.data.msg === "UserLoggedIn") {
            alert("UserLoggedIn");

            // set token on local storage
            localStorage.setItem("userLoginToken", response.data.token);
            setloginIsLoading(false);

            window.location.replace("/user");
          } else {
            alert(response.data.msg);
            setloginIsLoading(false);
          }
        } else {
          alert(response.data.msg);
        }
      });
  };

  return (
    <>
      <Header />

      <div style={{ backgroundColor: "#f1f3f6" }} data-cy="userSignInSignUp">
        <h2 className="text-center pt-4 pb-2 text-bold text-capitalize">
          {" "}
          {/* user signup signin{" "} */}
        </h2>

        <div className="row d-flex flex-row justify-content-center">
          <div
            className="col-12 col-sm-5 col-md-5  "
            style={{ backgroundColor: "#fff", margin: "0 20px 0 0" }}
          >
            <form method="POST" className="px-4" onSubmit={handleLoginOnSubmit}>
              <h4 className="text-center mt-3 d-flex flex-row justify-content-evenly ">
                User Login{" "}
                <span>
                  {loginIsLoading ? (
                    <ReactLoading
                      type="spinningBubbles"
                      color="#2874f0"
                      height={25}
                      width={25}
                    />
                  ) : (
                    ""
                  )}
                </span>
              </h4>

              <div className="form-floating mt-3 mb-3">
                <input
                  data-cy="login Email"
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Email address"
                  name="loginEmail"
                  onChange={inputOnChng}
                  required
                />
                <label htmlFor="floatingInput">Email address</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  data-cy="login Password"
                  className="form-control"
                  id="loginfloatingPassword"
                  placeholder="Password"
                  name="loginPassword"
                  onChange={inputOnChng}
                  required
                />

                <label htmlFor="loginfloatingPassword">Password</label>
              </div>
              <div className="form-group form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="signUpTerms"
                  checked={loginTermsCondition}
                  onChange={() => setloginTermsCondition(loginTermsCondition)}
                  data-cy="signup termsCondition"
                />
                <label
                  id="loginTerms"
                  className="form-check-label"
                  htmlFor="signUpTerms"
                  onClick={() => setloginTermsCondition(!loginTermsCondition)}
                >
                  I accept all terms and condition
                </label>
              </div>

              <input
                type="submit"
                value="Login "
                data-cy="login button"
                disabled={!loginTermsCondition}
                className="w-100 btn btn-primary btn-lg px-5 mt-3 mb-5"
              />
            </form>
          </div>

          <div
            className="col-12 col-sm-5 col-md-6 "
            style={{ backgroundColor: "#fff" }}
          >
            <h4 className="text-center mt-3 d-flex flex-row justify-content-evenly ">
              User Sign Up
              <span>
                {signupIsLoading ? (
                  <ReactLoading
                    type="spinningBubbles"
                    color="#2874f0"
                    height={25}
                    width={25}
                  />
                ) : (
                  ""
                )}
              </span>
            </h4>

            <form method="post" className="px-4" onSubmit={handleSignupSubmit}>
              <div className="form-floating mb-3 mt-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingFname"
                  placeholder="First Name"
                  name="fname"
                  value={fname}
                  onChange={inputOnChng}
                  required
                  data-cy="signup fname"
                />
                <label htmlFor="floatingFname">First Name </label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingLname"
                  placeholder="Last Name"
                  name="lname"
                  value={lname}
                  onChange={inputOnChng}
                  required
                  data-cy="signup lname"
                />
                <label htmlFor="floatingLname">Last Name </label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="floatingEmail"
                  placeholder="Your Email addres"
                  name="email"
                  value={email}
                  onChange={inputOnChng}
                  required
                  data-cy="signup email"
                />
                <label htmlFor="floatingEmail">Your Email address</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Your Password"
                  name="password"
                  value={password}
                  onChange={inputOnChng}
                  required
                  data-cy="signup password"
                />
                <label htmlFor="floatingPassword">Your Password</label>
              </div>
              <div className="form-group form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="signUpTermsdsfs"
                  // checked={termsCondition}
                  onChange={() => settermsCondition(termsCondition)}
                  data-cy="signup termsCondition"
                />
                <label
                  id="signUpTerms"
                  className="form-check-label"
                  htmlFor="signUpTermsdsfs"
                  onClick={() => settermsCondition(!termsCondition)}
                >
                  I accept all terms and condition
                </label>
              </div>
              <input
                type="submit"
                value="Sign Up"
                disabled={!termsCondition}
                data-cy="signup button"
                className="w-100 btn btn-primary btn-lg px-5 mt-3 mb-5"
              />
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Signup;
