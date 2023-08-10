import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Switch,
} from "react-router-dom";

import ViewCart from "./Pages/ViewCart";
import Contactus from "./Pages/Contactus";
import Home from "./Pages/Home";
import Productdetail from "./Pages/Productdetail";
import { ProductAll } from "./Pages/ProductAll";
import UserSignup from "./Pages/UserSignup";
import VendorDashboard from "./Pages/VendorDashboard";
import Checkout from "./Pages/Checkout";
import VendorSignup from "./Pages/VendorSignup";
import UserDashboard from "./Pages/UserDashboard";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { Navigate } from "react-router-dom";

function App() {
  const [loggedUserInfo, setloggedUserInfo] = useState([]);

  const fetchTokenFromLocal = () => {
    // token not available go back
    if (localStorage.getItem("userLoginToken")) {
      // console.log("userLoginToken available ")

      let decoded = jwtDecode(localStorage.getItem("userLoginToken"));
      // console.log("toeken is " , decoded )

      setloggedUserInfo(decoded);
    } else {
      // console.log(" token NOT available App.js   ")
    }
  };

  // console.log("APP.JS - " , loggedUserInfo )

  // console.log("App- userLoggedData - ",  userLoggedData)

  useEffect(() => {
    // console.log("use Effect from APP.js ")

    fetchTokenFromLocal();
  }, []);

  return (
    <>
      <Routes>
        {/* USER ROUTES  */}
        <Route path="/" element={<Home />}>
          {" "}
        </Route>

        {/* element= { localStorage.getItem("userLoginToken")  ?   <ViewCart   loggedUserInfo={loggedUserInfo} />   : < Home  />   }  */}
        <Route
          path="/viewcart"
          element={<ViewCart loggedUserInfo={loggedUserInfo} />}
        >
          {" "}
        </Route>
        <Route
          path="/checkout"
          element={<Checkout loggedUserInfo={loggedUserInfo} />}
        ></Route>

        <Route path="/contactus" element={<Contactus />}></Route>
        <Route
          path="/productdetail/*"
          element={<Productdetail loggedUserInfo={loggedUserInfo} />}
        ></Route>
        {/*PRODUCT FILTER PAGE   */}
        <Route path="/productall/*" element={<ProductAll />}></Route>
        <Route path="/signup" element={<UserSignup />}></Route>

        {/* if user not logged in redirect to User SIgn IN Page  localStorage.getItem("userLoginToken") ? <UserDashboard loggedUserInfo={loggedUserInfo} /> :  */}
        <Route path="/user/*" element={<UserDashboard />}></Route>

        {/* VENDOR ROUTES  */}

        {/* if Vendor  not logged in redirect to Vendor SIgn IN Page */}
        <Route path="/vendor/*" element={<VendorDashboard />}>
          {" "}
        </Route>

        <Route path="/vendorsignup" element={<VendorSignup />}></Route>
      </Routes>
    </>
  );
}

export default App;

// {
//   localStorage.getItem("userLoginToken") ?
// }
