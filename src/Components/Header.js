import React, { useEffect } from "react";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

import { AiFillHeart, AiFillWallet } from "react-icons/ai";
import {
  BsFillPatchQuestionFill,
  BsFillCloudDownloadFill,
} from "react-icons/bs";
import { BiPlusMedical, BiUserCircle } from "react-icons/bi";

// import { Productdetail } from './Pages/Productdetail';
// import Signup from './Pages/Signup';

const Header = () => {
  // const navigation = useNavigate();

  const userValidationHtml = "";

  return (
    <>
      <header>
        <div className="headerr">
          <div className="left-side">
            <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
              <span className="logo"> Mobile Kart </span> <br />{" "}
              <span style={{ color: "black", fontWeight: "700" }}>
                Explore
                <span style={{ color: "#ffe500", fontWeight: 600 }}>Plus</span>
              </span>
            </Link>
          </div>

          <div className="middle-side">
            <input
              type="text"
              placeholder="Search For Product , brands and More"
            />

            <div className="dropdownBox">
              <button id="loginBtn">Login</button>

              <div className="dropdown-content">
                {!localStorage.getItem("vendorLoginToken") ? (
                  <Link to="/vendorsignup">
                    <span>
                      <BiUserCircle />
                    </span>
                    Vendor sign
                  </Link>
                ) : (
                  <Link to="/vendor/">
                    <span>
                      <BiUserCircle />
                    </span>
                    Vendor Dashboard
                  </Link>
                )}

                {!localStorage.getItem("userLoginToken") ? (
                  <Link to="/signup">
                    <span>
                      <BiUserCircle />
                    </span>
                    User sign
                  </Link>
                ) : (
                  <Link to="/user/">
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

                <Link to="#">
                  <span>
                    <AiFillHeart />
                  </span>
                  Wishlist
                </Link>
              </div>
            </div>
          </div>

          <div className="right-side">

          {!localStorage.getItem("userLoginToken") ? (

<span className="position-relative" title="Please Login" >

<Link style={{ color: "#fff" }} >
  Cart
</Link>
</span>

                ) : (

                  <span className="position-relative">
                  <span class="position-absolute top-0  start-100 translate-middle badge rounded-pill bg-dark">
                    0
                  </span>
                  <Link style={{ color: "#fff" }} to="/viewcart">
                    Cart
                  </Link>
                  </span>

                )}


        
          </div>
        </div>
      </header>

      <br />
      <br />
      <br />
    </>
  );
};

export default Header;
