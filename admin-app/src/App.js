// import logo from './logo.svg';
import React from 'react';
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from './components/Nav_bar';
import Footer from './components/Footer';
import{Route,Switch} from "react-router-dom";
import Home from './containers/home';
import SignIn from './containers/SignIn';
import SignUp from './containers/Signup';
import PrivateRoute from "./components/HOC/PrivateRouter";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import  { getInitialData, isUserLoggedIn} from "./actions";
import Products from './containers/Products';
import Orders from './containers/Orders';
import Category from './containers/Category';
function App() {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)
;  useEffect(() => {
    if (!auth.authenticate) {

        dispatch(isUserLoggedIn());
    }
    dispatch(getInitialData())
    // dispatch(getAllProduct());
    // dispatch(getAllCategory())
}, []);
  return (
      <>     
          <Navbar/>
          <Switch>
            <PrivateRoute  exact path="/" component={Home}/>
            <PrivateRoute exact  path="/products" component={Products}/>
            <PrivateRoute exact  path="/orders" component={Orders}/>
            <PrivateRoute exact  path="/category" component={Category}/>

            <Route exact  path="/signup">
                <SignUp/>
            </Route>
            <Route  exact path="/signin">
                  <SignIn/>
            </Route>
  
          </Switch>
          <Footer/>
      
      </>
  );
}

export default App;
