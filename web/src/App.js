import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import HomePage from './components/HomePage/HomePage';
import Dashboard from './components/Dashboard/Dashboard';
import CoursePage from './components/CoursePage/CoursePage';
import AdminPage from './components/AdminPage/AdminPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={HomePage} exact />
        <Route path="/dashboard" component={Dashboard} exact />
        <Route path="/cursos/:id" component={CoursePage} exact />
        <Route path="/admin" component={AdminPage} exact />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
