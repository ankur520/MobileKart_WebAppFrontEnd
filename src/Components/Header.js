import React from "react";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { AiFillHeart, AiFillWallet } from "react-icons/ai";
import {
  BsFillPatchQuestionFill,
  BsFillCloudDownloadFill,
} from "react-icons/bs";
import { BiPlusMedical, BiUserCircle } from "react-icons/bi";

// import { Productdetail } from './Pages/Productdetail';
// import Signup from './Pages/Signup';

const Header = () => {
  return (
    <>
      <header>
        <div className="headerr">
          <div className="left-side">
            <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
              <span className="logo"> Mobile Kart </span> <br />{" "}
              <span style={{ color: "black", fontWeight: "700" }}>
                {" "}
                Explore{" "}
                <span style={{ color: "#ffe500", fontWeight: 600 }}>
                  {" "}
                  Plus{" "}
                </span>{" "}
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
                <Link to="/vendorsignup">
                  {" "}
                  <span>
                    {" "}
                    <BiUserCircle />{" "}
                  </span>{" "}
                  Vendor sign{" "}
                </Link>
                <Link to="/vendor/">
                  {" "}
                  <span>
                    {" "}
                    <BiUserCircle />{" "}
                  </span>{" "}
                  Vendor Dashboard{" "}
                </Link>

                <Link to="/signup">
                  {" "}
                  <span>
                    {" "}
                    <BiUserCircle />{" "}
                  </span>{" "}
                  User sign{" "}
                </Link>
                <Link to="/user/">
                  {" "}
                  <span>
                    {" "}
                    <BiUserCircle />{" "}
                  </span>{" "}
                  User Dashboard{" "}
                </Link>

                <Link to="/productall/">
                  {" "}
                  <span>
                    {" "}
                    <BiPlusMedical />{" "}
                  </span>{" "}
                  All Products Page{" "}
                </Link>

                <Link to="#">
                  {" "}
                  <span>
                    {" "}
                    <AiFillHeart />{" "}
                  </span>{" "}
                  Wishlist{" "}
                </Link>
              </div>
            </div>
          </div>

          <div className="right-side">
            <span>Become A Seller</span>

            <span>
              {" "}
              <Link style={{ color: "#fff" }} to="/viewcart">
                {" "}
                Cart{" "}
              </Link>{" "}
            </span>
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
