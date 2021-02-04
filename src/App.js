import React from "react";
//components
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import GlobalStyles from "./components/GlobalStyles";
//pages
import Home from "./pages/Home";
import AccountPage from "./pages/AccountPage";
import WomanMainPage from "./pages/WomanMainPage";
import ManMainPage from "./pages/ManMainPage";
import CartPage from "./pages/CartPage";
import ManClothesPage from "./pages/ManClothesPage";
import WomanClothesPage from "./pages/WomanClothesPage";
import ItemDetailsPage from "./pages/ItemDetailsPage";
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
      <Route path="/customer/account/login" exact>
        <AccountPage />
      </Route>
      <Route path="/customer/account/register" exact>
        <AccountPage />
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
        path={[
          "/male/clothes/:id",
          "/male/accessories/:id",
          "/female/clothes/:id",
          "/female/accessories/:id",
          "/female/shoes/:id",
        ]}
        exact
      >
        <ItemDetailsPage />
      </Route>
      <Footer />
    </div>
  );
}

export default App;
