import React, { Component } from "react";
import "./App.css";
import Contacts from "./components/contacts/Contacts";
import Header from "./components/layout/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "./Context";
import AddContact from "./components/contacts/AddContact";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import About from "./components/pages/About";
import NotFound from "./components/pages/NotFound";
import Update from "./components/contacts/Update";

class App extends Component {
  render() {
    return (
      <Provider>
        <Router>
          <div className="App">
            <Header branding="Contact Manager" />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Contacts} />
                <Route exact path="/contact/Add" component={AddContact} />
                <Route exact path="/About" component={About} />

                <Route exact path="/contact/update/:id" component={Update} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
