import React from "react";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";

import { message, productSliderSettings } from "../../../Utils/Util";

import Slider from "react-slick";

const Carousel = (props) => {
  // console.log("Product - " , props.productsArray[0]  )

  let sliderData = "";

  if (props.productsArray.length > 0) {
    sliderData = props.productsArray.map((data, index) => {
      // console.log( data.subCategoryId.sub_cat_name)
      if (
        data.subCategoryId.sub_cat_name === props.subCategory &&
        data.stockStatus === "In-Stock" &&
        data.recycleBin === false &&
        data.setFeatured === true
      ) {
        return (
          <div key={data.id}>
            <span>
              {props.isLoading ? (
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

            <div className="productBox" data-cy="Products Available">
              <img
                className="img-fluid"
                style={{ width: "180px", height: "200px" }}
                src={data.image1}
                alt={data.subCategory}
              />

              <p
                className="mt-3"
                style={{ fontWeight: "700", fontSize: "17px" }}
              >
                <Link
                  to={`/productdetail/${data.CategoryId.cat_name}/${data.subCategoryId.sub_cat_name}/${data.id}/${data.name}/`}
                >
                  {" "}
                  {data.name.slice(0, 40) + "..."}{" "}
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
