import React from "react";
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import axios from "axios";

// icons
import { AiOutlineRight } from "react-icons/ai";
import { AiOutlineLeft } from "react-icons/ai";

import Slider from "react-slick";

// pages Components
import Header from "../Components/Header";
import SecondHeader from "../Components/SecondHeader";
import Footer from "../Components/Footer";
import { message, CarouselImages, productSliderSettings } from "../Utils/Util";

import Banner from "../Components/HomePageComponents/BannerCarousel/Banner";
import ProductBox from "../Components/HomePageComponents/ProductCarousel/ProductBox";
import ReactLoading from "react-loading";
// import ProductSlider from "../ProductsSlider";

// import ErrorBoundary from "../ErrorBoundary";
import CategoryOfferBox from "../Components/HomePageComponents/CategoryOffersCarousel/CategoryOfferBox";

import { backendApis } from "../Utils/APIS";

const Home = (props) => {
  const [isLoading, setisLoading] = useState(false);
  const [allProducts, setallProducts] = useState([]);

  const fetchFromDb = async () => {
    setisLoading(true);
    await axios
      .get(backendApis.vendorApi.addproduct)

      .then(function (response) {
        // console.log(response.data);
        if (response.data.status === 200) {
          if (response.data.msg === "addProductGETRequest") {
            setallProducts(response.data.getAllProducts);
            setisLoading(false);
          }
        }
      });
  };

  useEffect(() => {
    fetchFromDb();
  }, []);

  return (
    <>
      <Header />
      {/* <button onClick={() => methodDoesNotExist()}>Break the world</button>; */}
      <div className="selfcontainer">
        {/* <Banner imageArray={[]} /> */}
        <Banner imageArray={CarouselImages} />
        <div className="sectionTwo  row">
          <div className="col-2 leftSection">
            <h1>Top Offers</h1>
            <button className="btn btn-primary mt-4"> View ALL </button>
          </div>

          <div className="col-10  middleSection ">
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
                          to={`/productdetail/${data.CategoryId.cat_name}/${data.subCategoryId.sub_cat_name}/${data.id}/${data.name}/`}
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
        <CategoryOfferBox
          productsArray={allProducts}
          subCategory="Samsung"
          heading="Samsung"
        />
        <ProductBox
          // productsArray={[]}
          productsArray={allProducts}
          subCategory="Samsung"
          isLoading={isLoading}
        />
        <br /> <br />
        <br /> <br />
        {/* ------------------------------sectionThree again --------------------------------------------- */}
        <div className="sectionThree mt-0">
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
        <CategoryOfferBox
          productsArray={allProducts}
          subCategory="Samsung"
          heading="Apple"
        />
        {/* ----------------------------------sectionFour----------------------------------------- */}
        <ProductBox
          // productsArray={[]}
          productsArray={allProducts}
          subCategory="Apple"
        />
        <br /> <br />
      </div>{" "}
      {/* .selfcontainer  */}
      {/* ----------------------------------footer----------------------------------------- */}
      <Footer />
    </>
  );
};

export default Home;
