import axios from "axios";
import React from "react";
import { BsFillImageFill, BsFillStarFill, BsStar } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { Navigate, useNavigate } from "react-router-dom";

const AllProducts = (props) => {
  const navigation = useNavigate;

  const [allProducts, setallProducts] = useState([]);

  const fetchFromDb = () => {
    // console.log("------fetchFromDb------")

    axios
      .get(props.APIS.addProduct)

      .then(function (response) {
        if (response.data.msg === "addProductGETRequest") {
          // console.log("addProductGETRequest")
          // console.log(response.data.getAllProducts.length)
          if (response.data.getAllProducts.length > 0) {
            setallProducts(response.data.getAllProducts);
          }
        } else {
          // console.log("27 Else -" , response)
        }
      })

      .catch(function (error) {
        // console.log("Axios Error " , error )
      });
  };

  useEffect(() => {
    // console.log("--UseEffect---");

    fetchFromDb();
  }, []);

  const permanentDeleteTheProduct = (e, vendorId, productId) => {
    // console.log(e.target , vendorId,  productId )

    // console.log("vendorId- "  , vendorId )
    // console.log("productId- "  , productId )

    let sessionUrl =
      props.APIS.permanentDeleteProduct + vendorId + "/" + productId + "/";

    // console.log(sessionUrl)

    axios
      .delete(sessionUrl)

      .then(function (response) {
        if (response.data.msg === "PermanentlyDeleted") {
          alert("PermanentlyDeleted");
          window.location.replace("/vendor/recyclebin");
        }
      });
  };

  // -------------------------------------------------------------------------
  // ---------------    CHECK with VALIDATION
  // -----------------------------------------------------------------------------

  return (
    <>
      <div id="allproduct">
        <h4 className="text-center"> Recycle Bin </h4>

        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">
                <BsFillImageFill />
              </th>
              <th scope="col"> Product Name</th>
              <th scope="col">Stock</th>
              <th scope="col">Price</th>
              <th scope="col">Categories</th>
              {/* <th scope="col">
          <BsFillStarFill />
        </th>
         */}
              <th scope="col"> Action </th>
            </tr>
          </thead>

          <tbody>
            {allProducts.map((data, index) => {
              // console.log(data.recycleBin)

              if (
                data.recycleBin === true &&
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
                            target="_blank"
                            to={`/productdetail/${data.Category}/${data.subCategory}/${data.id}/${data.name}/`}
                          >
                            {" "}
                            View{" "}
                          </Link>{" "}
                          <span style={{ color: "#999" }}> {"|"} </span>{" "}
                        </span>
                        {/* <span>   <Link  to={ `/vendor/edit/${data.Category}/${data.subCategory}/${data.id}/` }  > Edit </Link> <span style={{color: '#999'}}  >  {"|"} </span> </span> */}
                        {/* <span >    <Link href="#"  style={{color: '#b32d2e'}}   onClick={ (e) => {if(window.confirm('Are you sure Delete the Product? ')){ deleteTheProduct(e, props.vendorId, data.id) } }    }   > Trash </Link> <span style={{color: '#999'}}  >  {"|"} </span> </span> */}
                        {/* <span>   <Link href="#"> Duplicate </Link> <span style={{color: '#999'}}  >  {"|"} </span> </span> */}
                      </div>
                    </td>
                    {/* (e) => deleteTheProduct(e, props.vendorId, data.id) */}
                    <td className="stock"> {data.stockStatus} </td>
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

                    <td className="category">
                      {" "}
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={(e) => {
                          if (
                            window.confirm(
                              "Are you sure want to  Permanently Delete this Product ? "
                            )
                          ) {
                            permanentDeleteTheProduct(
                              e,
                              props.vendorId,
                              data.id
                            );
                          }
                        }}
                      >
                        {" "}
                        Delete It{" "}
                      </button>{" "}
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AllProducts;
