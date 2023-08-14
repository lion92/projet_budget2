import React from 'react';
import {NavLink} from "react-router-dom";
import Helloword from "./Helloword";

const Navigation = () => {
    return (
        <div id='containerTitle'>
            <ul>
                <NavLink to={"/"}>
                    <li>Bienvenue</li>
                </NavLink>
                <NavLink to={"/login"}>
                    <li>Login</li>
                </NavLink>
                <NavLink to={"/inscription"}>
                    <li>Incription</li>
                </NavLink>
                <NavLink to={"/categorie"}>
                    <li>Categorie</li>
                </NavLink>
                <NavLink to={"/form"}>
                    <li>tache</li>
                </NavLink>
                <NavLink to={"/budget"}>
                    <li>Buget</li>
                </NavLink>


            </ul>
            <Helloword></Helloword>
        </div>
    );
};

export default Navigation;