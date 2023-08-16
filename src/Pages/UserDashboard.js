import React, { useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

import UserDashboarddd from "../Components/user/UserDashboard";
import PlacedOrdersPage from "../Components/user/PlacedOrdersList";

import { useNavigate } from "react-router-dom";

import jwtDecode from "jwt-decode";

const UserDashboard = () => {
  const [userFname, setuserFname] = useState(" ");
  const [userLname, setuserLname] = useState(" ");
  const [userEmail, setuserEmail] = useState(" ");
  const [userId, setuserId] = useState(" ");

  const [isVendorLogged, setisVendorLogged] = useState(false);
  const navigation = useNavigate();
  let location = useLocation();

  let vendorToken = localStorage.getItem("userLoginToken");

  // if (!isVendorLogged) {
  //   console.log("fuck of ")
  //   navigation("/")
  // } else {
  //   console.log("Welcome  of ")
  // }

  const fetchTokenFromLocal = () => {
    // token not available go back
    if (!localStorage.getItem("userLoginToken")) {
      // console.log("userLoginToken is null go back ")
      navigation("/");

      setisVendorLogged(false);
    } else {
      let decoded = jwtDecode(vendorToken);
      // console.log("toeken is " , decoded )

      let fetchedId, fetchedEmail, fetchedFName, fetchedLName;

      fetchedId = decoded["fetchedId"];
      fetchedEmail = decoded["fetchedEmail"];
      fetchedFName = decoded["fetchedFName"];
      fetchedLName = decoded["fetchedLName"];

      setuserId(fetchedId);
      setuserFname(fetchedFName);
      setuserLname(fetchedLName);
      setuserEmail(fetchedEmail);
    }
  };

  const logOutbtnOnClick = () => {
    // console.log("logOutbtnOnClick")

    // const fata = localStorage.getItem("vendorLoginToken")
    localStorage.removeItem("userLoginToken");
    // setisVendorLogged(false)

    setuserFname(" ");
    setuserLname(" ");
    setuserEmail(" ");
    setuserId(" ");

    window.location.reload("/");
  };

  useEffect(() => {
    // console.log("use Effect in User Dashboard")

    fetchTokenFromLocal();
  }, []);

  const djangoVendorAPi = {
    addCategory: "http://localhost:8000/vendorApi/addcategory",
    subCategory: "http://localhost:8000/vendorApi/add-sub-category",
    addTaxes: "http://localhost:8000/vendorApi/add-tax",
    addShipping: "http://localhost:8000/vendorApi/add-shipping",
    getSubCatByCat: "http://localhost:8000/vendorApi/get-subcat-bycategory/",
    signup: "http://localhost:8000/vendorApi/signup",
    addProduct: "http://localhost:8000/vendorApi/addproduct",
  };

  return (
    <>
      <Header />

      <div className="dashboard" data-cy="userDashboardJunction" >
        <div className="row ">
          <div className="col-lg-3 mt-5 leftMenu">
            <Link to="/user"> Home </Link>
            <Link to="/user/placedorder/"> Placed Orders </Link>
            <Link to="/viewcart"> Cart Page </Link>

            <Link> Wish List </Link>
            <Link> Orders </Link>
            <Link onClick={logOutbtnOnClick} data-cy="userDashboardLogoutBtn" > Logout </Link>
          </div>

          <div className="col-lg-9 mt-5 rightSec">
            {(() => {
              if (location.pathname === "/user/placedorder/") {
                return (
                  <PlacedOrdersPage
                    userFname={userFname}
                    userLname={userLname}
                    userEmail={userEmail}
                    userId={userId}
                    APIS={djangoVendorAPi}
                  />
                );
              } else {
                return (
                  <UserDashboarddd
                    userFname={userFname}
                    userLname={userLname}
                    userEmail={userEmail}
                    userId={userId}
                  />
                );
              }
            })()}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default UserDashboard;
