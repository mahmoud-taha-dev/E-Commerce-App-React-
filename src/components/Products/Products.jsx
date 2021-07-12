import style from "./Products.module.scss";
import { useEffect, useState } from "react";
import CardItem from "../CardItem/CardItem";
import useAxios from "../../utils/customHooks/useAxios";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [errors, setErrors] = useState(false);
  const { instance, cancelTokenSource } = useAxios();
  useEffect(() => {
    instance
      .get("/products/", { cancelToken: cancelTokenSource.token })
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setErrors(true);
        setLoading(false);
      });
    return () => {
      setProducts([]);
      cancelTokenSource.cancel();
    };
  }, []);
  if (isLoading)
    return <div className="spinner-border text-primary" role="status"></div>;
  if (errors)
    return (
      <p className="alert alert-danger h5">
        Failed to load page check your network or reload page
      </p>
    );
  return (
    <div className={style.productsGrid}>
      {products.map((product) => {
        return <CardItem key={product.id} productItem={product} />;
      })}
    </div>
  );
};

export default Products;
