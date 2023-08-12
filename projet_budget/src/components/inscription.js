import React, {useCallback, useState} from 'react';
import Navigation from "./Navigation";

const Inscription = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [age, setAge] = useState("");

    let fetchInscription= useCallback(async (e) => {
        e.preventDefault();
        const response = await fetch(
            "http://localhost:3004/connection/signup",
            {
                method: "POST",
                body: JSON.stringify(
                    {
                        "nom": nom,
                        "prenom": prenom,
                        "age": age,
                        "password": password,
                        "email": email
                    },),
                headers: {
                    "Content-Type": "application/json",
                },
            }
            );
    });

    return (

        <div>
        <div id='container'>
        <Navigation></Navigation>
        <div id="iconLogin"/>
    <input id='nom' value={nom} placeholder={'nom'}
    onChange={e => setNom(e.target.value)} type={'text'}/>
    <input id='prenom' value={prenom} placeholder={'prenom'}
    onChange={e => setPrenom(e.target.value)} type={'text'}/>
    <input id='age' value={age} placeholder={'age'}
    onChange={e => setAge(e.target.value)} type={'text'}/>

    <input id='email' value={email} placeholder={'email'} onChange={e => setEmail(e.target.value)}
    type={'text'}/>
    <input id='password' value={password} placeholder={'password'}
    onChange={e => setPassword(e.target.value)} type={'text'}/>

    <button onClick={fetchInscription} id='btnSignup'>SIGNUP</button>
        <a href='/login' >LOGIN</a>
        </div>
        </div>
);
};

export default Inscription;