import React from "react";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { AiFillHeart, AiFillWallet } from "react-icons/ai";
import {
  BsFillPatchQuestionFill,
  BsFillCloudDownloadFill,
} from "react-icons/bs";
import { BiPlusMedical, BiUserCircle } from "react-icons/bi";

const Checkout = () => {
  return (
    <>
      <header>
        <div className="headerr">
          <div className="left-side">
            <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
              <span className="logo"> Mobile Kart </span> <br />
              <span style={{ color: "black", fontWeight: "700" }}>
                Explore
                <span style={{ color: "#ffe500", fontWeight: 600 }}>Plus</span>
              </span>
            </Link>
          </div>
        </div>
      </header>

      <br />
      <br />
      <br />

      <div className="checkout">
        <section style={{ padding: "30px 30px" }}>
          <div className=" leftSide">
            <div className="allCards">
              <div className="cardBox d-flex ">
                <div>
                  <p className="count">1</p>
                </div>

                <div>
                  <p className="upper"> Login </p>
                  <p className="d-block down ">
                    ajay pratap singh XXXX XXX XXX
                  </p>
                </div>

                <button className="align-self-center rightSideBtn">
                  Change
                </button>
              </div>
            </div>

            {/* second box */}

            <div className="allCards" style={{ padding: "0" }}>
              <div className="cardBox  ">
                <div
                  className=" d-flex bg-primary"
                  style={{ padding: "10px 0 0 20px" }}
                >
                  <p className="count">2</p>
                  <p className="upper text-light"> DELIVERY ADDRESS </p>
                </div>
              </div>

              <div className="allCards">
                <div className="cardBox d-flex ">
                  <div>
                    <p className="count">
                      <input type="radio" />
                    </p>
                  </div>

                  <div>
                    <p className="d-block down ">
                      ajay pratap singh XXXX XXX XXX
                    </p>

                    <p className="d-block down ">
                      Sarswati sadan baghel nagar railway road sikandra rao
                      hatrash, Near railway station, Sikandra Rao, Uttar Pradesh
                    </p>

                    <p className=" ">
                      <button
                        className="btn px-5"
                        style={{ backgroundColor: "#fb641b", color: "#fff" }}
                      >
                        DELIVER HERE
                      </button>
                    </p>

                    {/* <p className="upper"> Login </p> */}
                  </div>

                  <button className="align-self-center rightSideBtn">
                    Edit
                  </button>
                </div>
              </div>

              <div className="allCards">
                <div className="cardBox d-flex ">
                  <div>
                    <p className="count">
                      <input type="radio" />
                    </p>
                  </div>

                  <div>
                    <p className="d-block down ">
                      ajay pratap singh XXXX XXX XXX
                    </p>

                    <p className="d-block down ">
                      Sarswati sadan baghel nagar railway road sikandra rao
                      hatrash, Near railway station, Sikandra Rao, Uttar Pradesh
                    </p>

                    <p className=" ">
                      <button
                        className="btn px-5"
                        style={{ backgroundColor: "#fb641b", color: "#fff" }}
                      >
                        DELIVER HERE
                      </button>
                    </p>

                    {/* <p className="upper"> Login </p> */}
                  </div>

                  <button className="align-self-center rightSideBtn">
                    Edit
                  </button>
                </div>
              </div>
            </div>

            {/* THIRD box */}

            <div className="allCards" style={{ padding: "0" }}>
              <div className="cardBox  ">
                <div
                  className=" d-flex bg-primary"
                  style={{ padding: "10px 0 0 20px" }}
                >
                  <p className="count"> 3 </p>
                  <p className="upper text-light"> ORDER SUMMARY </p>
                </div>
              </div>

              <div className="allCards">
                <div className="cardBox d-flex " style={{ padding: "10px 0" }}>
                  <div style={{ textAlign: "center" }}>
                    <img
                      src="https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/3/5/l/-original-imaghx9qmgqsk9s4.jpeg?q=70"
                      style={{ width: "100px", height: "120px" }}
                    />

                    <div className="mt-3">
                      <input
                        type="button"
                        className="mr-3"
                        style={{
                          borderRadius: "50%",
                          width: "25px",
                          height: "25px",
                          border: "1px solid #ddd",
                          fontSize: "15px",
                          marginRight: "10px",
                        }}
                        value="-"
                      />
                      <input
                        type="number"
                        style={{
                          width: "50px",
                          border: "1px solid #ddd",
                          fontSize: "15px",
                          padding: "3px",
                          textAlign: "center",
                        }}
                        value={1}
                      />
                      <input
                        type="button"
                        className="ml-3"
                        style={{
                          borderRadius: "50%",
                          width: "25px",
                          height: "25px",
                          border: "1px solid #ddd",
                          fontSize: "15px",
                          marginLeft: "10px",
                        }}
                        value="+"
                      />
                    </div>
                  </div>

                  <div className="" style={{ margin: "0 0 0 40px" }}>
                    <p
                      style={{
                        color: "#212121",
                        fontSize: "16px",
                        fontWeight: "500",
                      }}
                    >
                      APPLE 32 GB Internal
                    </p>
                    <p
                      style={{
                        color: "#878787",
                        fontSize: "13px",
                        fontWeight: "500",
                        marginTop: "-10px",
                      }}
                    >
                      Seller : Name
                    </p>
                    <p className="mt-2">
                      <del
                        style={{
                          color: "#878787",
                          fontSize: "13px",
                          fontWeight: "500",
                          marginTop: "-10px",
                        }}
                      >
                        ₹ 70550
                      </del>
                      <span
                        style={{
                          color: "#212121",
                          fontSize: "18px",
                          fontWeight: "500",
                          marginLeft: "10px",
                        }}
                      >
                        ₹70550
                      </span>
                      <span
                        style={{
                          color: "#388e3c",
                          fontSize: "13px",
                          fontWeight: "bold",
                          marginLeft: "10px",
                        }}
                      >
                        11 % Off
                      </span>
                    </p>

                    <p
                      style={{
                        color: "#212121",
                        fontSize: "16px",
                        fontWeight: "400",
                        marginTop: "-10px",
                      }}
                    >
                      + ₹99 Secured Packaging Fee
                    </p>

                    <a
                      href="#"
                      style={{
                        color: "#212121",
                        fontSize: "16px",
                        fontWeight: "500",
                        fontSize: "18px",
                        textDecoration: "none",
                      }}
                    >
                      Remove
                    </a>
                  </div>

                  <div style={{ margin: "0 0 0 150px" }}>
                    <p
                      style={{
                        color: "#212121",
                        fontSize: "16px",
                        fontWeight: "400",
                      }}
                    >
                      Delivery by Tue Jul 11
                      <span>
                        {" | "}
                        <b
                          style={{
                            color: "green",
                            fontSize: "16px",
                            fontWeight: "400",
                          }}
                        >
                          Free
                        </b>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="allCards">
              <div className="cardBox d-flex ">
                <p> Order confirmation email will be sent to </p>

                <button
                  className="btn px-5 py-1 rightSideBtn"
                  style={{
                    backgroundColor: "#fb641b",
                    color: "#fff",
                    fontSize: "18px",
                  }}
                >
                  CONTINUE
                </button>
              </div>
            </div>

            {/* Forth box */}

            <div className="allCards" style={{ padding: "0" }}>
              <div className="cardBox  ">
                <div
                  className=" d-flex bg-primary"
                  style={{ padding: "10px 0 0 20px" }}
                >
                  <p className="count"> 4 </p>
                  <p className="upper text-light"> PAYMENT OPTIONS </p>
                </div>
              </div>

              <div className="allCards">
                <div className="cardBox  " style={{ padding: "10px 0" }}>
                  <div className="d-flex ">
                    <p>
                      <input type="radio" />
                    </p>
                    <p> Phone Pe </p>
                  </div>

                  <div className="d-flex ">
                    <p>
                      <input type="radio" />
                    </p>
                    <p className="ml-5"> Google Pe </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rightSide">
            <p
              style={{
                textTransform: "uppercase",
                fontSize: "15px",
                fontWeight: "500",
                color: "#878787",
              }}
            >
              Price Details
            </p>

            <hr />

            <div className="d-flex justify-content-between">
              <p>Price (1 item) </p>
              <p>₹70,999 </p>
            </div>

            <div className="d-flex justify-content-between">
              <p>Delivery Charges </p>
              <p style={{ color: "green" }}> Free </p>
            </div>

            <div className="d-flex justify-content-between">
              <p>Packaging Charges </p>
              <p>₹99 </p>
            </div>

            <p style={{ border: "1px dotted #c2b6b6" }}></p>

            <div className="d-flex justify-content-between">
              <p>
                <b> Amount Payable </b>
              </p>
              <p>
                <b> ₹70,999 </b>
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Checkout;
