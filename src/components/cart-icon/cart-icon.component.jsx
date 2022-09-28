// import { useDispatch, useSelector } from 'react-redux';
// import { selectCartCount, selectIsCartOpen } from '../../store/cart/cart.selector';
// import { setIsCartOpen } from '../../store/cart/cart.action';
import { ReactComponent as ShoppingIconSvg } from '../../assets/shopping-bag.svg';
import './cart-icon.styles.scss';

const CartIcon = () => {
  // const dispatch = useDispatch();

  // const cartCount = useSelector(selectCartCount);
  // const iscartOpen = useSelector(selectIsCartOpen);

  // const toggleIsCartOpen = () => dispatch( setIsCartOpen(!iscartOpen) );
  const cartCount = 0;
  
  const toggleIsCartOpen = () => {

  }
  return (
    <div className='cart-icon-container' onClick={toggleIsCartOpen}>
      <ShoppingIconSvg className='shoping-icon'/>
      <span className='item-count'>{cartCount}</span>
    </div>
  )
}

export default CartIcon;