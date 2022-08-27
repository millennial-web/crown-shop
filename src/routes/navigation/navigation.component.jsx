import { Fragment, useContext } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
import { UserContext } from '../../contexts/user.context'
import { CartContext } from '../../contexts/cart.context'

import { signOutUser } from '../../utils/firebase/firebase.utils'

import CartIcon from '../../components/cart-icon/cart-icon.component'
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component'

import { 
  StyledNavContainer,
  StyledLogoContainer,
  StyledNavLinks,
  StyledNavLink
} from './navigation.styles'


const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);
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
          <StyledNavLink to='/shop'>
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
        {isCartOpen && <CartDropdown/>}
      </StyledNavContainer>
      <Outlet />
    </Fragment>
  )
};

export default Navigation;
