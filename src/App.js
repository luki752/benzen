import React from "react";
//components
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import GlobalStyles from "./components/GlobalStyles";
//pages
import Home from "./pages/Home";
import AccountPage from "./pages/AccountPage";
import LoginPage from "./pages/LoginPage";
import WomanMainPage from "./pages/WomanMainPage";
import ManMainPage from "./pages/ManMainPage";
import CartPage from "./pages/CartPage";
import ManClothesPage from "./pages/ManClothesPage";
import WomanClothesPage from "./pages/WomanClothesPage";
import ItemDetailsPage from "./pages/ItemDetailsPage";
import FavoritesPage from "./pages/FavoritesPage";
import AddItemPage from "./pages/addItemPage";
import SearchPage from "./pages/SearchPage";
import SalePage from "./pages/SalePage";
import SaleMainPage from "./pages/SaleMainPage";
import CheckoutPage from "./pages/CheckoutPage";
import FinalizedOrderPage from "./pages/finalizedOrderPage";
import AdminPanel from "./pages/AdminPanel";
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
      <Route path={["/man/:id", "/woman/:id"]} exact>
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
