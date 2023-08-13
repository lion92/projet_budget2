import React, {useCallback, useState} from 'react';
import Navigation from "./Navigation";
import Form from "./Form";

const Connection = () => {
    const [messageLog, setMessageLog] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [mailError, setEmailError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [probleme, setProbleme] = useState("");

    function ValidateEmail(mail) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return (true)
        }
        setEmailError("You have entered an invalid email address!")
        return (false)
    }

    let fetchConnection = useCallback(async (e) => {
        e.preventDefault();
        let response =null;
        if (password.length < 3) {
            setPasswordError("impossible mot de passe trop court minimum 3 caractere")
        } else {
             response=await fetch(
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
                })
        }

        await response?.json().then(data => {

            if (!isNaN(data?.id)) {
                localStorage.setItem("utilisateur", data?.id);
                setMessageLog("Code Bon");
                setProbleme('connecte')
            } else {
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
                        <input id='email' value={email} placeholder={'email'} onChange={e => {
                            setEmail(e.target.value);
                            if (ValidateEmail(email)) {
                                setEmailError("")
                            }
                        }}
                               type={'text'}/>
                        <p className="error">{mailError}</p>
                        <input id='password' value={password} placeholder={'password'}
                               onChange={e => {
                                   if (e.target.value.length < 3) {
                                       setPassword(e.target.value);
                                       setPasswordError("Le mot de passe doit être d'au moins 3 caractère")
                                   } else {
                                       setPasswordError("")
                                       setPassword(e.target.value)
                                   }
                               }} type={'text'}/>

                        <p className="error">{passwordError}</p>
                        <a id="mdpOublie" href="">Mot de passe ounblié</a>
                        <button onClick={fetchConnection} id='btnLogin'>LOGIN</button>
                        <h1>{(probleme !== 'connecte' ? 'incorrect' : 'connecte')}</h1>
                    </div>

                </>

            ) : ''
            }
        </div>
    );
};

export default Connection;