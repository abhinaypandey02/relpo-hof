import React from 'react';
import './App.css';
import SignupPage from "./pages/signupPage/signup_page";
import {Switch, BrowserRouter, Route} from "react-router-dom";
import LandingPage from "./pages/landingPage/landing_page";
import ROUTES_META from "./metadata/routes_meta";

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact={true} path={'/'} component={LandingPage}/>
                <Route path={ROUTES_META.signUp} component={SignupPage}/>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
