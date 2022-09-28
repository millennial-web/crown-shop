import { Fragment } from 'react'
import { Outlet } from 'react-router-dom'
import { 
  useSelector, 
  // useDispatch 
} from 'react-redux';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'

import CartIcon from '../../components/cart-icon/cart-icon.component'
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component'

// import { selectIsCartOpen } from '../../store/cart/cart.selector';
import { selectCurrentUser } from '../../store/user/user.selector';

import { signOutUser } from '../../utils/firebase/firebase.utils';

import { 
  StyledNavContainer,
  StyledLogoContainer,
  StyledNavLinks,
  StyledNavLink
} from './navigation.styles'


const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser)
  const isCartOpen = false;
  // const dispatch = useDispatch();

  return (
    <Fragment>
      <StyledNavContainer>
        <StyledLogoContainer to='/'>
          <CrwnLogo className='logo'/>
        </StyledLogoContainer>
        <StyledNavLinks>
          <StyledNavLink to='/shop'>
            SHOP
          </StyledNavLink>
          <StyledNavLink to='/'>
            CONTACT
          </StyledNavLink>
          { 
            currentUser? (
              <StyledNavLink as='span' onClick={signOutUser}>
                SIGN OUT
              </StyledNavLink>
            ) : (
              <StyledNavLink to='/auth'>
                SIGN IN
              </StyledNavLink>
            )
          }
          <CartIcon/>
        </StyledNavLinks>
        {
          isCartOpen && 
          <CartDropdown/>}
      </StyledNavContainer>
      <Outlet />
    </Fragment>
  )
};

export default Navigation;
