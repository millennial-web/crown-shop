import { CART_ACTION_TYPES } from './cart.types';
import { createAction } from '../../utils/reducer/reducer.utils'

const addCartItem = (cartItems, productToAdd) =>{
  //find if cartItems contains productToAdd
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );
  //if found, increment quantity, (recreating the cartItems not mutating the existing one)
  if(existingCartItem){
    return cartItems.map((cartItem) => cartItem.id === productToAdd.id ?
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
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  //check if quanity is 1, if so than remove the item from the cart
  if(existingCartItem.quantity === 1){
    return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
  }

  //else return cartitems with reduced quantity
  return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id ?
    {...cartItem, quantity: cartItem.quantity -1}
    : cartItem
  );
}

const clearCartItem = (cartItems, cartItemToClear) => {
  return cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id);
}

export const setIsCartOpen = (bool) => {
  return createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool);
}
  
export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const newCartItems = removeCartItem(cartItems, cartItemToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const clearItemFromCart = (cartItems, cartItemToClear) => {
  const newCartItems = clearCartItem(cartItems, cartItemToClear);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}


