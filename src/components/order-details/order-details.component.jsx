import { useSelector } from 'react-redux'
import CheckoutItem from '../../components/checkout-item/checkout-item.component'
import {
  selectCartTotal, 
  selectCartBillingInfo,
  selectCartShippingInfo,
  selectCartShippingSAB
} from '../../store/cart/cart.selector';

const OrderDetails = ( {cartItems} ) => {
  const shipping = 0;
  const taxes = 0;
  const cartTotal = useSelector(selectCartTotal);
  
  const cartBillingInfo = useSelector(selectCartBillingInfo);
  const cartShippingInfo = useSelector(selectCartShippingInfo);
  const shippingSameAsBilling = useSelector(selectCartShippingSAB);

  return (
    <div className="order-details-container">
      <h1 className="order-details-header">
        Order Details
      </h1>

      <div className="order-details-content">
        { cartItems.map((cartItem) => (
          <CheckoutItem key={cartItem.id+Math.floor(Math.random() * 10000)} cartItem={cartItem}/>
        )) }
      </div>
      
      <div className="order-details-billing-info">
        <h3>Billing info</h3>
        <p>
          {cartBillingInfo.firstName} {cartBillingInfo.lastName}<br/>
          {cartBillingInfo.address} {cartBillingInfo.address2}<br/>
          {cartBillingInfo.city} {cartBillingInfo.state} {cartBillingInfo.postalCode} {cartBillingInfo.country}<br/>
          {cartBillingInfo.tel} {cartBillingInfo.email}
        </p>
      </div>

      <div className="order-details-shipping-info">
        <h3>Shipping Info:</h3>
        {!shippingSameAsBilling ? (
          <p>
            {cartShippingInfo.firstName} {cartShippingInfo.lastName}<br/>
            {cartShippingInfo.address} {cartShippingInfo.address2}<br/>
            {cartShippingInfo.city} {cartShippingInfo.state} {cartShippingInfo.postalCode} {cartShippingInfo.country}<br/>
            {cartShippingInfo.tel} {cartShippingInfo.email}
          </p>
        ) : (
          <p>* Same as billing</p>
        )}
      </div>
      
      <div className='order-details-footer'>
        <div className="order-details-totals-labels">
          <div>Subtotal:</div>
          <div>Shipping:</div>
          <div>Taxes:</div>
          <div className="total">Total:</div>
        </div>
        <div className='order-details-totals'>
          <div>${cartTotal}</div>
          <div>${shipping}</div>
          <div>${taxes}</div>
          <div className="total">${cartTotal}</div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetails;
