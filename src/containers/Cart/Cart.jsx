import style from "./Cart.module.scss";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { RiDeleteBin2Fill } from "react-icons/ri";
import PageTitle from "../../components/PageTitle/PageTitle";
import useCart from "../../utils/customHooks/useCart";

const Cart = () => {
  const { cartItems, cartNum } = useSelector((state) => state.cart);
  const { changeItemQuantity, clearCartInStore, deleteProduct } = useCart();

  const [modal, setModal] = useState(false);
  const initialModalContent = { header: "", body: "", action: () => {} };
  const [modalContent, setmodalContent] = useState(initialModalContent);
  const toggle = () => setModal(!modal);

  return (
    <PageTitle title={`Shopping Cart ( ${cartNum} )`}>
      <h2 className={style.pageTitle}>
        {cartNum ? `Shopping Cart (${cartNum})` : "Empty Cart"}
      </h2>
      {cartNum ? (
        <>
          <table className={style.responsiveTable}>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Unit Price</th>
                <th>Quantity</th>
                <th>Total Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => {
                return (
                  <tr className="bg-light" key={item.product}>
                    <td data-column="Product Name : ">{item.name}</td>
                    <td data-column="Unit Price : ">{item.price} EGP</td>
                    <td data-column="Quantity : ">
                      <select
                        title="quantity"
                        className={`form-select form-select-sm ${style.formSelect}`}
                        onChange={(e) => {
                          changeItemQuantity(index, e.target.value);
                        }}
                        value={item.quantity}
                      >
                        {[...Array(item.countInStock)].map((e, i) => (
                          <option key={i}>{i + 1}</option>
                        ))}
                      </select>
                    </td>
                    <td data-column="Total Price : ">
                      {(item.price * item.quantity).toFixed(2)} EGP
                    </td>
                    <td className="text-center">
                      <RiDeleteBin2Fill
                        onClick={() => {
                          setmodalContent({
                            header: `Delete ( ${item.name} )`,
                            body: "Are You Sure ?",
                            action: () => {
                              deleteProduct(item.product, index);
                            },
                          });
                          toggle();
                        }}
                        className={`text-danger btn btn-lg p-0 h4 ${style.delIcon}`}
                      />
                      <button
                        type="button"
                        className={`btn btn-danger d-none ${style.delBtn}`}
                        onClick={() => {
                          setmodalContent({
                            header: `Delete ( ${item.name} )`,
                            body: "Are You Sure ?",
                            action: () => {
                              deleteProduct(item.product, index);
                            },
                          });
                          toggle();
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="text-center">
            <Link to="/checkout" className={`${style.mainBtn} btn`}>
              Checkout
            </Link>
            <button
              className={`btn ${style.secBtn} ms-2`}
              onClick={() => {
                setmodalContent({
                  header: "Clear Cart",
                  body: "Are You Sure ?",
                  action: () => {
                    clearCartInStore();
                  },
                });
                toggle();
              }}
            >
              Clear Cart
            </button>
          </div>
        </>
      ) : null}
      <Modal isOpen={modal} toggle={toggle} backdrop={false} keyboard={false}>
        <ModalHeader className={`${style.ellipsisTxt} border-0 m-0`}>
          {modalContent.header}
        </ModalHeader>
        <ModalBody className="border-0 text-center h5 m-0 text-danger">
          {modalContent.body}
        </ModalBody>
        <ModalFooter className="border-0 text-center mx-auto">
          <button
            className={`btn ${style.mainBtn}`}
            onClick={() => {
              toggle();
              modalContent.action();
            }}
          >
            Yes
          </button>{" "}
          <button
            className={`btn ${style.secBtn} ms-2`}
            onClick={() => {
              toggle();
              setmodalContent(initialModalContent);
            }}
          >
            Cancel
          </button>
        </ModalFooter>
      </Modal>
    </PageTitle>
  );
};

export default Cart;
