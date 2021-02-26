import React from 'react'
import Home from './Home'
import Messenger from './Messenger'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
    return (
    <div>
        <Router>
            <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/messenger' exact component={Messenger} />
            {/* <Route path='/profile' exact component={Profile} /> */}
            </Switch>
        </Router>
    </div>
    )
}

export default App
