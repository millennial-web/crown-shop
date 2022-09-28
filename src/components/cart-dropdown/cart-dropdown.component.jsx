// import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {Button} from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
// import { selectCartItems } from '../../store/cart/cart.selector';

import './cart-dropdown.styles.scss';

const CartDropdown = () => {
  const cartItems = [];
  // const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();

  const goToCheckoutHandler = () => {
    navigate('/checkout');
  }

  return (
    <div className="dropdown-container">
      <div className="cart-items">
        {
          cartItems.length ? (cartItems.map(item => (
            <CartItem key={item.id} cartItem={item} />
          ))) : (
            <span className="empty-message">
              Your cart is empty
            </span>
          )
        }
      </div>
      <Button onClick={goToCheckoutHandler}>CHECKOUT</Button>
    </div>
  )
}

export default CartDropdown;