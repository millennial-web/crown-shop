import './cart-item.styles.scss';

const CartItem = ({cartItem}) => {
  const { name, imageUrl, price, quantity } = cartItem;
  return (
    <div className='cart-item-container'>
      <img className='cart-item-img' src={imageUrl} alt={`${name}`} />
      <div className='cart-item-details'>
        <span className='cart-item-name'>{name}</span>
        <span className='cart-item-price'>{quantity} x ${price}</span>
      </div>
    </div>
  )
}

export default CartItem;