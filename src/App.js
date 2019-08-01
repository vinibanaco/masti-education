import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import HomePage from './components/HomePage/HomePage'
import Dashboard from './components/Dashboard/Dashboard'


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={HomePage} exact />
        <Route path="/dashboard" component={Dashboard} exact />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
