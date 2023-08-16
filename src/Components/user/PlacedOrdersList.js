import axios from "axios";
import React from "react";
import { BsFillImageFill, BsFillStarFill, BsStar } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { BrowserRouter } from "react-router-dom";

const AllProducts = (props) => {

  // <BrowserRouter>
    const navigation = useNavigate();
  {/* </BrowserRouter> */}


  const [placedOrderList, setplacedOrderList] = useState([]);

  const fetchFromDb = () => {
    // console.log("------fetchFromDb------")

    axios
      .get("http://localhost:8000/userApi/placeOrder/")

      .then(function (response) {
        if (response.data.status === 200) {
          // console.log("addProductGETRequest")
          // console.log( response.data.getPlacedOrdersList )
          setplacedOrderList(response.data.getPlacedOrdersList);
        } else {
          // console.log("27 Else -" , response)
        }
      })

      .catch(function (error) {
        //   console.log("Axios Error " , error )
      });
  };

  useEffect(() => {
    // console.log("--UseEffect---");

    fetchFromDb();
  }, []);

  return (
    <>
      <div id="allproduct" data-cy="placedOrdersList" >
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Products List</th>
              <th scope="col">Total Payment</th>
              <th scope="col">Payment Mode</th>
              <th scope="col">Payment Id</th>
              <th scope="col">Tracking No</th>
              <th scope="col">Address Id</th>
              <th scope="col">User ID</th>

              <th scope="col">Status</th>

              <th scope="col"> Date </th>
            </tr>
          </thead>

          <tbody>
            {placedOrderList.map((data, index) => {
              let convertStringIntoJSON = eval(data.productsArray);

              if (data.userId_id === props.userId) {
                return (
                  <tr key={index}>
                    <td className="category"> {data.id} </td>

                    <td>
                      <div className="productName">
                        <div className="belowProductName">
                          <div>
                            {" "}
                            {convertStringIntoJSON.map((data, index) => {
                              return (
                                <p key={index} className="productName">
                                  {" "}
                                  <b>
                                    {" "}
                                    Cart Id - {data.cartId} QTY - {data.qty}{" "}
                                  </b>{" "}
                                </p>
                              );
                            })}{" "}
                          </div>
                        </div>
                      </div>
                    </td>
                    {/* (e) => deleteTheProduct(e, props.vendorId, data.id) */}
                    <td className="stock fs-5 ">
                      {" "}
                      <span>₹</span> {data.cartAmount}{" "}
                    </td>
                    <td className="category"> {data.paymentMode} </td>

                    <td className="category"> XXXXXX {data.paymentId} </td>

                    <td className="category"> {data.trackingNo} </td>

                    <td className="category"> {data.addressId_id} </td>
                    <td className="category"> {data.userId_id} </td>

                    <td className="category"> {data.status} </td>

                    <td className="publish">
                      <p>Placed Date</p>
                      <p className="date"> {data.date.toLocaleString()} </p>
                    </td>
                  </tr>
                );
              }

              // console.log("dsfa- ", typeof(data.productsArray) , data.productsArray )
            })}
          </tbody>
        </table>
      </div>

      {(() => {})()}
    </>
  );
};

export default AllProducts;
