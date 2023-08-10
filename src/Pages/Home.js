import React from "react";
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import axios from "axios";

// icons
// import { AiOutlineRight } from "react-icons/ai";
// import { AiOutlineLeft } from "react-icons/ai";

// images sliders
import { Slide } from "react-slideshow-image";
import Slider from "react-slick";

// pages Components
import Header from "../Components/Header";
import SecondHeader from "../Components/SecondHeader";
import Footer from "../Components/Footer";
// import { TestingDemo, Utidfasfasl } from "../Utils/Util";

// import ProductSlider from "../ProductsSlider";

const buttonStylePrevArrow = {
  width: "30px",
  background: "#fff",
  border: "0px",
  padding: "60px 20px",
  borderRadius: "0px 10px 10px 0px",
};

const buttonStyleNextArrow = {
  width: "30px",
  background: "#fff",
  border: "0px",
  padding: "60px 20px",

  borderRadius: "10px 0px 0px 10px",
};

const properties = {
  prevArrow: (
    <button style={{ ...buttonStylePrevArrow }}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#fff">
        <path d="M242 180.6v-138L0 256l242 213.4V331.2h270V180.6z" />
      </svg>
    </button>
  ),
  nextArrow: (
    <button style={{ ...buttonStyleNextArrow }}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#fff">
        <path d="M512 256L270 42.6v138.2H0v150.6h270v138z" />
      </svg>
    </button>
  ),
};

const images = [
  "https://rukminim1.flixcart.com/fk-p-flap/3376/560/image/39f612e8c1868c6a.jpeg?q=50",
  "https://rukminim1.flixcart.com/fk-p-flap/3376/560/image/cf71d5229c7409e3.png?q=50",
  "https://rukminim1.flixcart.com/fk-p-flap/3376/560/image/319f82797db3034e.jpg?q=50",
  "https://rukminim1.flixcart.com/fk-p-flap/3376/560/image/6a46d1114486b4a2.jpeg?q=50",
];

// -----------------------------products slider ------------------

var settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
  ],
};

// ------------------------------------products slider END ---------------------

