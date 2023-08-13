import {useCallback, useEffect, useState} from "react";
import Item from "./Item";
import Navigation from "./Navigation";

export default function Form(props) {
    let [valueInput, setValue] = useState("");
    let [valueInputTitre, setTitre] = useState("");
    let [valueInputDescription, setDescription] = useState("");
    let [idVal, setId] = useState(-1);
    let [textp, setText] = useState([]);
    ///////////////////////////
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
        const response = await fetch("http://localhost:3004/todos");
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
        setValue(a);

        return a;
    };
    ////////////////////////input change description
    let valueChangeDescription = (e) => {
        let a = e.target.value;
        console.log(a);
        setDescription(a)

        return a;
    };
    /////////////////////////modifier
    let modifier = (e) => {
        e.preventDefault();
        fetchAPIupdate();
        setValue("");
        setTitre("");
    };
    /////////////////////////

    return (

        <>
            {!load ? <div>
                    <Navigation></Navigation>
                    <form>
                        <label id="idLabel">
                            id:{idVal} </label>
                        <div className="container">
                            <label>Titre</label>
                            <input value={valueInput} onChange={(e) => Valuechange(e)}/>{" "}
                            <label>Description</label>
                            <textarea value={valueInputDescription} onChange={(e) => valueChangeDescription(e)}/>{" "}
                            <button onClick={modifier}>modifier</button>
                            <button onClick={fetchCreer}>creer</button>
                            <button onClick={recherche}>Rechercher</button>
                        </div>
                    </form>
                    <div className="container2">
                        {textp.map((item, index) => {
                            return (
                                <Item
                                    del={del}
                                    changeDec={textebisDesc}
                                    changetext={textebis}
                                    updatefunc={idchange}
                                    title={item.title}
                                    description={item.description}
                                    id={item.id}
                                ></Item>
                            );
                        })}
                    </div>
                </div>
                : <h1>Chargement...</h1>}

        </>
    );
}
