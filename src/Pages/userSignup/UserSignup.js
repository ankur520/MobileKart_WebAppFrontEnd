import React, { useState, useEffect } from "react";
import Header from "../../Components/Header";
import axios from "axios";
import Footer from "../../Components/Footer";

import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { backendApis } from "../../Utils/APIS";

const Signup = () => {
  // console.log(backendApis.userApi.login )

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

    // console.log("handle submit ");

    // console.log(fname ,lname , email , password)

    // console.log( djangoUserAPi.signup  )

    // var session_url = "http://localhost:8000/userApi/signup";

    let firstName = fname;
    let LastName = lname;
    let Eemail = email;
    let Ppassword = password;

    // console.log(djangoUserAPi.signup )

    // ------------------------

    await axios
      .post(backendApis.userApi.signup, {
        firstName,
        LastName,
        Eemail,
        Ppassword,
      })

      .then(function (response) {
        // console.log(response);
        // console.log(response.data);

        if (response.data.msg === "userSignUpSuccessfull") {
          setfname("");
          setlname("");
          setemail("");
          setpassword("");

          alert(response.data.msg);

          // window.location.replace("/signup")
        } else {
          // alert("Line no 63 - Wrong msg")
          alert(response.data.msg);
        }
      })
      .catch(function (error) {
        // console.log("axios error", error  );
      });
  };

  const handleLoginOnSubmit = async (e) => {
    e.preventDefault();

    // console.log("loginEmail")
    // console.log(loginEmail)
    // console.log(loginPassword)

    let loginEmailId = loginEmail;
    let loginPasswords = loginPassword;

    await axios
      .post(backendApis.userApi.login, {
        loginEmailId,
        loginPasswords,
      })

      .then(function (response) {
        if (response.data.status === 200) {
          if (response.data.msg == "UserLoggedIn") {
            alert("UserLoggedIn");

            var decoded = jwtDecode(response.data.token);
            // console.log("jwtDecode is " , decoded )

            localStorage.setItem("userLoginToken", response.data.token);

            window.location.replace("/user");
            // navigation("/user")
          }

          // setloggedInfo(response.data.fetchDetails)
          // window.location.replace("/vendor")
        } else {
          alert(response.data.msg);
        }
      })

      .then(function (error) {});
  };

  return (
    <>
      <Header />

      <div style={{ backgroundColor: "#f1f3f6" }} data-cy="userSignInSignUp">
        <h2 className="text-center pt-4 pb-2 text-bold text-capitalize">
          {" "}
          {/* user signup signin{" "} */}
        </h2>

        <div className="container row">
          <div className="col-sm-1"></div>

          <div
            className="col-sm-5 py-5 px-5  "
            style={{ backgroundColor: "#fff", margin: "0 50px 0 0" }}
          >
            <form method="POST" onSubmit={handleLoginOnSubmit}>
              <h1 className="text-center mt-3">User Login </h1>
              <div className="form-floating mt-5 mb-3">
                <input
                  data-cy="login Email"
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Email address"
                  name="loginEmail"
                  onChange={inputOnChng}
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
                />

                <label htmlFor="loginfloatingPassword">Password</label>
              </div>
              <div class="form-group form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="signUpTerms"
                  checked={loginTermsCondition}
                  data-cy="signup termsCondition"
                />
                <label
                  id="loginTerms"
                  className="form-check-label"
                  for="signUpTerms"
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
            className="col-sm-5 py-5 px-5 "
            style={{ backgroundColor: "#fff" }}
          >
            <h1 className="text-center mt-2">User Sign Up </h1>

            <form method="post" onSubmit={handleSignupSubmit}>
              <div className="form-floating mb-3 mt-5">
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
              <div class="form-group form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="signUpTerms"
                  checked={termsCondition}
                  data-cy="signup termsCondition"
                />
                <label
                  id="signUpTerms"
                  className="form-check-label"
                  for="signUpTerms"
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

          <div className="col-sm-1"></div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Signup;
