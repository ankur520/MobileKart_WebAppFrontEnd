import axios from "axios";
import jwtDecode from "jwt-decode";

import { backendApis } from "./APIS";

import React, { useEffect } from "react";

export const demoFunction = () => {
  const insideFun = () => {
    return <>Insisde functions </>;
  };

  return <>dfasdfsdfasd</>;
};

export const fetchCartLengthByUserIdFunction = async () => {
  if (localStorage.getItem("userLoginToken")) {
    console.log("FROM FUNCTioNS ");
    let decoded = jwtDecode(localStorage.getItem("userLoginToken"));
    let sessionUrl = `${backendApis.userApi.fetch_cart_byUserIdByUserId}${decoded["fetchedId"]}/`;
    await axios
      .get(sessionUrl)

      .then(function (response) {
        if (response.data.status === 200) {
          if (response.data.msg === "Cart data Available") {
            if (response.data.cartFullArray.length > 0) {
              //   return <span>{response.data.cartFullArray.length}</span>;
              return <>dfasdfsdfasd</>;
            }
          }
        }
      });
  }
};
