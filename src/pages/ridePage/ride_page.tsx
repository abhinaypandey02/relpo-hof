import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Loading from "../../components/loading/loading";
import RideInterface from "../../interface/ride_interface";
import { getRideByUID } from "../../utils/firebase/firestore";
import userimage from './user.png';

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
  return <div className='container min-vh-100 '>
    <div className='row '>
      <div className='col-md-8 p-3 d-flex align-items-center justify-content-center'>
      <span className="border border-dark">
        <div className="card">
          <div className='card-header'>Title</div>
          <div className="row g-0">
            <div className="col-md-4 d-flex justify-content-center align-items-center">
              <img
                src={userimage}
                alt="..."
                className="img-fluid"
              />
            </div>
            <div className="badge badge-warning" style={{ height: 20 }}>

            </div>
            <div className="col-md-8 ">
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
        </span>
      </div>
      <div className="col-md-4 d-flex align-items-center  p-3 justify-content-center flex-column">
        <button className="btn btn-outline-dark flex-grow-1 w-100 mb-1 "> CHAT </button>
        <br/>
        <button className="btn btn-dark flex-grow-1 w-100 ">GOOGLE MAPS </button>
      </div>
    </div>
    <div className="row d-flex align-items-center justify-content-center mt-4">
      <h2>PARTICIPANTS</h2>
    </div>
    <div className="row mt-4">
      <div className="col-md-8">
    <div className="card">
          <div className='card-header'>Title</div>
          <div className="row g-0">
            <div className="col-md-4 d-flex justify-content-center align-items-center">
              <img
                src={userimage}
                alt="..."
                className="img-fluid"
              />
            </div>
            <div className="badge badge-warning" style={{ height: 20 }}>

            </div>
            <div className="col-md-8 ">
              <div className="card-body">
                <h5 className="card-title">Lorem Ipsum</h5>
                <p className="card-text">
                  <table className="table">
                    <tbody>
                      <tr>
                        <td>
                          <strong>Age</strong>
                        </td>
                        <td>12</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Gender</strong>
                        </td>
                        <td>Male</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Area</strong>
                        </td>
                        <td>Dwarka</td>
                      </tr>
                    </tbody>
                  </table>
                </p>
              </div>
            </div>
          </div>
        </div>
        </div>
        <div className="col-md-4  d-flex align-items-center justify-content-center flex-column">
        <button className="btn btn-outline-success flex-grow-1 w-100 mb-1 "> ALLOW </button>
        <br/>
        <button className="btn btn-danger flex-grow-1 w-100 ">DENY </button>
      </div>
    </div>

  </div>;
}
