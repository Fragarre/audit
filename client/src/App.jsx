import React from "react";
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client'
import fetch from 'node-fetch'
import { Router, Switch, Route } from "react-router-dom";
import history from './components/History'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import Footer from "./components/Footer";
import SaveExcel from "./pages/SaveExcel";
import Login from './pages/Login'
import Home from './pages/Home'
import EndClient from './pages/EndClient'
import Facturacion from './pages/Invoicing'
import ScheduleGet from './pages/ScheduleGet'
import Forecast from './pages/Forecast'
import Customers from './pages/Customers'
import { uri_graphql } from './localConfig/config'

const client = new ApolloClient({
  connectToDevTools: true,
  cache: new InMemoryCache({
    addTypename: false
  }),
  link: new HttpLink({
    uri: uri_graphql,
    fetch
  })
});

const App = () => {
  return (
    <>
      <ApolloProvider client={client} >
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/schedule" component={ScheduleGet} />
            <Route path="/home" component={Home} />
            <Route path="/facturacion" component={Facturacion} />
            <Route path="/forecast" component={Forecast} />
            <Route path="/auxclients" component={EndClient} />
            <Route path="/downexcel" component={SaveExcel} />
            <Route path="/customers" component={Customers} />
          </Switch>
        </Router>
        <Footer />
      </ApolloProvider>
    </>
  );
}

export default App;
