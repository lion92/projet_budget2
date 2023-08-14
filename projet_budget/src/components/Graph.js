import React from 'react';
import {Pie} from 'react-chartjs-2'

export default function Graph(props) {
    return (
        <div className="containerGraph">
            <div className="cardGraph">
                <Pie data={props.data}

                />
            </div>

        </div>
    );
}
