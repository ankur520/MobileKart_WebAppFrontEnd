import React from "react";
import Slider from "react-slick";

const ProductSlider = () => {
  const imagesArray = [
    {
      image:
        "https://rukminim1.flixcart.com/fk-p-flap/400/400/image/324eee4e5f645574.jpg?q=70",
    },
    {
      image:
        "https://rukminim1.flixcart.com/image/400/400/kzzw5u80/shoe/f/n/u/7-232032-8-skechers-bklm-original-imagbvx55pysfwhf.jpeg?q=70",
    },
    {
      image:
        "https://rukminim1.flixcart.com/image/400/400/xif0q/kids-ethnic-set/w/u/3/6-7-years-gaps-taf-pcw-atun-original-imagqamvasgpd6bh.jpeg?q=70",
    },
    {
      image:
        "https://rukminim1.flixcart.com/image/400/400/kq8dua80/shoe/c/d/i/7-95000215-41-roamra-white-original-imag4ahytjmqdzz8.jpeg?q=70",
    },
    {
      image:
        "https://rukminim1.flixcart.com/image/400/400/kq8dua80/shoe/c/d/i/7-95000215-41-roamra-white-original-imag4ahytjmqdzz8.jpeg?q=70",
    },
    {
      image:
        "https://rukminim1.flixcart.com/image/400/400/xif0q/kids-ethnic-set/w/u/3/6-7-years-gaps-taf-pcw-atun-original-imagqamvasgpd6bh.jpeg?q=70",
    },
    {
      image:
        "https://rukminim1.flixcart.com/image/400/400/kq8dua80/shoe/c/d/i/7-95000215-41-roamra-white-original-imag4ahytjmqdzz8.jpeg?q=70",
    },
    {
      image:
        "https://rukminim1.flixcart.com/image/400/400/kq8dua80/shoe/c/d/i/7-95000215-41-roamra-white-original-imag4ahytjmqdzz8.jpeg?q=70",
    },
    {
      image:
        "https://rukminim1.flixcart.com/image/400/400/xif0q/kids-ethnic-set/w/u/3/6-7-years-gaps-taf-pcw-atun-original-imagqamvasgpd6bh.jpeg?q=70",
    },
    {
      image:
        "https://rukminim1.flixcart.com/image/400/400/kq8dua80/shoe/c/d/i/7-95000215-41-roamra-white-original-imag4ahytjmqdzz8.jpeg?q=70",
    },
    {
      image:
        "https://rukminim1.flixcart.com/image/400/400/kq8dua80/shoe/c/d/i/7-95000215-41-roamra-white-original-imag4ahytjmqdzz8.jpeg?q=70",
    },
  ];

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <>
      <Slider {...settings}>
        {imagesArray.map((slide, index) => {
          return (
            <div className="productBox" key={index}>
              <img
                style={{ width: "250px", height: "250px" }}
                src={slide.image}
              />
              <p
                className="mt-3"
                style={{ fontWeight: "700", fontSize: "17px" }}
              >
                {" "}
                Nike , Sketchers{" "}
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
                style={{ opacity: ".6", marginTop: "-10px", fontSize: "11px" }}
              >
                Men's Shoes
              </p>
            </div>
          );
        })}
      </Slider>
    </>
  );
};

export default ProductSlider;
