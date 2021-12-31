import React, { useEffect } from "react";
import logo from './logo.svg';
import { useDispatch } from "react-redux";
import './App.css';
import { getAllCategory } from "./actions"
import HomePage from "./containers/HomePage/index";
import Header from "./components/headers/index";
import Menu from "./components/Menu/index";
import Footer from "./components/footers";
import { BrowserRouter as Switch, Router, Route ,Routes} from 'react-router-dom';
import ProductLists from "./containers/ProductLists/index";
function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllCategory());
  })
  return (
    <>

      <Switch>
      <Header />
      <Menu />
        <Routes>
          <Route exact path={"/"} element={<HomePage/>} />
          <Route exact path={"/:slug"} element={<ProductLists/>} />
        </Routes>
      <Footer />
      </Switch> 
    </>
  );
}

export default App;
