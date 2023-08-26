import axios from "axios";
import React from "react";
import { BsFillImageFill, BsFillStarFill, BsStar } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { backendApis } from "../../Utils/APIS";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import ReactLoading from "react-loading";

const AllProducts = (props) => {
  // console.log(props)

  const navigation = useNavigate();

  const [placedOrderList, setplacedOrderList] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  const fetchFromDb = async () => {
    // console.log("------fetchFromDb------")
    setisLoading(true);

    if (localStorage.getItem("vendorLoginToken")) {
      let decode = jwtDecode(localStorage.getItem("vendorLoginToken"));

      let sessionUrl =
        backendApis.vendorApi.getPlacedOrders + decode["fetchedId"] + "/";

      await axios
        .get(sessionUrl)

        .then(function (response) {
          // console.log(response.data)
          if (response.data.status === 200) {
            // console.log("addProductGETRequest")
            // console.log( response.data.getPlacedOrdersList )
            setplacedOrderList(response.data.data);
            setisLoading(false);
          }
        });
    }
  };

  useEffect(() => {
    // console.log("--UseEffect---");

    fetchFromDb();
  }, []);

  return (
    <>
      <div id="allproduct">
        <span data-cy="isLoading">
          {isLoading ? (
            <ReactLoading
              type="spinningBubbles"
              color="#2874f0"
              height={50}
              width={50}
            />
          ) : (
            ""
          )}
        </span>

        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">S.No</th>
                <th scope="col">
                  <BsFillImageFill />
                </th>
                <th scope="col">Product Name</th>

                <th scope="col">Total Cart Amount</th>
                <th scope="col">Payment</th>
                <th scope="col"> Delivery Address </th>
                <th scope="col"> Vendor Details </th>
                <th scope="col"> Date </th>
              </tr>
            </thead>

            <tbody>
              {placedOrderList.map((data, index) => {
                // console.log(data.recycleBin)

                {
                  return (
                    <tr key={data.id}>
                      <td>
                        <p className="productName"> {index + 1} </p>
                      </td>

                      <td scope="row">
                        <div className="productImage">
                          <Link
                            to={`/productdetail/${data.productId.CategoryId.cat_name}/${data.productId.subCategoryId.sub_cat_name}/${data.productId.id}/${data.productId.name}/`}
                          >
                            <img
                              src={data.productId.image1}
                              style={{ width: "50px", height: "50px" }}
                            />
                          </Link>
                        </div>
                      </td>

                      <td>
                        <p className="productName">
                          <Link
                            to={`/productdetail/${data.productId.CategoryId.cat_name}/${data.productId.subCategoryId.sub_cat_name}/${data.productId.id}/${data.productId.name}/`}
                          >
                            {data.productId.name.substring(0, 20) + "..."}
                          </Link>
                        </p>
                      </td>

                      <td className="category">
                        {data.placeOrderId.cartAmount}
                      </td>

                      <td className="category">
                        {data.placeOrderId.paymentMode}
                      </td>

                      <td className="category">
                        {data.placeOrderId.addressId.city}{" "}
                        {data.placeOrderId.addressId.state}
                      </td>

                      <td className="category">
                        {" "}
                        {data.productId.venId.ven_email}{" "}
                      </td>

                      <td className="category"> {data.productId.date}</td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AllProducts;
