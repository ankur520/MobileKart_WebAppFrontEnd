import React, { useState } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

const Cart = (props) => {
  const navigate = useNavigate();

  // console.log("PROPS- ", props )

  const [fetchCart, setfetchCart] = useState([]);
  const [fetchAddress, setfetchAddress] = useState([]);

  const [productQtyInput, setproductQtyInput] = useState(1);
  const [totalAmount, settotalAmount] = useState(0);
  const [loading, setloading] = useState(true);
  const [selectRadio, setselectRadio] = useState();

  var totalCartValue = 0;
  var totalCartSavings = 0;
  var deliveryCharges = 0;
  var TaxesCharges = 0;
  var TaxClass = "";
  var TaxPercent = 0;
  var finalAmountAfterDiscount = 0;
  var totalCartTax = 0;
  var totalPayableAmount = 0;

  const fetchCartById = (userId) => {
    // let sessionUrl = "http://localhost:8000/userApi/fetch-cart-byUserId/60/";

    let sessionUrl = `http://localhost:8000/userApi/fetch-cart-byUserId/${userId}/`;

    axios
      .get(sessionUrl)

      .then(function (response) {
        // console.log("dataArray- ", response.data.cartFullArray);

        // console.log("length- " , response.data.cartFullArray.length )

        // to prevent from error in front end  we validated here
        if (response.data.cartFullArray.length > 0) {
          setfetchCart(response.data.cartFullArray);
        }

        setloading(false);
      })

      .catch(function (error) {
        // console.log("Fetch Cart Error ", error);
      });
  };

  const fetchAddressById = (userId) => {
    let sessionUrl = `http://localhost:8000/userApi/add-address/${userId}/`;

    axios
      .get(sessionUrl)

      .then(function (response) {
        // console.log(response.data.dataArray)

        if (response.data.dataArray.length > 0) {
          setfetchAddress(response.data.dataArray);
        }
      })

      .catch(function (error) {
        // console.log("fetch Address Error- ", error)
      });
  };

  useEffect(() => {
    // token not available go back
    if (!localStorage.getItem("userLoginToken")) {
      // console.log("userLoginToken is null go back ")
      navigate("/");
    }

    // console.log("Cart Page use Effet " , props.loggedUserInfo.fetchedId )

    fetchCartById(props.loggedUserInfo.fetchedId);
    // fetchCartById(60);

    fetchAddressById(props.loggedUserInfo.fetchedId);
    // fetchAddressById( 60 );
  }, [props]);

  const inputOnChange = (e) => {
    if (e.target.name === "productQtyInput") {
      setproductQtyInput(e.target.value);
    }

    if (e.target.name === "radioBtn") {
      setselectRadio(e.target.value);
    }
  };

  function updateCartQty(cartId, slugName) {
    let sessionUrl = `http://localhost:8000/userApi/update-cartqty-byproductid/${cartId}/${slugName}/`;
    // console.log(sessionUrl)

    axios
      .put(sessionUrl)

      .then(function (resposne) {
        // alert(resposne.data.msg)
      })
      .catch(function (error) {
        // console.log("Error- ", error  )
      });
  }

  const plusBtnOnClick = (cart_id) => {
    // console.log("plusBtnOnClick" , cart_id )

    setfetchCart((fetchCart) =>
      fetchCart.map(
        (item) =>
          cart_id === item.id
            ? { ...item, qty: item.qty + (item.qty < 10 ? 1 : 0) }
            : item
        // console.log( "inside- "  , item  )
      )
    );
    updateCartQty(cart_id, "incremented");
  };

  const minusBtnOnClick = (cart_id) => {
    // console.log("minusBtnOnClick" , cart_id )

    setfetchCart((fetchCart) =>
      fetchCart.map(
        (item) =>
          cart_id === item.id
            ? { ...item, qty: item.qty - (item.qty > 1 ? 1 : 0) }
            : item
        // cart_id === item.id ? {...item, qty : item.qty - 1 } : item

        // console.log( "inside- "  , item  )
      )
    );

    updateCartQty(cart_id, "decremented");
  };

  const deleteCartItem = (e, userId, cartId) => {
    e.preventDefault();

    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Removing";

    let sessionUrl = `http://localhost:8000/userApi/delete-cartItem/${userId}/${cartId}/`;

    // console.log("deletebtn- " , sessionUrl)

    axios
      .delete(sessionUrl)

      .then(function (response) {
        if (response.data.msg === "CartItemDeleted") {
          alert(response.data.msg);
          thisClicked.closest("#removeTheElement").remove();
        } else {
          alert(response.data.msg);
        }
      })

      .catch(function (error) {
        // console.log("Error- " , error )
      });
  };

  const radioOnClick = (e, addressId) => {
    console.log("dsfasdf");
    const thisBtn = e.currentTarget;
  };

  // ----------------------------------------------------------------------------------------------------
  //  --------------------------------- fetchCart_dataAfterLengthValidation
  // -----------------------------------------------------------------------------------------------------

  var fetchCart_dataAfterLengthValidation = "";

  if (fetchCart.length > 0) {
    // console.log("yes its filled")

    fetchCart_dataAfterLengthValidation = fetchCart.map((data, index) => {
      // console.log("201- " , data.userId_id[0][0].u_email )

      // Shipping types and Charges
      var shippingStatus = data.productKey[0].shippingStatus;

      switch (shippingStatus) {
        case "flatShipping":
          deliveryCharges = data.productKey[0].shippingAmount;
          break;

        case "locationWise":
          break;

        default:
          deliveryCharges = 0;
          break;
      }

      // Shipping types and Charges
      var taxStatus = data.productKey[0].taxStatus;

      if (taxStatus === "taxable") {
        TaxClass = data.productKey[0].taxClass;
        var stringToNo = TaxClass.match(/(\d+)/);
        TaxPercent = stringToNo[0];
      } else {
        // non_taxable
        TaxClass = "";
      }

      // total cart value
      totalCartValue +=
        (data.productKey[0].mrp -
          parseInt(
            (data.productKey[0].mrp * data.productKey[0].discountPercent) / 100
          )) *
        data.qty;
      // total saving on cart
      totalCartSavings +=
        parseInt(
          (data.productKey[0].mrp * data.productKey[0].discountPercent) / 100
        ) * data.qty;
      // calculate amount after discount
      finalAmountAfterDiscount =
        data.productKey[0].mrp -
        parseInt(
          (data.productKey[0].mrp * data.productKey[0].discountPercent) / 100
        );
      // calculate tax for each product on amount
      TaxesCharges = ((finalAmountAfterDiscount * TaxPercent) / 100) * data.qty;

      totalCartTax += TaxesCharges;
      // console.log("TaxesCharges- ", finalAmountAfterDiscount ,TaxPercent,  ' -> ' ,    TaxesCharges )

      totalPayableAmount = totalCartValue + totalCartTax + deliveryCharges;

      if (data.orderPlacedStatus === false) {
        return (
          <div key={index} id="removeTheElement" className="allCards">
            <div className="cardBox d-flex " style={{ padding: "10px 0" }}>
              <div style={{ textAlign: "center" }}>
                <img
                  src={data.productKey[0].image1}
                  style={{ width: "100px", height: "120px" }}
                />
                {/* <p> id - {data.id}</p>
              <p> productId_id - {data.id}</p>
              <p> user - {data.userKey[0].id } -- {data.userKey[0].u_email } </p> */}

                <div className="mt-3">
                  <div className=" d-flex justify-content-between ">
                    <div
                      className="input-group d-flex w-auto justify-content-center align-items-center  "
                      id="elementId+'${index}'"
                    >
                      <input
                        type="button"
                        onClick={() => minusBtnOnClick(data.id)}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          textAlign: "center",
                          verticalAlign: "middle",
                          width: "2rem",
                          height: "2rem",
                        }}
                        value="-"
                        className="button-minus border rounded-circle  mx-2 "
                        data-field="quantity"
                      />
                      <input
                        type="number"
                        id="quantityInput"
                        onChange={inputOnChange}
                        value={data.qty}
                        name="productQtyInput"
                        style={{ border: "1px solid #ddd" }}
                        step="1"
                        max="10"
                        className="quantity-field text-center w-25"
                      />
                      <input
                        type="button"
                        onClick={() => plusBtnOnClick(data.id)}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          textAlign: "center",
                          verticalAlign: "middle",
                          width: "2rem",
                          height: "2rem",
                        }}
                        value="+"
                        className="button-plus border rounded-circle mx-2 "
                        data-field="quantity"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="">
                <p
                  style={{
                    color: "#212121",
                    fontSize: "16px",
                    fontWeight: "500",
                  }}
                >
                  {data.productKey[0].name}
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
                    {data.productKey[0].mrp}
                  </del>
                  <span
                    style={{
                      color: "#212121",
                      fontSize: "18px",
                      fontWeight: "500",
                      marginLeft: "10px",
                    }}
                  >
                    ₹ {finalAmountAfterDiscount}
                  </span>
                  <span
                    style={{
                      color: "#388e3c",
                      fontSize: "13px",
                      fontWeight: "bold",
                      marginLeft: "10px",
                    }}
                  >
                    {data.productKey[0].discountPercent} % Off
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
                  + tax {TaxPercent} %{" "}
                  <b>
                    {" "}
                    - {parseInt(
                      (finalAmountAfterDiscount * TaxPercent) / 100
                    )}{" "}
                    / Per Product{" "}
                  </b>
                  {/* {
                   TaxPercent
                } */}
                </p>

                <p
                  style={{
                    color: "#212121",
                    fontSize: "18px",
                    fontWeight: "500",
                    marginTop: "-10px",
                  }}
                >
                  Total Amount - ₹{" "}
                  {(data.productKey[0].mrp -
                    parseInt(
                      (data.productKey[0].mrp *
                        data.productKey[0].discountPercent) /
                        100
                    )) *
                    data.qty}
                </p>

                <p
                  style={{
                    color: "#212121",
                    fontSize: "18px",
                    fontWeight: "500",
                    marginTop: "-10px",
                  }}
                >
                  Total Tax - ₹{" "}
                  {((finalAmountAfterDiscount * TaxPercent) / 100) * data.qty}
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
                  onClick={(e) =>
                    deleteCartItem(e, data.userKey[0].id, data.id)
                  }
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
        );
      }
    });
  } else {
    // console.log("Yes its Empty")
    fetchCart_dataAfterLengthValidation = (
      <h4 className="bg-danger text-white py-3 px-3  my-4   mx-5">
        {" "}
        Cart is Empty{" "}
      </h4>
    );
  }

  // ----------------------------------------------------------------------------------------------------
  //  --------------------------------- fetchAddress_dataAfterLengthValidation
  // -----------------------------------------------------------------------------------------------------

  var fetchAddress_dataAfterLengthValidation = "";

  if (fetchAddress.length > 0) {
    fetchAddress_dataAfterLengthValidation = fetchAddress.map((data, index) => {
      return (
        <div className="allCards" key={index}>
          <div className="cardBox d-flex ">
            <div>
              <p className="count">
                <input
                  type="radio"
                  onClick={(e) => radioOnClick(e, data.id)}
                  onChange={inputOnChange}
                  name="radioBtn"
                />
              </p>
            </div>

            <div>
              <p className="down ">
                <b>User Details -</b>

                {data.userKey[0].u_fname + data.userKey[0].u_lname}

                <span style={{ marginLeft: "40px" }}>
                  {" "}
                  {data.userKey[0].u_email}{" "}
                </span>
              </p>

              <p className="down ">
                <b>Receiver Name -</b>

                {data.reciverName}
              </p>

              <div className="d-flex flex-row justify-content-end">
                <p className="down ">
                  <b>Your Address -</b>

                  {data.fullAddress}
                </p>

                <p className="down" style={{ marginLeft: "20px" }}>
                  <b>Your Landmark -</b>

                  {data.landmark}
                </p>

                <p className="down " style={{ marginLeft: "20px" }}>
                  <b>Your City -</b>
                  {data.city} {data.state}
                </p>
              </div>

              <p className=" ">
                <button
                  className="btn px-5"
                  style={{ backgroundColor: "#fb641b", color: "#fff" }}
                >
                  DELIVER HERE
                </button>
              </p>
            </div>

            <button className="align-self-center rightSideBtn">Edit</button>
          </div>
        </div>
      );
    });
  } else {
    fetchAddress_dataAfterLengthValidation = (
      <h4 className="bg-danger text-white py-3 px-3  my-4   mx-5">
        {" "}
        Address Not Added Please Add Address From Profile Page{" "}
        <Link to="/user"> Click Here </Link>{" "}
      </h4>
    );
  }

  // ----------------------------------------------------------------------------------------------------
  //  --------------------------------- END fetchAddress_dataAfterLengthValidation
  // -----------------------------------------------------------------------------------------------------

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
            {/* second box */}

            <div className="allCards" style={{ padding: "0" }}>
              <div className="cardBox  ">
                <div
                  className=" d-flex bg-primary"
                  style={{ padding: "10px 0 0 20px" }}
                >
                  <p className="count">2</p>
                  <p className="upper text-light"> Deliver To </p>
                </div>
              </div>

              {fetchAddress_dataAfterLengthValidation}
            </div>

            {/* THIRD box */}

            <div className="allCards" style={{ padding: "0" }}>
              {fetchCart_dataAfterLengthValidation}
            </div>
          </div>

          <div className="rightSide">
            <div className="box1">
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
                <p>Price ( {fetchCart.length} ) Items </p>
                <p>₹ {totalCartValue} </p>
              </div>

              <div className="d-flex justify-content-between">
                <p>Total Discount </p>
                <p>₹ {totalCartSavings} </p>
              </div>

              <div className="d-flex justify-content-between">
                <p>Total Tax </p>
                <p>₹ {totalCartTax} </p>
              </div>

              <div className="d-flex justify-content-between">
                <p>Delivery Charges </p>
                <p style={{ color: "green" }}>
                  {" "}
                  {deliveryCharges <= 0 ? "Free" : "₹ " + deliveryCharges}{" "}
                </p>
              </div>

              <p style={{ border: "1px dotted #c2b6b6" }}></p>

              <div className="d-flex justify-content-between">
                <p>
                  <b> Amount Payable </b>
                </p>
                <p>
                  <b> ₹ {totalPayableAmount} </b>
                </p>
              </div>
            </div>

            <div className="box2 py-5" style={{ height: "auto" }}>
              {/* <div className="d-flex justify-content-between align-items-center">
                <p>Pay ( COD ) </p>
                <p  > <button className="btn btn-success px-4  "> ₹ {totalCartSavings}  </button> </p>
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <p>Pay ( Razor Pay )  </p>
                <p  > <button className="btn btn-success px-4  "> ₹ {totalCartSavings}  </button> </p>
              </div> */}

              <button className="btn btn-primary w-100 py-3  ">
                {" "}
                <Link className="text-light text-bold fs-5" to="/checkout">
                  PLACE ORDER
                </Link>{" "}
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Cart;

{
  /* <input
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
onClick={minusBtnOnClick}
/> */
}

{
  /* <input
type="number"
style={{
width: "50px",
border: "1px solid #ddd",
fontSize: "15px",
padding: "3px",
textAlign: "center",
}}

min={1}
value={productQtyInput}
name="productQtyInput"
onChange={ inputOnChange }
/> */
}

{
  /* <input
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
onClick={plusBtnOnClick}
/> */
}
