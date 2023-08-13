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
        <>
          <div className="each-slide-effect" key={index}>
            <div style={{ backgroundImage: `url( ${data}  )` }}></div>
          </div>
        </>
      );
    });
  } else {
    carouselImages = <h4>Banner Images Not Available</h4>;
  }

  return (
    <>
      {/* image CAROSEL */}
      <Slide {...bannerCarouselProperties}>{carouselImages}</Slide>
    </>
  );
};

export default Banner;
