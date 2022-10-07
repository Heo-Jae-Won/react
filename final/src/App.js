import './App.css';
import { Link, Route, Switch } from 'react-router-dom';
import HomePage from './component/HomePage';
import BoardPage from './component/BoardPage';
import UserPage from './component/UserPage';
import LoginPage from './component/LoginPage';
import { useEffect, useState } from 'react';
import HeaderPage from './component/HeaderPage';
import ProductPage from './component/ProductPage';

function App() {

  return (
    <div className="App">
      <Switch>
        <Route path="/" component={HomePage} exact></Route>
        <Route path="/board" component={BoardPage} ></Route>
        <Route path="/user" component={UserPage} ></Route>
        <Route path="/login" component={LoginPage} ></Route>
        <Route path="/product" component={ProductPage} ></Route>
        <Route render={({ location }) => <h2>{location.pathname}웹페이지가 존재하지 않습니다.</h2>}></Route>
      </Switch>
    </div>
  );
}

export default App;
