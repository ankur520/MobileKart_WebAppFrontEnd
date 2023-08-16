import React from "react";

const UserDashboardHome = (props) => {
  return (
    <>
      <div className="container  mb-5" data-cy="vendorDashboard" >
        <h4 className="text-center mb-3 mt-3" data-cy="vendorWelcomeMsg" >Vendor Dashboard</h4>

        <h4>
          <b>id - </b> {props.vendorId}{" "}
        </h4>
        <h4>
          <b>Full Name - </b> {props.vendorFullName}{" "}
        </h4>
        <h4>
          <b>Email - </b> {props.vendorEmail}{" "}
        </h4>

        <hr />
        <h4>
          <b>Total Products Listed - </b> 0{" "}
        </h4>
        <h4>
          <b>XYZ - </b>{" "}
        </h4>
        <h4>
          <b>Name - </b>{" "}
        </h4>
      </div>
    </>
  );
};

export default UserDashboardHome;
