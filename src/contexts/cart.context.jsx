import { createContext, useEffect, useState } from "react";

const addCartItem = (cartItem, productToAdd) => {
  const isCartItem = cartItem.find((item) => item.id === productToAdd.id);

  if (isCartItem) {
    return cartItem.map((item) => {
      if (item.id === productToAdd.id) {
        return { ...item, quantity: item.quantity + 1 };
      } else {
        return item;
      }
    });
  }

  return [...cartItem, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItem, productToRemove) => {
  const filtered = cartItem.filter((item) => {
    return item.id !== productToRemove.id;
  });
  return filtered;
};

const decreaseCartItem = (cartItem, productToDecrease) => {
  const existingItem = cartItem.find(
    (item) => item.id === productToDecrease.id
  );
  if (existingItem.quantity === 1) {
    return removeCartItem(cartItem, productToDecrease);
  }

  return cartItem.map((item) => {
    if (item.id === productToDecrease.id) {
      return { ...item, quantity: item.quantity - 1 };
    } else {
      return item;
    }
  });
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItem: [],
  addItemToCart: () => {},
  totalItemInCart: 0,
  setTotalItemInCart: () => {},
  decreaseItemInCart: () => {},
  totalPriceOfItem: 0,
  setTotalPriceOfItem: () => {},
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItem, setCartItem] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [totalPriceOfItem, setTotalPriceOfItem] = useState(0);

  const addItemToCart = (productToAdd) => {
    setCartItem(addCartItem(cartItem, productToAdd));
  };
  const removeItemFromCart = (productToRemove) => {
    setCartItem(removeCartItem(cartItem, productToRemove));
  };
  const decreaseItemInCart = (productToDecrease) => {
    setCartItem(decreaseCartItem(cartItem, productToDecrease));
  };

  useEffect(() => {
    const newCartCount = cartItem.reduce(
      (total, item) => total + item.quantity,
      0
    );

    setCartCount(newCartCount);
    const totalPrice = cartItem.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);

    setTotalPriceOfItem(totalPrice);
    console.log(totalPriceOfItem);
  }, [cartItem]);

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItem,
    setCartItem,
    addItemToCart,
    cartCount,
    setCartCount,
    removeItemFromCart,
    decreaseItemInCart,
    setTotalPriceOfItem,
    totalPriceOfItem,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
