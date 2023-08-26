import axios from "axios";
import React from "react";
import { BsFillImageFill, BsFillStarFill, BsStar } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

import { BrowserRouter } from "react-router-dom";
import { backendApis } from "../../Utils/APIS";
import ReactLoading from "react-loading";
// getCartData
const AllProducts = (props) => {
  // <BrowserRouter>
  const navigation = useNavigate();

  const [isLoading, setisLoading] = useState(false);

  const [placedOrderList, setplacedOrderList] = useState([]);
  const [placedCartData, setplacedCartData] = useState([]);

  const fetchFromDb = async () => {
    setisLoading(true);

    if (localStorage.getItem("userLoginToken")) {
      let decoded = jwtDecode(localStorage.getItem("userLoginToken"));

      let sessionUrl =
        backendApis.userApi.placeOrder + `${decoded["fetchedId"]}/`;

      // console.log(sessionUrl);

      await axios
        .get(sessionUrl)

        .then(
          await function (response) {
            // console.log(response.data.getPlacedOrdersList)
            if (response.data.status === 200) {
              // setplacedOrderList(response.data.getPlacedOrdersList);
              setplacedCartData(response.data.getCartData);
              setisLoading(false);
            }
          }
        );
    }
  };

  useEffect(() => {
    // console.log("--UseEffect---");

    fetchFromDb();
  }, []);

  return (
    <>
      <div
        id="allproduct placedOrdersList "
        data-cy="placedOrdersList"
        className="py-2"
      >
        <span data-cy="isLoading">
          {isLoading ? (
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

        {placedCartData.map((data, index) => {
          // console.log(data)
          return (
            <div
              style={{
                border: "1px solid #ddd",
                borderRadius: "5px",
                marginBottom: "10px",
              }}
              key={index}
            >
              <div
                className="d-flex flex-row justify-content-start py-2 px-2"
                style={{ backgroundColor: "#f0f2f2" }}
                id="placedOrdersListHeader"
              >
                <div className="d-flex flex-column justify-content-start pe-3">
                  <p
                    style={{
                      color: "#565959",
                      textTransform: "uppercase",
                      fontWeight: "600",
                      fontSize: "10px",
                    }}
                  >
                    Order Placed
                  </p>
                  <p
                    style={{
                      color: "#565959",
                      fontWeight: "600",
                      fontSize: "13px",
                      marginTop: "-15px",
                    }}
                  >
                    {" "}
                    {data[0].placeOrderId.date}{" "}
                  </p>
                </div>

                <div className="d-flex flex-column justify-content-start pe-3 ">
                  <p
                    style={{
                      color: "#565959",
                      textTransform: "uppercase",
                      fontWeight: "600",
                      fontSize: "10px",
                    }}
                  >
                    Cart Total
                  </p>
                  <p
                    style={{
                      color: "#565959",
                      fontWeight: "600",
                      fontSize: "13px",
                      marginTop: "-15px",
                    }}
                  >
                    {" "}
                    <span>₹</span> {data[0].placeOrderId.cartAmount}{" "}
                  </p>
                </div>

                <div className="d-flex flex-column justify-content-start pe-3 ">
                  <p
                    style={{
                      color: "#565959",
                      textTransform: "uppercase",
                      fontWeight: "600",
                      fontSize: "10px",
                    }}
                  >
                    Payment
                  </p>
                  <p
                    style={{
                      color: "#565959",
                      fontWeight: "600",
                      fontSize: "13px",
                      marginTop: "-15px",
                    }}
                  >
                    {" "}
                    {data[0].placeOrderId.paymentMode}{" "}
                  </p>
                </div>

                <div className="d-flex flex-column justify-content-start pe-3 ">
                  <p
                    style={{
                      color: "#565959",
                      textTransform: "uppercase",
                      fontWeight: "600",
                      fontSize: "10px",
                    }}
                  >
                    Ship TO
                  </p>
                  <p
                    className="d-none d-sm-block"
                    style={{
                      color: "#565959",
                      fontWeight: "600",
                      fontSize: "13px",
                      marginTop: "-15px",
                    }}
                  >
                    {" "}
                    {data[0].placeOrderId.addressId.fullAddress}{" "}
                    {data[0].placeOrderId.addressId.city}{" "}
                    {data[0].placeOrderId.addressId.state}{" "}
                  </p>
                </div>
              </div>

              {/* NESTED DATA under placed Order Cart items  */}

              <div className="d-flex flex-column justify-content-start py-0 ">
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">S.No</th>
                        <th scope="col">
                          <BsFillImageFill />
                        </th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Categories</th>
                        <th scope="col"> Qty </th>
                      </tr>
                    </thead>

                    <tbody>
                      {data.map((nestedData, index) => {
                        console.log(nestedData);

                        {
                          return (
                            <tr key={index}>
                              <td>
                                <p className="productName"> {index + 1} </p>
                              </td>

                              <td scope="row">
                                <div className="productImage">
                                  <Link
                                    to={`/productdetail/${nestedData.productId.CategoryId.cat_name}/${nestedData.productId.subCategoryId.sub_cat_name}/${nestedData.productId.id}/${nestedData.productId.name}/`}
                                  >
                                    <img
                                      src={nestedData.productId.image1}
                                      style={{ width: "50px", height: "50px" }}
                                    />
                                  </Link>
                                </div>
                              </td>

                              <td>
                                <p className="productName">
                                  <Link
                                    to={`/productdetail/${nestedData.productId.CategoryId.cat_name}/${nestedData.productId.subCategoryId.sub_cat_name}/${nestedData.productId.id}/${nestedData.productId.name}/`}
                                  >
                                    {nestedData.productId.name.substring(
                                      0,
                                      30
                                    ) + "..."}
                                  </Link>
                                </p>
                              </td>

                              {/* (e) => deleteTheProduct(e, props.vendorId, nestedData.id) */}
                              <td className="stock">
                                {" "}
                                <p>
                                  <span>₹</span>{" "}
                                  {nestedData.productId.mrp -
                                    parseInt(
                                      (nestedData.productId.mrp *
                                        nestedData.productId.discountPercent) /
                                        100
                                    )}{" "}
                                </p>{" "}
                              </td>
                              <td className="category">
                                {" "}
                                {nestedData.productId.CategoryId.cat_name}{" "}
                                {
                                  nestedData.productId.subCategoryId
                                    .sub_cat_name
                                }{" "}
                              </td>

                              <td className="category"> {nestedData.qty}</td>
                            </tr>
                          );
                        }
                      })}
                    </tbody>
                  </table>
                </div>

                {/* {data.map((nestedData, index) => {
                  // console.log("nestedData -", nestedData);

                  return (
                    <div key={index} className="d-flex flex-row justify-content-start mb-3"  style={{ borderBottom: "1px solid #ddd" , padding: "10px" }}  >
                      <Link  className="pe-5"  >
                        <img
                          src={nestedData.productId.image1}
                          alt=""
                          className="img-fluid"
                          style={{ width: 50, height: 50 }}
                        />
                      </Link>

                      <Link className="pe-5" >
                        <p> {nestedData.productId.name} </p>
                      </Link>

                      <p className="pe-5" > {nestedData.productId.mrp} </p>

                      <p className="pe-5" > {nestedData.productId.subCategoryId.catId.cat_name  } {" "} {nestedData.productId.subCategoryId.sub_cat_name  } </p>
                    </div>
                  );
                })} */}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AllProducts;
