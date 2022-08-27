import {
  StCartItems,
  StCartItemImg,
  StCartItemDetails,
  StCartItemName,
  StCartItemPrice
} from './cart-item.styles';

const CartItem = ({cartItem}) => {
  const { name, imageUrl, price, quantity } = cartItem;
  return (
    <StCartItems>
      <StCartItemImg src={imageUrl} alt={`${name}`} />
      <StCartItemDetails>
        <StCartItemName>{name}</StCartItemName>
        <StCartItemPrice>{quantity} x ${price}</StCartItemPrice>
      </StCartItemDetails>
    </StCartItems>
  )
}

export default CartItem;