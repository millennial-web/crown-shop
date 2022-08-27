import { useState, createContext, useEffect } from 'react'

const addCartItem = (cartItems, productToAdd) =>{
  //find if cartItems contains productToAdd
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id == productToAdd.id
  );
  //if found, increment quantity, (recreating the cartItems not mutating the existing one)
  if(existingCartItem){
    return cartItems.map((cartItem) => cartItem.id == productToAdd.id ?
      {...cartItem, quantity: cartItem.quantity +1}
      : cartItem
    );
  }else{
    //return existing cartItems array with new product added
    return [...cartItems, {...productToAdd, quantity: 1}];
  }
}

const removeCartItem = (cartItems, cartItemToRemove) => {
  //find cart item to remove 
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id == cartItemToRemove.id
  );

  //check if quanity is 1, if so than remove the item from the cart
  if(existingCartItem.quantity == 1){
    return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
  }

  //else return cartitems with reduced quantity
  return cartItems.map((cartItem) => cartItem.id == cartItemToRemove.id ?
    {...cartItem, quantity: cartItem.quantity -1}
    : cartItem
  );
}

const clearCartItem = (cartItems, cartItemToClear) => {
  return cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id);
}


//actual value to access (context with default state values)
export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0, 
  cartTotal: 0
});

//mount the wrapper for sharing context state data 
export const CartProvider = ({children}) =>{
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  
  useEffect(() => {
    const newCartCount = cartItems.reduce((count, cartItem) => count + cartItem.quantity, 0);
    setCartCount(newCartCount);
  }, [cartItems])

  useEffect(() => {
    const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
    setCartTotal(newCartTotal);
  }, [cartItems])

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  }

  const removeItemFromCart = (cartItemToRemove) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove));
  }

  const clearItemFromCart = (cartItemToClear) => {
    setCartItems(clearCartItem(cartItems, cartItemToClear));
  }


  const value = { 
    isCartOpen, 
    setIsCartOpen, 
    addItemToCart, 
    cartItems, 
    cartCount,
    cartTotal,
    removeItemFromCart,
    clearItemFromCart
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
};