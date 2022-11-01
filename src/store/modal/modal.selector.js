import { createSelector } from 'reselect';

const selectModalReducer = state => state.modal;

export const selectJustAddedItems = createSelector(
  [selectModalReducer],
  (modal) => modal.justAddedItems
)

export const selectIsModalOpen = createSelector(
  [selectModalReducer], 
  (modal) => modal.isModalOpen
)