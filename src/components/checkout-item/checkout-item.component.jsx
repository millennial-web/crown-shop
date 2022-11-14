
const CheckoutItem = ( {cartItem} ) => {
  const { name, price, quantity, extensions} = cartItem;
  
  return (
    <div className='checkout-item-container'>
      <div className='checkout-item-text'>
        <div className="checkout-item-header">
          <span className="checkout-item-title">
            <span>{quantity} x </span>
            <span>{name}</span> 
            <span className="checkout-item-extension">&nbsp; - ({extensions.color}, {extensions.size})</span>
          </span>
          <span className='checkout-item-price'>
            ${price * quantity}
          </span>  
        </div>
        
      </div>
      
    </div>
  )
}

export default CheckoutItem;
