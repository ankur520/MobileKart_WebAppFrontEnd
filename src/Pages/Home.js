import React from "react";
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import axios from "axios";

import {backendApis} from "../Utils/APIS"

// icons
import { AiOutlineRight } from "react-icons/ai";
import { AiOutlineLeft } from "react-icons/ai";

import Slider from "react-slick";

// pages Components
import Header from "../Components/Header";
import SecondHeader from "../Components/SecondHeader";
import Footer from "../Components/Footer";
import {
  message,
  CarouselImages,
  productSliderSettings,
} from "../Utils/Util";

import Banner from "../Components/HomePageComponents/BannerCarousel/Banner";
import ProductCarousel from "../Components/HomePageComponents/ProductCarousel/ProductCarousel";

// import ProductSlider from "../ProductsSlider";

const Home = (props) => {

  


  const [allProducts, setallProducts] = useState([]);

  const fetchFromDb = () => {

    axios
      .get(backendApis.vendorApi.addproduct)

      .then(function (response) {
        if (response.data.msg === "addProductGETRequest") {
          // console.log("addProductGETRequest")
          // console.log(response.data.getAllProducts)
          setallProducts(response.data.getAllProducts);
        } else {
          console.log("27 Else -", response);
        }
      });
  };

  useEffect(() => {
    fetchFromDb();
  }, []);

  return (
    <>
      <Header />
      <SecondHeader />
      <div className="selfcontainer">
        <Banner imageArray={CarouselImages} />
        <div className="sectionTwo  row">
          <div className="col-2 leftSection">
            <h1>Top Offers</h1>
            <button className="btn btn-primary mt-4"> View ALL </button>
          </div>

          <div className="col-10  middleSection ">
            <Slider {...productSliderSettings}>
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

          
            </Slider>
          </div>
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
              <ProductCarousel
                productsArray={allProducts}
                subCategory="Samsung"
              />
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
              <ProductCarousel
                productsArray={allProducts}
                subCategory=""
              />
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
