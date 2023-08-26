import React from "react";
import { Navigate } from "react-router-dom";
import {
  AiOutlineArrowRight,
  AiFillStar,
  AiFillCheckCircle,
} from "react-icons/ai";
import {
  BsTagFill,
  BsFillStarFill,
  BsFillCheckCircleFill,
} from "react-icons/bs";
import { BiMapPin } from "react-icons/bi";
import { HiOutlineThumbUp, HiOutlineThumbDown } from "react-icons/hi";
import { useLocation } from "react-router-dom";
import ReactLoading from "react-loading";

import Header from "../Components/Header";

import Footer from "../Components/Footer";

// import Breadcumb from '../Breadcumb';

import ProductImages from "../Components/ProductImages";
import axios from "axios";
import { useState, useEffect } from "react";
import { backendApis } from "../Utils/APIS";

const Productdetail = (props) => {
  // console.log("PROPS- " , props.loggedUserInfo.fetchedId )

  const [isLoading, setisLoading] = useState(false);

  const [getProduct, setgetProduct] = useState([]);

  const getProductById = async () => {
    setisLoading(true);
    let fetchUrlLength = document.location.href.split("/").length;
    // console.log(fetchUrl)

    if (fetchUrlLength === 9) {
      // console.log("----9------")

      let categoryFromUrl = document.location.href.split("/")[4];
      let subCategoryFromUrl = document.location.href.split("/")[5];
      let idFromUrl = document.location.href.split("/")[6];

      let postData = `${categoryFromUrl}-${subCategoryFromUrl}-${idFromUrl}`;

      // console.log("postData- ", postData )

      let sessionUrl =
        backendApis.vendorApi.filter_productdetail_bySlugByFilterSlug +
        postData +
        "/";
      // console.log(sessionUrl)

      await axios
        .get(sessionUrl)

        .then(
          await function (response) {
            if (response.data.msg === "FilterProductGETREQUEST") {
              // console.log("FilterProductGETREQUEST")
              // console.log(response.data.fetchProduct);
              setgetProduct(response.data.fetchProduct);
              setisLoading(false);
            } else {
              alert(response.data.msg);
              setisLoading(false);
            }
          }
        );
    }
  };

  useEffect(() => {
    getProductById();
  }, []);

  return (
    <>
      <Header />

      <div data-cy="isLoading" className=" d-flex justify-content-center">
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
      </div>

      {getProduct.map((data) => {
        const allImagesInList = [
          data.image1,
          data.image2,
          data.image3,
          data.image4,
          data.image5,
        ];

        //  console.log(allImagesInList)

        return (
          <div key={data.id} className="productDetailBelowSection row">
            <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4">
              <ProductImages prop={props} imagesList={allImagesInList} />
            </div>

            <div className="col-12 col-sm-6 col-md-6 col-lg-8 col-xl-8">
              <div className="breadcumb">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="#">Home</a>
                    </li>
                    <li className="breadcrumb-item">
                      <a href="#">Product Detail</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Data
                    </li>
                  </ol>
                </nav>
              </div>

              <div>
                <h4 className=""> {data.name} </h4>
                <div className="pricing">
                  {
                    <p className="price ">
                      ₹
                      {data.mrp -
                        parseInt((data.mrp * data.discountPercent) / 100)}
                    </p>
                  }
                  {
                    <p className="MRP">
                      <del>₹{data.mrp} </del>
                    </p>
                  }
                  {<p className="percentOff">{data.discountPercent} % Off </p>}
                  <p></p>
                </div>

                <div className="rating d-flex">
                  <p className="rate"> 3.7 </p>
                  <p className="longRate">42,289 ratings and 146 reviews</p>
                </div>

                <div className="offers">
                  <p> Available offers</p>

                  <div className="d-flex">
                    <span>
                      <BsTagFill />
                    </span>
                    <p>
                      Bank Offer10% Instant Discount on HDFC Bank Credit Card
                      EMI Trxns up to ₹1,250 on orders of ₹5,000 and above
                      <span className="tandc"> T&C </span>
                    </p>
                  </div>
                </div>

                <div className="deliverTo d-flex flex-row justify-content-between mt-3">
                  <p>
                    <span>
                      <BiMapPin />
                    </span>
                    Deliver to
                  </p>
                  <p className=""> Services - COD</p>
                </div>

                <div className="pincodeCheckInput">
                  <div className="form-floating mb-2">
                    <input
                      type="number"
                      className="form-control"
                      id="floatingInput"
                      placeholder="name@example.com"
                    />
                    <label htmlFor="floatingInput">
                      Enter Delivery Pincode
                    </label>
                  </div>
                </div>

                <div className="deliveryTiming mt-5">
                  <p>
                    Delivery by 20 Jun, Tuesday
                    <span style={{ color: "#878787" }}> | </span>
                    <span style={{ color: "green" }}>
                      Free <del style={{ color: "#878787" }}>₹40 </del>
                    </span>
                  </p>
                  <p
                    style={{
                      fontWeight: "400",
                      fontSize: "15px",
                      marginTop: "-20px",
                    }}
                  >
                    if ordered before 10:39 PM
                  </p>
                  <a
                    className="text-primary "
                    style={{ textDecoration: "none" }}
                  >
                    View Details
                  </a>
                </div>

                {/* ---------------- color -------------------- */}
                <div className="row mt-5 productColor">
                  <div className="col-2">
                    <p style={{ color: "#878787" }}>Color</p>
                  </div>

                  <div className="col-10 d-flex flex-row justify-content-around ">
                    <div className="">
                      <img
                        src="https://rukminim1.flixcart.com/image/832/832/xif0q/shoe/f/d/y/6-2082-white-walkers-black-original-imag5y96qxxpey5q-bb.jpeg?q=70"
                        style={{ width: "100px", height: "100px" }}
                      />
                    </div>

                    <div className="">
                      <img
                        src="https://rukminim1.flixcart.com/image/832/832/ksdjma80/shoe/y/5/o/8-2082-white-walkers-grey-original-imag5y96qzym6shn.jpeg?q=70"
                        style={{ width: "100px", height: "100px" }}
                      />
                    </div>

                    <div className="">
                      <img
                        src="https://rukminim1.flixcart.com/image/832/832/xif0q/shoe/v/c/g/8-2082-white-walkers-white-original-imag5y96fmgrfugx-bb.jpeg?q=70"
                        style={{ width: "100px", height: "100px" }}
                      />
                    </div>
                  </div>
                </div>

                {/* --------------------- size --------------------- */}

                <div className="row mt-5  ">
                  <div className="col-2">
                    <p style={{ color: "#878787" }}> Size UK / India</p>
                  </div>

                  <div className="col-10 d-flex flex-row justify-content-around">
                    <div
                      className=" border border-dark p-3 "
                      style={{ fontSize: "25px", fontWeight: "900" }}
                    >
                      3
                    </div>

                    <div
                      className=" border border-dark p-3 "
                      style={{ fontSize: "25px", fontWeight: "900" }}
                    >
                      3.5
                    </div>

                    <div
                      className=" border border-dark p-3 "
                      style={{ fontSize: "25px", fontWeight: "900" }}
                    >
                      4
                    </div>

                    <div
                      className=" border border-dark p-3 "
                      style={{ fontSize: "25px", fontWeight: "900" }}
                    >
                      4.5
                    </div>
                  </div>
                </div>

                {/* --------------------- Seller --------------------- */}

                <div className="row mt-5 sellerInfo">
                  <div className="col-2" style={{ color: "#878787" }}>
                    Seller
                  </div>

                  <div className="col-10 ">
                    <p>
                      HSAtlastradeFashion <span className="rate"> 3.8 </span>
                    </p>
                    <ul className="tAndC">
                      <li>10 Days Return Policy</li>
                      <li> GST invoice available </li>
                      <li style={{ listStyle: "none" }}>
                        <a
                          href="#"
                          className="text-primary "
                          style={{ textDecoration: "none" }}
                        >
                          See Other Sellers
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                <div>
                  <img
                    src="https://rukminim1.flixcart.com/lockin/400/400/images/CCO__PP_2019-07-14.png?q=50"
                    alt=""
                  />
                </div>

                {/* --------------------- product detail --------------------- */}

                <hr />
                <p> {data.productDescription} </p>
                <hr />

                <div className="d-flex mt-5  flex-row justify-content-between ratingReview">
                  <div className="getProduct"> Ratings & Reviews </div>
                  <div className="second"> 2,289 ratings and 146 reviews </div>
                  <div className="third">
                    <button className="btn btn-primary btn-sm">
                      Rate Product
                    </button>
                  </div>
                </div>

                <p
                  className="mt-4"
                  style={{ color: "#212121", fontWeight: "bold" }}
                >
                  What our customers felt:
                </p>

                <div className="mt-4 verifiedUser-review">
                  <p style={{ fontWeight: "500" }}>
                    <span className="rate">
                      5 <BsFillStarFill />
                    </span>
                    It's good n comfy
                  </p>

                  <img
                    src="https://rukminim1.flixcart.com/image/832/832/l4rd0280/shoe/a/v/m/-original-imagfh9gzqzehfha.jpeg?q=70"
                    style={{ width: "100px", height: "100px" }}
                  />
                  <p className="mt-3">
                    <b> Flipkart sudheesh </b> Dec, 2021
                  </p>
                  <p>
                    <span>
                      <BsFillCheckCircleFill />
                    </span>
                    Certified Buyer, Imphal
                  </p>

                  <div className="likedislike d-flex flex-row ">
                    <p className="likedislike-LIKE">
                      <span>
                        <HiOutlineThumbUp />
                      </span>
                      672
                    </p>
                    <p className="likedislike-DISLIKE">
                      <span>
                        <HiOutlineThumbDown />
                      </span>
                      99
                    </p>
                  </div>

                  <hr />
                </div>

                <div className="mt-4 verifiedUser-review">
                  <p style={{ fontWeight: "500" }}>
                    <span className="rate">
                      5 <BsFillStarFill />
                    </span>
                    It's good n comfy
                  </p>

                  <img
                    src="https://rukminim1.flixcart.com/image/832/832/l4rd0280/shoe/a/v/m/-original-imagfh9gzqzehfha.jpeg?q=70"
                    style={{ width: "100px", height: "100px" }}
                  />
                  <p className="mt-3">
                    <b> Flipkart sudheesh </b> Dec, 2021
                  </p>
                  <p>
                    <span>
                      <BsFillCheckCircleFill />
                    </span>
                    Certified Buyer, Imphal
                  </p>

                  <div className="likedislike d-flex flex-row ">
                    <p className="likedislike-LIKE">
                      <span>
                        <HiOutlineThumbUp />
                      </span>
                      672
                    </p>
                    <p className="likedislike-DISLIKE">
                      <span>
                        <HiOutlineThumbDown />
                      </span>
                      99
                    </p>
                  </div>

                  <hr />
                </div>
              </div>
              {/* 2nd section  */}
            </div>
            {/* col-8 */}
            <div
              style={{
                backgroundImage:
                  "https://rukminim1.flixcart.com/www/2000/2000/promos/01/12/2018/8aa01ab4-de88-4a46-9d93-5c7f3ebac2df.png?q=50",
              }}
            ></div>
          </div>
        );
      })}

      {/* productDetailBelowSection */}
      <Footer />
    </>
  );
};

export default Productdetail;
