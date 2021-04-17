import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useParams } from "react-router";
import Loading from "../../components/loading/loading";
import { useUser } from "../../contexts/user_context";
import RideInterface from "../../interface/ride_interface";
import UserInterface from "../../interface/user_interface";
import fire from "../../utils/firebase/firebase";
import {
  getRideByUID,
  getUserByUID,
  removeUserFromRide,
} from "../../utils/firebase/firestore";
import ChatBox from "./chatBox/chat_box";
import userimage from "./user.png";

export interface RideWithID extends RideInterface {
  docID: string;
}

export default function RidePage() {
  const params: any = useParams();
  const [user] = useUser();
  const [ride, setRide] = useState<null | undefined | RideWithID>(undefined);
  const [participants, setParticipants] = useState<UserInterface[]>([]);
  const [host, setHost] = useState<null | UserInterface>(null);
  const [showChats, setShowChats] = useState(false);
  useEffect(() => {
    fire
      .firestore()
      .collection("rides")
      .where("uuid", "==", params.rideID)
      .onSnapshot((data: any) => {
        if (data && data.docs.length === 1)
          setRide({ ...data.docs[0].data(), docID: data.docs[0].id });
        else setRide(null);
      });
  }, [params.rideID]);
  useEffect(() => {
    async function t() {
      if (ride) {
        const hostDoc: any = await getUserByUID(ride.host);
        if (hostDoc) setHost(hostDoc);
        let tempParticipants: UserInterface[] = [];
        for (let participant of ride.participants) {
          const doc: any = await getUserByUID(participant);
          if (doc) tempParticipants.push(doc);
        }
        setParticipants(tempParticipants);
      }
    }
    if (ride) t();
  }, [ride]);
  if (ride === undefined) return <Loading />;
  if (ride === null) return <div>NOT FOUND :(</div>;
  return (
    <div className="container min-vh-100 ">
      <Modal centered show={showChats} onHide={() => setShowChats(false)}>
        <Modal.Header closeButton>Chat</Modal.Header>
        <Modal.Body>
          <ChatBox ride={ride} />
        </Modal.Body>
      </Modal>
      <div className="row ">
        <div className="col-md-8 p-3 d-flex align-items-center justify-content-center">
          <span className="border border-dark">
            <div className="card">
              <div className="card-header">{ride.name}</div>
              <div className="row g-0">
                <div className="col-md-4 d-flex justify-content-center align-items-center">
                  <img src={userimage} alt="..." className="img-fluid" />
                </div>
                <div
                  className="badge badge-warning"
                  style={{ height: 20 }}
                ></div>
                <div className="col-md-8 ">
                  <div className="card-body">
                    {host && (
                      <h5 className="card-title">{host?.name}'s Ride</h5>
                    )}
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
                            <td>{ride.city}</td>
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
          <button
            onClick={() => setShowChats(true)}
            className="btn btn-outline-dark flex-grow-1 w-100 mb-1 "
          >
            CHAT
          </button>
        </div>
      </div>
      {participants.length > 0 && (
        <div className="row d-flex align-items-center justify-content-center mt-4">
          <h2>PARTICIPANTS</h2>
        </div>
      )}
      {participants.map((p) => (
        <div className="row mt-4">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">{p.name}</div>
              <div className="row g-0">
                <div className="col-md-4 d-flex justify-content-center align-items-center">
                  <img src={userimage} alt="..." className="img-fluid" />
                </div>
                <div
                  className="badge badge-warning"
                  style={{ height: 20 }}
                ></div>
                <div className="col-md-8 ">
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">
                      <table className="table">
                        <tbody>
                          <tr>
                            <td>
                              <strong>Email</strong>
                            </td>
                            <td>{p.email}</td>
                          </tr>
                        </tbody>
                      </table>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {user?.uuid === ride.host && (
            <div className="col-md-4  d-flex align-items-center justify-content-center flex-column">
              <button
                onClick={() => {
                  removeUserFromRide(p.uuid, ride);
                }}
                className="btn btn-danger flex-grow-1 w-100 mt-1"
              >
                KICK
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
