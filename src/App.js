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
import RefundedOrder from "./screens/admin/RefundedOrder";
import CreateOrder from "./screens/admin/CreateOrder";
import RefundedLayout from "./components/admin/order/RefundedLayout";
import ProductListLayout from "./components/admin/product/ProductListLayout";
import EditLayout from "./components/admin/product/EditLayout";
import ProductUploadLayout from "./components/admin/product/UploadLayout";
import UserListLayout from "./components/admin/user/UserListLayout";
import Product from "./screens/Product";

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
              <Route path={routes.product} exact>
                <Layout>
                  <Product></Product>
                </Layout>
              </Route>

              <Route path={routes.adminSignUp} exact>
                <AdminSignUp></AdminSignUp>
              </Route>

              {isLoggedIn ? (
                <>
                  <Route path={routes.admin} exact>
                    <AdminLayout>
                      <AdminStore></AdminStore>
                    </AdminLayout>
                  </Route>
                  {/* 관리자 유저관리 */}
                  <Route path={routes.adminUser} exact>
                    <AdminLayout>
                      <UserListLayout></UserListLayout>
                    </AdminLayout>
                  </Route>
                  {/* 관리자 상품관리 */}
                  <Route path={routes.adminProduct} exact>
                    <AdminLayout>
                      <ProductListLayout></ProductListLayout>
                    </AdminLayout>
                  </Route>
                  <Route path={routes.adminProductEdit} exact>
                    <AdminLayout>
                      <EditLayout></EditLayout>
                    </AdminLayout>
                  </Route>
                  <Route path={routes.adminProductNew} exact>
                    <AdminLayout>
                      <ProductUploadLayout></ProductUploadLayout>
                    </AdminLayout>
                  </Route>
                  {/* 관리자 주문관리 */}
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
                  <Route path={routes.adminOrderRefunded} exact>
                    <AdminLayout>
                      <RefundedLayout></RefundedLayout>
                    </AdminLayout>
                  </Route>
                  <Route path={routes.adminOrderCreate} exact>
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
                  <Route path={`/rhksflwkdjemals/order/refunded/:id`}>
                    <AdminLayout>
                      <RefundedOrder></RefundedOrder>
                    </AdminLayout>
                  </Route>
                </>
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
