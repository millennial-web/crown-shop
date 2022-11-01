import { Fragment, useEffect } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'

import CartIcon from '../../components/cart-icon/cart-icon.component'
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component'

import { selectCurrentUser } from '../../store/user/user.selector';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils'
import { setCategories } from '../../store/categories/category.action'

import { signOutUser } from '../../utils/firebase/firebase.utils';

import './navigation.styles.scss'


const Navigation = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoriesArray = await getCategoriesAndDocuments('categories');
      dispatch(setCategories(categoriesArray));
    };
    getCategoriesMap();
  }, [dispatch]);


  const currentUser = useSelector(selectCurrentUser);

  return (
    <Fragment>
      <div className='nav-container'>
        <div className='logo-container' to='/'>
        <Link className='nav-link' to='/'>
          <CrwnLogo className='logo'/>
        </Link>
        </div>
        <div className='nav-links'>
          { 
            currentUser? (
              <Link className='nav-link' as='span' to='' onClick={signOutUser}>
                SIGN OUT
              </Link>
            ) : (
              <Link className='nav-link' to='/auth'>
                SIGN IN
              </Link>
            )
          }
          <CartIcon/>
        </div>
        <CartDropdown/>
      </div>
      <Outlet />
    </Fragment>
  )
};

export default Navigation;
