import { useSelector, useDispatch } from 'react-redux'

import { selectCartItems } from '../../store/cart/cart.selector'
import { addItemToCart, clearItemFromCart, removeItemFromCart} from '../../store/cart/cart.action';

import './checkout-item.styles.scss'

const CheckoutItem = ( {cartItem} ) => {
  const dispatch = useDispatch();
  const { name, imageUrl, price, quantity } = cartItem;
  const cartItems = useSelector(selectCartItems);
  
  const clearItemHandler = () => dispatch( clearItemFromCart(cartItems, cartItem) );
  const addItemHandler = () => dispatch( addItemToCart(cartItems, cartItem) );
  const removeItemHandler = () => dispatch( removeItemFromCart(cartItems, cartItem) );
  
  return (
    <div className='checkout-item-container'>
      <div className='img-container'>
        <img className='checkout-item-img' src={imageUrl} alt={`${name}`}/>
      </div>
      <span className='checkout-item-text'>{name}</span>
      <span className='quanity-container'>
        <div className='quantity-arrow' onClick={removeItemHandler}>
          &#10094;
        </div>
        <span className="quantity-value">
          {quantity}
        </span>
        <div className='quantity-arrow' onClick={addItemHandler}>
          &#10095;
        </div>
      </span>
      <span className='checkout-item-text'>${price}</span>
      <div className='remove-button' onClick={clearItemHandler}>
        &#10005;
      </div>
    </div>
  )
}

export default CheckoutItem;
