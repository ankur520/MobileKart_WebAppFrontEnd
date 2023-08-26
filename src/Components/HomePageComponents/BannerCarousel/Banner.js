import React from "react";
// images sliders
import { Slide } from "react-slideshow-image";

import {
  name,
  HomeCarouselsettings,
  buttonStylePrevArrow,
  buttonStyleNextArrow,
  bannerCarouselProperties,
} from "../../../Utils/Util";

const Banner = (props) => {
  //   console.log("from " + name);
  //   console.log("Props" , props.imageArray[0] )

  let carouselImages = "";

  if (props.imageArray.length > 0) {
    carouselImages = props.imageArray.map((data, index) => {
      // console.log(index);
      return (
        <div
          data-cy="Banner Images Available"
          className="each-slide-effect"
          key={index}
        >
          <img
            className="img-fluid"
            alt="Image Banner"
            src={data}
            style={{ width: "100%", height: "300px", objectFit: "" }}
          />
          {/* <div style={{ backgroundImage: `url( ${data}  )` }}></div> */}
        </div>
      );
    });
  } else {
    carouselImages = (
      <h4 className="text-center py-5" data-cy="Banner Images Not Available">
        Banner Images Not Available
      </h4>
    );
  }

  return (
    <>
      {/* image CAROSEL */}
      <Slide {...bannerCarouselProperties}>{carouselImages}</Slide>
    </>
  );
};

export default Banner;
