import Header from "../Components/Header";
import {
  AiFillCaretDown,
  AiFillCaretUp,
  AiFillHeart,
  AiOutlineHeart,
} from "react-icons/ai";
// import $ from 'jquery';
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SecondHeader from "../Components/SecondHeader";
import ReactLoading from "react-loading";
import jwtDecode from "jwt-decode";

import { backendApis } from "../Utils/APIS";

export const ProductAll = () => {
  const navigation = useNavigate();

  const [userWishList, setuserWishList] = useState([]);
  const [allProducts, setallProducts] = useState([]);
  const [getCategory, setgetCategory] = useState([]);
  const [getSubCategory, setgetSubCategory] = useState([]);
  const [ApiElseMessage, setApiElseMessage] = useState("");

  const [loggedUserId, setloggedUserId] = useState();

  const [isLoading, setisLoading] = useState(false);

  const fetchFromDb = async () => {
    setisLoading(true);
    let fetchUrlLength = document.location.href.split("/").length;

    if (fetchUrlLength === 6) {
      // console.log("---4---")
      // MEANS CATEGORY AND SUBCATEGORY
      // http://localhost:3000/productall/Mobiles/

      let categoryFromUrl = document.location.href.split("/")[4];

      // console.log( "categoryFromUrl- ", categoryFromUrl )
      // console.log( "subCategoryFromUrl- ", subCategoryFromUrl )

      let postData = `${categoryFromUrl}`;

      // console.log("postData- ", postData )

      let sessionUrl =
        backendApis.vendorApi.filter_productdetail_bySlugByFilterSlug +
        postData +
        "/";

      await axios
        .get(sessionUrl)

        .then(function (response) {
          if (response.data.msg === "FilterProductGETREQUEST") {
            // console.log("FilterProductGETREQUEST")
            // console.log(response.data.fetchProduct);
            setallProducts(response.data.fetchProduct);
            setApiElseMessage("");
            setisLoading(false);
          } else {
            // alert(response.data.msg);
            setApiElseMessage("Sorry " + categoryFromUrl + " Does Not Exist");
            setallProducts([]);
            setisLoading(false);
          }
        });

      // .catch(function (error) {
      //   console.log("Error", error);
      // });
    }

    if (fetchUrlLength === 7) {
      // console.log("---7---")
      // MEANS CATEGORY AND SUBCATEGORY
      // http://localhost:3000/productall/Mobiles/Samsung/

      let categoryFromUrl = document.location.href.split("/")[4];
      let subCategoryFromUrl = document.location.href.split("/")[5];

      // console.log( "categoryFromUrl- ", categoryFromUrl )
      // console.log( "subCategoryFromUrl- ", subCategoryFromUrl )

      let postData = `${categoryFromUrl}-${subCategoryFromUrl}`;

      let sessionUrl =
        backendApis.vendorApi.filter_productdetail_bySlugByFilterSlug +
        postData +
        "/";

      await axios
        .get(sessionUrl)

        .then(function (response) {
          if (response.data.msg === "FilterProductGETREQUEST") {
            // console.log("FilterProductGETREQUEST")
            // console.log(response.data.fetchProduct);
            setallProducts(response.data.fetchProduct);
            setApiElseMessage("");
            setisLoading(false);
          } else {
            // alert(response.data.msg);
            setApiElseMessage(
              "Sorry " + subCategoryFromUrl + " Does Not Exist"
            );
            setallProducts([]);
            setisLoading(false);
          }
        });
    }

    if (fetchUrlLength === 5) {
      // http://localhost:3000/productall/

      // let sessionUrl = "http://localhost:8000/vendorApi/addproduct";

      await axios
        .get(backendApis.vendorApi.addproduct)

        .then(function (response) {
          if (response.data.msg === "addProductGETRequest") {
            // console.log("FilterProductGETREQUEST")
            // console.log(response.data.fetchProduct);
            setallProducts(response.data.getAllProducts);
            setApiElseMessage("");
            setisLoading(false);
          } else {
            // alert(response.data.msg);
            setApiElseMessage(response.data.msg);
            setallProducts([]);
            setisLoading(false);
          }
        });

      // .catch(function (error) {
      //   // console.log("Error", error);
      // });
    }
  };

  const fetchCategoryFromDb = async () => {
    setisLoading(true);

    await axios
      .get(backendApis.vendorApi.addcategory)

      .then(function (response) {
        // console.log(response.data.fetchCategory);
        setgetCategory(response.data.fetchCategory);
        setisLoading(false);
      });
  };

  const fetchSubCategoryFromDb = async () => {
    setisLoading(true);

    await axios
      .get(backendApis.vendorApi.add_sub_category)

      .then(function (response) {
        // console.log(response.data.fetchCategory);
        setgetSubCategory(response.data.fetchSubCategory);
        setisLoading(false);
      });
  };

  const fetchWishlistForLoggedInUser = async () => {
    // setisLoading(true);

    if (localStorage.getItem("userLoginToken")) {
      let decoded = jwtDecode(localStorage.getItem("userLoginToken"));

      setloggedUserId(decoded["fetchedId"]);

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
              }
            }
          }
        );
    }
  };

  const removeFromWishList = async (e, userId, productId) => {
    // console.log(userId, " " + productId);

    let sessionUrl = backendApis.userApi.wishlist + `${userId}/${productId}/`;

    await axios
      .delete(sessionUrl)

      .then(
        await function (response) {
          console.log(response.data);
          if (response.data.status === 200) {
            if (response.data.msg === "ItemDeleted") {
              // console.log("ItemDeleted");
              fetchFromDb();
              fetchWishlistForLoggedInUser();
              // navigation("/productall/" , {redirect: true} )
            }
          }
        }
      );
  };

  const addToWishList = async (e, userId, productId) => {
    // console.log(userId, " " + productId);

    let sessionUrl = backendApis.userApi.wishlist + `${userId}/${productId}/`;

    await axios
      .post(sessionUrl)

      .then(
        await function (response) {
          // console.log(response.data)
          if (response.data.status === 200) {
            if (response.data.msg === "addedInWishlist") {
              // console.log("addedInWishlist");
              fetchFromDb();
              fetchWishlistForLoggedInUser();
              // navigation("/productall/")
            }
          }
        }
      );
  };

  useEffect(() => {
    // console.log("--UseEffect---");

    fetchSubCategoryFromDb();
    fetchCategoryFromDb();

    fetchFromDb();
    fetchWishlistForLoggedInUser();
  }, []);

  // console.log(userWishList);

  return (
    <>
      <Header />

      {/* <SecondHeader /> */}

      <div className="productAllSection">
        <div className="left-side ">
          <h2> Filters </h2>

          <hr />

          <div className="category">
            <div className="accordion" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    Category
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  className="accordion-collapse collapse show"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    {getCategory.map((data, index) => {
                      return (
                        <p key={index}>
                          <Link to={`/productall/${data.cat_name}/`}>
                            {" "}
                            {data.cat_name}{" "}
                          </Link>
                        </p>

                        // <a  href= ` /productall/"+{data.category} ` > Apple </a>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    Sub Category
                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    {getSubCategory.map((data, index) => {
                      return (
                        <p key={index}>
                          <Link
                            to={`/productall/${data.catId.cat_name}/${data.sub_cat_name}/`}
                          >
                            {" "}
                            {data.sub_cat_name}{" "}
                          </Link>
                        </p>

                        // <a  href= ` /productall/"+{data.category} ` > Apple </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div classNameName="col-1 right-middle"> ApiElseMessage  </div> */}

        <div className="right-side">
          <div className="d-flex flex-row category">
            {/* <h6>Smart Watches</h6> */}
            <p className="p-1 fs-5 text-danger bold">
              {ApiElseMessage.replace("%", " ")}
            </p>
          </div>

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

          <div className="d-flex flex-row category">
            <h6>
              {document.location.href.split("/")[4]} -{" "}
              {document.location.href.split("/")[5]}{" "}
            </h6>
            <p style={{ fontSize: "14px" }}>
              {"("} Showing {"-"}{" "}
              {allProducts.length - 1 < 0 ? 0 : allProducts.length - 1} products{" "}
              {"}"}
            </p>
          </div>

          {/* <div className="d-flex flex-row sortBy mt-2">
            <h6>Sort By</h6>
            <a
              href="/productall"
              style={{ fontWeight: "800", fontSize: "15px" }}
            >
              Popularity
            </a>
            <a
              href="/productall"
              style={{ fontWeight: "500", fontSize: "15px" }}
            >
              Price -- Low to High
            </a>
            <a
              href="/productall"
              style={{ fontWeight: "500", fontSize: "15px" }}
            >
              Price -- High to Low
            </a>
          </div> */}

          {/* <hr/> */}

          <div className="row">
            {allProducts.map((data) => {
              if (
                data.stockStatus === "In-Stock" &&
                data.recycleBin === false
              ) {
                return (
                  <div
                    key={data.id}
                    className=" col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3  productBox py-2"
                  >
                    <div className="image">
                      {/* to={'/productdetail/'+`${data.id}`+'/' }  */}

                      <Link
                        target="_blank"
                        to={`/productdetail/${data.CategoryId.cat_name}/${data.subCategoryId.sub_cat_name}/${data.id}/${data.name}/`}
                      >
                        {" "}
                        <img src={data.image1} alt="" />{" "}
                      </Link>
                    </div>

                    {(() => {
                      if (!localStorage.getItem("userLoginToken")) {
                        return (
                          <p className="wishlistIcon">
                            <AiFillHeart
                              title="WishList"
                              onClick={() => alert("Please Login First")}
                            />
                          </p>
                        );
                      } else {
                        // console.log(userWishList[0].id)

                        for (
                          let index = 0;
                          index < userWishList.length;
                          index++
                        ) {
                          if (userWishList[index].productId.id === data.id) {
                            // console.log("matched")
                            return (
                              <p
                                className="wishlistIcon"
                                style={{ color: "#2874f0" }}
                              >
                                <AiFillHeart
                                  title="Remove From WishList"
                                  onClick={(e) =>
                                    removeFromWishList(
                                      e,
                                      loggedUserId,
                                      userWishList[index].productId.id
                                    )
                                  }
                                />
                              </p>
                            );
                          } else {
                          }
                        }

                        return (
                          <p className="wishlistIcon">
                            <AiFillHeart
                              title="Add in WishList"
                              onClick={(e) =>
                                addToWishList(e, loggedUserId, data.id)
                              }
                            />
                          </p>
                        );
                      }
                    })()}

                    <div className="productInfo">
                      <h4 className="name">
                        {" "}
                        <Link
                          style={{ color: "black", textDecoration: "none" }}
                          to={`/productdetail/${data.CategoryId.cat_name}/${data.subCategoryId.sub_cat_name}/${data.id}/${data.name}/`}
                        >
                          {" "}
                          {data.name.substring(0, 30) + "..."}
                        </Link>{" "}
                      </h4>
                      <p className="subName"> {data.subCategory} </p>

                      <div className="price d-flex flex-row">
                        <p>
                          ₹
                          {data.mrp -
                            parseInt((data.mrp * data.discountPercent) / 100)}
                        </p>
                        <p>
                          <del> ₹ {data.mrp} </del>
                        </p>
                      </div>

                      <p className="discountPercent">
                        {data.discountPercent}% off
                      </p>
                      <p className="time"> Free Delivery By Tuesday </p>
                      <p className="bankOffer">
                        <b> Bank Offer </b>
                      </p>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    </>
  );
};
