import React from "react";
//components
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import GlobalStyles from "./components/GlobalStyles";
//pages
import Home from "./Pages/Home";
import AccountPage from "./Pages/AccountPage";
import LoginPage from "./Pages/LoginPage";
import WomanMainPage from "./Pages/WomanMainPage";
import ManMainPage from "./Pages/ManMainPage";
import CartPage from "./Pages/CartPage";
import ManClothesPage from "./Pages/ManClothesPage";
import WomanClothesPage from "./Pages/WomanClothesPage";
import ItemDetailsPage from "./Pages/ItemDetailsPage";
import FavoritesPage from "./Pages/FavoritesPage";
import AddItemPage from "./Pages/AddItemPage";
import SearchPage from "./Pages/SearchPage";
import SalePage from "./Pages/SalePage";
import SaleMainPage from "./Pages/SaleMainPage";
import CheckoutPage from "./Pages/CheckoutPage";
import FinalizedOrderPage from "./Pages/FinalizedOrderPage";
import AdminPanel from "./Pages/AdminPanel";
//router
import { Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <GlobalStyles />
      <Nav />
      <Route path="/" exact>
        <Home />
      </Route>
      <Route
        path={[
          "/customer/account/info",
          "/customer/account/orders",
          "/customer/account/address",
          "/customer/account/orders/:id",
        ]}
        exact
      >
        <AccountPage />
      </Route>
      <Route
        path={[
          "/customer/account/login",
          "/customer/account/login/order",
          "/customer/account/register",
        ]}
        exact
      >
        <LoginPage />
      </Route>
      <Route path="/woman" exact>
        <WomanMainPage />
      </Route>
      <Route path="/man" exact>
        <ManMainPage />
      </Route>
      <Route path="/checkout/cart" exact>
        <CartPage />
      </Route>
      <Route
        path={[
          "/man/clothes/:id",
          "/man/clothes/outerwear/:id",
          "/man/accessories/:id",
        ]}
        exact
      >
        <ManClothesPage />
      </Route>
      <Route
        path={[
          "/woman/clothes/:id",
          "/woman/clothes/outerwear/:id",
          "/woman/accessories/:id",
          "/woman/shoes/:id",
        ]}
        exact
      >
        <WomanClothesPage />
      </Route>
      <Route
        path={["/man/:id", "/woman/:id", "/man/:id/admin", "/woman/:id/admin"]}
        exact
      >
        <ItemDetailsPage />
      </Route>
      <Route path="/favorites">
        <FavoritesPage />
      </Route>
      <Route path="/add-item">
        <AddItemPage />
      </Route>
      <Route path="/answer/:id">
        <SearchPage />
      </Route>
      <Route path="/sale/:id">
        <SalePage />
      </Route>
      <Route path="/sale" exact>
        <SaleMainPage />
      </Route>
      <Route path="/checkout/order" exact>
        <CheckoutPage />
      </Route>
      <Route path="/checkout/order/finalized" exact>
        <FinalizedOrderPage />
      </Route>
      <Route
        path={[
          "/admin/panel/:id",
          "/admin/panel/orders/:id",
          "/admin/panel/users/:id",
        ]}
        exact
      >
        <AdminPanel />
      </Route>
      <Footer />
    </div>
  );
}

export default App;
