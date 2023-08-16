import React, { useState, useEffect } from "react";

import { AiOutlineLink } from "react-icons/ai";
import { FaRupeeSign, FaPercentage } from "react-icons/fa";
import { BiLinkAlt } from "react-icons/bi";
import axios from "axios";

// productDiscount
const AddProduct = (props) => {
  // fetch from backend for select dropdown
  const [productTaxClass, setproductTaxClass] = useState([]);
  const [productSubCategory, setproductSubCategory] = useState([]);
  const [productFareDisable, setproductFareDisable] = useState(true);
  const [getCategory, setgetCategory] = useState([]);

  // for all inputs
  const [productName, setproductName] = useState("");
  const [productMrp, setproductMrp] = useState("");
  const [productDiscount, setproductDiscount] = useState("");
  const [productType, setproductType] = useState("");
  const [productCategory, setproductCategory] = useState("");
  const [productSubCategoryData, setproductSubCategoryData] = useState("");
  const [productTaxType, setproductTaxType] = useState("");
  const [productTaxClassData, setproductTaxClassData] = useState("");
  const [productShippingStatus, setproductShippingStatus] = useState("");
  const [productFare, setproductFare] = useState(0);
  const [productUnits, setproductUnits] = useState("");
  const [productStockStatus, setproductStockStatus] = useState("");
  const [productTrackQty, setproductTrackQty] = useState("");
  const [productImageLink1, setproductImageLink1] = useState("");
  const [productImageLink2, setproductImageLink2] = useState("");
  const [productImageLink3, setproductImageLink3] = useState("");
  const [productImageLink4, setproductImageLink4] = useState("");
  const [productImageLink5, setproductImageLink5] = useState("");
  const [productDescription, setproductDescription] = useState("");

  const inputOnChange = (e) => {
    if (e.target.name === "productName") {
      setproductName(e.target.value);
    }

    if (e.target.name === "productMrp") {
      setproductMrp(e.target.value);
    }

    if (e.target.name === "productDiscount") {
      setproductDiscount(e.target.value);
    }

    if (e.target.name === "productType") {
      setproductType(e.target.value);
    }

    if (e.target.name === "productCategory") {
      setproductCategory(e.target.value);
    }

    if (e.target.name === "productSubCategory") {
      setproductSubCategoryData(e.target.value);
    }

    if (e.target.name === "productTaxType") {
      setproductTaxType(e.target.value);
    }

    if (e.target.name === "productTaxClass") {
      setproductTaxClassData(e.target.value);
    }

    if (e.target.name === "productShippingStatus") {
      setproductShippingStatus(e.target.value);
    }

    if (e.target.name === "productFare") {
      setproductFare(e.target.value);
    }

    if (e.target.name === "productUnits") {
      setproductUnits(e.target.value);
    }

    if (e.target.name === "productStockStatus") {
      setproductStockStatus(e.target.value);
    }

    if (e.target.name === "productTrackQty") {
      setproductTrackQty(e.target.value);
    }

    if (e.target.name === "productImageLink1") {
      setproductImageLink1(e.target.value);
    }

    if (e.target.name === "productImageLink2") {
      setproductImageLink2(e.target.value);
    }

    if (e.target.name === "productImageLink3") {
      setproductImageLink3(e.target.value);
    }

    if (e.target.name === "productImageLink4") {
      setproductImageLink4(e.target.value);
    }

    if (e.target.name === "productImageLink5") {
      setproductImageLink5(e.target.value);
    }

    if (e.target.name === "productDescription") {
      setproductDescription(e.target.value);
    }
  };

  // GET CATEGORY FROM DATABASE
  const getCategoryFromDjango = () => {
    axios
      .get(props.APIS.addCategory)

      .then(function (response) {
        // console.log(response.data)

        if (response.data.msg === "CategoryGETREQUEST") {
          // console.log("GET Request WORKING")
          setgetCategory(response.data.fetchCategory);
        }
      })

      .catch(function (error) {
        console.log("ERROR IS- ", error);
        alert("ERROR");
      });
  };

  useEffect(() => {
    getCategoryFromDjango();
  }, []);

  // click on category to get sub category
  const selectProductCategory = (e) => {
    // console.log("--" , e.target.value  )
    let catId = e.target.value;

    // Now find sub cat name with cat id
    let url = props.APIS.getSubCatByCat + catId + "/";

    // console.log("URL" , url )

    axios
      .get(url)

      .then(function (response) {
        // console.log(response.data)

        if (response.data.msg === "SubCategoryGETREQUEST") {
          // console.log("GET Request WORKING")
          setproductSubCategory(response.data.fetchSubCategory);
        }
      })

      .catch(function (error) {
        console.log("ERROR IS- ", error);
        alert("ERROR");
      });
  };

  // click on tax select to get all tax classes   taxable
  const TaxableOnClick = (e) => {
    if (e.target.value === "taxable") {
      // console.log("URL" , url )

      axios
        .get(props.APIS.addTaxes)

        .then(function (response) {
          // console.log(response.data)

          if (response.data.msg === "TaxClassGETREQUEST") {
            // console.log("GET Request WORKING")
            // console.log(response.data.TaxClass)
            setproductTaxClass(response.data.TaxClass);
          }
        })

        .catch(function (error) {
          console.log("ERROR IS- ", error);
          alert("ERROR");
        });
    } else {
      // console.log("NON Taxable")
      setproductTaxClass([]);
    }
  };

  // click on shipping
  const shippingOnClick = (e) => {
    if (e.target.value === "flatShipping") {
      // console.log("---- flatShipping--- ")

      setproductFareDisable(false);
      document.getElementById("productFaree").value = "";
      setproductFare();
    } else if (e.target.value === "FreeShipping") {
      // console.log("---- FreeShipping--- ")

      document.getElementById("productFaree").value = 0;
      setproductFare(0);
      setproductFareDisable(true);
      // setproductShippingClass([])
    } else {
      setproductFareDisable(true);
      setproductFare(0);
    }
  };

  const AddProductOnSubmit = (e) => {
    e.preventDefault();
    console.log("-------------- ADD btn clicked --------");
    // console.log( "productName- " , productName  )
    // console.log( "productMrp- " , productMrp  )
    // console.log( "productDiscount- " , productDiscount  )
    // console.log( "productType- " , productType  )
    // console.log( "productCategory- " , productCategory  )
    // console.log( "productSubCategoryData- " , productSubCategoryData  )
    // console.log( "productTaxType- " , productTaxType  )
    // console.log( "productTaxClassData- " , productTaxClassData  )
    // console.log( "productShippingStatus- " , productShippingStatus  )
    // console.log( "productFare- " , productFare  )
    // console.log( "productUnits- " , productUnits  )
    // console.log( "productStockStatus- " , productStockStatus  )
    // console.log( "productTrackQty- " , productTrackQty  )
    // console.log( "productImageLink1- " , productImageLink1  )
    // console.log( "productImageLink2- " , productImageLink2  )
    // console.log( "productImageLink3- " , productImageLink3  )
    // console.log( "productImageLink4- " , productImageLink4  )
    // console.log( "productImageLink5- " , productImageLink5  )

    let vendorId = props.vendorId;
    let productNamee = productName;
    let productMrpp = productMrp;
    let productDiscountt = productDiscount;
    let productTypee = productType;
    let productCategoryy = productCategory;
    let productSubCategoryDataa = productSubCategoryData;
    let productTaxTypee = productTaxType;
    let productTaxClassDataa = productTaxClassData;
    let productShippingStatuss = productShippingStatus;
    let productFaree = productFare;
    let productUnitss = productUnits;
    let productStockStatuss = productStockStatus;
    let productTrackQtyy = productTrackQty;
    let productImageLink11 = productImageLink1;
    let productImageLink22 = productImageLink2;
    let productImageLink33 = productImageLink3;
    let productImageLink44 = productImageLink4;
    let productImageLink55 = productImageLink5;
    let productDescriptionn = productDescription;
    console.log("vendorId- ", vendorId);
    // console.log("productFaree- ", productFaree )

    axios
      .post(props.APIS.addProduct, {
        vendorId,
        productNamee,
        productMrpp,
        productDiscountt,
        productTypee,
        productCategoryy,
        productSubCategoryDataa,
        productTaxTypee,
        productTaxClassDataa,
        productShippingStatuss,
        productFaree,
        productUnitss,
        productStockStatuss,
        productTrackQtyy,
        productImageLink11,
        productImageLink22,
        productImageLink33,
        productImageLink44,
        productImageLink55,
        productDescriptionn,
      })

      .then(function (response) {
        console.log("Response- ", response);

        if (response.data.msg === "ProductAddedSuccessfully") {
          alert("ProductAddedSuccessfully");
          window.location.replace("/vendor/allproducts");
        } else {
          alert(response.data.msg);
        }
      })

      .catch(function (error) {
        console.log("Axios Error ", error);
      });
  };

  return (
    <>
      <div className="tabAddProduct"  >
        <nav>
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <button
              className="nav-link active"
              id="nav-home-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-home"
              type="button"
              role="tab"
              aria-controls="nav-home"
              aria-selected="true"
            >
              {" "}
              Product Details{" "}
            </button>
            <button
              className="nav-link"
              id="nav-profile-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-profile"
              type="button"
              role="tab"
              aria-controls="nav-profile"
              aria-selected="false"
            >
              Tax & Shipping & Inventory
            </button>
            <button
              className="nav-link"
              id="nav-contact-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-contact"
              type="button"
              role="tab"
              aria-controls="nav-contact"
              aria-selected="false"
            >
              Images
            </button>
            {/* <button className="nav-link" id="nav-disabled-tab" data-bs-toggle="tab" data-bs-target="#nav-disabled" type="button" role="tab" aria-controls="nav-disabled" aria-selected="false" disabled>Disabled</button> */}
          </div>
        </nav>

        <form method="POST" onSubmit={AddProductOnSubmit}>
          <div className="tab-content" id="nav-tabContent">
            {/* 1st Tab */}
            <div
              className="tab-pane fade show active"
              id="nav-home"
              role="tabpanel"
              aria-labelledby="nav-home-tab"
              tabIndex="0"
            >
              <div className="form-floating mb-3 mt-4">
                <input
                  type="text"
                  className="form-control "
                  id="floatingInput"
                  placeholder=" "
                  required
                  onChange={inputOnChange}
                  name="productName"
                />
                <label htmlFor="floatingInput">Product Name</label>
              </div>

              <div className="row  mb-3 ">
                <div className="col-lg-6">
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaRupeeSign />
                    </span>
                    <div className="form-floating ">
                      <input
                        type="number"
                        className="form-control  "
                        id="floatingInputGroup1"
                        placeholder=" "
                        required
                        onChange={inputOnChange}
                        name="productMrp"
                      />
                      <label htmlFor="floatingInputGroup1">Product MRP</label>
                    </div>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaPercentage />
                    </span>
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingInputGroup1"
                        placeholder=" "
                        required
                        onChange={inputOnChange}
                        name="productDiscount"
                      />
                      <label htmlFor="floatingInputGroup1">
                        Product Discount{" "}
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-lg-4">
                  <div className="form-floating">
                    <select
                      className="form-select"
                      id="floatingSelect selectProductType"
                      aria-label="Floating label select example"
                      required
                      onChange={inputOnChange}
                      name="productType"
                    >
                      <option>Select</option>
                      <option value="simpleProduct">Simple Product</option>
                      <option value="variableProduct">Variable Product</option>
                    </select>

                    <label htmlFor="floatingSelect">Select Product Type</label>
                  </div>
                </div>

                <div className="col-lg-4">
                  <div className="form-floating">
                    <select
                      className="form-select"
                      id="floatingSelect"
                      aria-label="Floating label select example"
                      required
                      onChange={inputOnChange}
                      onClick={selectProductCategory}
                      name="productCategory"
                    >
                      <option>Select</option>
                      {getCategory.map((cat) => {
                        return (
                          <option key={cat.id} value={cat.cat_name}>
                            {cat.cat_name}
                          </option>
                        );
                      })}
                    </select>

                    <label htmlFor="floatingSelect">
                      Select Product Category
                    </label>
                  </div>
                </div>

                <div className="col-lg-4">
                  <div className="form-floating ">
                    <select
                      className="form-select"
                      id="floatingSelect"
                      aria-label="Floating label select example"
                      required
                      onChange={inputOnChange}
                      name="productSubCategory"
                    >
                      <option>Select</option>
                      {productSubCategory.map((cat) => {
                        return (
                          <option key={cat.id} value={cat.sub_cat_name}>
                            {cat.sub_cat_name}
                          </option>
                        );
                      })}
                    </select>

                    <label htmlFor="floatingSelect">
                      Select Product SubCategory
                    </label>
                  </div>
                </div>
              </div>

              <div className="form-floating">
                <textarea
                  className="form-control"
                  placeholder=" "
                  id="floatingTextarea2"
                  style={{ height: "100px" }}
                  required
                  onChange={inputOnChange}
                  name="productDescription"
                ></textarea>
                <label htmlFor="floatingTextarea2"> Product Description </label>
              </div>
            </div>

            {/* 2nd tab */}
            <div
              className="tab-pane fade"
              id="nav-profile"
              role="tabpanel"
              aria-labelledby="nav-profile-tab"
              tabIndex="0"
            >
              <p className="mt-4 ">
                <b> Tax Info </b>
              </p>

              <div className="row mb-3" style={{ marginTop: "-10px" }}>
                <div className="col-lg-6">
                  <div className="form-floating">
                    <select
                      className="form-select"
                      id="floatingSelect"
                      aria-label="Floating label select example"
                      required
                      onChange={inputOnChange}
                      name="productTaxType"
                      onClick={TaxableOnClick}
                    >
                      <option>Select</option>
                      <option value="taxable">Taxable</option>
                      <option value="non_taxable">Non Taxable</option>
                    </select>

                    <label htmlFor="floatingSelect">Select Tax Status</label>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="form-floating">
                    <select
                      className="form-select"
                      id="floatingSelect"
                      aria-label="Floating label select example"
                      required
                      onChange={inputOnChange}
                      name="productTaxClass"
                    >
                      <option>Select</option>

                      {productTaxClass.map((data) => {
                        return <option key={data.id}> {data.tax_name} </option>;
                      })}
                    </select>

                    <label htmlFor="floatingSelect">Select Tax Class</label>
                  </div>
                </div>
              </div>

              <p>
                <b> Shipping Info </b>
              </p>
              <div className="row mb-3" style={{ marginTop: "-10px" }}>
                <div className="col-lg-6">
                  <div className="form-floating">
                    <select
                      className="form-select"
                      id="floatingSelect"
                      aria-label="Floating label select example"
                      required
                      onChange={inputOnChange}
                      name="productShippingStatus"
                      onClick={shippingOnClick}
                    >
                      <option>Select</option>
                      <option value="locationWise">
                        Location Wise Shipping{" "}
                      </option>
                      <option value="flatShipping">Flat Shipping</option>
                      <option value="FreeShipping">Free Shipping</option>
                    </select>

                    <label htmlFor="floatingSelect">
                      Select Shipping Status
                    </label>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaRupeeSign />
                    </span>
                    <div className="form-floating">
                      <input
                        type="number"
                        className="form-control"
                        id="productFaree"
                        placeholder=" "
                        onChange={inputOnChange}
                        disabled={productFareDisable}
                        value={productFare}
                        name="productFare"
                        min={0}
                      />
                      <label htmlFor="floatingInputGroup1">Fare</label>
                    </div>
                  </div>
                </div>
              </div>

              <p>
                <b> Inventory </b>
              </p>
              <div className="row mb-3" style={{ marginTop: "-10px" }}>
                <div className="col-lg-4">
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaRupeeSign />
                    </span>
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingInputGroup1"
                        placeholder=" "
                        required
                        onChange={inputOnChange}
                        name="productUnits"
                        min={1}
                      />
                      <label htmlFor="floatingInputGroup1">Total Units</label>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4">
                  <div className="form-floating ">
                    <select
                      className="form-select"
                      id="floatingSelect"
                      aria-label="Floating label select example"
                      required
                      onChange={inputOnChange}
                      name="productStockStatus"
                    >
                      <option> Select </option>
                      <option value="In-Stock">In Stock</option>
                      <option value="Out-Of-Stock">Out Of Stock</option>
                    </select>

                    <label htmlFor="floatingSelect">Select Stock Status</label>
                  </div>
                </div>

                <div className="col-lg-4">
                  <div className="form-floating ">
                    <select
                      className="form-select"
                      id="floatingSelect"
                      aria-label="Floating label select example"
                      required
                      onChange={inputOnChange}
                      name="productTrackQty"
                    >
                      <option> Select </option>
                      <option value="Yes-Track-it">Yes Track it</option>
                      <option value="Dont-Track-it">Dont Track it</option>
                    </select>

                    <label htmlFor="floatingSelect">
                      Track Stock Qty For This Product
                    </label>
                  </div>
                </div>
              </div>

              <p />
            </div>

            {/* 3rd tab */}
            <div
              className="tab-pane fade"
              id="nav-contact"
              role="tabpanel"
              aria-labelledby="nav-contact-tab"
              tabIndex="0"
            >
              <p className="mt-4">
                <b> Images </b>
              </p>

              <div className="d-flex  flex-row">
                <img
                  className="mr-3"
                  src={productImageLink1}
                  style={{ width: "50px", height: "50px", marginRight: "20px" }}
                />

                <div
                  className="input-group mb-3"
                  style={{ marginTop: "-10px" }}
                >
                  <span className="input-group-text">
                    <BiLinkAlt />
                  </span>
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInputGroup1"
                      placeholder=" "
                      required
                      onChange={inputOnChange}
                      name="productImageLink1"
                      value={productImageLink1}
                    />
                    <label htmlFor="floatingInputGroup1">Image Link 1</label>
                  </div>
                </div>
              </div>

              <div className="d-flex  flex-row">
                <img
                  className="mr-3"
                  src={productImageLink2}
                  style={{ width: "50px", height: "50px", marginRight: "20px" }}
                />

                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <BiLinkAlt />
                  </span>
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInputGroup1"
                      placeholder=" "
                      required
                      onChange={inputOnChange}
                      name="productImageLink2"
                      value={productImageLink2}
                    />
                    <label htmlFor="floatingInputGroup1">Image Link 2</label>
                  </div>
                </div>
              </div>

              <div className="d-flex  flex-row">
                <img
                  className="mr-3"
                  src={productImageLink3}
                  style={{ width: "50px", height: "50px", marginRight: "20px" }}
                />

                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <BiLinkAlt />
                  </span>
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInputGroup1"
                      placeholder=" "
                      required
                      onChange={inputOnChange}
                      name="productImageLink3"
                      value={productImageLink3}
                    />
                    <label htmlFor="floatingInputGroup1">Image Link 3</label>
                  </div>
                </div>
              </div>

              <div className="d-flex  flex-row">
                <img
                  className="mr-3"
                  src={productImageLink4}
                  style={{ width: "50px", height: "50px", marginRight: "20px" }}
                />

                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <BiLinkAlt />
                  </span>
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInputGroup1"
                      placeholder=" "
                      required
                      onChange={inputOnChange}
                      name="productImageLink4"
                      value={productImageLink4}
                    />
                    <label htmlFor="floatingInputGroup1">Image Link 4</label>
                  </div>
                </div>
              </div>

              <div className="d-flex  flex-row">
                <img
                  className="mr-3"
                  src={productImageLink5}
                  style={{ width: "50px", height: "50px", marginRight: "20px" }}
                />

                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <BiLinkAlt />
                  </span>
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInputGroup1"
                      placeholder=" "
                      required
                      onChange={inputOnChange}
                      name="productImageLink5"
                      value={productImageLink5}
                    />
                    <label htmlFor="floatingInputGroup1">Image Link 5</label>
                  </div>
                </div>
              </div>

              <input
                type="submit"
                value="Add Product"
                className="w-100 btn btn-primary btn-lg px-5 mt-3 mb-5"
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddProduct;
