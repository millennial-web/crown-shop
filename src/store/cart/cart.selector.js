import { createSelector } from 'reselect';

const selectCartReducer = state => state.cart;

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cart) => cart.cartItems
)

export const selectIsCartOpen = createSelector(
  [selectCartReducer], 
  (cart) => cart.isCartOpen
)

export const selectCartBilling = createSelector(
  [selectCartReducer], 
  (cart) => cart.billingInfo
)

export const selectCartShipping = createSelector(
  [selectCartReducer], 
  (cart) => cart.shippingInfo
)

export const selectShippingSAB = createSelector(
  [selectCartReducer], 
  (cart) => cart.shippingSameAsBilling
)

//=====================================================




export const selectCartBillingInfo = createSelector(
  [selectCartBilling], 
  (billingInfo) => billingInfo
)

export const selectCartShippingInfo = createSelector(
  [selectCartShipping], 
  (shippingInfo) => shippingInfo
)

export const selectCartShippingSAB = createSelector(
  [selectShippingSAB], 
  (shippingSameAsBilling) => shippingSameAsBilling
)

export const selectCartCount = createSelector(
  [selectCartItems], 
  (cartItems) => cartItems.reduce(
    (count, cartItem) => count + cartItem.quantity, 
    0
  )
)

export const selectCartTotal = createSelector(
  [selectCartItems],
  (cartItems) => cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity * cartItem.price,
    0
  )
)