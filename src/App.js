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
          "/man/clothes/outerwear",
          "/man/clothes/outerwear/:id",
          "/man/clothes/sweaters",
          "/man/clothes/shirts",
          "/man/clothes/sweatshirts",
          "/man/clothes/trousers",
          "/man/clothes/polos",
          "/man/clothes/t-shirts",
          "/man/clothes/jeans",
          "/man/clothes/blazers",
          "/man/clothes/suits",
          "/man/clothes/nightwear",
          "/man/clothes/underwear",
          "/man/accessories/shoes",
          "/man/accessories/bags",
          "/man/accessories/hats",
          "/man/accessories/socks",
          "/man/accessories/scarves",
          "/man/accessories/gloves",
        ]}
        exact
      >
        <ManClothesPage />
      </Route>
      <Footer />
    </div>
  );
}

export default App;
