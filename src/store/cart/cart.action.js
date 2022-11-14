import { CART_ACTION_TYPES } from './cart.types';
import { createAction } from '../../utils/reducer/reducer.utils'
import { getCartItemHash } from '../../utils/misc/strings.utils';

const addCartItem = (cartItems, productToAdd, qty=1) =>{
  const addProductHash = getCartItemHash(productToAdd);
  //find if cartItems contains productToAdd with the exact same extensions settings
  const existingCartItem = cartItems.find((cartItem) => getCartItemHash(cartItem) === addProductHash);
  //if found, increment quantity, (recreating the cartItems not mutating the existing one)
  if(existingCartItem){
    return cartItems.map(
      (cartItem) => {
        if( getCartItemHash(cartItem) === addProductHash ){
          return {...cartItem, quantity: cartItem.quantity + qty}
        }else{
          return cartItem
        }
      }
    );
  }else{
    //return cartItems array with new product added
    return [...cartItems, {...productToAdd, quantity: qty}];
  }
}

const removeCartItem = (cartItems, cartItemToRemove) => {
  const removeProductHash = getCartItemHash(cartItemToRemove);
  //find cart item to remove 
  const existingCartItem = cartItems.find(
    (cartItem) => getCartItemHash(cartItem) === removeProductHash
  );

  //check if quanity is 1, if so than remove the item from the cart
  if(existingCartItem.quantity === 1){
    return cartItems.filter(cartItem => getCartItemHash(cartItem) !== removeProductHash);
  };

  //else return cartitems with reduced quantity
  return cartItems.map((cartItem) => getCartItemHash(cartItem) === removeProductHash ?
    {...cartItem, quantity: cartItem.quantity -1}
    : cartItem
  );
}

const clearCartItem = (cartItems, cartItemToClear) => {
  const clearProductHash = getCartItemHash(cartItemToClear);
  const newCartItems = cartItems.filter(cartItem => getCartItemHash(cartItem) !== clearProductHash);
  return newCartItems;
}

export const setIsCartOpen = (bool) => {
  return createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool);
}
  
export const addItemToCart = (cartItems, productToAdd, qty=1) => {
  const newCartItems = addCartItem(cartItems, productToAdd, qty);
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

export const setCartBillingInfo = (info) => {
  return createAction(CART_ACTION_TYPES.SET_BILLING_INFO, info);
}

export const setCartShippingInfo = (info) => {
  return createAction(CART_ACTION_TYPES.SET_SHIPPING_INFO, info);
}

export const setCartShippingSAB = (checked) => {
  return createAction(CART_ACTION_TYPES.SET_SHIPPING_SAB, checked);
}




