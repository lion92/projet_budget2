import React, {useCallback, useEffect, useState} from 'react';


export function Budget(props) {
    {
        let [actionDescription, setActionDescription] = useState("");
        let [montant, setMontant] = useState(0);
        let [montantError, setMontantError] = useState(0);
        let [actionCategorieError, setActionCategorieError] = useState("");
        let [actionCategorie, setActionCategorie] = useState("");
        let [actionDescriptionError, setActionDescriptionError] = useState("");
        let [valueInput, setValue] = useState("");
        let [valueInputDescription, setDescription] = useState("");
        let [idVal, setId] = useState(-1);
        let [textp, setText] = useState([]);
        const [load, setLoad] = useState(false);

        let attendre = () => {
            setLoad(true);
            setTimeout(() => {
                setLoad(false);
            }, 2000);
            console.log(load);
        };
        useEffect(() => {
            attendre();
        }, []);
        ////////////////////////Rechercher/////////////
        let recherche = async (e) => {
            e.preventDefault();
            if (valueInput === "") {
                console.log("test0");
                await fetchAPI();
            } else {
                let f = await fetchAPI();
                await console.log(f);
                await valueInput;
                let tab = await f.filter((elemt) =>
                    elemt.title === valueInput
                    || elemt.description === valueInputDescription
                );
                await setText(tab);
                await console.log("bb");
            }
        };
        ////////////////////////////////////////////
        ///////////////////fectchApi/////////////////////////
        const fetchAPI = useCallback(async () => {
            const response = await fetch("http://localhost:3004/action");
            const resbis = await response.json();
            await setText(resbis);
            return resbis;
        }, [setText]);

        /////////////////////////////////////////
        ///////////////remonter au parent//////////////////////////////iddata/////////
        let idchange = (data) => {
            setId(data);
        };
        //////////////////////////appel api en debut
        useEffect(() => {
            fetchAPI();
        }, []);
        ////////////////////////////////////////supprimme des tache
        let del = (e, data) => {
            e.preventDefault();
            fetchdelete(data);
        };
        ///////////////////////////////////////////////////////////remonter le texte
        let textebis = (data) => {
            setValue(data);
        };
        ///////////////////////////////////////////////////////////remonter le texte
        let textebisDesc = (data) => {
            setDescription(data);
        };
        /////////////////////////////
        ///////////////////////////appel delete
        let fetchdelete = useCallback(async (data) => {
            let idTodo = parseInt(data, 10)
            const response = await fetch(
                "http://localhost:3004/todos/" + idTodo,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const resbis = await response;
            await fetchAPI();
        });
        //////////////////////insert tache
        let fetchCreer = useCallback(async (e) => {
            let userid = "" + localStorage.getItem("utilisateur");
            let userid2 = parseInt(userid)
            e.preventDefault();
            const response = await fetch(
                "http://localhost:3004/todos",
                {
                    method: "POST",
                    body: JSON.stringify({
                        title: valueInput,
                        description: valueInputDescription,
                        user: userid2
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const resbis = await response;
            await fetchAPI();

        });
        ////////////////////update////////////
        let fetchAPIupdate = useCallback(async () => {
            let userid = "" + localStorage.getItem("utilisateur");
            await console.log(userid);
            let id = parseInt(userid);
            const response = await fetch(
                "http://localhost:3004/todos/" + idVal,
                {
                    method: "PUT",
                    body: JSON.stringify({
                        title: valueInput,
                        description: valueInputDescription,
                        user: id
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const resbis = await response;
            await fetchAPI();
        });
        ////////////////////////input change value
        let Valuechange = (e) => {
            let a = e.target.value;
            console.log(a);

            if (valueInput.length > 20) {


            } else {

            }
            setValue(a);
            return a;
        };
        ////////////////////////input change description
        let valueChangeDescription = (e) => {
            let a = e.target.value;
            console.log(a);

            if (valueInputDescription.length > 50) {

            } else {


            }
            return a;
        };
        /////////////////////////modifier
        let modifier = (e) => {
            e.preventDefault();
            fetchAPIupdate();
            setValue("");

        };
        /////////////////////////modifier
        let deleteMontant = (e) => {
            e.preventDefault();
            fetchdelete(idVal);
            setValue("");

        };
        /////////////////////////
        return (
            <div>
                <form>
                    <label id="idLabel">
                        id:{idVal} </label>
                    <div className="container">
                        <div>
                            <label>Categorie</label>
                            <input value={actionCategorie} onChange={(e) => setActionCategorie(e)}/>{" "}
                            <p className="error">{actionCategorieError}</p>
                        </div>
                        <div>
                            <label>Description</label>
                            <input value={actionDescription} onChange={(e) => setActionDescription(e)}/>{" "}
                            <p className="error">{actionDescriptionError}</p>
                        </div>
                        <div>
                            <label>Montant</label>
                            <input value={montant} onChange={(e) => setMontant(e)}/>{" "}
                            <p className="error">{montantError}</p>
                        </div>
                    </div>
                    <button onClick={modifier}>modifier</button>
                    <button onClick={fetchCreer}>creer</button>
                    <button onClick={deleteMontant}>Supprimer</button>
                    <button onClick={recherche}>Rechercher</button>

                </form>
                <div className="container2">
                    {textp.map((item, index) => {
                        return (
                            <>
                            <p className="montant">{item.montant}</p>
                            <p className="description">{item.description}</p>
                            </>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default Budget;