const Home = (props) => {
  const [allProducts, setallProducts] = useState([]);

  const fetchFromDb = () => {
    // console.log("------fetchFromDb------")

    let sessionUrl = "http://localhost:8000/vendorApi/addproduct";

    axios
      .get(sessionUrl)

      .then(function (response) {
        if (response.data.msg === "addProductGETRequest") {
          // console.log("addProductGETRequest")
          // console.log(response.data.getAllProducts)
          setallProducts(response.data.getAllProducts);
        } else {
          console.log("27 Else -", response);
        }
      })

      .catch(function (error) {
        console.log("Axios Error ", error);
      });
  };

  useEffect(() => {
    // console.log("--UseEffect From Home.js  ---");

    // fetch all products data from db
    fetchFromDb();
  }, []);

  return (
    <>
      <Header />
      <SecondHeader />
      <div className="selfcontainer">
        {/* image CAROSEL */}
        <Slide {...properties}>
          <div className="each-slide-effect">
            <div style={{ backgroundImage: `url(${images[0]})` }}></div>
          </div>
          <div className="each-slide-effect">
            <div style={{ backgroundImage: `url(${images[1]})` }}></div>
          </div>
          <div className="each-slide-effect">
            <div style={{ backgroundImage: `url(${images[2]})` }}></div>
          </div>

          <div className="each-slide-effect">
            <div style={{ backgroundImage: `url(${images[3]})` }}></div>
          </div>
        </Slide>
        <div></div>
        <div className="sectionTwo  row">
          <div className="col-2 leftSection">
            <h1>Top Offers</h1>
            <button className="btn btn-primary mt-4"> View ALL </button>
          </div>

          <div className="col-8  middleSection ">
            <Slider {...settings}>
              {allProducts.map((data, index) => {
                if (
                  data.stockStatus === "In-Stock" &&
                  data.setFeatured === true &&
                  data.recycleBin === false
                ) {
                  return (
                    <div className="productBox" key={index}>
                      <img
                        style={{ width: "180px", height: "200px" }}
                        alt={data.subCategory}
                        src={data.image1}
                      />
                      <p
                        className="mt-3"
                        style={{ fontWeight: "700", fontSize: "17px" }}
                      >
                        <Link
                          to={`/productdetail/${data.Category}/${data.subCategory}/${data.id}/${data.name}/`}
                        >
                          {" "}
                          {data.name.slice(0, 50) + "..."}{" "}
                        </Link>
                      </p>
                      <p
                        style={{
                          color: "#388e3c",
                          marginTop: "-10px",
                          fontSize: "15px",
                        }}
                      >
                        Min {data.discountPercent} % Off
                      </p>
                      <p
                        style={{
                          opacity: ".6",
                          marginTop: "-10px",
                          fontSize: "11px",
                        }}
                      >
                        {data.subCategory}{" "}
                      </p>
                    </div>
                  );
                }
              })}

              {/* {imagesArray.map((slide, index) => {
                return (

                  <div className="productBox" key={index}>
                    <img
                      style={{ width: "180px", height: "200px" }}
                      src={slide.image}
                    />
                    <p
                      className="mt-3"
                      style={{ fontWeight: "700", fontSize: "17px" }}
                    >
                      {" "}
                      Nike , Sketchers{" "}
                    </p>
                    <p
                      style={{
                        color: "#388e3c",
                        marginTop: "-10px",
                        fontSize: "15px",
                      }}
                    >
                      Min 50% Off
                    </p>
                    <p
                      style={{
                        opacity: ".6",
                        marginTop: "-10px",
                        fontSize: "11px",
                      }}
                    >
                      Men's Shoes
                    </p>
                  </div>
                );
              })} */}
            </Slider>
          </div>

          <div className="col-2 rightSection"></div>
        </div>
        {/* ------------------------------sectionThree--------------------------------------------- */}
        <div className="sectionThree ">
          <div className="row">
            <img
              className="col-4"
              alt="bannel"
              src="https://rukminim1.flixcart.com/fk-p-flap/960/960/image/a20cec49769ebfc5.jpg?q=50"
            />
            <img
              className="col-4"
              alt="banner"
              src="https://rukminim1.flixcart.com/fk-p-flap/960/960/image/0e2442f1a34ac836.jpeg?q=50"
            />
            <img
              className="col-4"
              alt="banner"
              src="https://rukminim1.flixcart.com/fk-p-flap/960/960/image/32655c2ae11bea21.jpg?q=50"
            />
          </div>
        </div>
        {/* ----------------------------------sectionFour-----------allProducts------------------------------ */}
        <div className="sectionFour ">
          <div className="row">
            <div className="col-2 leftSide   ">
              <h4 className="fs-2">
                Top Deals on <br /> Samsung
              </h4>
              <button className="btn btn-primary btn-md py-2 px-5 mt-4 ">
                <Link
                  to={`/productall/Mobiles/Samsung/`}
                  style={{ textDecoration: "none", color: "#fff" }}
                >
                  {" "}
                  View All{" "}
                </Link>
              </button>
            </div>

            <div className="col-10 rightSide ">
              <Slider {...settings}>
                {allProducts.map((data, index) => {
                  if (
                    data.subCategory === "Samsung" &&
                    data.stockStatus === "In-Stock" &&
                    data.recycleBin === false &&
                    data.setFeatured === true
                  ) {
                    if (data.setFeatured === true) {
                      return (
                        <div className="productBox" key={index}>
                          <img
                            style={{ width: "180px", height: "200px" }}
                            src={data.image1}
                            alt={data.subCategory}
                          />
                          <p
                            className="mt-3"
                            style={{ fontWeight: "700", fontSize: "17px" }}
                          >
                            <Link
                              to={`/productdetail/${data.Category}/${data.subCategory}/${data.id}/${data.name}/`}
                            >
                              {" "}
                              {data.name.slice(0, 50) + "..."}{" "}
                            </Link>
                          </p>
                          <p
                            style={{
                              color: "#388e3c",
                              marginTop: "-10px",
                              fontSize: "15px",
                            }}
                          >
                            Min 50% Off
                          </p>
                          <p
                            style={{
                              opacity: ".6",
                              marginTop: "-10px",
                              fontSize: "11px",
                            }}
                          >
                            {data.subCategory}{" "}
                          </p>
                        </div>
                      );
                    }
                  }
                })}
              </Slider>
            </div>
          </div>
        </div>
        <br /> <br />
        {/* ------------------------------sectionThree again --------------------------------------------- */}
        <div className="sectionThree mt-5">
          <div className="row">
            <img
              className="col-4"
              alt="banner"
              src="https://rukminim1.flixcart.com/fk-p-flap/960/960/image/a20cec49769ebfc5.jpg?q=50"
            />
            <img
              className="col-4"
              alt="banner"
              src="https://rukminim1.flixcart.com/fk-p-flap/960/960/image/0e2442f1a34ac836.jpeg?q=50"
            />
            <img
              className="col-4"
              alt="banner"
              src="https://rukminim1.flixcart.com/fk-p-flap/960/960/image/32655c2ae11bea21.jpg?q=50"
            />
          </div>
        </div>
        <div className="sectionThree ">
          <div className="row">
            <img
              className="col-4"
              alt="banner"
              src="https://rukminim1.flixcart.com/fk-p-flap/656/352/image/c61072b241376138.jpeg?q=70"
            />

            <img
              alt="banner"
              className="col-4"
              src="https://rukminim1.flixcart.com/fk-p-flap/656/352/image/4c336497ab2e5edd.jpeg?q=70"
            />

            <img
              alt="banner"
              className="col-4"
              src="https://rukminim2.flixcart.com/fk-p-flap/656/352/image/f20f854a6cb83576.png?q=70"
            />
          </div>
        </div>
        {/* ----------------------------------sectionFour----------------------------------------- */}
        <div className="sectionFour ">
          <div className="row">
            <div className="col-2 leftSide   ">
              <h4 className="fs-2">
                Top Deals on <br /> Apple
              </h4>
              <button className="btn btn-primary btn-md py-2 px-5 mt-4 ">
                <Link
                  to={`/productall/Mobiles/Apple/`}
                  style={{ textDecoration: "none", color: "#fff" }}
                >
                  {" "}
                  View All{" "}
                </Link>
              </button>
            </div>

            <div className="col-10 rightSide " id="dsafsdafkmvkeo">
              <Slider {...settings}>
                {allProducts.map((data, index) => {
                  if (
                    data.subCategory === "Apple" &&
                    data.stockStatus === "In-Stock" &&
                    data.recycleBin === false
                  ) {
                    if (data.setFeatured === true) {
                      return (
                        <div className="productBox" key={index}>
                          <img
                            alt="banner"
                            style={{ width: "180px", height: "200px" }}
                            src={data.image1}
                          />
                          <p
                            className="mt-3"
                            style={{ fontWeight: "700", fontSize: "17px" }}
                          >
                            <Link
                              to={`/productdetail/${data.Category}/${data.subCategory}/${data.id}/${data.name}/`}
                            >
                              {" "}
                              {data.name.slice(0, 50) + "..."}{" "}
                            </Link>
                          </p>
                          <p
                            style={{
                              color: "#388e3c",
                              marginTop: "-10px",
                              fontSize: "15px",
                            }}
                          >
                            Min {data.discountPercent} % Off
                          </p>
                          <p
                            style={{
                              opacity: ".6",
                              marginTop: "-10px",
                              fontSize: "11px",
                            }}
                          >
                            {" "}
                            {data.subCategory}{" "}
                          </p>
                        </div>
                      );
                    }
                  }
                })}
              </Slider>
            </div>
          </div>
        </div>
        <br /> <br />
      </div>{" "}
      {/* .selfcontainer  */}
      {/* ----------------------------------footer----------------------------------------- */}
      <Footer />
    </>
  );
};

export default Home;
