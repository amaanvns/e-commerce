import "./cart-dropdown.styles.scss";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import { useNavigate } from "react-router-dom";

const CartDropDown = () => {
  const navigate = useNavigate();
  const { cartItem } = useContext(CartContext);
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItem.map((item) => {
          return <CartItem key={item.id} cartItem={item} />;
        })}
      </div>
      <Button onClick={() => navigate("/checkout")}>Checkout</Button>
    </div>
  );
};

export default CartDropDown;
