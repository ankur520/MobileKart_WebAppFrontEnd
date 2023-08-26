import React from "react";
import { backendApis } from "../../Utils/APIS";
import jwtDecode from "jwt-decode";
import ReactLoading from "react-loading";
import { useEffect, useState } from "react";
import axios from "axios";

const UserDashboardHome = (props) => {
  const [vendorCounting, setvendorCounting] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  const fetchFromDb = async () => {
    // console.log("------fetchFromDb------")
    setisLoading(true);

    if (localStorage.getItem("vendorLoginToken")) {
      let decode = jwtDecode(localStorage.getItem("vendorLoginToken"));

      let sessionUrl =
        backendApis.vendorApi.getAllVendorCountings + decode["fetchedId"] + "/";

      await axios
        .get(sessionUrl)

        .then(function (response) {
          if (response.data.status === 200) {
            // console.log( response.data )

            setvendorCounting(response.data.getCountingData);
            setisLoading(false);
          }
        });
    }
  };

  useEffect(() => {
    fetchFromDb();
  }, []);

  // console.log( props )
  return (
    <>
      <div className="col-xl-12 col-lg-12">
        <div className="row">
          <div className="col-sm-4">
            <div className="card widget-flat">
              <div className="card-body">
                <h6 className="mt-1"> {props.vendorId} </h6>
                <h6 className="mt-1"> {props.vendorFullName} </h6>
                <h6 className="mt-1"> {props.vendorEmail} </h6>
              </div>
            </div>
          </div>

          <div className="col-sm-4">
            <div className="card widget-flat">
              <div className="card-body">
                <div className="float-end">
                  <i className="mdi mdi-cart-plus widget-icon"></i>
                </div>
                <h5
                  className="text-muted fw-normal mt-0"
                  title="Number of Orders"
                >
                  Total Categories
                </h5>
                <h3 className="mt-3 mb-3"> {vendorCounting.countCategory} </h3>
              </div>
            </div>
          </div>

          <div className="col-sm-4">
            <div className="card widget-flat">
              <div className="card-body">
                <div className="float-end">
                  <i className="mdi mdi-cart-plus widget-icon"></i>
                </div>
                <h5
                  className="text-muted fw-normal mt-0"
                  title="Number of Orders"
                >
                  Total Sub Category
                </h5>
                <h3 className="mt-3 mb-3">
                  {" "}
                  {vendorCounting.countSubCategory}{" "}
                </h3>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-sm-4">
            <div className="card widget-flat">
              <div className="card-body">
                <div className="float-end">
                  <i className="mdi mdi-cart-plus widget-icon"></i>
                </div>
                <h5
                  className="text-muted fw-normal mt-0"
                  title="Number of Orders"
                >
                  Total Products
                </h5>
                <h3 className="mt-3 mb-3">
                  {" "}
                  {vendorCounting.countTotalProducts}{" "}
                </h3>
              </div>
            </div>
          </div>

          <div className="col-sm-4">
            <div className="card widget-flat">
              <div className="card-body">
                <div className="float-end">
                  <i className="mdi mdi-account-multiple widget-icon"></i>
                </div>
                <h5
                  className="text-muted fw-normal mt-0"
                  title="Number of Customers"
                >
                  Featured Products
                </h5>
                <h3 className="mt-3 mb-3">
                  {" "}
                  {vendorCounting.countFeaturedProducts}{" "}
                </h3>
              </div>
            </div>
          </div>

          <div className="col-sm-4">
            <div className="card widget-flat">
              <div className="card-body">
                <div className="float-end">
                  <i className="mdi mdi-cart-plus widget-icon"></i>
                </div>
                <h5
                  className="text-muted fw-normal mt-0"
                  title="Number of Orders"
                >
                  Recycle Bin
                </h5>
                <h3 className="mt-3 mb-3">
                  {" "}
                  {vendorCounting.countRecycleBinProducts}{" "}
                </h3>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-sm-4">
            <div className="card widget-flat">
              <div className="card-body">
                <div className="float-end">
                  <i className="mdi mdi-account-multiple widget-icon"></i>
                </div>
                <h6
                  className="text-muted fw-normal mt-0"
                  title="Number of Customers"
                >
                  Products Less than 10 qty
                </h6>
                <h3 className="mt-3 mb-3">
                  {" "}
                  {vendorCounting.countTotalUnitsProducts}{" "}
                </h3>
              </div>
            </div>
          </div>

          <div className="col-sm-4">
            <div className="card widget-flat">
              <div className="card-body">
                <div className="float-end">
                  <i className="mdi mdi-cart-plus widget-icon"></i>
                </div>
                <h5
                  className="text-muted fw-normal mt-0"
                  title="Number of Orders"
                >
                  Total Placed Orders
                </h5>
                <h3 className="mt-3 mb-3">
                  {" "}
                  {vendorCounting.countPlacedOrders}
                </h3>
              </div>
            </div>
          </div>

          <div className="col-sm-4">
            <div className="card widget-flat">
              <div className="card-body">
                <div className="float-end">
                  <i className="mdi mdi-cart-plus widget-icon"></i>
                </div>
                <h5
                  className="text-muted fw-normal mt-0"
                  title="Number of Orders"
                >
                  Total Earnings
                </h5>
                <h3 className="mt-3 mb-3">
                  {" "}
                  &#8377; {vendorCounting.earningInCommas}{" "}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 
      <div className="container  mb-5" data-cy="vendorDashboard" >


    

      </div> */}
    </>
  );
};

export default UserDashboardHome;
