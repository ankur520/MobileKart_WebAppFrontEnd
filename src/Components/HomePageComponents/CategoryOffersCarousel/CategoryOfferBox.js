import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

import { BsArrowRightCircleFill } from "react-icons/bs";

import CategoryOfferCarousel from "./CategoryOfferCarousel";

const CategoryOfferBox = (props) => {
  // console.log(props.productsArray[0])
  // console.log(props)

  return (
    <>
      <div
        className=""
        id="productCarouselBox"
        style={{
          backgroundImage:
            "url('https://st2.depositphotos.com/1023213/6867/i/450/depositphotos_68677431-Grass-Background-Texture.jpg')",
          objectFit: "contain",
        }}
      >
        <div className="row px-1  ">
          <div className="col-12  d-flex justify-content-between px-5 py-3 ">
            <p style={{ color: "#fff", fontSize: "25px", fontWeight: 700 }}>
              {" "}
              {props.heading} Latest
            </p>
            <p style={{ color: "#fff", fontSize: "25px", fontWeight: 700 }}>
              {" "}
              <BsArrowRightCircleFill />{" "}
            </p>
          </div>
        </div>

        <div className="col-12 ">
          <CategoryOfferCarousel
            productsArray={props.productsArray}
            subCategory={props.subCategory}
          />
        </div>
      </div>
    </>
  );
};

export default CategoryOfferBox;
