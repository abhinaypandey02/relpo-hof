import { useUser } from "../../../contexts/user_context";
import { RideWithDistance } from "../../../interface/ride_interface";

export default function RideCard({ ride }: { ride: RideWithDistance }) {
  const [user] = useUser();
  return (
    <div className="card mb-3">
      <div className="row g-0">
        <div className="col-md-12">
          <div className="card-body">
            <h5 className="card-title">{ride.name} Ride</h5>
            <p className="card-text">
              <table className="table">
                <tbody>
                  <tr>
                    <td>
                      <strong>Distance</strong>
                    </td>
                    <td>{ride.distance.toFixed()}km</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Riders</strong>
                    </td>
                    <td>{ride.ridersCount}</td>
                  </tr>
                </tbody>
              </table>
              <div className="badge badge-warning m-2" style={{ height: 20 }}>
                {ride.host === user?.uuid && "You are HOST"}
              </div>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
