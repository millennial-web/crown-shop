import {CART_ACTION_TYPES} from './cart.types'

const CART_INITIAL_STATE = {
  billingInfo: {
    firstName : '',
    lastName : '',
    address : '',
    address2 : '',
    city : '',
    state : '',
    postalCode : '',
    country : '',
    tel : '',
    email : '',
  },
  shippingInfo: {
    firstName : '',
    lastName : '',
    address : '',
    address2 : '',
    city : '',
    state : '',
    postalCode : '',
    country : '',
    tel : '',
    email : '',
  },
  shippingSameAsBilling:true,
  isCartOpen: false,
  cartItems: [],
}

export const cartReducer = (state = CART_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;
  switch(type){
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen:payload,
      }
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        cartItems: payload,
      };
    case CART_ACTION_TYPES.SET_BILLING_INFO:
      return {
        ...state,
        billingInfo : payload,
      };
    case CART_ACTION_TYPES.SET_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo : payload,
      };
    case CART_ACTION_TYPES.SET_SHIPPING_SAB:
      return {
        ...state,
        shippingSameAsBilling : payload,
      };
    default:
      return state;
  }
}