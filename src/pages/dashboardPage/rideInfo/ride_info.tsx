import React from "react";
import { useUser } from "../../../contexts/user_context";
import { RideWithDistance } from "../../../interface/ride_interface";
import {
  addRideToUser,
  addUserToRide,
} from "../../../utils/firebase/firestore";

export default function RideInfo({
  ride,
  closeRideInfo,
}: {
  ride: RideWithDistance;
  closeRideInfo: any;
}) {
  const [user] = useUser();
  function addRide() {
    if (user)
      addRideToUser(user, ride.uuid, false).then(() =>
        addUserToRide(user, ride).then(closeRideInfo)
      );
  }

  return (
    <div className="card mb-3">
      <div className="row g-0">
        <div className="col-md-4 d-flex justify-content-center align-content-center">
          IMAGE
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{ride.name}</h5>
            <p className="card-text">
              <table className="table">
                <tbody>
                  <tr>
                    <td>
                      <strong>Distance</strong>
                    </td>
                    <td>{ride.distance.toFixed()}m</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Riders</strong>
                    </td>
                    <td>{ride.ridersCount}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>City</strong>
                    </td>
                    <td>{ride.city}</td>
                  </tr>
                </tbody>
              </table>
              <button onClick={addRide} className="btn btn-dark">
                Book
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
