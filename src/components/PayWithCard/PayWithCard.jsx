import { useCallback } from "react";
import StripeCheckout from "react-stripe-checkout";
import { useSelector } from "react-redux";
import useAxios from "../../utils/customHooks/useAxios";
import { toast } from "react-toastify";

const PayWithCard = ({
  orderId,
  totalPrice,
  getOrders,
  setPayementLoadingId,
}) => {
  const userInfo = useSelector((state) => state.user);
  const { instance } = useAxios();
  const handlePayement = useCallback(() => {
    setPayementLoadingId(orderId);
    const requestBody = {
      paymentResult: {
        id: orderId,
        status: "success",
        updateTime: new Date(),
        email: userInfo?.email,
      },
    };
    instance
      .post(`/orders/${orderId}/pay/`, requestBody)
      .then((response) => {
        setPayementLoadingId(null);
        toast.dark("Order is paid successfully");
        getOrders();
      })
      .catch((error) => {
        setPayementLoadingId(null);
        toast.error("Order Not Found");
      });
  }, [userInfo, orderId]);

  return (
    <StripeCheckout
      token={() => {
        handlePayement();
      }}
      stripeKey="pk_test_51J8qfMCy6wPbOtkNRikzW0YDKlbZh2WDv1iiWmKI6kij8u3lkzOiJSVLIyWys6zXt01DvxpswGAAgq9XSIWEYmHO00cYIPBTSp"
      amount={totalPrice * 100}
      currency="EGP"
      email={userInfo?.email}
    />
  );
};

export default PayWithCard;
