import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import "./checkout-item.styles.scss";

const CheckoutItem = ({ item }) => {
  const { addItemToCart, removeItemFromCart, decreaseItemInCart } =
    useContext(CartContext);
  const { name, quantity, price, imageUrl } = item;
  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className="name">{name}</span>

      <span className="quantity">
        <div className="arrow" onClick={() => decreaseItemInCart(item)}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={() => addItemToCart(item)}>
          &#10095;
        </div>
      </span>

      <span className="price">{price} </span>
      <div className="remove-button" onClick={() => removeItemFromCart(item)}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
