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

const WishList = (props) => {
  // <BrowserRouter>
  const navigation = useNavigate();
  {
    /* </BrowserRouter> */
  }

  const [isLoading, setisLoading] = useState(false);
  const [userWishList, setuserWishList] = useState([]);

  const fetchWishlistForLoggedInUser = async () => {
    setisLoading(true);

    if (localStorage.getItem("userLoginToken")) {
      let decoded = jwtDecode(localStorage.getItem("userLoginToken"));

      let sessionUrl =
        backendApis.userApi.wishlist + `${decoded["fetchedId"]}/Null/`;
      // console.log( sessionUrl )
      await axios
        .get(sessionUrl)

        .then(
          await function (response) {
            if (response.data.msg === "wishlistGET") {
              if (response.data.wishlistData.length > 0) {
                setuserWishList(response.data.wishlistData);
                setisLoading(false);
              }
              setisLoading(false);
            }
          }
        );
    }
  };

  const removeFromWishList = async (e, userId, productId) => {
    // console.log(userId + "  " + productId);
    setisLoading(true);

    let sessionUrl = backendApis.userApi.wishlist + `${userId}/${productId}/`;

    // console.log(sessionUrl)
    await axios

      .delete(sessionUrl)

      .then(function (response) {
        // console.log(response.data);
        if (response.data.status === 200) {
          // alert(response.data.msg);
          fetchWishlistForLoggedInUser();
          setisLoading(false);
        }
      });
  };

  useEffect(() => {
    fetchWishlistForLoggedInUser();
  }, []);

  return (
    <>
      <div id="allproduct" data-cy="placedOrdersList">
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

        <p>
          {" "}
          {userWishList.length === 0 ? "Sorry Products Not Available" : ""}{" "}
        </p>

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
                <th scope="col"> Date </th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {userWishList.map((data, index) => {
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
                            {data.productId.name.substring(0, 30) + "..."}
                          </Link>
                        </p>
                      </td>

                      {/* (e) => deleteTheProduct(e, props.vendorId, data.id) */}
                      <td className="stock">
                        {" "}
                        <p>
                          <span>₹</span>{" "}
                          {data.productId.mrp -
                            parseInt(
                              (data.productId.mrp *
                                data.productId.discountPercent) /
                                100
                            )}{" "}
                        </p>{" "}
                      </td>
                      <td className="category">
                        {" "}
                        {data.productId.CategoryId.cat_name}{" "}
                        {data.productId.subCategoryId.sub_cat_name}{" "}
                      </td>

                      <td className="category">
                        {" "}
                        {data.productId.date.toLocaleString()}
                      </td>
                      <td className="category">
                        {" "}
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={(e) => {
                            if (
                              window.confirm(
                                "Are you sure want to remove From WishList ? "
                              )
                            ) {
                              removeFromWishList(
                                e,
                                data.userId.id,
                                data.productId.id
                              );
                            }
                          }}
                        >
                          Remove
                        </button>{" "}
                      </td>
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

export default WishList;
