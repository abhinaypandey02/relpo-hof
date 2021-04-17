import "./signup_page.css";
import SITE_META from "../../metadata/site_meta";

export default function SignupPage(){
    return <div className="section1">
        <div className="container" id="base">
            <div className="row-fluid ">
                <div className="col-fluid text-center">
                    <h3 className="display-1">{SITE_META.appName}</h3>
                </div>
                <br/>
                    <div className="row-fluid">
                        <div className="col-fluid">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Name</label>
                                    <input type="password" className="form-control bg-dark" placeholder="Name"
                                           id="exampleInputPassword1"/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                    <input type="email" className="form-control bg-dark" placeholder="Email address"
                                           id="exampleInputEmail1" aria-describedby="emailHelp"/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Phone</label>
                                    <input type="password" className="form-control bg-dark" placeholder="Phone"
                                           id="exampleInputPassword1"/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                    <input type="password" className="form-control bg-dark" placeholder="Password"
                                           id="exampleInputPassword1"/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Retype
                                        Password</label>
                                    <input type="password" className="form-control bg-dark"
                                           placeholder="Retype Password" id="exampleInputPassword1"/>
                                </div>
                                <button type="button" className="btn btn-outline-dark mt-3" id="loginb">Signup</button>
                            </form>

                        </div>
                    </div>
            </div>
        </div>
    </div>
}