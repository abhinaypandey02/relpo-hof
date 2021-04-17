import React from "react";
import { RideWithDistance } from "../../../interface/ride_interface";

export default function RideInfo({ ride }: { ride: RideWithDistance }) {
  return <div className="card mb-3">
  <div className="row g-0">
    <div className="col-md-4 d-flex justify-content-center align-content-center">
      <img src="https://source.unsplash.com/2000x2000/?cycle,bike" alt="..." className="img-fluid" />
    </div>
    <div className="col-md-8">
      <div className="card-body">
        <h5 className="card-title">{ride.name}</h5>
        <p className="card-text">
          <table className="table">
            <tbody>
              <tr>
                <td><strong>Distance</strong></td>
                <td>{ride.distance.toFixed()}m</td>
              </tr>
              <tr>
                <td><strong>Riders</strong></td>
                <td>{ride.ridersCount}</td>
              </tr>
              <tr>
                <td><strong>City</strong></td>
                <td>{ride.city}</td>
              </tr>
            </tbody>
          </table>
          <button className='btn btn-dark'>Book</button>
        </p>
      </div>
    </div>
  </div>
</div>
 ;
}
