import axios from "axios";
import React from "react";
import { BsFillImageFill, BsFillStarFill, BsStar } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

const AllProducts = (props) => {
  const navigation = useNavigate();

  const [allProducts, setallProducts] = useState([]);

  const fetchFromDb = () => {
    // console.log("------fetchFromDb------")

    axios
      .get(props.APIS.addProduct)

      .then(function (response) {
        if (response.data.msg === "addProductGETRequest") {
          // console.log("addProductGETRequest")
          // console.log(response.data.getAllProducts)
          setallProducts(response.data.getAllProducts);
        } else {
          console.log("27 Else -", response);
        }
      })

      .catch(function (error) {
        console.log("Axios Error ", error);
      });
  };

  const featuredProductOnClick = (e, productId, msg) => {
    // console.log( productId , msg )

    let sessionUrl =
      props.APIS.setFeaturedProductById + productId + "/" + msg + "/";
    // console.log(sessionUrl)

    axios
      .put(sessionUrl)

      .then(function (response) {
        if (response.data.status === 200) {
          // console.log(response.data.status )
          alert(response.data.msg);
          // navigation("/vendor/allproducts")
          window.location.replace("/vendor/allproducts");
          // return <Navigate to="/vendor" replace={true} />
        }
      })

      .catch(function (error) {
        console.log("Error- ", error);
      });
  };

  useEffect(() => {
    // console.log("--UseEffect---");

    fetchFromDb();
  }, []);

  const deleteTheProduct = (e, vendorId, productId) => {
    // console.log(e.target , vendorId,  productId )

    // console.log("vendorId- "  , vendorId )
    // console.log("productId- "  , productId )

    let sessionUrl =
      props.APIS.deleteProduct + vendorId + "/" + productId + "/";

    axios
      .delete(sessionUrl)

      .then(function (response) {
        if (response.data.msg === "Item-Deleted") {
          alert(response.data.msg);

          // navigation("/vendor/allproducts")
          window.location.replace("/vendor/allproducts");
        }
      });
  };

  const duplicateTheProduct = (e, vendorId, productId) => {
    // console.log(e.target , vendorId,  productId )

    // console.log("vendorId- "  , vendorId )
    // console.log("productId- "  , productId )

    let sessionUrl =
      props.APIS.duplicateProduct + vendorId + "/" + productId + "/";

    axios
      .post(sessionUrl)

      .then(function (response) {
        if (response.data.msg === "DuplicateProductAddedSuccessfully") {
          alert("DuplicateProductAddedSuccessfully");
          window.location.replace("/vendor/allproducts");
        } else {
          alert(response.data.msg);
        }
      });
  };

  return (
    <>
      <div id="allproduct">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">
                <BsFillImageFill />
              </th>
              <th scope="col">Product Name</th>
              <th scope="col">Stock</th>
              <th scope="col">Qty</th>
              <th scope="col">Price</th>
              <th scope="col">Categories</th>
              <th scope="col">
                <BsFillStarFill />
              </th>
              <th scope="col"> Date </th>
            </tr>
          </thead>

          <tbody>
            {allProducts.map((data) => {
              // console.log(data.recycleBin)

              if (
                data.recycleBin === false &&
                data.venId_id === props.vendorId
              ) {
                return (
                  <tr key={data.id}>
                    <td scope="row">
                      <div className="productImage">
                        <img
                          src={data.image1}
                          style={{ width: "50px", height: "50px" }}
                        />
                      </div>
                    </td>

                    <td>
                      <p className="productName"> {data.name} </p>

                      {/* <p> fetched vendor ID -  {  data.venId_id }</p>
                <p> props vendor ID - {  props.vendorId }</p> */}

                      <div className="belowProductName">
                        <span style={{ color: "#999" }}>
                          {" "}
                          Id - {data.id}{" "}
                          <span style={{ color: "#999" }}> {"|"} </span>{" "}
                        </span>
                        <span>
                          {" "}
                          <Link
                            to={`/productdetail/${data.Category}/${data.subCategory}/${data.id}/${data.name}/`}
                          >
                            {" "}
                            View{" "}
                          </Link>{" "}
                          <span style={{ color: "#999" }}> {"|"} </span>{" "}
                        </span>
                        <span>
                          {" "}
                          <Link
                            to={`/vendor/edit/${data.Category}/${data.subCategory}/${data.id}/`}
                          >
                            {" "}
                            Edit{" "}
                          </Link>{" "}
                          <span style={{ color: "#999" }}> {"|"} </span>{" "}
                        </span>
                        <span>
                          {" "}
                          <Link
                            href="#"
                            style={{ color: "#b32d2e" }}
                            onClick={(e) => {
                              if (
                                window.confirm(
                                  "Are you sure want to Delete this Product? "
                                )
                              ) {
                                deleteTheProduct(e, props.vendorId, data.id);
                              }
                            }}
                          >
                            {" "}
                            Trash{" "}
                          </Link>{" "}
                          <span style={{ color: "#999" }}> {"|"} </span>{" "}
                        </span>
                        <span>
                          {" "}
                          <Link
                            href="#"
                            onClick={(e) => {
                              if (
                                window.confirm(
                                  "Are you sure want to Duplicate this Product? "
                                )
                              ) {
                                duplicateTheProduct(e, props.vendorId, data.id);
                              }
                            }}
                          >
                            {" "}
                            Duplicate{" "}
                          </Link>{" "}
                        </span>
                      </div>
                    </td>
                    {/* (e) => deleteTheProduct(e, props.vendorId, data.id) */}
                    <td className="stock"> {data.stockStatus} </td>
                    <td className="category"> {data.totalUnits} </td>
                    <td className="price">
                      <p>
                        <del>
                          <span>₹</span> {data.mrp.toLocaleString()}
                        </del>
                      </p>
                      <p>
                        <span>₹</span>{" "}
                        {data.mrp -
                          parseInt(
                            (data.mrp * data.discountPercent) / 100
                          )}{" "}
                      </p>
                    </td>
                    <td className="category">
                      {" "}
                      {data.Category} | {data.subCategory}{" "}
                    </td>

                    {(() => {
                      if (data.setFeatured == 0) {
                        // not featured
                        return (
                          <td
                            title="Not Featured"
                            onClick={(e) =>
                              featuredProductOnClick(e, data.id, "notFeatured")
                            }
                          >
                            {" "}
                            <BsStar />{" "}
                          </td>
                        );
                      } else {
                        // featured
                        return (
                          <td
                            title="Featured Product"
                            onClick={(e) =>
                              featuredProductOnClick(e, data.id, "itsFeatured")
                            }
                          >
                            {" "}
                            <BsFillStarFill />{" "}
                          </td>
                        );
                      }
                    })()}

                    <td className="publish">
                      <p>Published</p>
                      <p className="date"> {data.date.toLocaleString()} </p>
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </div>

      {(() => {})()}
    </>
  );
};

export default AllProducts;
