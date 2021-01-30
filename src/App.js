import React from 'react'
//components
import Nav from './components/Nav'
import GlobalStyles from './components/GlobalStyles'
//pages
import Home from './pages/Home'
//router
import {Route} from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <GlobalStyles/>
      <Nav/>
      <Route to="/" exact>
        <Home/>
      </Route>
    </div>
  );
}

export default App;
