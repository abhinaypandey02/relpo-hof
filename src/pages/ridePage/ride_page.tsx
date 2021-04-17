import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Loading from "../../components/loading/loading";
import RideInterface from "../../interface/ride_interface";
import { getRideByUID } from "../../utils/firebase/firestore";

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
  return <div>{ride.name}</div>;
}
