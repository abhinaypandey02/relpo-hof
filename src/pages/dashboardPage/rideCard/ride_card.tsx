import { RideWithDistance } from "../../../interface/ride_interface";

export default function RideCard({ ride }: { ride: RideWithDistance }) {
  return (
    <div>
      {ride.name} {ride.distance.toFixed()}m
    </div>
  );
}
