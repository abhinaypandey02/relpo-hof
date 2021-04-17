import "./login_page.css";
import SITE_META from "../../metadata/site_meta";
import {FormEvent, useState} from "react";
import {signInWithEmailAndPassword} from "../../utils/firebase/auth";

export default function LoginPage(){
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    function onSubmit(event:FormEvent<HTMLFormElement>){
        event.preventDefault();
        if(password===''){
            return;
        }

        signInWithEmailAndPassword(email,password).then(()=>{
            console.log("DONE")
        });

    }
    return <div className="section1">
        <div className="container" id="base">
            <div className="row-fluid ">
                <div className="col-fluid text-center">
                    <h3 className="display-1">{SITE_META.appName}</h3>
                </div>
                <br/>
                    <div className="row-fluid">
                        <div className="col-fluid">
                            <form onSubmit={onSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                    <input value={email} onChange={(event)=>{setEmail(event.target.value)}} type="email" className="form-control bg-dark" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                    <input onChange={(event)=>{setPassword(event.target.value)}} value={password} type="password" className="form-control bg-dark" id="exampleInputPassword1"/>
                                </div>
                                <button type="submit" className="btn btn-outline-dark mt-3" id="loginb">Login</button>
                            </form>

                        </div>
                    </div>
            </div>
        </div>
    </div>
}