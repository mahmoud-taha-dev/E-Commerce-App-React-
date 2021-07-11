import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  addToCart,
  changeInCart,
  clearCart,
} from "../../redux/features/cart/cartActions";

const useCart = () => {
  const { cartItems, cartNum } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const addProductToCart = (productItem) => {
    const {
      name,
      imageURL: image,
      id: product,
      price,
      countInStock,
    } = productItem;
    const item = cartItems.find((item) => item.product === product);
    if (!item) {
      localStorage.setItem(
        "cart",
        JSON.stringify([
          ...cartItems,
          { name, image, product, price, quantity: 1, countInStock },
        ])
      );
      localStorage.setItem("cartNum", cartNum + 1);
      dispatch(
        addToCart({
          name,
          image,
          product,
          price,
          quantity: 1,
          countInStock,
        })
      );
      toast.info(`( ${name} ) added to cart successfully`);
    } else {
      toast.warn(`( ${name} ) is already in cart`);
    }
  };
  const handleAddToCart = (productItem) => () => addProductToCart(productItem);

  const updateCart = (items, quantity) => {
    dispatch(changeInCart(items, quantity));
    localStorage.setItem("cart", JSON.stringify(items));
    localStorage.setItem("cartNum", quantity);
  };

  const changeItemQuantity = (index, value) => {
    const cartProducts = [...cartItems];
    cartProducts[index].quantity = value;
    const totalQuantities = cartProducts.reduce((acc, item) => {
      return acc + parseInt(item.quantity);
    }, 0);
    updateCart(cartProducts, totalQuantities);
  };

  const clearCartInStore = () => {
    dispatch(clearCart());
    localStorage.removeItem("cart");
    localStorage.removeItem("cartNum");
  };

  const deleteProduct = (id, index) => {
    const totalQuantities = cartNum - cartItems[index].quantity;
    const cartProducts = cartItems.filter((item) => item.product !== id);
    updateCart(cartProducts, totalQuantities);
  };
  return {
    handleAddToCart,
    changeItemQuantity,
    clearCartInStore,
    deleteProduct,
  };
};

export default useCart;
