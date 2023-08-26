import React, { useState } from "react";
import ReactLoading from "react-loading";
import { backendApis } from "../../Utils/APIS";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddAddress = (props) => {
  const navigation = useNavigate();

  const [ReceiverName, setReceiverName] = useState("");
  const [FullAddress, setFullAddress] = useState("");
  const [Landmark, setLandmark] = useState("");
  const [City, setCity] = useState("");
  const [State, setState] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const addAddressSignUpHandler = async (e) => {
    e.preventDefault();
    setisLoading(true);
    // console.log(props.userId);

    let receiverName = ReceiverName;
    let fullAddress = FullAddress;
    let landmark = Landmark;
    let city = City;
    let state = State;

    const sessionUrl =
      backendApis.userApi.add_addressByUserId + props.userId + "/";

    await axios
      .post(sessionUrl, {
        receiverName,
        fullAddress,
        landmark,
        city,
        state,
      })

      .then(
        await function (response) {
          if (response.data.status === 200) {
            alert(response.data.msg);

            setReceiverName("");
            setFullAddress("");
            setLandmark("");
            setCity("");
            setState("");
            setisLoading(false);
          } else {
            setisLoading(false);
          }
        }
      );
  };

  return (
    <>
      <div
        className="col-sm-5 px-3 py-3 "
        style={{ backgroundColor: "#fff", margin: "0 0 0 0" }}
      >
        <span>
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

        <form method="POST" onSubmit={addAddressSignUpHandler}>
          <div className="form-floating mb-3">
            <input
              data-cy="Receiver Name"
              type="text"
              className="form-control"
              id="ReceiverName"
              placeholder="Receiver Name"
              name="ReceiverName"
              onChange={(e) => setReceiverName(e.target.value)}
              required
              value={ReceiverName}
            />
            <label htmlFor="ReceiverName">Receiver Name</label>
          </div>

          <div className="form-floating mb-3">
            <input
              data-cy="Full Address"
              type="text"
              className="form-control"
              id="FullAddress"
              placeholder="Full Address"
              name="FullAddress"
              onChange={(e) => setFullAddress(e.target.value)}
              required
              value={FullAddress}
            />
            <label htmlFor="FullAddress">Full Address</label>
          </div>

          <div className="form-floating  mb-3">
            <input
              data-cy="Landmark"
              type="text"
              className="form-control"
              id="Landmark"
              placeholder="Landmark"
              name="Landmark"
              onChange={(e) => setLandmark(e.target.value)}
              required
              value={Landmark}
            />
            <label htmlFor="Landmark">Landmark</label>
          </div>

          <div className="form-floating mb-3">
            <input
              data-cy="City"
              type="text"
              className="form-control"
              id="City"
              placeholder="City"
              name="City"
              onChange={(e) => setCity(e.target.value)}
              required
              value={City}
            />
            <label htmlFor="City">City</label>
          </div>

          <div className="form-floating  mb-3">
            <input
              data-cy="State"
              type="text"
              className="form-control"
              id="State"
              placeholder="State"
              name="State"
              onChange={(e) => setState(e.target.value)}
              required
              value={State}
            />
            <label htmlFor="State">State</label>
          </div>

          <input
            type="submit"
            value="Add Address "
            data-cy="login button"
            className="w-100 btn btn-primary btn-lg px-5 mt-3 mb-5"
          />
        </form>
      </div>
    </>
  );
};

export default AddAddress;
