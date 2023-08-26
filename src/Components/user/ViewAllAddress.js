import React, { useState, useEffect } from "react";
import ReactLoading from "react-loading";
import { backendApis } from "../../Utils/APIS";
import axios from "axios";

const ViewAllAddress = (props) => {
  const [IsLoading, setIsLoading] = useState(false);
  const [getAddress, setgetAddress] = useState([]);

  //   console.log("id ", props.userId);

  const fetchAllAddress = async () => {
    setIsLoading(true);
    let sessionUrl =
      backendApis.userApi.add_addressByUserId + props.userId + "/";
    // console.log(sessionUrl);

    await axios
      .get(sessionUrl)

      .then(function (response) {
        // console.log(response.data);
        if (response.data.status === 200) {
          if (response.data.dataArray.length > 0) {
            setgetAddress(response.data.dataArray);
          }

          setIsLoading(false);
        }
      });
  };

  useEffect(() => {
    fetchAllAddress();
  }, []);

  return (
    <>
      <span data-cy="isLoading">
        {IsLoading ? (
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

      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col" style={{ color: "#2271b1", fontSize: "10px" }}>
                S.No
              </th>
              <th scope="col" style={{ color: "#2271b1", fontSize: "10px" }}>
                User Full Name{" "}
              </th>
              <th scope="col" style={{ color: "#2271b1", fontSize: "10px" }}>
                Receiver Name
              </th>
              <th scope="col" style={{ color: "#2271b1", fontSize: "10px" }}>
                Full Address
              </th>
              <th scope="col" style={{ color: "#2271b1", fontSize: "10px" }}>
                Landmark
              </th>
              <th scope="col" style={{ color: "#2271b1", fontSize: "10px" }}>
                City
              </th>
              <th scope="col" style={{ color: "#2271b1", fontSize: "10px" }}>
                State
              </th>
            </tr>
          </thead>

          <tbody>
            {getAddress.map((data, index) => {
              return (
                <tr key={index}>
                  <td
                    className="category"
                    style={{ color: "black", fontSize: "13px" }}
                  >
                    {" "}
                    {index}{" "}
                  </td>
                  <td
                    className="category"
                    style={{ color: "black", fontSize: "13px" }}
                  >
                    {" "}
                    {data.userId.u_fname} {data.userId.u_lname}{" "}
                  </td>
                  <td
                    className="category"
                    style={{ color: "black", fontSize: "13px" }}
                  >
                    {" "}
                    {data.reciverName}{" "}
                  </td>

                  <td
                    className="category"
                    style={{ color: "black", fontSize: "13px" }}
                  >
                    {" "}
                    {data.fullAddress}{" "}
                  </td>

                  <td
                    className="category"
                    style={{ color: "black", fontSize: "13px" }}
                  >
                    {" "}
                    {data.landmark}{" "}
                  </td>

                  <td
                    className="category"
                    style={{ color: "black", fontSize: "13px" }}
                  >
                    {" "}
                    {data.city}{" "}
                  </td>

                  <td
                    className="category"
                    style={{ color: "black", fontSize: "13px" }}
                  >
                    {" "}
                    {data.state}{" "}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ViewAllAddress;
