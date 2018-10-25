import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';


import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'
import Home from './containers/Home/Home';
class App extends Component {


  render() {
    return (
      <BrowserRouter>
          <Switch>
            <Route path='/' exact component={Home} />
          </Switch>
      </BrowserRouter>
    );
  }
}

export default App
