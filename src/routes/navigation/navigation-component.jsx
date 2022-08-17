import { useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as Crwlogo } from "../../assets/crown.svg";
import CartDropDown from "../../components/cart-dropdown/cart-dropdown.component";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import { CartContext } from "../../contexts/cart.context";
import { UserContext } from "../../contexts/user.context";
import { SignOutUser } from "../../utils/firebase/firebase.utils";
import "./navigation.styles.scss";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

  return (
    <>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <Crwlogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            Shop
          </Link>
          {currentUser ? (
            <>
              <span className="nav-link" onClick={SignOutUser}>
                Sign Out
              </span>
            </>
          ) : (
            <>
              <Link className="nav-link" to="/auth">
                Sign-In
              </Link>
            </>
          )}
          <CartIcon />
        </div>
      </div>
      {isCartOpen && <CartDropDown />}

      <Outlet />
    </>
  );
};

export default Navigation;
