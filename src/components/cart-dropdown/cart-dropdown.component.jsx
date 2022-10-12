import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {Button, BUTTON_TYPE_CLASSES} from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { selectCartItems, selectCartTotal} from '../../store/cart/cart.selector';

import { selectIsCartOpen } from '../../store/cart/cart.selector';
import { setIsCartOpen } from '../../store/cart/cart.action';

import './cart-dropdown.styles.scss';

const CartDropdown = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const iscartOpen = useSelector(selectIsCartOpen);
  const toggleIsCartOpen = () => dispatch( setIsCartOpen(!iscartOpen) );

  const goToCheckoutHandler = () => {
    toggleIsCartOpen();
    navigate('/checkout');
  }

  return (
    <div className="dropdown-container">
      <div className="cart-items">
        {
          cartItems.length ? ( cartItems.map(item => (
            <CartItem key={item.id} cartItem={item} />
          )) ) : (
            <span className="empty-message">
              Your cart is empty
            </span>
          )
        }
      </div>
      <div className='total'>Total: ${cartTotal}</div>
      <div className='btns-container'>
        <Button className='keep-shopping-btn' onClick={toggleIsCartOpen}>Continue Shopping</Button>
        <Button className='checkout-btn' onClick={goToCheckoutHandler}>Checkout</Button>
      </div>
    </div>
  )
}

export default CartDropdown;