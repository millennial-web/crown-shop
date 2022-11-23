import { useSelector, useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { selectCartTotal, selectCartCount} from '../../store/cart/cart.selector';
import { selectJustAddedItems, selectIsModalOpen } from '../../store/modal/modal.selector'

import { setIsModalOpen } from '../../store/modal/modal.action';

import { Button } from "../button/button.component";
import { getCartItemHash } from '../../utils/misc/strings.utils';

const Modal = ({ title=null }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const justAddedItems = useSelector(selectJustAddedItems);
  const cartItemsCount = useSelector(selectCartCount);
  const isModalOpen = useSelector(selectIsModalOpen);
  const cartTotal = useSelector(selectCartTotal);

  const closeModal = () => {
    dispatch( setIsModalOpen(false) );
  }

  const goToCheckoutHandler = () => {
    closeModal();
    navigate('/checkout');
  }

  const goToEditCartHandler = () => {
    closeModal();
    navigate('/edit-cart');
  }

  return (
    <>
      {isModalOpen && (
        <div 
          className='modal-dark-bg'
          onClick={closeModal}
        ></div>
      )}
      {isModalOpen && (
        <div className='modal-container'>
          <div className="modal">
            <div className="header">
              <h5 className="heading"> 
                {title? (<span>{title}</span>) : (<span>Dialog</span>) }
              </h5>
            </div>
            <div className="close-btn" onClick={closeModal}>
              X
            </div>
            <div className="content">
              <div className='just-added-container'>
              {
                justAddedItems.length ? ( 
                  justAddedItems.map(item => {
                    const { name, imageUrl, price, quantity, extensions } = item;
                    return (
                      <div key={getCartItemHash(item)} className='just-added-item'>
                        <div className="image-container" style={{backgroundImage: `url(${imageUrl}`}} alt={`${name}`} />
                        <div className='details'>
                          <div className='name'>{name}</div>
                          <div>
                            <div className='extension'>
                              <label>Qty:</label>{quantity}
                            </div>
                            <div className='extension'>
                              <label>Color:</label> {extensions.color}
                            </div>
                            <div className='extension'>
                              <label>Size</label> {extensions.size}
                            </div>
                          </div>
                        </div>
                        <div className='price'>${price * quantity}</div>
                      </div>
                    )
                  }) 
                ) : (
                  <span className="empty-message">
                    No items added
                  </span>
                )
              }
              </div>
            </div>
            <div className="actions-container">
              <div className="totals-summary">
                <span className='quantity'>Total Cart Items: {cartItemsCount? cartItemsCount : 0}</span>
                <span className='subtotal'>Subtotal: ${cartTotal}</span>
              </div>
              <div className="actions">
                <Button className='default' onClick={goToEditCartHandler}>Edit Cart</Button>
                <Button className='main' onClick={goToCheckoutHandler}>Checkout</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;