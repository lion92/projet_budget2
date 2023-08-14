import React, {useCallback, useEffect, useState} from "react";

export default function SelectCategorie(props) {
    let [valueOption, setValueOption] = useState("");
    let [textp, setText] = useState([]);

    //////////////////////////appel api en debut
    useEffect(() => {
        fetchAPI();
    }, []);

    const fetchAPI = useCallback(async () => {
        const response = await fetch("http://localhost:3004/categorie");
        const resbis = await response.json();
        await setText(resbis);

        return resbis;
    }, [setText]);

    return (
        <>

                <select>

                    <option>Please choose one option</option>
                    {textp.map((option, index) => {
                        return <option onClick={() => {
                            props.categorie(props.id);
                        }} key={option.id}>
                            {option.id} {" " + option.description}

                        </option>
                    })}
                </select>
        </>)

}
