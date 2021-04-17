import React from "react";

export default function ChatBox() {
  return <div className="container min-vh-50">
    <div className="row-fluid min-vh-75">

    </div>
    <div className="row-fluid flex-grow-1 d-flex">
      <div className="input-group mb-3">
        <input type="text" className="form-control" placeholder="Send a message" aria-label="Recipient's username" aria-describedby="button-addon2"/>
          <button className="btn btn-outline-secondary" type="button" id="button-addon2">Button</button>
      </div>
    </div>
    </div>
    ;
}
