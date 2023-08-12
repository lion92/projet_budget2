import React, {useCallback, useState} from 'react';
import Navigation from "./Navigation";
import Form from "./Form";

const Connection = () => {
    const [messageLog, setMessageLog]=useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [probleme, setProbleme] = useState("");
    let fetchConnection = useCallback(async (e) => {
        e.preventDefault();
        const response = await fetch(
            "http://localhost:3004/connection/login",
            {
                method: "POST",
                body: JSON.stringify({

                    "password": password,
                    "email": email
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
        await response.json().then(data => {

            if (!isNaN(data?.id)) {
                localStorage.setItem("utilisateur", data?.id);
                setMessageLog("Code Bon");
                setProbleme('connecte')
            }
            else{
                setMessageLog("Combinaison code et mot de passe incorrect")

            }

        })
    });

    return (
        <div>
                {(probleme === "connecte") ? (<Form></Form>) : ''
                }
                {(probleme !== "connecte") ? (
                    <>
                    <div id='container'>
                        <Navigation></Navigation>
                        <div>{messageLog}</div>
                        <div id="iconLogin"/>
                        <input id='email' value={email} placeholder={'email'} onChange={e => setEmail(e.target.value)}
                               type={'text'}/>
                        <input id='password' value={password} placeholder={'password'}
                               onChange={e => setPassword(e.target.value)} type={'text'}/>
                        <a id="mdpOublie" href="">Mot de passe ounblié</a>
                        <button onClick={fetchConnection} id='btnLogin'>LOGIN</button>
                        <h1>{(probleme!=='connecte'?'incorrect':'connecte')}</h1>
                        <a href='/inscription'>
                            SIGNUP
                        </a>
                    </div>

                    </>

                ) : ''
                }
        </div>
    );
};

export default Connection;