import { useSelector, useDispatch } from 'react-redux'

import { selectCartItems } from '../../store/cart/cart.selector'
import { addItemToCart, clearItemFromCart, removeItemFromCart} from '../../store/cart/cart.action';

import {
  StCheckoutItems,
  StCheckoutImageContainer,
  StCheckoutImage,
  StCheckoutText,
  StCheckoutQuantityContainer,
  StCheckoutQuantityArrow,
  StCheckoutQuantityValue,
  StCheckoutRemoveButton,
} from './checkout-item.styles'



const CheckoutItem = ( {cartItem} ) => {
  const { name, imageUrl, price, quantity } = cartItem;
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  
  
  const clearItemHandler = () => dispatch( clearItemFromCart(cartItems, cartItem) );
  const addItemHandler = () => dispatch( addItemToCart(cartItems, cartItem) );
  const removeItemHandler = () => dispatch( removeItemFromCart(cartItems, cartItem) );
  
  return (
    <StCheckoutItems>
      <StCheckoutImageContainer>
        <StCheckoutImage src={imageUrl} alt={`${name}`}/>
      </StCheckoutImageContainer>
      <StCheckoutText>{name}</StCheckoutText>
      <StCheckoutQuantityContainer>
        <StCheckoutQuantityArrow onClick={removeItemHandler}>
          &#10094;
        </StCheckoutQuantityArrow>
        <StCheckoutQuantityValue>
          {quantity}
        </StCheckoutQuantityValue>
        <StCheckoutQuantityArrow onClick={addItemHandler}>
          &#10095;
        </StCheckoutQuantityArrow>
      </StCheckoutQuantityContainer>
      <StCheckoutText>${price}</StCheckoutText>
      <StCheckoutRemoveButton onClick={clearItemHandler}>
        &#10005;
      </StCheckoutRemoveButton>
    </StCheckoutItems>
  )
}

export default CheckoutItem;
