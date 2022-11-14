import { useSelector, useDispatch } from 'react-redux'

import { selectCartItems } from '../../store/cart/cart.selector'
import { addItemToCart, clearItemFromCart, removeItemFromCart } from '../../store/cart/cart.action';

const EditCartItem = ( {cartItem} ) => {
  const dispatch = useDispatch();
  const { name, imageUrl, price, quantity, extensions} = cartItem;
  const cartItems = useSelector(selectCartItems);
  
  const clearItemHandler = () => dispatch( clearItemFromCart(cartItems, cartItem) );
  const addItemHandler = () => dispatch( addItemToCart(cartItems, cartItem) );
  const removeItemHandler = () => dispatch( removeItemFromCart(cartItems, cartItem) );
  
  return (
    <div className='edit-cart-item-container'>
      <div className='img-container'>
        <img className='edit-cart-item-img' src={imageUrl} alt={`${name}`}/>
      </div>
      <div className='edit-cart-item-text'>
        <p className="item-title">{name}</p>
        <p className="extension-text">Color: {extensions.color}</p>
        <p className="extension-text">Size: {extensions.size}</p>
        <p className="extension-text">Qty: {quantity}</p>
      </div>
      <span className='quanity-container'>
        <div className='quantity-arrow' onClick={removeItemHandler}>
          -
        </div>
        <span className="quantity-value">
          {quantity}
        </span>
        <div className='quantity-arrow' onClick={addItemHandler}>
          +
        </div>
      </span>
      <span className='edit-cart-item-price'>${price * quantity}</span>
      <div className='remove-button' onClick={clearItemHandler}>
        &#10005; 
      </div>
    </div>
  )
}

export default EditCartItem;
