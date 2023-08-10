import React, { useState, useEffect } from "react";
import Header from "../Components/Header";

import Footer from "../Components/Footer";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // token not available go back
    if (localStorage.getItem("userLoginToken")) {
      // console.log("userLoginToken is null go back ")
      navigate("/user");
    }
  }, []);

  const djangoUserAPi = {
    home: "http://localhost:8000/userApi/",
    signup: "http://localhost:8000/userApi/signup",
    login: "http://localhost:8000/userApi/userLogin/",
  };

  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

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

  const handleSignupSubmit = (e) => {
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

    axios
      .post(djangoUserAPi.signup, { firstName, LastName, Eemail, Ppassword })

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

  const handleLoginOnSubmit = (e) => {
    e.preventDefault();

    // console.log("loginEmail")
    // console.log(loginEmail)
    // console.log(loginPassword)

    let loginEmailId = loginEmail;
    let loginPasswords = loginPassword;

    axios
      .post(djangoUserAPi.login, {
        loginEmailId,
        loginPasswords,
      })

      .then(function (response) {
        if (response.data.status === 200) {
          // console.log("VendorLoggedIn")

          // console.log( response.data.msg )

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

      .then(function (error) {
        // console.log( error)
      });
  };

  return (
    <>
      <Header />

      <div style={{ backgroundColor: "#f1f3f6" }}>
        <h2 className="text-center pt-4 pb-2 text-bold">
          {" "}
          USER signup signin{" "}
        </h2>

        <div className="container row">
          <div className="col-sm-1"></div>

          <div
            className="col-sm-5 py-5 px-5  "
            style={{ backgroundColor: "#fff", margin: "0 50px 0 0" }}
          >
            <form method="POST" onSubmit={handleLoginOnSubmit}>
              <h1 className="text-center mt-3">Login </h1>
              <div className="form-floating mt-5 mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  name="loginEmail"
                  onChange={inputOnChng}
                />
                <label htmlFor="floatingInput">Email address</label>
              </div>
              <div className="form-floating">
                <input
                  type="password"
                  className="form-control"
                  id="loginfloatingPassword"
                  placeholder="Password"
                  name="loginPassword"
                  onChange={inputOnChng}
                />

                <label htmlFor="loginfloatingPassword">Password</label>
              </div>
              <input
                type="submit"
                value="Login "
                className="w-100 btn btn-primary btn-lg px-5 mt-3 mb-5"
              />
            </form>
          </div>

          <div
            className="col-sm-5 py-5 px-5 "
            style={{ backgroundColor: "#fff" }}
          >
            <h1 className="text-center mt-2">Sign Up </h1>

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
                />
                <label htmlFor="floatingLname">Last Name </label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingEmail"
                  placeholder="Your Email"
                  name="email"
                  value={email}
                  onChange={inputOnChng}
                  required
                />
                <label htmlFor="floatingEmail">Your address</label>
              </div>

              <div className="form-floating">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={inputOnChng}
                  required
                />
                <label htmlFor="floatingPassword">Password</label>
              </div>
              <input
                type="submit"
                value="Sign Up "
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
