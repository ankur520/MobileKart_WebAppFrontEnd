import axios from "axios";
import React from "react";
import { BsFillImageFill, BsFillStarFill, BsStar } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { useNavigate } from "react-router-dom";

import { backendApis } from "../../Utils/APIS";

const AllProducts = (props) => {
  const navigation = useNavigate();

  const [allProducts, setallProducts] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  const fetchFromDb = async () => {
    // console.log("------fetchFromDb------")
    setisLoading(true);
    await axios
      .get(backendApis.vendorApi.addproduct)

      .then(
        await function (response) {
          if (response.data.msg === "addProductGETRequest") {
            // console.log("addProductGETRequest")
            // console.log(response.data.getAllProducts)
            setallProducts(response.data.getAllProducts);
            setisLoading(false);
          } else {
            // console.log("27 Else -", response);
          }
        }
      );
  };

  const featuredProductOnClick = async (e, productId, msg) => {
    // console.log( productId , msg )

    let sessionUrl =
      backendApis.vendorApi
        .set_featuredProduct_byIdByProductIdAndFeaturedStatus +
      productId +
      "/" +
      msg +
      "/";
    // console.log(sessionUrl)

    await axios
      .put(sessionUrl)

      .then(
        await function (response) {
          if (response.data.status === 200) {
            // console.log(response.data.status )
            alert(response.data.msg);
            // navigation("/vendor/allproducts")
            // window.location.replace("/vendor/allproducts");
            fetchFromDb();
          }
        }
      );
  };

  useEffect(() => {
    // console.log("--UseEffect---");

    fetchFromDb();
  }, [navigation]);

  const deleteTheProduct = async (e, vendorId, productId) => {
    // console.log(e.target , vendorId,  productId )

    // console.log("vendorId- "  , vendorId )
    // console.log("productId- "  , productId )

    let sessionUrl =
      backendApis.vendorApi.delete_product_byIdByVendorIdAndProductId +
      vendorId +
      "/" +
      productId +
      "/";

    await axios
      .delete(sessionUrl)

      .then(
        await function (response) {
          if (response.data.msg === "Item-Deleted") {
            alert(response.data.msg);

            // navigation("/vendor/allproducts")
            // window.location.replace("/vendor/allproducts");
            fetchFromDb();
          }
        }
      );
  };

  const duplicateTheProduct = async (e, vendorId, productId) => {
    let sessionUrl =
      backendApis.vendorApi.duplicate_product_byIdByVendorIdAndProductId +
      vendorId +
      "/" +
      productId +
      "/";

    await axios
      .post(sessionUrl)

      .then(
        await function (response) {
          if (response.data.msg === "DuplicateProductAddedSuccessfully") {
            alert("DuplicateProductAddedSuccessfully");
            // window.location.replace("/vendor/allproducts");
            fetchFromDb();
          } else {
            alert(response.data.msg);
          }
        }
      );
  };

  return (
    <>
      <div id="allproduct">
        <span data-cy="isLoading">
          {isLoading ? (
            <ReactLoading
              type="spinningBubbles"
              color="#2874f0"
              height={50}
              width={50}
            />
          ) : (
            ""
          )}
        </span>

        <div className="table-responsive">
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
                  data.venId.id === props.vendorId
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
                        <p className="productName">
                          {" "}
                          {data.name.substring(0, 30) + "..."}{" "}
                        </p>

                        <div className="belowProductName">
                          <span style={{ color: "#999" }}>
                            Id - {data.id}
                            <span style={{ color: "#999" }}> {"|"} </span>
                          </span>
                          <span>
                            <Link
                              title="Product View"
                              to={`/productdetail/${data.CategoryId.cat_name}/${data.subCategoryId.sub_cat_name}/${data.id}/${data.name}/`}
                            >
                              View
                            </Link>
                            <span style={{ color: "#999" }}> {"|"} </span>
                          </span>
                          <span>
                            <Link
                              title="Edit Product"
                              to={`/vendor/edit/${data.CategoryId.cat_name}/${data.subCategoryId.sub_cat_name}/${data.id}/`}
                            >
                              Edit
                            </Link>
                            <span style={{ color: "#999" }}> {"|"} </span>
                          </span>
                          <span>
                            <Link
                              title="Trash"
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
                              Trash
                            </Link>
                            <span style={{ color: "#999" }}> {"|"} </span>
                          </span>
                          <span>
                            <Link
                              title="Duplicate It"
                              href="#"
                              onClick={(e) => {
                                if (
                                  window.confirm(
                                    "Are you sure want to Duplicate this Product? "
                                  )
                                ) {
                                  duplicateTheProduct(
                                    e,
                                    props.vendorId,
                                    data.id
                                  );
                                }
                              }}
                            >
                              Duplicate
                            </Link>
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
                          <span>₹</span>
                          {data.mrp -
                            parseInt((data.mrp * data.discountPercent) / 100)}
                        </p>
                      </td>
                      <td className="category">
                        {data.subCategoryId.catId.cat_name} |{" "}
                        {data.subCategoryId.sub_cat_name}
                      </td>

                      {(() => {
                        if (data.setFeatured == 0) {
                          // not featured
                          return (
                            <td
                              title="Not Featured"
                              onClick={(e) =>
                                featuredProductOnClick(
                                  e,
                                  data.id,
                                  "notFeatured"
                                )
                              }
                            >
                              <BsStar />
                            </td>
                          );
                        } else {
                          // featured
                          return (
                            <td
                              title="Featured Product"
                              onClick={(e) =>
                                featuredProductOnClick(
                                  e,
                                  data.id,
                                  "itsFeatured"
                                )
                              }
                            >
                              <BsFillStarFill />
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
      </div>
    </>
  );
};

export default AllProducts;
