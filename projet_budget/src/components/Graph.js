import React from 'react';
import {Bar, Pie} from 'react-chartjs-2'

export default function Graph(props) {
    return (
        <div className="containerGraph">
            <div className="cardGraph">
                <Pie data={props.data}

                />

            </div>
            <div className="cardGraph">
                <Bar data={props.data}></Bar>

            </div>

        </div>
    );
}
