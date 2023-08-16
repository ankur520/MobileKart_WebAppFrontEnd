import React from "react";
import { Link } from "react-router-dom";

import { message, productSliderSettings } from "../../../Utils/Util";

import Slider from "react-slick";

const Carousel = (props) => {
  // console.log("Product - " , props )

  let sliderData = "";

  if (props.productsArray.length > 0) {
    sliderData = props.productsArray.map((data, index) => {
      if (
        data.subCategory === props.subCategory &&
        data.stockStatus === "In-Stock" &&
        data.recycleBin === false &&
        data.setFeatured === true
      ) {
        return (
          <div key={data.id}>
            <div className="productBox" data-cy="Products Available">
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
                title={data.subCategory}
              >
                {data.subCategory}{" "}
              </p>
            </div>
          </div>
        );
      }
    });
  } else {
    sliderData = (
      <h3 data-cy="Sorry Products Not Available">
        Sorry Products Not Available
      </h3>
    );
  }

  return (
    <>
      <Slider {...productSliderSettings}>{sliderData}</Slider>
    </>
  );
};

export default Carousel;
