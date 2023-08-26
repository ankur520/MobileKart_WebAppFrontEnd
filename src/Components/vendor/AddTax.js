import React, { useState, useEffect } from "react";
import { AiOutlineLink } from "react-icons/ai";
import { FaRupeeSign, FaPercentage } from "react-icons/fa";
import { BiLinkAlt } from "react-icons/bi";
import axios from "axios";

import ReactLoading from "react-loading";

import { backendApis } from "../../Utils/APIS";

const AddTax = (props) => {
  const [category, setcategory] = useState("");
  const [catDropdown, setcatDropdown] = useState("");
  const [subCatName, setsubCatName] = useState("");
  const [taxName, settaxName] = useState("");
  const [taxValue, settaxValue] = useState("");
  const [shippingName, setshippingName] = useState("");
  const [shippingValue, setshippingValue] = useState("");

  // to fetch from backend
  const [getCategory, setgetCategory] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  const inputOnChange = (e) => {
    if (e.target.name === "categoryNamee") {
      setcategory(e.target.value);
    }

    if (e.target.name === "subCatDropDown") {
      setcatDropdown(e.target.value);
    }

    if (e.target.name === "subCatName") {
      setsubCatName(e.target.value);
    }

    if (e.target.name === "taxName") {
      settaxName(e.target.value);
    }

    if (e.target.name === "taxValue") {
      settaxValue(e.target.value);
    }

    if (e.target.name === "ShippingName") {
      setshippingName(e.target.value);
    }

    if (e.target.name === "shippingValue") {
      setshippingValue(e.target.value);
    }
  };

  // ADD CATEGORY
  const categoryOnSubmit = async (e) => {
    e.preventDefault();

    let cat_name = category;

    await axios
      .post(backendApis.vendorApi.addcategory, {
        cat_name,
      })

      .then(function (response) {
        if (response.data.status === 200) {
          if (response.data.msg === "CategoryAdded") {
            alert("Category Added");
          } else {
            alert(response.data.msg);
          }

          setcategory("");
          getCategoryFromDjango();
        }
      });
  };

  // subCategoryOnSubmit

  const subCategoryOnSubmit = async (e) => {
    e.preventDefault();

    let catId = catDropdown[0];
    let sub_cat_name = subCatName;

    await axios
      .post(backendApis.vendorApi.add_sub_category, {
        catId,
        sub_cat_name,
      })

      .then(
        await function (response) {
          if (response.data.status === 200) {
            if (response.data.msg === "SubCategoryAdded") {
              alert("SubCategoryAdded");
              setsubCatName("");
            } else {
              alert(response.data.msg);
            }
          }
        }
      );
  };

  const taxOnSubmit = async (e) => {
    e.preventDefault();

    let tax_name = taxName;
    let tax_value = taxValue;

    // console.log("catId- " , catId )
    // console.log("cat_name- " , cat_name)
    // console.log("sub_cat_name- " , sub_cat_name)

    await axios
      .post(backendApis.vendorApi.add_tax, {
        tax_name,
        tax_value,
      })

      .then(
        await function (response) {
          if (response.data.status === 200) {
            if (response.data.msg === "TaxClassAdded") {
              alert("TaxClassAdded");
              settaxName("");
              settaxValue("");
            } else {
              alert(response.data.msg);
            }
          }
        }
      );

    // console.log(cat_name[0])
  };

  const shippingOnSubmit = async (e) => {
    e.preventDefault();

    // console.log("shippingOnSubmit");

    let shipping_state_name = shippingName;
    let shipping_value = shippingValue;

    // console.log("catId- " , catId )
    // console.log("cat_name- " , cat_name)
    // console.log("sub_cat_name- " , sub_cat_name)

    await axios
      .post(backendApis.vendorApi.add_shipping, {
        shipping_state_name,
        shipping_value,
      })

      .then(
        await function (response) {
          if (response.data.status === 200) {
            if (response.data.msg === "ShippingStateNameAdded") {
              alert("ShippingStateNameAdded");
              setshippingName("");
              setshippingValue("");
            } else {
              alert(response.data.msg);
            }
          }
        }
      );
  };

  // GET CATEGORY FROM DATABASE
  const getCategoryFromDjango = async () => {
    setisLoading(true);
    await axios
      .get(backendApis.vendorApi.addcategory)

      .then(
        await function (response) {
          // console.log(response.data)

          if (response.data.msg === "CategoryGETREQUEST") {
            // console.log("GET Request WORKING")
            setgetCategory(response.data.fetchCategory);
            setisLoading(false);
          }
        }
      );
  };

  useEffect(() => {
    // console.log("------useEffect started --------")

    getCategoryFromDjango();
  }, []);

  return (
    <>
      <div className="tabAddProduct">
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
              Add Category & Sub Category{" "}
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
              Add Tax & Shipping Classes
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
              </span>
            </button>
            {/* <button className="nav-link" id="nav-disabled-tab" data-bs-toggle="tab" data-bs-target="#nav-disabled" type="button" role="tab" aria-controls="nav-disabled" aria-selected="false" disabled>Disabled</button> */}
          </div>
        </nav>
        <div className="tab-content" id="nav-tabContent">
          {/* 1st Tab */}
          <div
            className="tab-pane fade show active mt-3"
            id="nav-home"
            role="tabpanel"
            aria-labelledby="nav-home-tab"
            tabIndex="0"
          >
            {/* CATEGORY */}
            <form method="POST" onSubmit={categoryOnSubmit}>
              <p>
                {" "}
                <b> Category </b>{" "}
              </p>
              <div className="row  mb-3 " style={{ marginTop: "-10px" }}>
                <div className="col-lg-6">
                  <div className="input-group">
                    <div className="form-floating ">
                      <input
                        type="text"
                        name="categoryNamee"
                        className="form-control  "
                        id="floatingInputCategory"
                        value={category}
                        placeholder="Username"
                        onChange={inputOnChange}
                        required
                      />
                      <label htmlFor="floatingInputCategory">
                        Category Name
                      </label>
                    </div>
                  </div>
                </div>

                <div className="col-lg-6">
                  <input
                    type="submit"
                    value="Add Category Name"
                    className=" btn btn-primary btn-lg px-5 "
                  />
                </div>
              </div>
            </form>

            {/* SUB CATEGORY */}
            <form method="POST" onSubmit={subCategoryOnSubmit}>
              <p>
                <b>Sub Category </b>
              </p>
              <div className="row  mb-3 " style={{ marginTop: "-10px" }}>
                <div className="col-lg-4">
                  <div className="form-floating">
                    <select
                      className="form-select"
                      id="floatingSelect"
                      aria-label="Floating label select example"
                      onChange={inputOnChange}
                      name="subCatDropDown"
                      required
                    >
                      <option>Select</option>

                      {getCategory.map((cat) => {
                        return (
                          <option key={cat.id} value={cat.id + cat.cat_name}>
                            {cat.cat_name}
                          </option>
                        );
                      })}
                    </select>

                    <label htmlFor="floatingSelect">Select Category </label>
                  </div>
                </div>

                <div className="col-lg-4">
                  <div className="input-group">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingInputGroup1"
                        placeholder="Username"
                        onChange={inputOnChange}
                        value={subCatName}
                        name="subCatName"
                        required
                      />
                      <label htmlFor="floatingInputGroup1">
                        Sub Category Name{" "}
                      </label>
                    </div>
                  </div>
                </div>

                <input
                  type="submit"
                  value="Add Sub Category"
                  className="btn btn-primary btn-lg px-5  col-lg-4"
                />
              </div>
            </form>
          </div>{" "}
          {/* 1st Tab */}
          {/* 2nd tab */}
          <div
            className="tab-pane fade"
            id="nav-profile"
            role="tabpanel"
            aria-labelledby="nav-profile-tab"
            tabIndex="0"
          >
            {/* TAX CLASS NAME */}
            <form method="POST" onSubmit={taxOnSubmit}>
              <p>
                <b> Tax </b>
              </p>
              <div className="row  mb-3 " style={{ marginTop: "-10px" }}>
                <div className="col-lg-4">
                  <div className="input-group">
                    <div className="form-floating ">
                      <input
                        type="text"
                        className="form-control  "
                        id="floatingInputGroup1"
                        required
                        name="taxName"
                        value={taxName}
                        onChange={inputOnChange}
                        placeholder=" "
                      />
                      <label htmlFor="floatingInputGroup1">
                        Tax Class Name
                      </label>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4">
                  <div className="input-group">
                    <span className="input-group-text">
                      {" "}
                      <FaPercentage />{" "}
                    </span>
                    <div className="form-floating">
                      <input
                        type="number"
                        className="form-control"
                        id="floatingInputGroup1"
                        placeholder=" "
                        required
                        value={taxValue}
                        name="taxValue"
                        onChange={inputOnChange}
                      />
                      <label htmlFor="floatingInputGroup1">Tax Percent </label>
                    </div>
                  </div>
                </div>

                <input
                  type="submit"
                  value="Add Tax"
                  className="btn btn-primary btn-lg px-5  col-lg-4"
                />
              </div>
            </form>

            {/* SHIPPING */}
            <form method="POST" onSubmit={shippingOnSubmit}>
              <p>
                {" "}
                <b> Shipping </b>{" "}
              </p>
              <div className="row  mb-3 " style={{ marginTop: "-10px" }}>
                <div className="col-lg-4">
                  <div className="input-group">
                    <div className="form-floating ">
                      <input
                        type="text"
                        className="form-control  "
                        id="floatingInputGroup1"
                        required
                        name="ShippingName"
                        value={shippingName}
                        onChange={inputOnChange}
                        placeholder=" "
                      />
                      <label htmlFor="floatingInputGroup1">
                        Shipping Class Name
                      </label>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4">
                  <div className="input-group">
                    <span className="input-group-text">
                      {" "}
                      <FaRupeeSign />{" "}
                    </span>
                    <div className="form-floating">
                      <input
                        type="number"
                        className="form-control"
                        id="floatingInputGroup1"
                        value={shippingValue}
                        required
                        name="shippingValue"
                        onChange={inputOnChange}
                        placeholder=" "
                      />
                      <label htmlFor="floatingInputGroup1">
                        Shipping Price
                      </label>
                    </div>
                  </div>
                </div>

                <input
                  type="submit"
                  value="Add Shipping"
                  className="btn btn-primary btn-lg px-5  col-lg-4"
                />
              </div>
            </form>
          </div>{" "}
          {/* 2nd tab */}
          {/* 3rd tab */}
          <div
            className="tab-pane fade"
            id="nav-contact"
            role="tabpanel"
            aria-labelledby="nav-contact-tab"
            tabIndex="0"
          >
            <h1>3rd Tab </h1>
          </div>{" "}
          {/* 3rd tab */}
        </div>{" "}
        {/* id="nav-tabContent" */}
      </div>
    </>
  );
};

export default AddTax;
