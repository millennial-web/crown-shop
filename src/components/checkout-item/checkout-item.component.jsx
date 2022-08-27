import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

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
  
  const { clearItemFromCart, addItemToCart, removeItemFromCart  } = useContext(CartContext);
  
  const clearItemHandler = () => clearItemFromCart(cartItem);
  const addItemHandler = () => addItemToCart(cartItem);
  const removeItemHandler = () => removeItemFromCart(cartItem);
  
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
