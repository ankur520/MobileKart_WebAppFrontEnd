import React, { useState, useEffect, useRef } from "react";
import "../CSS/productImages.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductImages = (props) => {
  // console.log("Images- ", props.prop.loggedUserInfo.fetchedId )

  const imagesArray = [
    {
      src: "https://images.unsplash.com/photo-1562183241-b937e95585b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=465&q=80",
    },
    {
      src: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=879&q=80",
    },
    {
      src: "https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    },

    {
      src: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80",
    },
    {
      src: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80",
    },
    {
      src: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=812&q=80",
    },
    {
      src: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    },
  ];

  const [slideIndex, setSlideIndex] = useState(1);
  const navigation = useNavigate;

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

  const AddToCartBtn = (e) => {
    if (props.prop.loggedUserInfo.fetchedId === undefined) {
      // console.log("yes its ")
      alert("Please Login First ");
    } else {
      // console.log("e- ", e.target.id )

      // console.log("AddToCartBtn")
      let idFromUrl = document.location.href.split("/")[6];
      // console.log("id -  ", idFromUrl )
      let sessionUrl = "http://localhost:8000/userApi/addIn-cart";

      let productId = idFromUrl;
      let userId = props.prop.loggedUserInfo.fetchedId;

      console.log(userId);

      axios
        .post(sessionUrl, { productId, userId })

        .then(function (response) {
          // console.log(response)
          if (response.data.msg === "ProductAddedInCart") {
            alert("ProductAddedInCart");

            if (e.target.id === "buyNowBtns") {
              // navigation("/checkout")
              console.log("dsfsadfsadfsadfasfasdfas");
              window.location.replace("/checkout");
            }
          } else {
            alert(response.data.msg);
          }
        })

        .catch(function (error) {
          // console.log("Axios Error- " , error )
        });
    }
  };

  return (
    <>
      <section className="product-details">
        <div className="leftSection">
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

        <div className="rightSection">
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
