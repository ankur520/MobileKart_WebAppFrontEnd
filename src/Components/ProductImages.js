import React, { useState, useEffect, useRef } from "react";
import "../CSS/productImages.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { backendApis } from "../Utils/APIS";

const ProductImages = (props) => {
  // console.log("Images- ", props.prop.loggedUserInfo.fetchedId )

  const [slideIndex, setSlideIndex] = useState(1);
  const navigation = useNavigate();

  function plusSlides(n) {
    // console.log(n)
    setSlideIndex((prev) => prev + n);
    slideShow(slideIndex + n);
  }

  function slideShow(n) {
    // console.log(n);
    if (n > props.imagesList.length) {
      setSlideIndex(1);
    }

    if (n < 1) {
      setSlideIndex(props.imagesList.length);
    }
  }

  let location = useLocation();

  const AddToCartBtn = async (e) => {
    if (props.prop.loggedUserInfo.fetchedId === undefined) {
      // console.log("yes its ")
      alert("Please Login First ");
    } else {
      // console.log("e- ", e.target.id )

      let idFromUrl = document.location.href.split("/")[6];
      // console.log("id -  ", idFromUrl )
      // let sessionUrl = "http://localhost:8000/userApi/addIn-cart";

      let productId = idFromUrl;
      let userId = props.prop.loggedUserInfo.fetchedId;

      console.log(backendApis.userApi.addIn_cart);

      await axios
        .post(backendApis.userApi.addIn_cart, { productId, userId })

        .then(function (response) {
          console.log(response.data);

          if (response.data.status === 200) {
            if (response.data.msg === "ProductAddedInCart") {
              alert("ProductAddedInCart");

              if (e.target.id === "buyNowBtns") {
                // navigation("/checkout")
                // console.log("dsfsadfsadfsadfasfasdfas");
                window.location.replace("/checkout");
              }
              // navigation("/")
            } else {
              alert(response.data.msg);
            }
          }
        });
    }
  };

  return (
    <>
      <section className="product-details row">
        <div className="leftSection  col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
          {props.imagesList.map((productImage, index) => {
            return (
              <div
                key={index}
                className={`imageBox ${index + 1 === slideIndex && "active"} `}
                onClick={() => setSlideIndex(index + 1)}
              >
                <img src={props.imagesList[index]} alt="" />
              </div>
            );
          })}
        </div>

        <div className="rightSection  col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
          <div className="product-page-img">
            {props.imagesList.map((productImage, index) => {
              return (
                <div
                  key={index}
                  className="mySlides"
                  style={{
                    display: index + 1 === slideIndex ? "block" : "none",
                  }}
                >
                  <div className="numbertext">
                    {index + 1} / {props.imagesList.length}
                  </div>
                  <img src={props.imagesList[index]} alt="" />
                </div>
              );
            })}

            <a href="#!" className="prev" onClick={() => plusSlides(-1)}>
              &#10094;
            </a>
            <a href="#!" className="next" onClick={() => plusSlides(1)}>
              &#10095;
            </a>
          </div>

          <div className="ShoppingActionBtns mt-1  d-flex justify-content-around ">
            <Link
              style={{ color: "#fff", textDecoration: "none" }}
              onClick={(e) => AddToCartBtn(e)}
            >
              <button
                style={{ backgroundColor: "#ff9f00", color: "#fff" }}
                className="btn btn-md py-2 px-5 "
                id="addToCartBtns"
              >
                {" "}
                Add to Cart{" "}
              </button>
            </Link>

            <Link
              to="#"
              style={{ color: "#fff", textDecoration: "none" }}
              onClick={(e) => AddToCartBtn(e)}
            >
              <button
                style={{ backgroundColor: "#fb641b", color: "#fff" }}
                className="btn   btn-md py-2  px-5  "
                id="buyNowBtns"
              >
                {" "}
                Buy Now{" "}
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductImages;
