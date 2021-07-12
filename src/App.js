import "./App.scss";
import React, { Suspense } from "react";

// Routing
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/Routes/PrivateRoute/PrivateRoute";
import PublicRoute from "./components/Routes/PublicRoute/PublicRoute";

// Redux
import { Provider } from "react-redux";
import store from "./redux/store";

// Toastify
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

// Components
import NavBar from "./components/NavBar/NavBar";
import Home from "./containers/Home/Home";
import Cart from "./containers/Cart/Cart";
import SignUp from "./containers/SignUp/SignUp";
import SignIn from "./containers/SignIn/SignIn";
import Checkout from "./containers/Checkout/Checkout";
import Profile from "./containers/Profile/Profile";
import ViewOrder from "./containers/ViewOrder/ViewOrder";
import NotFound from "./containers/NotFound/NotFound";
import Loader from "./components/Loader/Loader";

//Lazy loading components
const Orders = React.lazy(() => import("./containers/Orders/Orders"));

const App = () => {
  return (
    <Provider store={store}>
      <Suspense fallback={<Loader />}>
        <Router>
          <NavBar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/cart" exact component={Cart} />
            <PublicRoute path="/signup" exact component={SignUp} />
            <PublicRoute path="/signin" exact component={SignIn} />
            <PrivateRoute path="/checkout" exact component={Checkout} />
            <PrivateRoute path="/profile" exact component={Profile} />
            <PrivateRoute path="/orders" exact component={Orders} />
            <PrivateRoute path="/orders/:id" exact component={ViewOrder} />
            <Route component={NotFound} />
          </Switch>
          <ToastContainer autoClose={3000} style={{ top: "60px" }} />
        </Router>
      </Suspense>
    </Provider>
  );
};

export default App;
