import { MODAL_ACTION_TYPES } from './modal.types';
import { createAction } from '../../utils/reducer/reducer.utils'

export const setIsModalOpen = (bool) => {
  // console.log('called setIsModalOpen', bool)
  return createAction(MODAL_ACTION_TYPES.SET_IS_MODAL_OPEN, bool);
}
  
export const setJustAddedItems = (items) => {
  // console.log('called setJustAddedItems', items);
  return createAction(MODAL_ACTION_TYPES.SET_JUST_ADDED_ITEMS, items);
}
