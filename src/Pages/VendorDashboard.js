import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Link } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
// vendor  pages link
import AddProduct from "../Components/vendor/AddProduct";
import VendorDashboarddd from "../Components/vendor/VendorDashboard";
import AllProducts from "../Components/vendor/AllProducts";
import AddTax from "../Components/vendor/AddTax";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

// custon vendor CSS
import "../CSS/VendorDashboard.css";
// icons
import { AiFillHome } from "react-icons/ai";
import { AiOutlineLink } from "react-icons/ai";
import { FaRupeeSign, FaPercentage } from "react-icons/fa";
import { BiLinkAlt } from "react-icons/bi";
import ProductEdit from "../Components/vendor/ProductEdit";
import RecycleBin from "../Components/vendor/Recycle-Bin";

import PlacedOrdersList from "../Components/vendor/PlacedOrdersList";

const VendorDashboard = () => {
  let fetchedId, fetchedEmail, fetchedIsLogged, fetchedName;
  const [vendorFullName, setfullName] = useState("");
  const [vendorEmail, setvendorEmail] = useState("");
  const [vendorId, setvendorId] = useState("");
  const [isVendorLogged, setisVendorLogged] = useState(false);
  const navigation = useNavigate();
  let location = useLocation();

  let vendorToken = localStorage.getItem("vendorLoginToken");

  // if (!isVendorLogged) {
  //   console.log("fuck of ")
  //   navigation("/")
  // } else {
  //   console.log("Welcome  of ")
  // }

  const fetchTokenFromLocal = () => {
    // token not available go back
    if (!localStorage.getItem("vendorLoginToken")) {
      console.log("vendor token is null go back ");
      navigation("/");

      // setisVendorLogged(false);
    } else {
      console.log("Welcome Vendor token Exist ");
      let decoded = jwtDecode(vendorToken);
      // console.log("toeken is " , decoded )

      fetchedId = decoded["fetchedId"];
      fetchedEmail = decoded["fetchedEmail"];
      fetchedName = decoded["fetchedName"];

      setfullName(fetchedName);
      setvendorEmail(fetchedEmail);
      setvendorId(fetchedId);
    }
  };

  const logOutbtnOnClick = () => {
    // console.log("logOutbtnOnClick");

    localStorage.removeItem("vendorLoginToken");

    setfullName(" ");
    setvendorEmail(" ");
    setvendorId(" ");

    window.location.reload("/");
  };

  useEffect(() => {
    // console.log("use Effect in vendor Dashboard");

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
    setFeaturedProductById:
      "http://localhost:8000/vendorApi/set-featuredProduct-byId/",
    updateProduct: "http://localhost:8000/vendorApi/update-productdetail-byId/",
    deleteProduct: "http://localhost:8000/vendorApi/delete-product-byId/",
    duplicateProduct: "http://localhost:8000/vendorApi/duplicate-product-byId/",
    permanentDeleteProduct:
      "http://localhost:8000/vendorApi/permanent-delete-product-byId/",
  };

  return (
    <>
      <div className="vendor"  data-cy='vendorDashboardJunction' >
        <div className="topSide d-flex justify-content-between align-items-center">
          <div className="left  ">
            <h3>
              {" "}
              <Link to="/" style={{ fontSize: "20px" }}>
                Mobile Kart
              </Link>{" "}
            </h3>
          </div>

          <div className="right d-flex flex-row justify-content-end align-self-center">
            <Link to="#"> TOP </Link>
            <Link to="#"> Home 1 </Link>
            <Link to="#"> Home 2 </Link>
            <Link to="#"> Home 3 </Link>
            <Link to="#"> Home 4</Link>

            <div className="dropDown">
              <Link to="#" className="dropbtn">
                {" "}
                Profile{" "}
              </Link>

              <div className="dropDownContent">
                <Link to="#">
                  {" "}
                  <span>
                    {" "}
                    <AiFillHome />{" "}
                  </span>{" "}
                  DROP 1{" "}
                </Link>
                <Link to="#">
                  {" "}
                  <span>
                    {" "}
                    <AiFillHome />{" "}
                  </span>{" "}
                  DROP 2{" "}
                </Link>
                <Link to="#">
                  {" "}
                  <span>
                    {" "}
                    <AiFillHome />{" "}
                  </span>{" "}
                  DROP 3{" "}
                </Link>
                <Link to="#">
                  {" "}
                  <span>
                    {" "}
                    <AiFillHome />{" "}
                  </span>{" "}
                  DROP 4
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="topSide d-flex flex-row justify-content-end align-self-center">
          <Link to="#"> TOP </Link>
          <Link to="#"> Home 1 </Link>
          <Link to="#"> Home 2 </Link>
          <Link to="#"> Home 3 </Link>
          <Link to="#"> Home 4</Link>
          <Link to="#"> Home </Link>
        </div> */}

        <div className="belowSide">
          <div className="leftSide d-flex flex-column justify-content-start align-items-stretch">
            <Link to="/vendor/" title="Home">
              <span>
                <AiFillHome />
              </span>
              home
            </Link>
            <Link to="/vendor/allproducts/" title="Products List">
              <span>
                <AiFillHome />
              </span>
              products list
            </Link>

            <Link to="/vendor/allplacedorders/" title="Products List">
              <span>
                <AiFillHome />
              </span>
              Placed Orders List
            </Link>

            <Link to="/vendor/addproduct/" title="Add Product">
              <span>
                <AiFillHome />
              </span>
              add product
            </Link>

            <Link to="/vendor/addtax/" title="Add Tax & Shipping">
              <span>
                <AiFillHome />
              </span>
              add tax & shipping
            </Link>

            <Link to="/vendor/recyclebin/" title="Logout">
              <span>
                <AiFillHome />
              </span>
              Recycle Bin
            </Link>

            <Link to="#" onClick={logOutbtnOnClick} title="Logout" data-cy='vendorDashboardLogoutBtn' >
              <span>
                <AiFillHome />
              </span>
              logout
            </Link>
          </div>

          <div className="rightSide">
            <p
              style={{
                backgroundColor: "black",
                padding: "10px 20px",
                width: "fit-content",
                color: "#fff",
              }}
            >
              {" "}
              {location.pathname.toUpperCase()}
            </p>

            <section>
              <Routes>
                {/* we are routing all the pages after /vendor/subdomains */}

                <Route
                  path="/"
                  element={
                    <VendorDashboarddd
                      vendorFullName={vendorFullName}
                      vendorEmail={vendorEmail}
                      vendorId={vendorId}
                    />
                  }
                >
                  {" "}
                </Route>

                <Route
                  path="/addproduct"
                  element={
                    <AddProduct
                      APIS={djangoVendorAPi}
                      vendorFullName={vendorFullName}
                      vendorEmail={vendorEmail}
                      vendorId={vendorId}
                    />
                  }
                ></Route>

                <Route
                  path="/allproducts"
                  element={
                    <AllProducts
                      vendorFullName={vendorFullName}
                      vendorEmail={vendorEmail}
                      vendorId={vendorId}
                      APIS={djangoVendorAPi}
                    />
                  }
                ></Route>

                <Route
                  path="/addtax"
                  element={<AddTax APIS={djangoVendorAPi} />}
                >
                  {" "}
                </Route>

                <Route
                  path="/edit/*"
                  element={
                    <ProductEdit
                      vendorFullName={vendorFullName}
                      vendorEmail={vendorEmail}
                      vendorId={vendorId}
                      APIS={djangoVendorAPi}
                    />
                  }
                ></Route>

                <Route
                  path="/recyclebin/"
                  element={
                    <RecycleBin
                      vendorFullName={vendorFullName}
                      vendorEmail={vendorEmail}
                      vendorId={vendorId}
                      APIS={djangoVendorAPi}
                    />
                  }
                ></Route>

                <Route
                  path="/allplacedorders/"
                  element={
                    <PlacedOrdersList
                      vendorFullName={vendorFullName}
                      vendorEmail={vendorEmail}
                      vendorId={vendorId}
                      APIS={djangoVendorAPi}
                    />
                  }
                ></Route>
              </Routes>

              {
                // (() => {
                // here we we doing on conditional basis
                //   if (location.pathname === "/vendor/addproduct/") {
                //     return <AddProduct APIS={djangoVendorAPi} /> ;
                //   } else if (location.pathname === "/vendor/allproducts/") {
                //     return <AllProducts APIS={djangoVendorAPi} />;
                //   } else if (location.pathname === "/vendor/addtax/") {
                //     return <AddTax APIS={djangoVendorAPi} />;
                //   } else if (location.pathname === "/vendor/product/edit/") {
                //     return  <ProductEdit /> ;
                //   }
                //   else {
                //     return (
                //       <VendorDashboarddd
                //         vendorFullName={vendorFullName}
                //         vendorEmail={vendorEmail}
                //         vendorId={vendorId}
                //       />
                //     );
                //   }
                // })()
              }
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default VendorDashboard;
