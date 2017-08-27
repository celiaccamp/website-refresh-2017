/*
    ./client/components/App.jsx
*/
import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Admin from './Admin';
import MainWebsite from './MainWebsite';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/admin" component={Admin} />
      <Route path="/admin/login" component={Admin} />
      <Route path="/test/log" component={MainWebsite} />
      <Route path="*" component={MainWebsite} />
    </Switch>
  </BrowserRouter>
);

export default App;
