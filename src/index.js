import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
//REDUX SETUP
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
//router
import { BrowserRouter } from "react-router-dom";
//bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
//notistack
import { SnackbarProvider } from "notistack";
//icon
import CloseIcon from "@material-ui/icons/Close";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

const notistackRef = React.createRef();
const onClickDismiss = (key) => () => {
  notistackRef.current.closeSnackbar(key);
};

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <SnackbarProvider
        ref={notistackRef}
        maxSnack={2}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        hideIconVariant
        action={(key) => <CloseIcon onClick={onClickDismiss(key)} />}
      >
        <App />
      </SnackbarProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
