import React, {useCallback, useEffect, useState} from 'react';
import Graph from "./Graph";


export function Budget(props) {


    {
        let [actionDescription, setActionDescription] = useState("");
        let [idMontant, setIdMontant] = useState(-1);
        let [montant, setMontant] = useState(0);
        let [montantError, setMontantError] = useState(0);
        let [actionCategorieError, setActionCategorieError] = useState("");
        let [actionCategorie, setActionCategorie] = useState("");
        let [actionDescriptionError, setActionDescriptionError] = useState("");
        let [valueInput, setValue] = useState("");
        let [valueInputDescription, setDescription] = useState("");
        let [idVal, setId] = useState(-1);
        let [textp, setText] = useState([]);
        let [textCat, setTextCat] = useState([]);
        let [montantTotal, setMontantTotal] = useState(0);
        const [load, setLoad] = useState(false);
        const data = {
            labels: textp.map(value => value.description),
            datasets: [
                {
                    label: 'Graphique',
                    data: textp.map(value => value.montant),
                    backgroundColor: textp.map(value =>{ return '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')}),
                    borderColor: 'black',

                }
            ]
        };

        const fetchAPICat = useCallback(async () => {
            const response = await fetch("http://localhost:3004/categorie");
            const resbis = await response.json();
            await setTextCat(resbis);

            return resbis;
        }, [setText]);

        let idCategorie = (data) => {
            let str = "" + data
            str = str.split(" ")[0];
            setActionCategorie(str);
        };
        let attendre = () => {
            setLoad(true);
            setTimeout(() => {
                setLoad(false);
            }, 2000);
            console.log(load);
        };
        useEffect(() => {
            attendre();
            fetchAPI();
            fetchAPICat();
        }, []);
        ////////////////////////Rechercher/////////////
        let recherche = async (e) => {
            e.preventDefault();
            if (montant === 0) {
                let f = await fetchAPI();
                await setText(f);
            } else {
                let f = await fetchAPI();
                await console.log(f);
                let tab = await f.filter((elemt) => {
                        return ("" + elemt.montant === "" + montant)
                    }
                );
                await setText(tab);
            }


        };
        ////////////////////////////////////////////
        ///////////////////fectchApi/////////////////////////
        const fetchAPI = useCallback(async () => {
            const response = await fetch("http://localhost:3004/action");
            const resbis = await response.json();
            await setText(resbis);
            setMontantTotal(resbis.map(val => val.montant).reduce(function (a, b) {
                return a + b;
            }, 0))
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
                "http://localhost:3004/action/" + idTodo,
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

            e.preventDefault();
            const response = await fetch(
                "http://localhost:3004/action",
                {
                    method: "POST",
                    body: JSON.stringify({
                        montant: montant,
                        categorie: actionCategorie,
                        description: actionDescription,
                        user: parseInt("" + localStorage.getItem("utilisateur"))
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
            const response = await fetch(
                "http://localhost:3004/action/" + idMontant,
                {
                    method: "PUT",
                    body: JSON.stringify({
                        categorie: actionCategorie,
                        description: actionDescription,
                        montant: montant,
                        user: parseInt("" + localStorage.getItem("utilisateur"))
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
            fetchdelete(idMontant);
            setValue("");

        };
        /////////////////////////
        return (
            <div>

                <form>
                    <label id="idLabel">
                        id:{idMontant} </label>
                    <div className="container">
                        <div>
                            <label>IdMontant</label>
                            <input value={idMontant} onChange={(e) => setIdMontant(e.target.value)}/>{" "}
                        </div>
                        <div>
                            <label>Categorie</label>
                            <select>
                                {textCat.map((option, index) => {
                                    return <option onClick={() => {
                                        setActionCategorie(option.id)
                                    }} key={option.id}>
                                        {option.id} {" " + option.description}

                                    </option>
                                })}
                            </select>
                            <p className="error">{actionCategorieError}</p>
                        </div>
                        <div>
                            <label>Description</label>
                            <input value={actionDescription}
                                   onChange={(e) => setActionDescription(e.target.value)}/>{" "}
                            <p className="error">{actionDescriptionError}</p>
                        </div>
                        <div>
                            <label>Montant</label>
                            <input value={montant} onChange={(e) => setMontant(e.target.value)}/>{" "}
                            <p className="error">{montantError}</p>
                        </div>
                    </div>
                    <button onClick={modifier}>modifier</button>
                    <button onClick={fetchCreer}>creer</button>
                    <button onClick={deleteMontant}>Supprimer</button>
                    <button onClick={recherche}>Rechercher</button>

                </form>
                <div className="container">

                    <table>
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Montant</th>
                            <th>Description</th>
                            <th>Categorie</th>
                            <th>CategorieDescription</th>
                        </tr>
                        </thead>
                        <tbody>

                        {textp.map((item, index) => {
                            return (
                                <>
                                    <tr onClick={() => {
                                        setIdMontant(item.id);
                                        setMontant(item.montant);
                                        setActionDescription(item.description);
                                    }}>
                                        <th>{item.id}</th>
                                        <th className="montant">{item.montant}</th>
                                        <th className="description">{item.description}</th>
                                        <th className="description">{item.categorie.id}</th>
                                        <th className="description">{item.categorie.description}</th>
                                    </tr>
                                </>
                            );
                        })}
                        </tbody>
                        <tfoot>
                        <tr>
                            <th scope="row" colSpan="2"></th>
                            <td colSpan="2">montantTotal{montantTotal}</td>
                        </tr>
                        </tfoot>
                    </table>

                </div>
                <Graph data={data}></Graph>
            </div>
        );
    }
}

export default Budget;