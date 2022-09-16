import { useDispatch, useSelector } from 'react-redux';

import { selectCartCount, selectIsCartOpen } from '../../store/cart/cart.selector';
import { setIsCartOpen } from '../../store/cart/cart.action';


import {
  CartIconContainer,
  ShoppingIconSvg,
  ItemCount
} from './cart-icon.styles';

const CartIcon = () => {
  const dispatch = useDispatch();

  const cartCount = useSelector(selectCartCount);
  const iscartOpen = useSelector(selectIsCartOpen);

  const toggleIsCartOpen = () => dispatch( setIsCartOpen(!iscartOpen) );
  
  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIconSvg/>
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  )
}

export default CartIcon;