import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import HomePage from './components/HomePage/HomePage'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={HomePage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
