import React, {useState} from "react";

export default function Item(props) {

    const [iditem, setItemid] = useState(-1);
    return (
        <>
            <div onClick={() => {
                props.updatefunc(props.id)
            }} className="card">
                <h1>{props.title}</h1>

                <p>{props.description}</p>
                <button onClick={(e) => props.del(e, props.id)}>delete</button>
            </div>
        </>
    );
}
