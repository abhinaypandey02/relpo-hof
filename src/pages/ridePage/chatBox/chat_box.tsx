import React, { useEffect, useState } from "react";
import { useUser } from "../../../contexts/user_context";
import RideInterface from "../../../interface/ride_interface";
import UserInterface from "../../../interface/user_interface";
import fire from "../../../utils/firebase/firebase";
import { RideWithID } from "../ride_page";

interface ChatInterface {
  sender: UserInterface;
  message: string;
  timestamp: number;
}

export default function ChatBox({ ride }: { ride: RideWithID }) {
  const [chats, setChats] = useState<ChatInterface[]>([]);
  const [message, setMessage] = useState("");
  const [user] = useUser();
  function sendChat() {
    setMessage("");
    fire
      .firestore()
      .collection("rides")
      .doc(ride.docID)
      .collection("chats")
      .add({ message, sender: user, timestamp: new Date().getTime() });
  }

  useEffect(() => {
    fire
      .firestore()
      .collection("rides")
      .doc(ride.docID)
      .collection("chats")
      .onSnapshot((data: any) => {
        let tempChats: ChatInterface[] = [];
        data.docs.forEach((doc: any) => tempChats.push(doc.data()));
        tempChats.sort((a, b) => a.timestamp - b.timestamp);
        setChats(tempChats);
      });
  }, []);
  return (
    <div className="container min-vh-50">
      <div className="row-fluid min-vh-75" style={{ height: 500 }}>
        {chats.map((chat) => (
          <div
            className={
              chat.sender.uuid === user?.uuid ? "text-right" : "text-left"
            }
          >
            <div>{chat.message}</div>
            <small className="text-muted">
              {new Date(chat.timestamp).toLocaleTimeString()}
            </small>
          </div>
        ))}
      </div>
      <div className="row-fluid flex-grow-1 d-flex">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Send a message"
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            id="button-addon2"
            onClick={sendChat}
          >
            Button
          </button>
        </div>
      </div>
    </div>
  );
}
