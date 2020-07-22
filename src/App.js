import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { Provider } from "react-redux";
import store from "./store";
import { setCurrentUser, logoutUser } from "./actions/authActions";
// import logo from './logo.svg';
import './App.css';


import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import DashBoard from "./components/DashBoard";
import NewsDetails from "./components/NewsDetails";
import PhotosList from "./components/PhotosList";
import TasksList from "./components/TasksList";
import ChampionsLeague from "./components/ChampionsLeague";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}


class App extends Component{
  render(){
    return(
      <Provider store={store}>
      <Router>
      <div className="App">
      <Switch>
      <Route exact path="/" component={Login}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/signup" component={SignUp}/>
      <PrivateRoute exact path="/:id/dashboard" component={DashBoard} />
      <PrivateRoute exact path="/:id/news" component={NewsDetails} />
      <PrivateRoute exact path="/:id/photos" component={PhotosList} />
      <PrivateRoute exact path="/:id/tasks" component={TasksList} />
      <PrivateRoute exact path="/:id/sport" component={ChampionsLeague} />
      <Route path="/404" component={NotFound} />
      <Route path="*" component={NotFound} />
      </Switch>
      </div>
      </Router>
      </Provider>
    )
  }
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
