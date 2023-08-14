export  const message = "Working"


// ----------------------------------------------
// --------- HOME PAGE UTILS 
// -----------------------------------------------

export const HomeCarouselsettings = {
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


  


//  banner caroutes btn css
export const buttonStylePrevArrow = {
    width: "30px",
    background: "#fff",
    border: "0px",
    padding: "60px 20px",
    borderRadius: "0px 10px 10px 0px",
    zIndex: 1,
  };
  
  export const buttonStyleNextArrow = {
    width: "30px",
    background: "#fff",
    border: "0px",
    padding: "60px 20px",
  
    borderRadius: "10px 0px 0px 10px",
    zIndex: 1,
  }; 


export const bannerCarouselProperties = {
    prevArrow: (
      <button style={{ ...buttonStylePrevArrow }}>
       
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#fff">
          <path d="M242 180.6v-138L0 256l242 213.4V331.2h270V180.6z" />
        </svg>
      </button>
    ),
    nextArrow: (
      <button style={{ ...buttonStyleNextArrow }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#fff">
          <path d="M512 256L270 42.6v138.2H0v150.6h270v138z" />
        </svg>
      </button>
    ),
  };


  
export const CarouselImages = [
  "https://rukminim1.flixcart.com/fk-p-flap/3376/560/image/39f612e8c1868c6a.jpeg?q=50",
  "https://rukminim1.flixcart.com/fk-p-flap/3376/560/image/cf71d5229c7409e3.png?q=50",
  "https://rukminim1.flixcart.com/fk-p-flap/3376/560/image/319f82797db3034e.jpg?q=50",
  "https://rukminim1.flixcart.com/fk-p-flap/3376/560/image/6a46d1114486b4a2.jpeg?q=50",
];


// ---- products slider settings 


export const productSliderSettings = {
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
        dots: false,
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