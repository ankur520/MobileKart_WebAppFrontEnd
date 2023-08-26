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
import AddAddress from "../Components/user/AddAddress";
import ViewAllAddress from "../Components/user/ViewAllAddress";
import WishList from "../Components/user/Wishlish";
import { backendApis } from "../Utils/APIS";

const UserDashboard = () => {
  // console.log("userDashboard- " , backendApis)

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

  return (
    <>
      <Header />

      <div className="dashboard" data-cy="userDashboardJunction">
        <div className="row ">
          <div className=" col-lg-3 mt-5 leftMenu">
            <Link to="/user"> Home </Link>
            <Link to="/user/wishlist/"> WishList </Link>
            <Link to="/user/placedorder/"> Placed Orders </Link>
            <Link to="/user/addAddress/"> Add Address </Link>
            <Link to="/user/viewAllAddress/"> View All Address </Link>
            <Link to="/viewcart"> Cart Page </Link>

            <Link onClick={logOutbtnOnClick} data-cy="userDashboardLogoutBtn">
              {" "}
              Logout{" "}
            </Link>
          </div>

          <div className=" col-lg-9 mt-5 rightSec">
            {(() => {
              if (location.pathname === "/user/placedorder/") {
                return (
                  <PlacedOrdersPage
                    userFname={userFname}
                    userLname={userLname}
                    userEmail={userEmail}
                    userId={userId}
                  />
                );
              } else if (location.pathname === "/user/addAddress/") {
                return (
                  <AddAddress
                    userFname={userFname}
                    userLname={userLname}
                    userEmail={userEmail}
                    userId={userId}
                  />
                );
              } else if (location.pathname === "/user/viewAllAddress/") {
                return (
                  <ViewAllAddress
                    userFname={userFname}
                    userLname={userLname}
                    userEmail={userEmail}
                    userId={userId}
                  />
                );
              } else if (location.pathname === "/user/wishlist/") {
                return (
                  <WishList
                    userFname={userFname}
                    userLname={userLname}
                    userEmail={userEmail}
                    userId={userId}
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
