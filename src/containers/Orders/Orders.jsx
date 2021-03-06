import style from "./Orders.module.scss";
import { useEffect, useState } from "react";
import getCreatedDate from "../../utils/functions/getCreatedDate";
import { MdDoneAll } from "react-icons/md";
import { Link } from "react-router-dom";
import PayWithCard from "../../components/PayWithCard/PayWithCard";
import PageTitle from "../../components/PageTitle/PageTitle";
import useAxios from "../../utils/customHooks/useAxios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [errors, setErrors] = useState(false);
  const { instance, cancelTokenSource } = useAxios();
  const [payementLoadingId, setPayementLoadingId] = useState(null);
  const getOrders = () => {
    instance
      .get("/orders/myOrders", { cancelToken: cancelTokenSource.token })
      .then((response) => {
        setOrders(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setErrors(true);
        setLoading(false);
      });
  };
  useEffect(() => {
    getOrders();

    return () => {
      setOrders([]);
      cancelTokenSource.cancel();
    };
  }, []);
  const handlePayementStatus = (id, isPaid, totalPrice) => {
    if (payementLoadingId === id) {
      return (
        <div
          className="spinner-border spinner-border-sm text-primary"
          role="status"
        ></div>
      );
    } else if (isPaid) {
      return <MdDoneAll className="text-success h3 mb-0" />;
    } else {
      return (
        <PayWithCard
          orderId={id}
          totalPrice={totalPrice.toFixed(2)}
          getOrders={getOrders}
          setPayementLoadingId={setPayementLoadingId}
        />
      );
    }
  };
  return (
    <PageTitle title="Orders">
      <h2 className={style.pageTitle}>Orders</h2>
      {(isLoading || errors) && (
        <div className="d-flex justify-content-center mt-5">
          {isLoading && (
            <div className="spinner-border text-primary" role="status"></div>
          )}
          {errors && (
            <p className="alert alert-danger h5">
              Failed to get your orders check your Network or Reload Page
            </p>
          )}
        </div>
      )}
      {orders.length ? (
        <table className={style.responsiveTable}>
          <thead>
            <tr>
              <th className="text-center">No.</th>
              <th className="text-center">Date</th>
              <th className="text-center">Quantity</th>
              <th className="text-center">Total Price</th>
              <th className="text-center">Payement</th>
              <th className="text-center">Details</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((el, index) => {
              return (
                <tr className="bg-light" key={el.id}>
                  <td className="text-center" data-column="No. : ">
                    {index + 1}
                  </td>
                  <td className="text-center" data-column="Date : ">
                    {getCreatedDate(el.createdAt)}
                  </td>
                  <td className="text-center" data-column="Quantity : ">
                    {el.items.reduce((acc, item) => acc + item.quantity, 0)}
                  </td>
                  <td className="text-center" data-column="Total Price : ">
                    {el.totalPrice.toFixed(2)} EGP
                  </td>
                  <td data-column="Payement : " className="text-center">
                    {handlePayementStatus(el.id, el.isPaid, el.totalPrice)}
                  </td>
                  <td className="text-center" data-column="Details : ">
                    <Link to={`/orders/${el.id}`}>View Details</Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : null}
    </PageTitle>
  );
};

export default Orders;
