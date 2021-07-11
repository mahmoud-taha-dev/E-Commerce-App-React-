import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PayWithCard from "../../components/PayWithCard/PayWithCard";
import PageTitle from "../../components/PageTitle/PageTitle";
import useAxios from "../../utils/customHooks/useAxios";

const ViewOrder = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { instance, cancelTokenSource } = useAxios();

  useEffect(() => {
    instance
      .get(`/orders/${id}`, { cancelToken: cancelTokenSource.token })
      .then((response) => {
        setOrder(response?.data);
        setLoading(false);
      })
      .catch((error) => {
        error.response.status === 404 && setError("Order Not Found");
        setLoading(false);
      });
    return () => {
      setOrder(null);
      cancelTokenSource.cancel();
    };
  }, [id]);

  return (
    <PageTitle title="Order Details">
      <h2 className="text-center page-title">Order Details</h2>
      {(isLoading || error) && (
        <div className="d-flex justify-content-center mt-5">
          {isLoading && (
            <div className="spinner-border text-primary" role="status"></div>
          )}
          {error && <p className="alert alert-danger h5">{error}</p>}
        </div>
      )}
      {order && (
        <div className="row justify-content-between">
          <div className="col-12 col-md-5 mb-4">
            <h5 className="mb-4">Products</h5>
            {order.items.map((item) => {
              return (
                <div key={item.product} className="border-bottom pb-2 mb-2">
                  <h6>{item.name}</h6>
                  <p className="mb-0">QTY : {item.quantity}</p>
                  <p className="mb-0">
                    price : {item.quantity * item.price} EGP
                  </p>
                </div>
              );
            })}
          </div>
          <div className="col-12 col-md-5">
            <h5 className="mb-4">Billing Details</h5>
            <p>{`Email : ${order.user.email}`}</p>
            <p>{`Address : ${order.shippingAddress.address}`}</p>
            <p>{`City : ${order.shippingAddress.city}`}</p>
            <p>{`Country : ${order.shippingAddress.country}`}</p>
            <p>{`Postal Code : ${order.shippingAddress.postalCode}`}</p>
            <div className="border p-2 mb-3">
              <p className="border-bottom pb-2">{`Shipping Price : ${order.shippingPrice} EGP`}</p>
              <p className="border-bottom pb-2">{`Tax Price : ${order.taxPrice.toFixed(
                2
              )} EGP`}</p>
              <p className="border-bottom pb-2">{`Products Price : ${order.itemsPrice.toFixed(
                2
              )} EGP`}</p>
              <p className="h5">{`Total Price : ${order.totalPrice.toFixed(
                2
              )} EGP`}</p>
            </div>

            {!order.isPaid ? (
              <PayWithCard
                orderId={order?.id}
                totalPrice={order?.totalPrice.toFixed(2)}
              />
            ) : null}
          </div>
        </div>
      )}
    </PageTitle>
  );
};

export default ViewOrder;
