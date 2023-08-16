import React from "react";
import {Link , useNavigate  }    from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

import Carousel from "./Carousel";

const ProductBox = (props) => {
  // console.log(props.productsArray[0])
  // console.log(props)

  return (
    <>
      <div className="sectionFour " id="productCarouselBox" >
        <div className="row">
          <div className="col-2 leftSide">
            <h4 className="fs-2">
              Top Deals on <br />{" "}
              <span data-cy="subCategory">{props.subCategory}</span>
            </h4>
            <button className="btn btn-primary btn-md py-2 px-5 mt-4 ">
            
              {/* <BrowserRouter > */}
            
              <Link
                to={`/productall/Mobiles/${props.subCategory}/`}
                style={{ textDecoration: "none", color: "#fff" }}
              >
                {" "}
                View All{" "}
              </Link>

              {/* </BrowserRouter> */}

            </button>
          </div>

          <div className="col-10 rightSide">
            <Carousel
              productsArray={props.productsArray}
              subCategory={props.subCategory}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductBox;
