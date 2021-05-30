import React from 'react';
import Header from './header';
import Footer from './footer';
import { withAuth0 } from '@auth0/auth0-react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import MyFavoriteBooks from './myFavoriteBooks.js';
import Login from './login';
import Profile from './Profile';
class App extends React.Component {
  render() {
    console.log('app', this.props)
    return (
      <>
        <Router>
            <Header />
            <Switch>
              <Route exact path="/">
                {/* TODO: if the user is logged in, 
                  render the `MyFavoriteBooks` component,
                   if they are not, render the `Login` component */}
                {
                  this.props.auth0.isAuthenticated ?
                    <MyFavoriteBooks /> : <Login />
                }
              </Route>
              {/* TODO: add a route with a path of '/profile' that renders a
                 `Profile` component */}
              {
                this.props.auth0.isAuthenticated &&
                <Profile />
              }
            </Switch>
            <Footer />
        </Router>
      </>
    )
  }
}
export default withAuth0(App);