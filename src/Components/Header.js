import React, { useEffect } from "react";
// import jwtDecode from "jwt-decode";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useState } from "react";

import { AiFillHeart, AiFillWallet } from "react-icons/ai";
import {
  BsFillPatchQuestionFill,
  BsFillCloudDownloadFill,
} from "react-icons/bs";
import { BiPlusMedical, BiUserCircle } from "react-icons/bi";
import { FaShoppingCart } from "react-icons/fa";
import { backendApis } from "../Utils/APIS";
// import { fetchCartLengthByUserId } from "../Utils/functions";
import axios from "axios";

import {
  fetchCartLengthByUserIdFunction,
  demoFunction,
} from "../Utils/functions";

const Header = () => {
  const [cartLength, setcartLength] = useState();

  const fetchCartLengthByUserId = async () => {
    if (localStorage.getItem("userLoginToken")) {
      let decoded = jwtDecode(localStorage.getItem("userLoginToken"));
      let sessionUrl = `${backendApis.userApi.fetch_cart_byUserIdByUserId}${decoded["fetchedId"]}/`;
      await axios
        .get(sessionUrl)

        .then(function (response) {
          if (response.data.status === 200) {
            if (response.data.msg === "Cart data Available") {
              if (response.data.cartFullArray.length > 0) {
                setcartLength(response.data.cartFullArray.length);
              }
            }
          }
        });
    }
  };

  useEffect(() => {
    // console.log("use Effect from APP.js ")

    fetchCartLengthByUserId();
  }, []);
  // console.log(loggedUserInfo);

  return (
    <>
      {/* <BrowserRouter> */}
      <header data-cy="header">
        <div className="headerr">
          <div className="">
            <div className="">
              <div className="left-side">
                <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
                  <span className="logo"> Mobile Kart </span> <br />{" "}
                  <span style={{ color: "black", fontWeight: "700" }}>
                    Explore{" "}
                    <span style={{ color: "#ffe500", fontWeight: 600 }}>
                      Plus
                    </span>
                  </span>
                </Link>
              </div>
            </div>

            <div className="">
              <div className="middle-side">
                <input
                  data-cy="productSearchInput"
                  type="text"
                  title="Products Search Box"
                  placeholder="Search For Product , brands and More"
                />
              </div>
            </div>

            <div className="">
              <div className="middle-side">
                <div className="dropdownBox" data-cy="dropdownBox">
                  <button id="loginBtn" data-cy="loginBtn" title="Login Btn">
                    {!localStorage.getItem("userLoginToken")
                      ? "Login"
                      : "Hello User"}
                  </button>

                  <div className="dropdown-content">
                    {!localStorage.getItem("vendorLoginToken") ? (
                      <Link
                        to="/vendorsignup"
                        data-cy="vendorSign"
                        title="Vendor Signin"
                      >
                        <span>
                          <BiUserCircle />
                        </span>
                        Vendor sign
                      </Link>
                    ) : (
                      <Link
                        to="/vendor/"
                        data-cy="vendorDashboard"
                        title="Vendor Dashboard"
                      >
                        <span>
                          <BiUserCircle />
                        </span>
                        Vendor Dashboard
                      </Link>
                    )}

                    {!localStorage.getItem("userLoginToken") ? (
                      <Link to="/signup" data-cy="userSign" title="User SignIn">
                        <span>
                          <BiUserCircle />
                        </span>
                        User sign
                      </Link>
                    ) : (
                      <Link
                        to="/user/"
                        data-cy="userDashboard"
                        title="User Dashboard"
                      >
                        <span>
                          <BiUserCircle />
                        </span>
                        User Dashboard
                      </Link>
                    )}

                    <Link to="/productall/">
                      <span>
                        <BiPlusMedical />
                      </span>
                      All Products Page
                    </Link>

                    {!localStorage.getItem("userLoginToken") ? (
                      ""
                    ) : (
                      <Link to="/user/wishlist/">
                        <span>
                          <AiFillHeart />
                        </span>
                        Wishlist
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              <div className="right-side">
                {!localStorage.getItem("userLoginToken") ? (
                  <span
                    className="position-relative"
                    title="Please Login"
                    data-cy="cartWithOutLogin"
                  >
                    <Link style={{ color: "#fff", fontSize: "30px" }}>
                      {" "}
                      <FaShoppingCart />{" "}
                    </Link>
                  </span>
                ) : (
                  <span className="position-relative" data-cy="cartWithLogin">
                    <span className="position-absolute top-0  start-100 translate-middle badge rounded-pill bg-dark">
                      {cartLength || ""}
                    </span>
                    <Link
                      style={{ color: "#fff", fontSize: "30px" }}
                      to="/viewcart"
                    >
                      <FaShoppingCart />
                    </Link>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* </BrowserRouter> */}

      <br />
      <br />
      <br />
    </>
  );
};

export default Header;
