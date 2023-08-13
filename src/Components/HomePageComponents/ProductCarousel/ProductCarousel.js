import React from "react";
import { Link } from "react-router-dom";

import {
  message,
  HomeCarouselsettings,
  buttonStylePrevArrow,
  buttonStyleNextArrow,
  bannerCarouselProperties,
} from "../../../Utils/Util";

import Slider from "react-slick";

const ProductCarousel = (props) => {
  // console.log(props.productsArray[0])
  // console.log(props.subCategory)

  let sliderData = "";

  if (props.productsArray.length > 0) {
    sliderData = props.productsArray.map((data, index) => {
        
      if (
        data.subCategory === props.subCategory  &&
        data.stockStatus === "In-Stock" &&
        data.recycleBin === false &&
        data.setFeatured === true
      ) {


        return (
          <>
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
          </>
        );
      }
    });
  } else {
    sliderData = <h3>Sorry Products Not Available</h3>;
  }

  return (
    <>
      <Slider {...HomeCarouselsettings}>{sliderData}</Slider>
    </>
  );
};

export default ProductCarousel;
