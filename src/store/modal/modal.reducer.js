import {MODAL_ACTION_TYPES} from './modal.types'

const CART_INITIAL_STATE = {
  isModalOpen: false,
  justAddedItems: [],
}

export const modalReducer = (state = CART_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;
  // console.log(MODAL_ACTION_TYPES);
  switch(type){
    case MODAL_ACTION_TYPES.SET_JUST_ADDED_ITEMS:
      return {
        ...state,
        justAddedItems: payload,
      };
    case MODAL_ACTION_TYPES.SET_IS_MODAL_OPEN:
      return {
        ...state,
        isModalOpen : payload,
      };
    default:
      return state;
  }
}