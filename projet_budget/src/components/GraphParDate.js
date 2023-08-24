import React from 'react';
import {Bar, Line} from 'react-chartjs-2'

export default function GraphParDate(props) {
    return (
        <>
        <div className="containerGraph">
            <div className="cardGraph">
                <Bar data={props.data}/>

            </div>

        </div>
        </>
    );
}
