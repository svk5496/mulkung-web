import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { useState } from "react";
import { HelmetProvider } from "react-helmet-async";
import { Switch } from "react-router-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { client, darkModeVar, isLoggedInVar } from "./apollo";
import AdminLayout from "./components/admin/AdminLayout";
import NewLayout from "./components/admin/order/NewLayout";
import PaidLayout from "./components/admin/order/PaidLayout";
import SentLayout from "./components/admin/order/SentLayout";
import ReturnedLayout from "./components/admin/order/ReturnedLayout";
import Layout from "./components/Layout";
import AdminLogin from "./screens/AdminLogin";
import NewOrder from "./screens/admin/NewOrder";
import AdminProduct from "./screens/AdminProduct";
import AdminSignUp from "./screens/AdminSignUp";
import AdminStore from "./screens/AdminStore";
import Home from "./screens/Home";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";
import routes from "./screens/routes";
import { darkTheme, GlobalStyles, lightTheme } from "./styles";
import PaidOrder from "./screens/admin/PaidOrder";
import SentOrder from "./screens/admin/SentOrder";
import ReturnedOrder from "./screens/admin/ReturnedOrder";
import CreateOrder from "./screens/admin/CreateOrder";

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

              <Route path={routes.adminSignUp} exact>
                <AdminSignUp></AdminSignUp>
              </Route>

              {isLoggedIn ? (
                <div>
                  <Route path={routes.admin} exact>
                    <AdminLayout>
                      <AdminStore></AdminStore>
                    </AdminLayout>
                  </Route>
                  <Route path={routes.adminProduct} exact>
                    <AdminLayout>
                      <AdminProduct></AdminProduct>
                    </AdminLayout>
                  </Route>
                  <Route path={routes.adminOrderNew} exact>
                    <AdminLayout>
                      <NewLayout></NewLayout>
                    </AdminLayout>
                  </Route>
                  <Route path={routes.adminOrderPaid} exact>
                    <AdminLayout>
                      <PaidLayout></PaidLayout>
                    </AdminLayout>
                  </Route>
                  <Route path={routes.adminOrderSent} exact>
                    <AdminLayout>
                      <SentLayout></SentLayout>
                    </AdminLayout>
                  </Route>
                  <Route path={routes.adminOrderReturned} exact>
                    <AdminLayout>
                      <ReturnedLayout></ReturnedLayout>
                    </AdminLayout>
                  </Route>
                  <Route path={`/rhksflwkdjemals/order/new/new`}>
                    <AdminLayout>
                      <CreateOrder></CreateOrder>
                    </AdminLayout>
                  </Route>
                  <Route path={`/rhksflwkdjemals/order/new/:id`}>
                    <AdminLayout>
                      <NewOrder></NewOrder>
                    </AdminLayout>
                  </Route>
                  <Route path={`/rhksflwkdjemals/order/paid/:id`}>
                    <AdminLayout>
                      <PaidOrder></PaidOrder>
                    </AdminLayout>
                  </Route>
                  <Route path={`/rhksflwkdjemals/order/sent/:id`}>
                    <AdminLayout>
                      <SentOrder></SentOrder>
                    </AdminLayout>
                  </Route>
                  <Route path={`/rhksflwkdjemals/order/returned/:id`}>
                    <AdminLayout>
                      <ReturnedOrder></ReturnedOrder>
                    </AdminLayout>
                  </Route>
                </div>
              ) : (
                <AdminLogin></AdminLogin>
              )}

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
