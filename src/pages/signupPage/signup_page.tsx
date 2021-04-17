import "./signup_page.css";
import SITE_META from "../../metadata/site_meta";
import { FormEvent, useState } from "react";
import { signUpWithEmailAndPassword } from "../../utils/firebase/auth";
import { createUserDocument } from "../../utils/firebase/firestore";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    //validation
    signUpWithEmailAndPassword(email, password).then(() => {
      createUserDocument({ email, name, phone });
    });
  }

  return (
    <div className="section1">
      <div className="container" id="base">
        <div className="row-fluid ">
          <div className="col-fluid text-center">
            <h3 className="display-1">{SITE_META.appName}</h3>
          </div>
          <br />
          <div className="row-fluid">
            <div className="col-fluid">
              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Name
                  </label>
                  <input
                    onChange={(event) => {
                      setName(event.target.value);
                    }}
                    value={name}
                    type="text"
                    className="form-control bg-dark"
                    placeholder="Name"
                    id="exampleInputPassword1"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Email address
                  </label>
                  <input
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                    type="email"
                    className="form-control bg-dark"
                    placeholder="Email address"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Phone
                  </label>
                  <input
                    onChange={(event) => {
                      setPhone(event.target.value);
                    }}
                    value={phone}
                    type="password"
                    className="form-control bg-dark"
                    placeholder="Phone"
                    id="exampleInputPassword1"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Password
                  </label>
                  <input
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                    value={password}
                    type="password"
                    className="form-control bg-dark"
                    placeholder="Password"
                    id="exampleInputPassword1"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Retype Password
                  </label>
                  <input
                    onChange={(event) => {
                      setConfirmPassword(event.target.value);
                    }}
                    value={confirmPassword}
                    type="password"
                    className="form-control bg-dark"
                    placeholder="Retype Password"
                    id="exampleInputPassword1"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-outline-dark mt-3"
                  id="loginb"
                >
                  Signup
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
