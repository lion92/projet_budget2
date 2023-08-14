import React, {useCallback, useEffect, useState} from 'react';
import Navigation from "./Navigation";


export function Categorie(props) {


    {
        let [categorieDescription, setCategorieDescription] = useState("");
        let [idCategorieValue, setidCategorieValue] = useState(-1);
        let [categorie, setCategorie] = useState("");
        let [valueInput, setValue] = useState("");
        let [valueInputDescription, setDescription] = useState("");
        let [idVal, setId] = useState(-1);
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

        ////////////////////////////////////////////
        ///////////////////fectchApi/////////////////////////

        /////////////////////////////////////////
        ///////////////remonter au parent//////////////////////////////iddata/////////
        let idchange = (data) => {
            setId(data);
        };
        //////////////////////////appel api en debut
        useEffect(() => {

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
                "http://localhost:3004/categorie/" + idTodo,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const resbis = await response;
        });
        //////////////////////insert tache
        let fetchCreer = useCallback(async (e) => {
            e.preventDefault();
            const response = await fetch(
                "http://localhost:3004/categorie",
                {
                    method: "POST",
                    body: JSON.stringify({
                        categorie: categorie,
                        description: categorieDescription
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

        });
        ////////////////////update////////////
        let fetchAPIupdate = useCallback(async () => {
            const response = await fetch(
                "http://localhost:3004/categorie/" + idCategorieValue,
                {
                    method: "PUT",
                    body: JSON.stringify({
                        categorie: categorie,
                        description: categorieDescription
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const resbis = await response;
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
            fetchdelete(idCategorieValue);
            setValue("");

        };
        /////////////////////////
        return (
            <div>
                <Navigation></Navigation>
                <form>
                    <div className="container">
                        <div>
                            <label>Description</label>
                            <input value={categorieDescription}
                                   onChange={(e) => setCategorieDescription(e.target.value)}/>{" "}
                        </div>
                        <div>
                            <label>Categorie</label>
                            <input value={categorie} onChange={(e) => setCategorie(e.target.value)}/>{" "}
                        </div>
                    </div>
                    <button onClick={modifier}>modifier</button>
                    <button onClick={fetchCreer}>creer</button>
                    <button onClick={deleteMontant}>Supprimer</button>

                </form>
            </div>
        );
    }
}
