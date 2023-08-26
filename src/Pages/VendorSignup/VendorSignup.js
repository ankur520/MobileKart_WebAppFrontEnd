import React, { useState, useEffect } from "react";
import Header from "../../Components/Header";

import Footer from "../../Components/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import jwtDecode from "jwt-decode";
import ReactLoading from "react-loading";
import { backendApis } from "../../Utils/APIS";

const sign = require("jwt-encode");

const Signup = () => {
  const [loginIsLoading, setloginIsLoading] = useState(false);
  const [signupIsLoading, setsignupIsLoading] = useState(false);

  const [termsCondition, settermsCondition] = useState(false);
  const [loginTermsCondition, setloginTermsCondition] = useState(false);

  const [termsConditionCheckBox, settermsConditionCheckBox] = useState(false);
  const [loginTermsConditionCheckBox, setloginTermsConditionCheckBox] =
    useState(false);

  // const navigate = useNavigate();

  useEffect(() => {}, []);

  const [fullName, setfullName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const [loginEmail, setloginEmail] = useState("");
  const [loginPassword, setloginPassword] = useState("");

  // const [loggedInfo, setloggedInfo] = useState([])

  const inputOnChange = (e) => {
    if (e.target.name === "fullName") {
      setfullName(e.target.value);
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
    // console.log("handle submit ");

    let fullname = fullName;
    let emailAddress = email;
    let passwords = password;

    await axios
      .post(backendApis.vendorApi.signup, { fullname, emailAddress, passwords })

      .then(function (response) {
        if (response.data.status === 200) {
          if (response.data.msg === "VendorSignUpSuccessfull") {
            alert("VendorSignUpSuccessfull");
            setfullName("");
            setemail("");
            setpassword("");
            setsignupIsLoading(false);
            // window.location.replace("/vendorsignup")
            // navigate("/vendorsignup");
          } else {
            alert(response.data.msg);
            setsignupIsLoading(false);
          }
        }
      });
  };

  const handleLoginOnSubmit = async (e) => {
    e.preventDefault();
    setloginIsLoading(true);
    let loginEmailId = loginEmail;
    let loginPasswords = loginPassword;

    await axios
      .post(backendApis.vendorApi.vendorLogin, {
        loginEmailId,
        loginPasswords,
      })

      .then(function (response) {
        // console.log(response.data);

        if (response.data.status === 200) {
          if (response.data.msg === "VendorLoggedIn") {
            var decoded = jwtDecode(response.data.token);
            // console.log("jwtDecode is " , decoded )

            localStorage.setItem("vendorLoginToken", response.data.token);
            setloginIsLoading(false);

            window.location.replace("/vendor");
          } else {
            alert(response.data.msg);
            setloginIsLoading(false);
          }
        }
      });
  };

  return (
    <>
      <Header />

      <div style={{ backgroundColor: "#f1f3f6" }} data-cy="vendorSignInSignUp">
        <h2 className="text-center py-2 text-bold"> Vendor signup signin </h2>

        <div className="row d-flex flex-row justify-content-center ">
          <div
            className="col-12 col-sm-5 col-md-5  py-4 px-4 "
            style={{ backgroundColor: "#fff", margin: "0 20px 0 0px" }}
          >
            <h1 className="text-center mt-3 d-flex flex-row justify-content-evenly">
              Login
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
            </h1>

            <form method="POST" className="px-2" onSubmit={handleLoginOnSubmit}>
              <div className="form-floating mt-5 mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  data-cy="login Email"
                  name="loginEmail"
                  onChange={inputOnChange}
                  placeholder=""
                  required
                />
                <label htmlFor="floatingInput">Email address</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="loginfloatingPassword"
                  placeholder=""
                  data-cy="login Password"
                  name="loginPassword"
                  onChange={inputOnChange}
                  required
                />
                <label htmlFor="loginfloatingPassword">Password</label>
              </div>

              <div className="form-group form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="signUpTermskjadfs"
                  onChange={() =>
                    setloginTermsConditionCheckBox(loginTermsConditionCheckBox)
                  }
                  // checked={loginTermsCondition}
                  data-cy="signup termsCondition"
                />
                <label
                  id="loginTerms"
                  className="form-check-label"
                  htmlFor="signUpTermskjadfs"
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
            className="col-12 col-sm-5 col-md-6 py-4 px-4 "
            style={{ backgroundColor: "#fff" }}
          >
            <h1 className="text-center mt-2 d-flex flex-row justify-content-evenly ">
              Sign Up
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
            </h1>

            <form method="post" onSubmit={handleSignupSubmit}>
              <div className="form-floating mb-3 mt-5">
                <input
                  type="text"
                  className="form-control"
                  id="floatingFname"
                  placeholder="First Name"
                  name="fullName"
                  onChange={inputOnChange}
                  value={fullName}
                  data-cy="signup fname"
                  required
                />
                <label htmlFor="floatingFname">Full Name </label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="floatingEmail"
                  placeholder="Your Email"
                  name="email"
                  data-cy="signup email"
                  value={email}
                  onChange={inputOnChange}
                  required
                />
                <label htmlFor="floatingEmail">Your address</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={inputOnChange}
                  data-cy="signup password"
                  required
                />
                <label htmlFor="floatingPassword">Password</label>
              </div>
              <div className="form-group form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="signUpTermskjhk"
                  // checked={termsCondition}
                  onChange={() =>
                    settermsConditionCheckBox(termsConditionCheckBox)
                  }
                  data-cy="signup termsCondition"
                />
                <label
                  id="signUpTerms"
                  className="form-check-label"
                  htmlFor="signUpTermskjhk"
                  onClick={() => settermsCondition(!termsCondition)}
                >
                  I accept all terms and condition
                </label>
              </div>

              <input
                type="submit"
                data-cy="signup button"
                value="Sign Up"
                disabled={!termsCondition}
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
