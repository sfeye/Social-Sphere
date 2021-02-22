import React from 'react';
import '../styles/App.css';
import NavBar from '../components/NavBar';
import Home from './Home';
import Messages from './Messages';
import Notifications from './Notifications';
import Profile from './Profile';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <Router>
      <NavBar/>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/messages' exact component={Messages} />
          <Route path='/notifications' exact component={Notifications} />
          <Route path='/profile' exact component={Profile} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;