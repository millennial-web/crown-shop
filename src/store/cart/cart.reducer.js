import {CART_ACTION_TYPES} from './cart.types'

const CART_INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
}

export const cartReducer = (state = CART_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;
  // console.log(CART_ACTION_TYPES);
  switch(type){
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        cartItems: payload,
      };
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen : payload,
      };
    default:
      return state;
  }
}