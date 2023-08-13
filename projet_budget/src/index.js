import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import{BrowserRouter as Router,Switch,Route}from'react-router-dom'
import NotFound from './components/NotFound';
import Navigation from "./components/Navigation";
import Connection from "./components/connection";
import Inscription from "./components/inscription";
import Budget from "./components/Budget";


const Root=()=>(


    <Router>
        <Switch>
            <Route exact path="/" component={Navigation}/>
            <Route exact path="/login" component={Connection}/>
            <Route exact path="/inscription" component={Inscription}/>
            <Route exact path="/budget" component={Budget}/>
            <Route component={NotFound}/>
        </Switch>
    </Router>
)

ReactDOM.render(<Root/>, document.getElementById('root'));




