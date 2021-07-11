import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PublicRoute = ({ component: Component, ...rest }) => {
  const user = useSelector((state) => state.user);
  return (
    <Route
      {...rest}
      render={(props) => {
        return !user ? <Component {...props} /> : <Redirect to="/" />;
      }}
    />
  );
};

export default PublicRoute;
