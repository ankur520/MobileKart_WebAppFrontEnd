import React from "react";

const UserDashboardHome = (props) => {
  return (
    <>
      <div className="container  mb-5" data-cy="userDashboard" >
        <h4 className="text-center mb-3 mt-3" data-cy="userWelcomeMsg" >User Dashboard</h4>
        <h4>
          <b>id - </b> {props.userId}{" "}
        </h4>
        <h4>
          <b>Name - </b> {props.userFname}{" "}
        </h4>
        <h4>
          <b>email - </b> {props.userLname}{" "}
        </h4>
        <h4>
          <b>email - </b> {props.userEmail}{" "}
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
