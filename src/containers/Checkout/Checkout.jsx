import style from "./Checkout.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as yup from "yup";
import FormInput from "../../components/FormInput/FormInput";
import { clearCart } from "../../redux/features/cart/cartActions";
import { useHistory } from "react-router-dom";
import PageTitle from "../../components/PageTitle/PageTitle";
import { toast } from "react-toastify";
import { useCallback, useMemo, useState } from "react";
import useAxios from "../../utils/customHooks/useAxios";

const initialValues = {
  country: "",
  city: "",
  address: "",
  postalCode: "",
  mobile: "",
};

const validationSchema = yup.object({
  country: yup.string().required("Required"),
  city: yup.string().required("Required"),
  address: yup.string().required("Required"),
  postalCode: yup.string().required("Required"),
});

const Checkout = () => {
  const { cartItems, cartNum } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const history = useHistory();
  const { instance } = useAxios();
  const [isSubmitting, setSubmitting] = useState(false);

  const grandTotal = useMemo(
    () =>
      cartItems.reduce((acc, item) => {
        return acc + item.price * item.quantity;
      }, 0),
    [cartItems]
  );

  const onSubmit = useCallback(
    (values) => {
      setSubmitting(true);
      const products = cartItems.map((item) => {
        delete item.countInStock;
        return item;
      });
      const requestBody = {
        itemsPrice: grandTotal,
        taxPrice: 83.99865656,
        shippingPrice: 0,
        items: products,
        paymentMethod: "Card",
        shippingAddress: values,
      };
      instance
        .post("/orders", requestBody)
        .then((response) => {
          toast.dark("Your order is done");
          localStorage.removeItem("cart");
          localStorage.removeItem("cartNum");
          dispatch(clearCart());
          history.push("/orders");
        })
        .catch((error) => {
          setSubmitting(false);
          toast.error("Error occured, reload page");
        });
    },
    [cartItems, grandTotal, dispatch, history]
  );

  return (
    <PageTitle title="Checkout">
      <h2 className={style.pageTitle}>Checkout</h2>
      <div className="row justify-content-between">
        <div className="col-12 col-md-5">
          <h4 className="mb-3 border-bottom pb-3">Delivery Details</h4>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            <Form>
              <FormInput type="text" name="country" text="Country" />
              <FormInput type="text" name="city" text="City" />
              <FormInput type="text" name="address" text="Address" />
              <FormInput type="text" name="postalCode" text="Postal Code" />
              <div className="text-end">
                <button
                  type="submit"
                  className={`btn ${style.mainBtn} px-5 mt-3`}
                  disabled={isSubmitting}
                >
                  {!isSubmitting ? (
                    "Order"
                  ) : (
                    <div
                      className="spinner-border spinner-border-sm text-light"
                      role="status"
                    ></div>
                  )}
                </button>
              </div>
            </Form>
          </Formik>
        </div>
        <div className="col-12 col-md-5">
          <h4 className="mb-3 border-bottom pb-3">Shopping Cart ({cartNum})</h4>
          {cartItems.map((item) => {
            return (
              <div key={item.product} className="border-bottom pb-2 mb-2">
                <h5>{item.name}</h5>
                <p className="mb-0">QTY : {item.quantity}</p>
                <p className="mb-0">price : {item.quantity * item.price} EGP</p>
              </div>
            );
          })}
          <p className="h5 mt-5 border border-primary p-2 text-center">
            Grand Total : {grandTotal} EGP
          </p>
        </div>
      </div>
    </PageTitle>
  );
};

export default Checkout;
