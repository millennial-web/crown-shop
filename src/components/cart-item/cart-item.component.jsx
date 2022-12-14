import { useSelector, useDispatch } from 'react-redux'

import { addItemToCart, clearItemFromCart, removeItemFromCart } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector'


const CartItem = ({cartItem}) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const clearItemHandler = () => dispatch( clearItemFromCart(cartItems, cartItem) );
  const addItemHandler = () => dispatch( addItemToCart(cartItems, cartItem) );
  const removeItemHandler = () => dispatch( removeItemFromCart(cartItems, cartItem) );


  const { name, imageUrl, price, quantity, extensions } = cartItem;
  return (
    <div className='cart-item-container'>
      <div className='cart-item-img' style={{backgroundImage:`url(${imageUrl})`}} alt={`${name}`}></div>
      <div className='cart-item-details'>
        <span className='cart-item-name'>{name}</span>
        <div className='cart-item-price'>
          <span className='cart-item-subtotal'>${price * quantity}</span>
        </div>
        <div className="cart-item-extensions-wrapper">
          <span className='cart-item-extension'>
            <label>Size: </label>{extensions.size}
          </span>
          <span className='cart-item-extension'>
            <label>Color: </label>{extensions.color}
          </span>
          <span className='cart-item-extension'>
            <label>Qty: </label>{quantity}
          </span>
        </div>

        <div className={'actions-container'}>
          <div className='action-btn' onClick={removeItemHandler} title="Minus Quantity">
            <span>-</span>
          </div>
          <div className='action-btn' onClick={addItemHandler} title="Increse Quantity">
            <span>+</span>
          </div>
          <div className='action-btn remove-btn' onClick={clearItemHandler} title="Remove Item">
            <span>&#10005;</span>
          </div>
        </div>

      </div>

      
    
     
      
    </div>
  )
}

export default CartItem;