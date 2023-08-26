import React from "react";
import { Link } from "react-router-dom";

import { message, productSliderSettings } from "../../../Utils/Util";

import Slider from "react-slick";

const CategoryOfferCarousel = (props) => {
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
          <div key={data.id} style={{ padding: "40px 20px" }}>
            <div style={{ paddingBottom: "30px" }}>
              <div
                className=""
                data-cy="Products Available"
                style={{
                  backgroundColor: "#fff",
                  padding: "20px 0",
                  height: "350px",
                }}
              >
                <div className="d-flex flex-column  justify-content-center align-items-center">
                  <img
                    className="img-fluid"
                    style={{
                      width: "250px",
                      height: "250px",
                      textAlign: "center",
                    }}
                    src="https://hips.hearstapps.com/hmg-prod/images/iphone-lineup-2022-1663709827.jpg?crop=0.6666666666666666xw:1xh;center,top&resize=1200:*"
                    alt={data.subCategory}
                  />
                </div>

                <div className="px-3">
                  <p
                    className="mt-2"
                    style={{ fontWeight: "600", fontSize: "15px" }}
                  >
                    <Link
                      style={{ textDecoration: "none" }}
                      to={`/productdetail/${data.Category}/${data.subCategory}/${data.id}/${data.name}/`}
                    >
                      {" "}
                      Iphone 14 Pro Max
                    </Link>
                  </p>

                  <p
                    style={{
                      color: "black",
                      marginTop: "-10px",
                      fontSize: "20px",
                      fontWeight: "700",
                    }}
                  >
                    Up to 15% Off
                  </p>
                </div>
              </div>
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

export default CategoryOfferCarousel;
