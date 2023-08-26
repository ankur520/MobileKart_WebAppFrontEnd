import axios from "axios";
import React from "react";
import { BsFillImageFill, BsFillStarFill, BsStar } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { backendApis } from "../../Utils/APIS";
import ReactLoading from "react-loading";

import { Navigate, useNavigate } from "react-router-dom";

const AllProducts = (props) => {
  const navigation = useNavigate;

  const [isLoading, setisLoading] = useState(false);

  const [allProducts, setallProducts] = useState([]);

  const fetchFromDb = async () => {
    // console.log("------fetchFromDb------")
    setisLoading(true);
    await axios
      .get(backendApis.vendorApi.addproduct)

      .then(
        await function (response) {
          if (response.data.msg === "addProductGETRequest") {
            // console.log("addProductGETRequest")
            // console.log(response.data.getAllProducts.length)
            if (response.data.getAllProducts.length > 0) {
              setallProducts(response.data.getAllProducts);
              setisLoading(false);
              // console.log(response.data.getAllProducts)
            }
          }
        }
      );
  };

  useEffect(() => {
    // console.log("--UseEffect---");

    fetchFromDb();
  }, []);

  const permanentDeleteTheProduct = async (e, vendorId, productId) => {
    // console.log(e.target , vendorId,  productId )

    // console.log("vendorId- "  , vendorId )
    // console.log("productId- "  , productId )

    let sessionUrl =
      backendApis.vendorApi
        .permanent_delete_product_byIdByVendorIdAndProductId +
      vendorId +
      "/" +
      productId +
      "/";

    // console.log(sessionUrl)

    await axios
      .delete(sessionUrl)

      .then(function (response) {
        // console.log(response.data);
        if (response.data.msg === "PermanentlyDeleted") {
          alert(response.data.msg);
          fetchFromDb();
        }
      });
  };

  // -------------------------------------------------------------------------
  // ---------------    CHECK with VALIDATION
  // -----------------------------------------------------------------------------

  return (
    <>
      <div id="allproduct">
        <h4 className="text-center">
          {" "}
          Recycle Bin{" "}
          <span data-cy="isLoading">
            {isLoading ? (
              <ReactLoading
                type="spinningBubbles"
                color="#2874f0"
                height={25}
                width={25}
              />
            ) : (
              ""
            )}
          </span>{" "}
        </h4>

        <div className="table-responsive">
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
                  data.venId.id === props.vendorId
                ) {
                  return (
                    <tr key={data.id}>
                      <td scope="row">
                        <div className="productImage">
                          <img
                            alt="Product Image"
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
                              to={`/productdetail/${data.CategoryId.cat_name}/${data.subCategoryId.sub_cat_name}/${data.id}/${data.name}/`}
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
      </div>
    </>
  );
};

export default AllProducts;
