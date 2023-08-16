import Header from "../Components/Header";
import { AiFillCaretDown, AiFillCaretUp, AiFillHeart } from "react-icons/ai";
// import $ from 'jquery';
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SecondHeader from "../Components/SecondHeader";

export const ProductAll = () => {
  const navigation = useNavigate();

  const [allProducts, setallProducts] = useState([]);
  const [getCategory, setgetCategory] = useState([]);
  const [getSubCategory, setgetSubCategory] = useState([]);
  const [ApiElseMessage, setApiElseMessage] = useState("");


  const fetchFromDb = () => {
    // console.log("----productall--fetchFromDb------")

    let fetchUrlLength = document.location.href.split("/").length;

    // console.log("fetchUrlLength- " , fetchUrlLength )

    // console.log(document.location.href.split("/"))

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
        "http://localhost:8000/vendorApi/filter-productdetail-bySlug/" +
        postData +
        "/";

      axios
        .get(sessionUrl)

        .then(function (response) {
          if (response.data.msg === "FilterProductGETREQUEST") {
            // console.log("FilterProductGETREQUEST")
            // console.log(response.data.fetchProduct);
            setallProducts(response.data.fetchProduct);
            setApiElseMessage("")
          } else {
            // alert(response.data.msg);
            setApiElseMessage(response.data.msg)
            setallProducts([]);
          }
        })

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

      // console.log("postData- ", postData )

      let sessionUrl =
        "http://localhost:8000/vendorApi/filter-productdetail-bySlug/" +
        postData +
        "/";

      axios
        .get(sessionUrl)

        .then(function (response) {
          if (response.data.msg === "FilterProductGETREQUEST") {
            // console.log("FilterProductGETREQUEST")
            // console.log(response.data.fetchProduct);
            setallProducts(response.data.fetchProduct);
            setApiElseMessage("")
          } else {
            // alert(response.data.msg);
            setApiElseMessage(response.data.msg)
            setallProducts([]);
          }
        })

        // .catch(function (error) {
        //   console.log("Error", error);
        // });
    }

    if (fetchUrlLength === 5) {
      // http://localhost:3000/productall/

      let sessionUrl = "http://localhost:8000/vendorApi/addproduct";

      axios
        .get(sessionUrl)

        .then(function (response) {
          if (response.data.msg === "addProductGETRequest") {
            // console.log("FilterProductGETREQUEST")
            // console.log(response.data.fetchProduct);
            setallProducts(response.data.getAllProducts);
            setApiElseMessage("")
          } else {
            // alert(response.data.msg);
            setApiElseMessage(response.data.msg)
            setallProducts([]);
          }
        })

        // .catch(function (error) {
        //   // console.log("Error", error);
        // });
    }
  };

  const fetchCategoryFromDb = () => {
    let sessionUrl = "http://localhost:8000/vendorApi/addcategory";

    axios
      .get(sessionUrl)

      .then(function (response) {
        // console.log(response.data.fetchCategory);
        setgetCategory(response.data.fetchCategory);
      })

      .catch(function (error) {
        // console.log("Error", error);
      });
  };

  const fetchSubCategoryFromDb = () => {
    let sessionUrl = "http://localhost:8000/vendorApi/add-sub-category";

    axios
      .get(sessionUrl)

      .then(function (response) {
        // console.log(response.data.fetchCategory);
        setgetSubCategory(response.data.fetchSubCategory);
      })

      .catch(function (error) {
        // console.log("Error", error);
      });
  };

  useEffect(() => {
    // console.log("--UseEffect---");

    fetchSubCategoryFromDb();
    fetchCategoryFromDb();
    fetchFromDb();
  }, [navigation]);

  return (
    <>
      <Header />


{/* <SecondHeader /> */}

      <div className="productAllSection ">
        <div className="   left-side">
          <h2> Filters </h2>

          <hr />

          <div className="category">
            <div class="accordion" id="accordionExample">
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button
                    class="accordion-button"
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
                  class="accordion-collapse collapse show"
                  data-bs-parent="#accordionExample"
                >
    
                  <div class="accordion-body">
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

              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button
                    class="accordion-button collapsed"
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
                  class="accordion-collapse collapse"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body">
                    {getSubCategory.map((data, index) => {
                      return (
                        <p key={index}>
                          <Link
                            to={`/productall/${data.cat_name}/${data.sub_cat_name}/`}
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

        {/* <div className="col-1 right-middle"> ApiElseMessage  </div> */}

        <div className="right-side">

        <div className="d-flex flex-row category">
            {/* <h6>Smart Watches</h6> */}
            <p className="p-1 fs-5 text-danger bold" >
              {ApiElseMessage}
            </p>
          </div>

          <div className="d-flex flex-row category">
            <h6>Smart Watches</h6>
            <p>
              {"("} Showing 1 {"-"} 40 products of 42,708 products {"}"}
            </p>
          </div>

          <div className="d-flex flex-row sortBy mt-2">
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
          </div>

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
                    className=" col-12 col-sm-6 col-md-6 col-lg-3 productBox py-2"
                  >
                    <div className="image">
                      {/* to={'/productdetail/'+`${data.id}`+'/' }  */}

                      <Link
                        target="_blank"
                        to={`/productdetail/${data.Category}/${data.subCategory}/${data.id}/${data.name}/`}
                      >
                        {" "}
                        <img src={data.image1} alt="" />{" "}
                      </Link>
                    </div>
                    <p className="wishlistIcon">
                      <AiFillHeart />
                    </p>
                    <div className="productInfo">
                      <h4 className="name">
                        {" "}
                        <Link
                          style={{ color: "black", textDecoration: "none" }}
                          to={`/productdetail/${data.Category}/${data.subCategory}/${data.id}/${data.name}/`}
                        >
                          {" "}
                          {data.name}{" "}
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
