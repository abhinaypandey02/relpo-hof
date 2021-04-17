import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Loading from "../../components/loading/loading";
import RideInterface from "../../interface/ride_interface";
import { getRideByUID } from "../../utils/firebase/firestore";
import user from './user.png';

export default function RidePage() {
  const params: any = useParams();
  const [ride, setRide] = useState<null | undefined | RideInterface>(undefined);
  useEffect(() => {
    getRideByUID(params.rideID).then((doc: any) => {
      if (doc) setRide(doc?.data());
      else setRide(null);
    });
  }, [params.rideID]);
  if (ride === undefined) return <Loading />;
  if (ride === null) return <div>NOT FOUND :(</div>;
  return <div className ='container min-vh-100 d-flex justify-content-center bg-danger'>
    <div className='row-fluid m-3 bg-dark'>
      <div className='col-md-12'>
    <div className="card mb-3">
      <div className='card-header'>Title</div>
      <div className="row g-0">
        <div className="col-md-4 d-flex justify-content-center align-content-center">
          <img
            src='user'
            alt="..."
            className="img-fluid"
          />
        </div>
        <div className="badge badge-warning m-2" style={{ height: 20 }}>
         
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{ride.name} Ride</h5>
            <p className="card-text">
              <table className="table">
                <tbody>
                  <tr>
                    <td>
                      <strong>Distance</strong>
                    </td>
                    <td>km</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Riders</strong>
                    </td>
                    <td>{ride.ridersCount}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Area</strong>
                    </td>
                    <td>Lorem ipsum</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Riders</strong>
                    </td>
                    <td>{ride.ridersCount}</td>
                  </tr>
                </tbody>
              </table>
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
  <div className="col-md-12 "><button className="btn btn-outline-light w-100"> CHAT </button></div>

  <div className="col-md-12 mt-3"><button className="btn btn-outline-light w-100">GOOGLE MAPS </button></div>
    </div>

  </div>;
}
