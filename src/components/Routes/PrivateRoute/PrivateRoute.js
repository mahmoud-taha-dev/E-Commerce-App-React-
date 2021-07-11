import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = useSelector((state) => state.user);
  return (
    <Route
      {...rest}
      render={(props) => {
        return user ? <Component {...props} /> : <Redirect to="/signin" />;
      }}
    />
  );
};

export default PrivateRoute;
