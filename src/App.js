import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { useState } from "react";
import { HelmetProvider } from "react-helmet-async";
import { Switch } from "react-router-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { client, darkModeVar, isLoggedInVar } from "./apollo";
import AdminLayout from "./components/admin/AdminLayout";
import Layout from "./components/Layout";
import Admin from "./screens/Admin";
import AdminLogin from "./screens/AdminLogin";
import AdminOrder from "./screens/AdminOrder";
import AdminProduct from "./screens/AdminProduct";
import AdminSignUp from "./screens/AdminSignUp";
import AdminStore from "./screens/AdminStore";
import Home from "./screens/Home";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";
import routes from "./screens/routes";
import { darkTheme, GlobalStyles, lightTheme } from "./styles";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);
  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <GlobalStyles />
          <Router>
            <Switch>
              <Route path={routes.home} exact>
                <Layout>
                  <Home></Home>
                </Layout>
              </Route>
              <Route path={routes.admin} exact>
                {isLoggedIn ? (
                  <AdminLayout>
                    <AdminStore></AdminStore>
                  </AdminLayout>
                ) : (
                  <AdminLogin></AdminLogin>
                )}
              </Route>
              <Route path={routes.adminSignUp} exact>
                <AdminSignUp></AdminSignUp>
              </Route>

              <Route path={routes.adminProduct} exact>
                <AdminLayout>
                  <AdminProduct></AdminProduct>
                </AdminLayout>
              </Route>
              <Route path={routes.adminOrder} exact>
                <AdminLayout>
                  <AdminOrder></AdminOrder>
                </AdminLayout>
              </Route>
              <Route>
                <NotFound></NotFound>
              </Route>
            </Switch>
          </Router>
        </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  );
}

export default App;
