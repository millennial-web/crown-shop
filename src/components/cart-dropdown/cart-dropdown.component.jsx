import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {Button} from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';

import { selectCartItems, selectCartTotal, selectCartCount} from '../../store/cart/cart.selector';
import { selectIsCartOpen } from '../../store/cart/cart.selector';

import { setIsCartOpen } from '../../store/cart/cart.action';

const CartDropdown = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const cartCount = useSelector(selectCartCount);
  const isCartOpen = useSelector(selectIsCartOpen);
  
  const goToCheckoutHandler = () => {
    hideCartDropdown();
    navigate('/checkout');
  }

  const goToEditCartHandler = () => {
    hideCartDropdown();
    navigate('/edit-cart');
  }

  const showCartDropdown = () => dispatch( setIsCartOpen(true) );
  const hideCartDropdown = () => dispatch( setIsCartOpen(false) );

  return (
    <div 
      className={isCartOpen? 'dropdown-container open' : 'dropdown-container'} 
      onMouseEnter={showCartDropdown} 
      onMouseLeave={hideCartDropdown}
    >
      <div className="cart-items">
        {
          cartItems.length ? ( cartItems.map(item => (
            <CartItem key={item.id+Math.floor(Math.random() * 10000)} cartItem={item} />
          )) ) : (
            <span className="empty-message">
              Your cart is empty
            </span>
          )
        }
      </div>
      <div className="summary-container">
        <div className='total'>
          {cartCount} Items
        </div>
        
        <div className='total'>
          Total: ${cartTotal}
        </div>
      </div>
      
      <div className='btns-container'>
        <Button className='default' onClick={goToEditCartHandler}>Edit Cart</Button>
        <Button className='checkout-btn' onClick={goToCheckoutHandler}>Checkout</Button>
      </div>
    </div>
  )
}

export default CartDropdown;