import { useDispatch, useSelector } from 'react-redux';
import { selectCartCount } from '../../store/cart/cart.selector';
import { setIsCartOpen } from '../../store/cart/cart.action';
import { ReactComponent as ShoppingIconSvg } from '../../assets/shopping-bag.svg';

const CartIcon = () => {
  const dispatch = useDispatch();
  const cartCount = useSelector(selectCartCount);
  const showCartDropdown = () => dispatch( setIsCartOpen(true) );
  const hideCartDropdown = () => dispatch( setIsCartOpen(false) );

  return (
    <div className='cart-icon-container' onMouseEnter={showCartDropdown} onMouseLeave={hideCartDropdown}>
      <ShoppingIconSvg className='shoping-icon'/>
      <span className='item-count'>{ cartCount }</span>
    </div>
  )
}

export default CartIcon;