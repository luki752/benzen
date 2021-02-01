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
      <Footer />
    </div>
  );
}

export default App;
