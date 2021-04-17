import { useUser } from "../../contexts/user_context";
import "./dashboard_page.css";
import { Form, Modal, Button } from "react-bootstrap";
import React, { FormEvent, useEffect, useState } from "react";
import { usePosition } from "../../components/useLocation/useLocation";
import { addRide, getUserByUID } from "../../utils/firebase/firestore";
import RideInterface, {
  RideWithDistance,
} from "../../interface/ride_interface";
import fire from "../../utils/firebase/firebase";
import { v4 as uuidv4 } from "uuid";
import RideCard from "./rideCard/ride_card";
import RideInfo from "./rideInfo/ride_info";

function rad(x: number) {
  return (x * Math.PI) / 180;
}

function getDistance(
  rideLat: number,
  rideLong: number,
  currLat: number,
  currLong: number
) {
  var R = 6378137; // Earth’s mean radius in meter
  var dLat = rad(rideLat - currLat);
  var dLong = rad(rideLong - currLong);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(rideLat)) *
      Math.cos(rad(currLat)) *
      Math.sin(dLong / 2) *
      Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = (R * c )/1000;
  return d; // returns the distance in meter
}

export default function DashboardPage() {
  const [user] = useUser();
  const { latitude, longitude } = usePosition();
  const [hostModalVisibility, setHostModalVisibility] = useState(false);
  const [joinModalVisibility, setJoinModalVisibility] = useState(false);
  const [hostedRides, setHostedRides] = useState<RideWithDistance[]>([]);
  const [rideName, setRideName] = useState("");
  const [ridersCount, setRidersCount] = useState(0);
  const [city, setCity] = useState("");
  const [selectedRide, setSelectedRide] = useState<null | RideWithDistance>(
    null
  );
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    //verification
    console.log(user?.uuid);
    if (user)
      addRide({
        name: rideName,
        ridersCount,
        city,
        lat: latitude,
        long: longitude,
        uuid: uuidv4(),
        host: user?.uuid,
      }).then(() => {
        setHostModalVisibility(false);
        alert("Ride Hosted!");
      });
  }
  async function processRides(rides: any) {
    const tempRides: RideWithDistance[] = [];
    for (let ride of rides) {
      const rideUser = await getUserByUID(ride.host);
      tempRides.push({
        ...ride,
        distance: getDistance(ride.lat, ride.long, latitude, longitude),
        user: rideUser,
      });
    }
    tempRides.sort((a, b) => a.distance - b.distance);
    return tempRides;
  }
  useEffect(() => {
    async function t() {
      const newrides: any = await processRides(hostedRides);
      setHostedRides((rides) => newrides);
    }
    t();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latitude, longitude]);

  useEffect(() => {
    fire
      .firestore()
      .collection("rides")
      .onSnapshot(async (snapshot) => {
        const rides: RideInterface[] = [];
        snapshot.docs.forEach((doc: any) => rides.push(doc.data()));
        setHostedRides(await processRides(rides));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="section1">
      <Modal
        centered
        show={selectedRide !== null}
        onHide={() => {
          setSelectedRide(null);
          setJoinModalVisibility(true);
        }}
      >
        <Modal.Header closeButton>Book {selectedRide?.name}</Modal.Header>
        <Modal.Body>
          {selectedRide && <RideInfo ride={selectedRide} />}
        </Modal.Body>
      </Modal>
      <Modal
        centered
        show={hostModalVisibility}
        onHide={() => setHostModalVisibility(false)}
      >
        <Modal.Header closeButton>Host a ride</Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Ride Name</Form.Label>
              <Form.Control
                value={rideName}
                onChange={(e) => setRideName(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>No. of riders</Form.Label>
              <Form.Control
                value={ridersCount}
                onChange={(e) => setRidersCount(parseInt(e.target.value))}
                type={"number"}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>City/Area</Form.Label>
              <Form.Control
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </Form.Group>
            <Button variant="dark" className="rounded-pill" type="submit">
              Host Now
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Modal
        centered
        show={joinModalVisibility}
        onHide={() => setJoinModalVisibility(false)}
      >
        <Modal.Header closeButton>Join a ride</Modal.Header>
        <Modal.Body>
          {!selectedRide &&
            hostedRides.map((ride) => (
              <div
                onClick={() => {
                  setJoinModalVisibility(false);
                  setTimeout(() => setSelectedRide(ride), 100);
                }}
              >
                <RideCard key={ride.uuid} ride={ride} />
              </div>
            ))}
        </Modal.Body>
      </Modal>
      <div className="container" id="base">
        <div className="row-fluid ">
          <div className="col-fluid text-center text-inline">
            <h3 className="display-2">Hi,{user?.name}</h3>
          </div>
          <br />
          <div
            className="row d-flex flex-row justify-content-around"
            id="btncontainer"
          >
            <div className="col-fluid">
              <button
                type="button"
                className="btn btn-dark"
                id="buttonsbox"
                onClick={() => setHostModalVisibility(true)}
              >
                HOST
              </button>
            </div>
            <div className="col-fluid">
              <button
                onClick={() => setJoinModalVisibility(true)}
                type="button"
                className="btn btn-dark"
                id="buttonsbox"
              >
                JOIN
              </button>
            </div>
            <div className="col-fluid">
              <button
                type="button"
                className="btn btn-dark text-wrap"
                id="buttonsbox"
              >
                SOLO
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}